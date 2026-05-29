import {newTab, switchTab} from "./tabs.js";
import {saveCustomTheme} from "./ipc.js";

export let settings = {};

export function openSettings(preloadPath) {
  const settings_tab = document.getElementById("tab_settings");

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
  switch (event.channel){
    case "theme-change":
      const variant = event.args[0];
      setTheme(variant);
      webview.send("res-settings", settings);
      break;
    
    case "set-linear-gradient":
      toggleLinearGradient();
      webview.send("res-settings", settings);
      break;
    
    case "toggle-rgb":
      toggleRGB(event.args[0]);
      break;
    
    case "toggle-auto-dark-mode":
      const state = event.args[0];
      toggleAutoDarkMode(state);
      break;
    
    case "save-custom-theme":
      const cTheme = event.args[0];
      saveCustomTheme(cTheme);
      break;
  }
};

export let darkModeTimer = null;

function scheduleAutoDarkMode(){
  if (darkModeTimer){
    clearTimeout(darkModeTimer);
    darkModeTimer = null;
  }

  settings["auto-dark-mode"] = true;

  const settings_webview = document.getElementById("view_settings");
    
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
  const settings_webview = document.getElementById("view_settings");

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
  settings["theme"] = variant;
  
  try {
    document.documentElement.classList = variant;
  } catch (er){
    console.error(er);
  }
};


export function setSetting(key, value){
  settings[key] = value;
}