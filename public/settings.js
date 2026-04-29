import {newTab, switchTab} from "./tabs.js";

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
  main_view.addEventListener("dom-ready", () => {main_view.send("res-theme", settings["theme"])});
  main_view.src = "./settings_page/settings.html";
}


function handleIpcMessage(webview, event){
  switch (event.channel){
    case "theme-change":
      const variant = event.args[0];
      setTheme(variant);
      webview.send("res-theme", variant);
      break;
  }
};

export function setTheme(variant){
  settings["theme"] = variant;
  
  try {
    document.documentElement.classList = variant;
  } catch (er){
    console.error(er);
  }
};