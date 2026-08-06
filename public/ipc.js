import {tab_list} from "./navigation.js";
import {settings} from "./settings.js";
import {bookmarks} from "./bookmarks.js";
import {getDownloads} from "./downloads.js";

export function root_exit(){
  const tab_container = document.getElementById("tab_container");
  const main_tab_id = tab_container.querySelector(".main_tab").id.slice(4);

  tab_list["main_tab_id"] = Number(main_tab_id);

  const data = {
    "tab_list": tab_list,
    "settings": settings,
    "bookmarks": bookmarks,
    "downloads": getDownloads()
  }

  window.api.killApp(data);
};


let maximized = true;

export function toggleMaximize(){
  window.api.toggleMaximize();

  maximized = !maximized;

  const maximize_btn = document.getElementById("maximize_btn");

  if (!maximized){
    maximize_btn.querySelector("img").src = "../Icons/unmaximized.svg"
  } else{
    maximize_btn.querySelector("img").src = "../Icons/maximized.svg"
  }
};


export function minimize(){
  window.api.minimize();
};


export function onCtrlT(callback){
  window.api.onCtrlT(callback);
}


export function onCtrlW(callback){
  window.api.onCtrlW(callback);
}


export function onCtrlR(callback){
  window.api.onCtrlR(callback);
}


export function getHistory(){
  window.api.getHistory();
}


export function onResHistory(callback){
  window.api.onResHistory(callback);
}


export function onF5(callback){
  window.api.onF5(callback);
}


export function onCtrlEqual(callback){
  window.api.onCtrlEqual(callback);
}


export function onCtrlMinus(callback){
  window.api.onCtrlMinus(callback);
}


export function onCtrlZero(callback){
  window.api.onCtrlZero(callback);
}


export function onSettingsPreloadPath(data){
  window.api.onSettingsPreloadPath(data);
}


export function onSettings(data){
  window.api.onSettings(data);
}


export function onCtrlTab(callback){
  window.api.onCtrlTab(callback);
}


export function onCtrlShiftTab(callback){
  window.api.onCtrlShiftTab(callback);
}


export function onCtrlShiftT(callback){
  window.api.onCtrlShiftT(callback);
}


export function saveCustomTheme(cTheme){
  window.api.saveCustomTheme(cTheme);
}


export function getCustomTheme(id){
  window.api.getCustomTheme(id);
}


export function onResCustomTheme(callback){
  window.api.onResCustomTheme(callback);
}


export function getCustomThemeCss(id){
  window.api.getCustomThemeCss(id);
}


export function onResCustomThemeCss(callback){
  window.api.onResCustomThemeCss(callback);
}


export function onBookmarks(callback){
  window.api.onBookmarks(callback);
}


export function changeDownloadsDirectoryPath(){
  window.api.changeDownloadsDirectoryPath();
}


export function onResDownloadsDirectoryPath(callback){
  window.api.onResDownloadsDirectoryPath(callback);
}


export function onDownloads(callback){
  window.api.onDownloads(callback);
}