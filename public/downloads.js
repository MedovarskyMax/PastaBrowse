let downloads = {};

export function setDownloads(key, value){
  downloads[key] = value;
}


export function getDownloads(){
  return downloads;
}