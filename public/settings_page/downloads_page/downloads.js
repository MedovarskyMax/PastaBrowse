import {sendDownloadRemoveId} from "../ipc.js"


let downloads = {};


export function setDownloads(key, value){
  downloads[key] = value;
}

export function addToDownloadHistory(downloadObj){
  downloads["history"].push(downloadObj);
  renderDownloadObj(downloadObj);
}


export function displayDownloadsPath(path){
  const h2 = document.getElementById("download_dir_h2");
  h2.innerHTML = path;
}

export function renderDownloadObj(downloadObj){
  const icon = downloadObj["icon"] == "downloadInProgress" ? "../../../Icons/shuffle-square-circles.svg" : downloadObj["icon"];

  const container = document.createElement("div")
  container.classList.add("do_container");
  container.id = downloadObj["id"];

  const html = `
    <div class="header">
      <img class="do_icon" src="${icon}" alt="Icon">
      <div class="col">
        <h1 class="fileName">${downloadObj["fileName"]}</h1>
        <h2 class="fileDir">${downloadObj["savePath"]}</h2>
      </div>
      <div class="flex">
        <button class="do_button"><img src="../../../Icons/link.svg" alt="copy to clipboard"></button>
        <button class="do_button"><img src="../../../Icons/folder.svg" alt="show in folder"></button>
        <button class="do_button remove"><img src="../../../Icons/close.svg" alt="remove from download history"></button>
      </div>
    </div>
    <h2 class="date">${downloadObj["date"]}</h2>
  `

  container.innerHTML = html;
  container.querySelector(".remove").addEventListener("click", removeDownloadFromHistory)
  document.querySelector("header").insertAdjacentElement("afterend", container)
}

function removeDownloadFromHistory(e){
  const container = e.currentTarget.closest(".do_container");
  const id = container.id;

  downloads["history"].forEach((obj, index, arr) => {
    if (obj["id"] === id){
      arr.splice(index, 1)
    }
  })

  sendDownloadRemoveId(id);

  container.remove();
}