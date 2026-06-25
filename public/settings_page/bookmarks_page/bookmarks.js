import {sendRemoveBookmark} from "../ipc.js";

export let bookmarks = {};

export function setBookmark(key, value){
  bookmarks[key] = value;
}


export function addBookmarkUI(key, value){
  const template = document.createElement("div");
  const html = `
    <img class="favicon" alt="" id="img_${value}">
    <div class="b_container">
      <h2 class="title">${key}</h2>
      <p>${value}</p>
    </div>
    <button class="remove_bookmark_button"><img class="remove_bookmark_icon" alt="X" src="../../../Icons/close.svg"></button>`;


  template.classList.add("bookmark");
  template.id = value;
  template.innerHTML = html;

  document.body.appendChild(template);

  const img = document.getElementById(`img_${value}`);
  const favIconSize = 64;

  img.src = `https://www.google.com/s2/favicons?domain=${value}&sz=${String(favIconSize)}`;

  template.querySelector("button").addEventListener("click", (e) => {removeBookmark(e)});
}


function removeBookmark(e){
  const bookmark_div = e.target.parentElement.parentElement;
  const url = bookmark_div.id;

  sendRemoveBookmark(url);
  bookmark_div.remove();
}

export function clearBookmarks(){
  bookmarks = {};

  document.querySelectorAll(".bookmark").forEach(el => el.remove());
}