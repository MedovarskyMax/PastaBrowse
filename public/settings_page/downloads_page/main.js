import {setSettingsTabId, onResCustomThemeCss, onResSettings, getCustomThemeCss, onResDownloadsDirectoryPath, getDownloadsDirectoryPath} from "../ipc.js";
import {changeDownloadsDir, displayDownloadsPath} from "./downloads.js";


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

getDownloadsDirectoryPath(false);

const downloadDirBtn = document.getElementById("download_dir_btn");
downloadDirBtn.addEventListener("click", changeDownloadsDir)

onResDownloadsDirectoryPath((path) => {
  displayDownloadsPath(path);
})

