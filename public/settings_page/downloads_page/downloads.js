let downloads = {};


export function setDownloads(key, value){
  downloads[key] = value;
}

export function addToDownloadHistory(downloadObj){
  downloads["history"].push(downloadObj);
}


export function displayDownloadsPath(path){
  const h2 = document.getElementById("download_dir_h2");
  h2.innerHTML = path;
}