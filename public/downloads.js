import { onStartedDownload, onAddDownloadObj } from "./ipc.js";

let downloads = {};

export function setDownloads(key, value){
  downloads[key] = value;
}


export function getDownloads(){
  return downloads;
}

const header = document.getElementById("header");
header.addEventListener("animationend", () => { header.classList.remove("blink") })
onStartedDownload(() => { header.classList.add("blink")})


onAddDownloadObj((downloadObj) => {
  downloads["history"].push(downloadObj)
  console.log(downloads)
})