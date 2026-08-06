const { app, BrowserWindow, ipcMain, screen, globalShortcut, dialog } = require("electron");
const { writeFileSync, readFileSync, copyFileSync, existsSync, mkdirSync } = require("fs");
const path = require("path");

let win;
let historyPath;
let settingsPath;
let bookmarksPath;
let customThemesPathsObj;

let downloadsJsonPath;

const settings_preload_path = path.join(__dirname, "..", "public", "settings_preload.js")

const isDev = !app.isPackaged;

if (isDev) {
  historyPath = path.join(__dirname, "history.json");
  settingsPath = path.join(__dirname, "settings.json");
  bookmarksPath = path.join(__dirname, "bookmarks.json");
  downloadsJsonPath = path.join(__dirname, "downloads.json");

  customThemesPathsObj = {
    "ct_1": path.join(__dirname, "..", "public", "custom_themes", "ct_1.css"),
    "ct_2": path.join(__dirname, "..", "public", "custom_themes", "ct_2.css"),
    "ct_3": path.join(__dirname, "..", "public", "custom_themes", "ct_3.css"),
    "ct_4": path.join(__dirname, "..", "public", "custom_themes", "ct_4.css")
  }
} else {
  historyPath = path.join(app.getPath("userData"), "history.json");
  settingsPath = path.join(app.getPath("userData"), "settings.json");
  bookmarksPath = path.join(app.getPath("userData"), "bookmarks.json");
  downloadsJsonPath = path.join(app.getPath("userData"), "downloads.json");

  customThemesPathsObj = {
    "ct_1": path.join(app.getPath("userData"), "custom_themes", "ct_1.css"),
    "ct_2": path.join(app.getPath("userData"), "custom_themes", "ct_2.css"),
    "ct_3": path.join(app.getPath("userData"), "custom_themes", "ct_3.css"),
    "ct_4": path.join(app.getPath("userData"), "custom_themes", "ct_4.css")
  }
}

const default_settings = {
  "theme": "theme-grey",
  "linear-gradient": false,
  "rgb-cycle": false,
  "auto-dark-mode": false
};

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workArea;

  win = new BrowserWindow({
    width: Math.floor(0.7 * width),
    height: Math.floor(0.7 * height),
    minWidth: 1200,
    minHeight: 800,
    title: "PastaBrowse",
    webPreferences: {
      webviewTag: true,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: path.join(__dirname, "..", "Icons", "pasta_icon.png"),
    frame: false,
    center: true,
    movable: true
  });

  if (!isDev) {
    win.webContents.on("before-input-event", (event, input) => {
      if (input.key === "F12" || input.control && input.shift && input.key === "I") {
        event.preventDefault();
      }
    })

    win.webContents.on("devtools-opened", () => {
      win.webContents.closeDevTools();
    })
  }


  win.loadFile(path.join(__dirname, "..", "public", "index.html"));
  win.webContents.setZoomFactor(1.0);
  win.maximize();

  let settings;

  try {
    const settings_json = readFileSync(settingsPath);
    settings = JSON.parse(settings_json);
  } catch (er) {
    console.error(er);
    settings = default_settings;
  };

  if (Object.keys(settings).length === 0 && Object.values(settings).length === 0) {
    settings = default_settings;
  };


  let bookmarks;

  try {
    const bookmarks_json = readFileSync(bookmarksPath);
    bookmarks = JSON.parse(bookmarks_json);
  } catch (er){
    console.error(er);
    bookmarks = {"Null": "Error while reading/parsing bookmarks"}
  }

  let downloads;

  try {
    const downloads_json = readFileSync(downloadsJsonPath);
    downloads = JSON.parse(downloads_json);
    if (downloads["downloadsPath"] === ""){
      downloads["downloadsPath"] = app.getPath("downloads");
    }
  } catch (er){
    console.error(er);
    downloads = {"downloadsPath": app.getPath("downloads"), "parsingError": true};
  }

  win.webContents.on("did-finish-load", () => {
    win.webContents.send("settings", settings);
    win.webContents.send("bookmarks", bookmarks);
    win.webContents.send("settings-preload-path", settings_preload_path);
    win.webContents.send("downloads", downloads) // send to renderer, rewrite downstream logic to only query the renderer copy
  })                         // only read/write to json at app launch and termination
}


function ensureCustomThemesInUserData(){
  const dir = path.join(app.getPath("userData"), "custom_themes");
  
  if (!existsSync(dir)){
    mkdirSync(dir, { recursive: true});
  }

  for (let i = 1; i <= 4; i++){
    const dest = path.join(dir, `ct_${i}.css`);
    if (!existsSync(dest)){
      const src = path.join(process.resourcesPath, "app.asar", "public", "custom_themes", `ct_${i}.css`);
      copyFileSync(src, dest);
    }
  }
}


function parseThemesCss(filePath){
  const css = readFileSync(filePath, "utf-8");
  const themesRegex = /\.(theme-[-\w]+)\s*\{([^}]+)\}/g;
  const themes = {};
  let match;

  while ((match = themesRegex.exec(css)) !== null){
    const [, name, body] = match;

    const variables = {};
    const varRegex = /(--[\w-]+)\s*:\s*([^;]+);/g;
    let varMatch;

    while ((varMatch = varRegex.exec(body)) !== null){
      const [, prop, value] = varMatch;
      variables[prop] = value.trim();
    };

    themes[name] = variables
  };

  return themes;
};


function adjustColor(hex, delta){
  const v = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, ((v >> 16) & 255) + delta));
  const g = Math.min(255, Math.max(0, ((v >> 8) & 255) + delta));
  const b = Math.min(255, Math.max(0, (v & 255) + delta));
  
  return "#" + [r, g, b].map(c => c.toString(16).padStart(2, "0")).join("");
}


ipcMain.on("get-custom-theme-css", (_event, id) => {
  css = readFileSync(customThemesPathsObj[`ct_${id}`], "utf-8");
  win.webContents.send("res-custom-theme-css", css);
})


ipcMain.on("kill-app", (_event, data) => {
  const tab_list = data["tab_list"];
  const settings = data["settings"];
  const bookmarks = data["bookmarks"];
  const downloads = data["downloads"];

  writeFileSync(historyPath, JSON.stringify(tab_list));
  writeFileSync(settingsPath, JSON.stringify(settings));
  writeFileSync(bookmarksPath, JSON.stringify(bookmarks));
  writeFileSync(downloadsJsonPath, JSON.stringify(downloads));

  app.quit();
})

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
})

ipcMain.on("maximize", () => {
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
})

ipcMain.on("minimize", () => {
  win.minimize();
})

ipcMain.on("get-history", () => {
  try {
    const history_json = readFileSync(historyPath);
    const history = JSON.parse(history_json);
    win.webContents.send("res-history", history);
  } catch {
    win.webContents.send("res-history", {});
  }

})

ipcMain.on("get-custom-theme", (_event, cThemeId) => {
  const css = parseThemesCss(customThemesPathsObj[`ct_${cThemeId}`]);
  const theme = css[`theme-custom-${cThemeId}`];
  win.webContents.send("res-custom-theme", theme);
});

ipcMain.on("save-custom-theme", (_event, data) => {
  const custom_theme = `.theme-custom-${data["id"]}{
    --text: ${data["--text"]};
    --exit: ${data["--exit"]};
    --border: ${data["--border"]};

    --col-0: var(--bg-0);
    --col-50: var(--bg-50);
    --col-100: var(--bg-100);
    --col-150: var(--bg-150);
    --col-200: var(--bg-200);
    --col-250: var(--bg-250);
    --col-300: var(--bg-300);
    --col-350: var(--bg-350);

    --bg-0: ${data["--col-0"]};
    --bg-50: ${data["--col-50"]};
    --bg-100: ${data["--col-100"]};
    --bg-150: ${data["--col-150"]};
    --bg-200: ${data["--col-200"]};
    --bg-250: ${data["--col-250"]};
    --bg-300: ${data["--col-300"]};
    --bg-350: ${data["--col-350"]};
  }

  .theme-custom-${data["id"]}-linear-gradient{
    --text: ${data["--text"]};
    --exit: ${data["--exit"]};
    --border: ${data["--border"]};

    --col-0: ${data["--col-0"]};
    --col-50: ${data["--col-50"]};
    --col-100: ${data["--col-100"]};
    --col-150: ${data["--col-150"]};
    --col-200: ${data["--col-200"]};
    --col-250: ${data["--col-250"]};
    --col-300: ${data["--col-300"]};
    --col-350: ${data["--col-350"]};

    --bg-0: linear-gradient(135deg, ${adjustColor(data["--col-0"], + 9)}, ${data["--col-0"]}, ${adjustColor(data["--col-0"], - 8)});
    --bg-50: linear-gradient(135deg, ${adjustColor(data["--col-50"], + 9)}, ${data["--col-50"]}, ${adjustColor(data["--col-50"], - 8)});
    --bg-100: linear-gradient(135deg, ${adjustColor(data["--col-100"], + 9)}, ${data["--col-100"]}, ${adjustColor(data["--col-100"], - 8)});
    --bg-150: linear-gradient(135deg, ${adjustColor(data["--col-150"], + 9)}, ${data["--col-150"]}, ${adjustColor(data["--col-150"], - 8)});
    --bg-200: linear-gradient(135deg, ${adjustColor(data["--col-200"], + 9)}, ${data["--col-200"]}, ${adjustColor(data["--col-200"], - 8)});
    --bg-250: linear-gradient(135deg, ${adjustColor(data["--col-250"], + 9)}, ${data["--col-250"]}, ${adjustColor(data["--col-250"], - 8)});
    --bg-300: linear-gradient(135deg, ${adjustColor(data["--col-300"], + 9)}, ${data["--col-300"]}, ${adjustColor(data["--col-300"], - 8)});
    --bg-350: linear-gradient(135deg, ${adjustColor(data["--col-350"], + 9)}, ${data["--col-350"]}, ${adjustColor(data["--col-350"], - 8)});
  }`.replace(/^  /gm, "");

  writeFileSync(customThemesPathsObj[`ct_${data["id"]}`], custom_theme);
})


ipcMain.on("change-downloads-dir-path", async (_event) => {
  const result = await dialog.showOpenDialog({properties: ['openDirectory']});
  win.webContents.send("res-downloads-dir-path", result.canceled ? null : result.filePaths[0]);
})


app.on("ready", () => {
  createWindow();

  if (!isDev){
    ensureCustomThemesInUserData();
  }
  
  globalShortcut.register("CommandOrControl+T", () => {
    if (win.isFocused()) {
      win.webContents.send("ctrl-t");
    }
  })

  globalShortcut.register("CommandOrControl+W", () => {
    if (win.isFocused()) {
      win.webContents.send("ctrl-w");
    }
  })


  globalShortcut.register("CommandOrControl+R", () => {
    if (win.isFocused()) {
      win.webContents.send("ctrl-r");
    }
  })

  globalShortcut.register("F5", () => {
    if (win.isFocused()) {
      win.webContents.send("F5");
    }
  })

  globalShortcut.register("CommandOrControl+=", () => {
    if (win.isFocused()) {
      win.webContents.send("ctrl-=");
    }
  })

  globalShortcut.register("CommandOrControl+0", () => {
    if (win.isFocused()) {
      win.webContents.send("ctrl-0");
    }
  })

  globalShortcut.register("CommandOrControl+-", () => {
    if (win.isFocused()) {
      win.webContents.send("ctrl--");
    }
  })

  globalShortcut.register("CommandOrControl+Tab", () => {
    if (win.isFocused()) {
      win.webContents.send("ctrl-tab");
    }
  })

  globalShortcut.register("CommandOrControl+Shift+Tab", () => {
    if (win.isFocused()) {
      win.webContents.send("ctrl-shift-tab");
    }
  })

  globalShortcut.register("CommandOrControl+Shift+T", () => {
    if (win.isFocused()){
      win.webContents.send("ctrl-shift-t");
    }
  })
})
