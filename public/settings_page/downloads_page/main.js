import {setSettingsTabId, onResCustomThemeCss, onResSettings, getCustomThemeCss,
        onResDownloadsDirectoryPath, changeDownloadsDirectoryPath, getDownloads, 
        onResDownloads} from "../ipc.js";
import {displayDownloadsPath, setDownloads} from "./downloads.js";


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


const downloadDirBtn = document.getElementById("download_dir_btn");
downloadDirBtn.addEventListener("click", changeDownloadsDirectoryPath)

onResDownloads((downloads) => {
  Object.keys(downloads).forEach((key) => {setDownloads(key, downloads[key])});
  displayDownloadsPath(downloads["downloadsPath"]);
})

onResDownloadsDirectoryPath((path) => {
  setDownloads("downloadsPath", path);
  displayDownloadsPath(path);
})

getDownloads()

