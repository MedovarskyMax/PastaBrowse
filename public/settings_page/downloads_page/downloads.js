import {sendDownloadRemoveId, sendFilePathToOpen, sendTogglePause, cancelDownload, onSuccessfulDownloadCancel } from "../ipc.js";


let downloads = {};

onSuccessfulDownloadCancel((id) => {
  removeDownloadFromHistoryWithId(id);
  removeDownloadFromDOM(id);
})


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
  const inProgress = downloadObj["icon"] === "downloadInProgress"
  const icon = inProgress  ? "../../../Icons/shuffle-square-circles.svg" : downloadObj["icon"];

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
        <button class="do_button copy"><img src="../../../Icons/link.svg" alt="copy to clipboard"></button>
        <button class="do_button open"><img src="../../../Icons/folder.svg" alt="show in folder"></button>
        <button class="do_button remove"><img src="../../../Icons/close.svg" alt="remove from download history"></button>
      </div>
    </div>
    <div class="flex footer">
      <h2 class="date">${downloadObj["date"]}</h2>
    </div>
  `

  container.innerHTML = html;
  container.querySelector(".remove").addEventListener("click", removeDownloadFromHistory);
  container.querySelector(".open").addEventListener("click", openFileInDir);
  container.querySelector(".copy").addEventListener("click", copyDownloadUrlToClipboard);

  if (inProgress){
    addActionButtons(container);
    addProgressBar(container);
  }

  document.querySelector("header").insertAdjacentElement("afterend", container);
}


export function setProgress(id, percent){
  const container = document.getElementById(id);
  const fill = container.querySelector(".progress_fill");
  fill.style.width = `${percent}%`;
}


function addProgressBar(container){
  const html = `
  <div class="progress" role="progressbar">
    <div class="progress_fill"></div>
  </div>`;

  container.insertAdjacentHTML("afterbegin", html);
}


function addActionButtons(container){
  const html = `
    <button class="do_button action_button" data-action="togglePause"><img src="../../../Icons/pause_circle.svg" alt="pause"></button>
    <button class="do_button action_button" data-action="cancel"><img src="../../../Icons/cancel.svg" alt="cancel"></button>
  `;

  container.querySelector(".date").insertAdjacentHTML("afterend", html);

  container.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn){ return };
    if (btn.dataset.action === "togglePause"){ togglePause(container, btn) }; // maybe add ID
    if (btn.dataset.action === "cancel"){ cancelDownload(container.id) };
  })
}


function togglePause(container, btn){
  const img = btn.querySelector("img");
  
  if (img.src.includes("pause_circle")){
    img.src = "../../../Icons/play_arrow.svg";
  } else {
    img.src = "../../../Icons/pause_circle.svg";
  }

  sendTogglePause(container.id)
}


function removeActionButtons(container){
  container.querySelectorAll(".action_button").forEach(btn => btn.remove());
}


function removeProgressBar(container){
  container.querySelector(".progress").remove();
}


async function copyDownloadUrlToClipboard(e){
  const container = e.currentTarget.closest(".do_container");
  const id = container.id;

  let link;

  downloads["history"].forEach((obj) => {
    if (obj["id"] === id){
      link = obj["downloadUrl"];
    }
  })

  await navigator.clipboard.writeText(link);

  displayPopup(link);
}


function openFileInDir(e){
  const container = e.currentTarget.closest(".do_container");
  const id = container.id;
  let path;

  downloads["history"].forEach((obj) => {
    if (obj["id"] === id){
      path = obj["savePath"];
    }
  })

  sendFilePathToOpen(path);
}


function removeDownloadFromHistory(e){
  const container = e.currentTarget.closest(".do_container");
  const id = container.id;

  downloads["history"].forEach((obj, index, arr) => {
    if (obj["id"] === id){
      arr.splice(index, 1);
    }
  })

  sendDownloadRemoveId(id);

  container.remove();
}

function removeDownloadFromHistoryWithId(id){
  downloads["history"].forEach((obj, index, arr) => {
    if (obj["id"] === id){
      arr.splice(index, 1);
    }
  })
}


function removeDownloadFromDOM(id){
  const container = document.getElementById(id);
  container.remove();
}


export function updateDownloadObjIcon(data){
  downloads["history"].forEach((obj) => {
    if (obj["id"] === data["id"]){
      obj["icon"] = data["icon"]
    }
  })

  const container = document.getElementById(data["id"]);
  const img = container.querySelector(".do_icon");
  img.src = data["icon"];

  removeActionButtons(container);
  removeProgressBar(container);
}

let timerId;
const popup = document.getElementById("popup");

popup.addEventListener("mouseenter", startHover)
popup.addEventListener("mouseleave", stopHover)

function displayPopup(link = ""){
  
  const popup_text = document.getElementById("popup_link");
  popup_text.textContent = link;


  popup.classList.toggle("hidden")

  timerId = setTimeout(() => {
    popup.classList.toggle("hidden");
  }, 2000)
}

function startHover(){
  clearTimeout(timerId);
}

function stopHover(){
  timerId = setTimeout(() => {
    popup.classList.toggle("hidden");
  }, 1000)
}