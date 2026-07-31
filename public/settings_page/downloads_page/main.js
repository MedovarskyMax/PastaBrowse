import {setSettingsTabId, onResCustomThemeCss, onResSettings, getCustomThemeCss, getDownloadsDirectoryPath, onResDownloadsDirectoryPath} from "../ipc.js";
import {displayPath} from "./downloads.js";


function injectCss(css){
  let el = document.getElementById("injected-custom-theme");
    
  if (!el){
    el = document.createElement("style");
    el.id = "injected-custom-theme";
    document.head.appendChild(el);
  }
  
  el.textContent = css;
}


setSettingsTabId("downloads");

onResCustomThemeCss((css) => {
  injectCss(css);
})

onResSettings((settings) => {
  document.documentElement.classList = settings["theme"];

  if (settings["theme"].includes("custom")){
    getCustomThemeCss();
  }
})


onResDownloadsDirectoryPath((path) => {
  displayPath(path);
})

getDownloadsDirectoryPath();

