import { onStartedDownload } from "./ipc.js";

let downloads = {};

const header = document.getElementById("header");
header.addEventListener("animationend", () => { header.classList.remove("blink") })
onStartedDownload(() => { header.classList.add("blink")})


export function setDownloads(key, value){
  downloads[key] = value;
}


export function getDownloads(){
  return downloads;
}