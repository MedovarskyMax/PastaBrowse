import {sendToSettings, gWebview} from "./settings.js";
import {newTab} from "./tabs.js";
import {loadURL} from "./navigation.js";

export let bookmarks = {}


export function toggleBookmark(){
  const input = document.getElementById("url");
  const url = input.value;

  const tab = document.querySelector(".main_tab");
  const title = tab.querySelector("p").textContent;

  if (tab.classList.contains("settings")){
    return;
  }

  if (Object.values(bookmarks).includes(url)){
    const existingKey = Object.keys(bookmarks).find(key => bookmarks[key] === url);
    delete bookmarks[existingKey];
  } else {
    bookmarks[title] = url
  }

  updateBookmarkIcon(url);

  if (gWebview){
    sendToSettings("res-bookmarks", bookmarks);
  }
}

/**
  "default"  |  "add"  |  "saved"  |  "remove"  - valid bookmark icon types
*/
export function changeBookmarkIcon(new_icon_name){
  if (!["default", "add", "saved", "remove"].includes(new_icon_name)){
    console.error(`Invalid new_icon_name : ${new_icon_name}`);
    return;
  }

  const bookmark_img = document.getElementById("bookmarkImg");
  bookmark_img.src = `../Icons/bookmark_${new_icon_name}.svg`;
}


export function bookmarkBtnHover(e){
  const input = document.getElementById("url");
  const url = input.value;

  switch (e.type){
    case "mouseenter":
      if (Object.values(bookmarks).includes(url)){
        changeBookmarkIcon("remove");
      } else {
        changeBookmarkIcon("add");
      }
      break;

    case "mouseleave":
      updateBookmarkIcon(url);
      break;
  }
}


export function updateBookmarkIcon(url){
  if (Object.values(bookmarks).includes(url)){
    changeBookmarkIcon("saved");
  } else {
    changeBookmarkIcon("default");
  }
}


export function setBookmark(key, value){
  bookmarks[key] = value;
}


export function removeBookmark(url){
  if (Object.values(bookmarks).includes(url)){
    const existingKey = Object.keys(bookmarks).find(key => bookmarks[key] === url);
    delete bookmarks[existingKey];
  }
}


export function openBookmark(url){
  newTab();
  
  const input = document.getElementById("url");
  input.value = url;

  loadURL();
}