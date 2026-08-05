import { getDownloadsDirectoryPath } from "../ipc.js";

export function changeDownloadsDir(){
  getDownloadsDirectoryPath(true)
}


export function displayDownloadsPath(path){
  const h2 = document.getElementById("download_dir_h2");
  h2.innerHTML = path;
}