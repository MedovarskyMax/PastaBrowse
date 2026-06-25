import {sendRemoveBookmark, openBookmark} from "../ipc.js";

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
  template.addEventListener("click", (e) => {
    if (!e.target.closest("button")){
      openBookmark(e.currentTarget.id);
    }
  })
}


function removeBookmark(e){
  const bookmark_div = e.target.parentElement.parentElement;
  const url = bookmark_div.id;

  sendRemoveBookmark(url);
  bookmark_div.remove();
  delete bookmarks[url];
}

export function clearBookmarks(){
  bookmarks = {};

  document.querySelectorAll(".bookmark").forEach(el => el.remove());
}


export function writeNoBookmarksText(){
  const spacer = document.getElementById("spacer");
  const text = document.createElement("h2")
  
  text.id = "no_bookmarks_text";
  text.textContent = "No currently saved Bookmarks";

  spacer.appendChild(text);
}


export function removeNoBookmarksText(){
  const text = document.getElementById("no_bookmarks_text");

  if (text){
    text.remove();
  }
}