import {setSettingsTabId, onResCustomThemeCss, onResSettings, getBookmarks, onResBookmarks, getCustomThemeCss} from "../ipc.js";
import {setBookmark, addBookmarkUI, clearBookmarks} from "./bookmarks.js";


function injectCss(css){
  let el = document.getElementById("injected-custom-theme");
    
  if (!el){
    el = document.createElement("style");
    el.id = "injected-custom-theme";
    document.head.appendChild(el);
  }
  
  el.textContent = css;
}


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

onResBookmarks((resBookmarks) => {
  clearBookmarks();

  Object.keys(resBookmarks).forEach((key) => {
    setBookmark(key, resBookmarks[key]);
    addBookmarkUI(key, resBookmarks[key]);
  })
})
