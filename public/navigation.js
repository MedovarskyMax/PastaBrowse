import {setTitleAndFavIcon} from "./tabs.js"; 

export let tab_list = {
  "0": "",
}

export function loadURL(){
  const input = document.getElementById("url");
  let trimmed_input = input.value.trim();

  const tab_container = document.getElementById("tab_container");
  const view = document.getElementById("view");

  const search_engines = [
    "https://www.google.com/search?q=",
    "https://www.duckduckgo.com/?q=",
    "https://www.bing.com/?q="
  ];

  if (isURL(trimmed_input)){
    const url = ensureProtocol(trimmed_input);

    view.src = url;
    input.value = url;
    const id = tab_container.querySelector(".main_tab").id
    tab_list[id] = url;
  } else {
    const search_engine_select = document.getElementById("search_engine_select");
    const s_e = Number(search_engine_select.value);

    const url = search_engines[s_e] + encodeURIComponent(trimmed_input);

    view.src = url;
    input.value = url;
    const id = tab_container.querySelector(".main_tab").id
    tab_list[id] = url;
  }
}


function isURL(input){
  if (/^https?:\/\//i.test(input)){return true};    /* starts with http | https | HTTP | HTTPS*/
  if (/^([\w-]+\.)+[\w-]{2,}(:\d+)?(\/\S*)?$/.test(input)){return true};    /*common TLDs without protocol*/
  if (/^localhost(:\d+)?(\/\S*)?$/.test(input)){return true};    /*localhost*/
  if (/^\d{1,3}(\.\d{1,3}){3}(:\d+)?(\/\S*)?$/.test(input)){return true};    /*IP adress*/

  return false
}


function ensureProtocol(url){
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}


export function loadURLfromTabList(tab){
  const input = document.getElementById("url");
  const view = document.getElementById("view");
  const id = tab.id;
  const url = tab_list[id];

  view.src = url;
  
  if (url !== "about:blank"){
    input.value = url;
  } else {
    input.value = "";
  }
}


export function reloadView(){
  document.querySelector("webview").remove();

  const newView = document.createElement("webview");
  newView.src = "about:blank";
  newView.id = "view";
  newView.classList.add("view");

  newView.addEventListener("did-navigate", saveNav);
  newView.addEventListener("did-navigate-in-page", saveNav);

  document.body.appendChild(newView);
}


export function saveNav(e){
  const tab_container = document.getElementById("tab_container");
  const id = tab_container.querySelector(".main_tab").id;
  const input = document.getElementById("url");
  const view = document.getElementById("view");

  tab_list[id] = e.url;
  
  if (e.url !== "about:blank"){
    input.value = e.url;
  } else{
    input.value = "";
  }

  setTitleAndFavIcon();
}


export function refresh(){
  const newTab = tab_container.querySelector(".main_tab");
  
  if (tab_list[newTab.id] !== ""){
    loadURLfromTabList(newTab);
  } else {
    reloadView();
  }
}
