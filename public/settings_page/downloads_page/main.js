import {setSettingsTabId, onResCustomThemeCss, onResSettings, getCustomThemeCss,
        onResDownloadsDirectoryPath, changeDownloadsDirectoryPath, getDownloads, 
        onResDownloads, onAddDownloadObj} from "../ipc.js";
import {displayDownloadsPath, setDownloads, addToDownloadHistory, renderDownloadObj} from "./downloads.js";


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

onAddDownloadObj((downloadObj) => { addToDownloadHistory(downloadObj) });


const downloadDirBtn = document.getElementById("download_dir_btn");
downloadDirBtn.addEventListener("click", changeDownloadsDirectoryPath)

onResDownloads((downloads) => {
  Object.keys(downloads).forEach((key) => {setDownloads(key, downloads[key])});
  downloads["history"].forEach((downloadObj) => renderDownloadObj(downloadObj));
  displayDownloadsPath(downloads["downloadsPath"]);
})

onResDownloadsDirectoryPath((path) => {
  setDownloads("downloadsPath", path);
  displayDownloadsPath(path);
})

getDownloads()

