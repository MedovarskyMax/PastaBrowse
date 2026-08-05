import {newTab, switchTab} from "./tabs.js";
import {saveCustomTheme, getCustomTheme, onResCustomTheme, getCustomThemeCss, onResCustomThemeCss, getDownloadsDirectoryPath, onResDownloadsDirectoryPath} from "./ipc.js";
import {bookmarks, removeBookmark, openBookmark} from "./bookmarks.js";

export let gWebview;

onResCustomThemeCss((css) => {
  injectCssIntoRenderer(css);
})

onResCustomTheme((theme) => {
  gWebview.send("res-custom-theme", theme);
})

onResDownloadsDirectoryPath((path) => {
  gWebview.send("res-downloads-dir-path", path);
})

export let settings = {};

export function openSettings(preloadPath) {
  const settings_tab = document.querySelector(".settings");

  if (settings_tab) {
    switchTab(settings_tab);
    return;
  }

  newTab(true);

  const view_container = document.getElementById("webview_container");
  const main_view = view_container.querySelector(".main_view");

  const tab_container = document.getElementById("tab_container");
  const main_tab = tab_container.querySelector(".main_tab");

  main_tab.querySelector("p").innerHTML = "Settings";
  
  main_view.setAttribute("preload", preloadPath);
  main_view.addEventListener("ipc-message", (event) => {handleIpcMessage(main_view, event)});
  main_view.addEventListener("dom-ready", () => {main_view.send("res-settings", settings)});
  main_view.src = "./settings_page/settings.html";
}


function handleIpcMessage(webview, event){
  gWebview = webview;

  switch (event.channel){
    case "theme-change": {
      const variant = event.args[0];
      setTheme(variant);
      webview.send("res-settings", settings);
      break;
    }
    case "set-linear-gradient": {
      toggleLinearGradient();
      webview.send("res-settings", settings);
      break;
    }
    case "toggle-rgb": {
      toggleRGB(event.args[0]);
      break;
    }
    case "toggle-auto-dark-mode": {
      const state = event.args[0];
      toggleAutoDarkMode(state);
      break;
    }
    case "save-custom-theme": {
      const cTheme = event.args[0];
      saveCustomTheme(cTheme);
      /*
      const styleLink = document.querySelector(`link[rel="stylesheet"]`);
      styleLink.href = styleLink.href.split("?")[0] + "?v=" + Date.now();
      */
      break;
    }
    case "get-custom-theme": {
      const cThemeId = event.args[0];
      gWebview = webview;
      getCustomTheme(cThemeId);
      break;
    }
    case "set-settings-tab-id": {
      const page = event.args[0];
      const tab = document.getElementById("tab_settings");
      const view = document.getElementById("view_settings");

      tab.id += ("_" + page);
      view.id += ("_" + page);
      break;
    }
    case "get-custom-theme-css": {
      const themeId = settings["theme"].slice(13, 14);
      getCustomThemeCss(themeId);
      break;
    }
    case "get-bookmarks": {
      webview.send("res-bookmarks", bookmarks);
      break;
    }
    case "remove-bookmark": {
      const url = event.args[0];
      removeBookmark(url);
      break;
    }
    case "open-bookmark": {
      const url = event.args[0];
      openBookmark(url);
      break;
    }

    case "get-downloads-dir-path": {
      const promptUser = event.args[0];
      getDownloadsDirectoryPath(promptUser);
      break;
    }
  }
};

export let darkModeTimer = null;

function scheduleAutoDarkMode(){
  if (darkModeTimer){
    clearTimeout(darkModeTimer);
    darkModeTimer = null;
  }

  settings["auto-dark-mode"] = true;

  const settings_webview = document.getElementById("view_settings_themes");
    
  const now = new Date();
  const hours = now.getHours();
  const isDark = hours >= 20 || hours < 7;

  const next = new Date(now);

  if (isDark){
    setTheme(settings["linear-gradient"] ? "theme-dark-linear-gradient" : "theme-dark")
    if (settings_webview){ settings_webview.send("res-settings", settings) };

    if (hours < 7){
      next.setHours(7, 0, 0, 0);
    } else {
      next.setDate(next.getDate() + 1);
      next.setHours(7, 0, 0, 0);
    }
  } else {
    setTheme(settings["linear-gradient"] ? "theme-grey-linear-gradient" : "theme-grey");
    if (settings_webview){ settings_webview.send("res-settings", settings) };

    next.setHours(20, 0, 0, 0);
  }

  darkModeTimer = setTimeout(scheduleAutoDarkMode, next - now)
}


export function toggleAutoDarkMode(state){
  if (state){
    scheduleAutoDarkMode();
  } else {
    clearTimeout(darkModeTimer);
    darkModeTimer = null;

    settings["auto-dark-mode"] = false;
  }
}

const rgb_themes = ["theme-red", "theme-green", "theme-blue"];
let rgbThemeIndex = 0;
let rgbInterval = null;

function toggleRGB(state){
  if (state){
    settings["rgb-cycle"] = true;

    rgbThemeIndex = 0;
    rgbCycle();
    rgbInterval = setInterval(rgbCycle, 1000)
  } else {
    settings["rgb-cycle"] = false;
    clearInterval(rgbInterval);
    rgbInterval = null;
  }
}

function rgbCycle(webview){
  const settings_webview = document.querySelector(".settings_view_id_class")

  setTheme(settings["linear-gradient"] ? `${rgb_themes[rgbThemeIndex]}-linear-gradient` : rgb_themes[rgbThemeIndex]);
  
  if (settings_webview){ settings_webview.send("res-settings", settings) };
  
  rgbThemeIndex = (rgbThemeIndex + 1) % rgb_themes.length;
}


function toggleLinearGradient(){
  const theme = settings["theme"];
  let new_theme;

  if (theme.includes("-linear-gradient")){
    new_theme = theme.replace("-linear-gradient", "");
    settings["linear-gradient"] = false;
  } else {
    new_theme = theme + "-linear-gradient";
    settings["linear-gradient"] = true;
  }

  setTheme(new_theme);
}

export function setTheme(variant){
  document.documentElement.classList.remove(settings["theme"]);
  settings["theme"] = variant;
  
  if (variant.includes("custom")){
    getCustomThemeCss(variant.slice(13, 14));
  
  } else{
    const el = document.getElementById("injected-custom-theme");
    if (el){ el.remove() };
  }

  try {
    document.documentElement.classList = variant;
  } catch (er) {
    console.log(er);
  }
};


export function setSetting(key, value){
  settings[key] = value;
}


export function navToSettingsRoot(){
  gWebview.src = "./settings_page/settings.html";
  gWebview.id = "view_settings";

  const tab = document.querySelector(".settings");   /*Only the tab has the settings class, not the view*/
  tab.id = "tab_settings";
}

export function injectCssIntoRenderer(css){
  let el = document.getElementById("injected-custom-theme");
  
  if (!el){
    el = document.createElement("style");
    el.id = "injected-custom-theme";
    document.head.appendChild(el);
  }

  el.textContent = css;

  gWebview.send("res-custom-theme-css", css);
}


export function sendToSettings(ipc_channel, data){
  gWebview.send(ipc_channel, data);
}