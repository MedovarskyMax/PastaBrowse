import {tab_list, reloadView, loadURLfromTabList, refresh, history_backward} from "./navigation.js";
import {root_exit, getHistory} from "./ipc.js";

let id_count = 1

export function newTab(){
  const newTabHTML = `
    <div class="tab main_tab" id="${id_count}">
      <img id="tab_icon" class="tab_icon" src="" alt="">
      <p class="tab_title">New Tab</p>
      <button class="tabXBtn" id="tabXBtn"><img src="../Icons/close.svg" alt="x"></button>
    </div>`;

  const tab_container = document.getElementById("tab_container");
  const newTabBtn = document.getElementById("newTabBtn");
  const input = document.getElementById("url");

  tab_container.querySelector(".main_tab").classList.remove("main_tab");
  newTabBtn.insertAdjacentHTML("beforebegin", newTabHTML);

  tab_list[String(id_count)] = {
    current_tab_id: 0,
    tab_history: [""]
  };

  id_count += 1;

  input.value = "";

  reloadView();
}


export function removeTab(tab){
  const tab_container = document.getElementById("tab_container");
  const previousEl = tab.previousElementSibling;
  let nextEl = tab.nextElementSibling;
  
  if (!nextEl.classList.contains("tab")){
    nextEl = null;
  }

  if (tab.classList.contains("main_tab")){
    if (previousEl !== null){
      previousEl.classList.add("main_tab")
      tab.remove();
    } else if (nextEl !== null){
      nextEl.classList.add("main_tab");
      tab.remove();
    } else {
      root_exit();
    }
  
  } else {
    if (previousEl !== null || nextEl !== null){
      tab.remove();
    } else {
      root_exit();
    }
  }

  refresh();
}


export function switchTab(tab){
  const tab_container = document.getElementById("tab_container");
  tab_container.querySelector(".main_tab").classList.remove("main_tab");
  tab.classList.add("main_tab");
  
  if (tab_list[tab.id] !== ""){
    loadURLfromTabList(tab);
  } else {
    reloadView();
  }
}


export async function setTitleAndFavIcon(){
  const webview = document.getElementById("view");
  const tab_container = document.getElementById("tab_container");
  const main_tab = tab_container.querySelector(".main_tab");
  const p = main_tab.querySelector("p");
  const img = main_tab.querySelector(".tab_icon");
  
  const title = await webview.executeJavaScript("document.title");

  if (title){
    p.innerHTML = title;
  }
}


export function loadLastSesh(data){
  const keys = Object.keys(data);
  
  for (let i = 0; i < keys.length; i++){
    const key = keys[i];
    tab_list[key] = data[key];

    if (i === 0) {
      const tabEl = document.getElementById("0");
      tabEl.id = key;
    } else {
      const tab_container = document.getElementById("tab_container");
      const newTabBtn = document.getElementById("newTabBtn");
      const newTabHTML = `
        <div class="tab" id="${key}">
          <img id="tab_icon" class="tab_icon" src="" alt="">
          <p class="tab_title">New Tab</p>
          <button class="tabXBtn" id="tabXBtn"><img src="../Icons/close.svg" alt="x"></button>
        </div>`;
      newTabBtn.insertAdjacentHTML("beforebegin", newTabHTML);
    }
  }
  
  const lastKey = keys[keys.length - 1];
  const lastTab = document.getElementById(lastKey);
  tab_container.querySelector(".main_tab").classList.remove("main_tab");
  lastTab.classList.add("main_tab");
  loadURLfromTabList(lastTab);
}
