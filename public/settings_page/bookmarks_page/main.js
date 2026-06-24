import {setSettingsTabId, onResCustomThemeCss, onResSettings, getBookmarks, onResBookmarks} from "../ipc.js";
import {setBookmark} from "./bookmarks.js";

setSettingsTabId("bookmarks");

onResCustomThemeCss((css) => {
  injectCss(css);
})

onResSettings((settings) => {
  document.documentElement.classList = settings["theme"];

  if (settings["theme"].includes("custom")){
    getCustomThemeCss();
  }
})

getBookmarks();

onResBookmarks((bookmarks) => {
  Object.keys(bookmarks).forEach((key) => {setBookmark(key, bookmarks[key])})
})


function injectCss(css){
  let el = document.getElementById("injected-custom-theme");
    
  if (!el){
    el = document.createElement("style");
    el.id = "injected-custom-theme";
    document.head.appendChild(el);
  }
  
  el.textContent = css;
}