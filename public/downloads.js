import { onStartedDownload, onAddDownloadObj } from "./ipc.js";

let downloads = {};

export function setDownloads(key, value){
  downloads[key] = value;
}


export function getDownloads(){
  return downloads;
}



export function removeDownloadFromHistory(id){
  downloads["history"].forEach((obj, index, arr) => {
    if (obj["id"] === id){
      arr.splice(index, 1)
    }
  })
}


const header = document.getElementById("header");
header.addEventListener("animationend", () => { header.classList.remove("blink") })
onStartedDownload(() => { header.classList.add("blink")})


onAddDownloadObj((downloadObj) => {
  downloads["history"].push(downloadObj)
  console.log(downloads)
})