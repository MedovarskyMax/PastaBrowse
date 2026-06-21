import {sendCustomTheme, getCustomTheme, onResCustomTheme, setTheme} from "../ipc.js";
import { linearGradientCheck } from "./main.js";


export function openCustomThemeConfig(e){
  const ctOpenButton = document.querySelector(".active_custom_theme");

  if (ctOpenButton){
    ctOpenButton.classList.remove("active_custom_theme")
  };

  e.target.classList.add("active_custom_theme")

  const cThemeId = e.target.id.slice(17);

  const themeSettings = document.getElementById("themeSettings");
  const customThemeConfig = document.querySelector(".custom_theme_config");

  if (customThemeConfig){
    customThemeConfig.remove();
  };

  const html = `
  <div id="customThemeConfig_${cThemeId}" class="custom_theme_config">
    <div>
      <div class="topbar">
        <h2 class="h2_underline">Custom Theme ${cThemeId}</h2>
        <button id="closeCustomThemeConfigBtn" class="closeCustomThemeConfigBtn"><img src="../../../Icons/close.svg"></button>
      </div>
      <div class="flex">
        <div class="ct_column">
          <div class="ct_flex">
            <h3>--col-0 :</h3>
            <input class="colInput" type="color" id="--col-0">
          </div>
          <div class="ct_flex">
            <h3>--col-50 :</h3>
            <input class="colInput" type="color" id="--col-50">
          </div>
          <div class="ct_flex">
            <h3>--col-100 :</h3>
            <input class="colInput" type="color" id="--col-100">
          </div>
          <div class="ct_flex">
            <h3>--col-150 :</h3>
            <input class="colInput" type="color" id="--col-150">
          </div>
          <div class="ct_flex">
            <h3>--col-200 :</h3>
            <input class="colInput" type="color" id="--col-200">
          </div>
          <div class="ct_flex">
            <h3>--col-250 :</h3>
            <input class="colInput" type="color" id="--col-250">
          </div>
          <div class="ct_flex">
            <h3>--col-300 :</h3>
            <input class="colInput" type="color" id="--col-300">
          </div>
          <div class="ct_flex">
            <h3>--col-350 :</h3>
            <input class="colInput" type="color" id="--col-350">
          </div>
        </div>
        <div class="ct_column">
          <div class="ct_flex">
            <h3>--text :</h3>
            <input class="colInput" type="color" id="--text">
          </div>
          <div class="ct_flex">
            <h3>--exit :</h3>
            <input class="colInput" type="color" id="--exit">
          </div>
          <div class="ct_flex">
            <h3>--border :</h3>
            <input class="colInput" type="color" id="--border">
          </div>
        </div>
      </div>
    </div>  
    <div class="ct_controls">
      <div class="wrapper">
        <button class="ctBtn" id="cancelBtn">Cancel</button>
        <button class="mainBtn ctBtn" id="confirmBtn">Confirm</button>
      </div>
      <button class="ctBtn resetBtn" id="resetBtn">Reset</button>
    </div>
  </div>`;

  themeSettings.insertAdjacentHTML("afterend", html);

  onResCustomTheme((theme) => {
    for (let i = 0; i < 400; i += 50){
      document.getElementById(`--col-${i}`).value = theme[`--bg-${i}`];
    }

    document.getElementById("--text").value = theme["--text"];
    document.getElementById("--exit").value = theme["--exit"];
    document.getElementById("--border").value = theme["--border"];
  })

  getCustomTheme(cThemeId);

  const closeCustomThemeConfigBtn = document.getElementById("closeCustomThemeConfigBtn");
  closeCustomThemeConfigBtn.addEventListener("click", closeCustomThemeConfig)

  const cancelBtn = document.getElementById("cancelBtn");
  cancelBtn.addEventListener("click", closeCustomThemeConfig);

  const confirmBtn = document.getElementById("confirmBtn");
  confirmBtn.addEventListener("click", () => {
    saveCustomTheme(cThemeId);
    setTheme(linearGradientCheck.checked ? `theme-custom-${cThemeId}-linear-gradient` : `theme-custom-${cThemeId}`);
  })

  const resetBtn = document.getElementById("resetBtn");
  resetBtn.addEventListener("click", () => {resetCustomTheme(cThemeId)});
}


function resetCustomTheme(cThemeId){
  document.getElementById("--col-0").value = "#7b7b7b";
  document.getElementById("--col-50").value = "#565656";
  document.getElementById("--col-100").value = "#5a5959";
  document.getElementById("--col-150").value = "#535353";
  document.getElementById("--col-200").value = "#515151";
  document.getElementById("--col-250").value = "#494949";
  document.getElementById("--col-300").value = "#3f3f3f";
  document.getElementById("--col-350").value = "#2f2f2f";

  document.getElementById("--text").value = "#ccc";
  document.getElementById("--exit").value = "#f00";
  document.getElementById("--border").value = "#2e2e2e";

  saveCustomTheme(cThemeId);
  setTheme(linearGradientCheck.checked ? `theme-custom-${cThemeId}-linear-gradient` : `theme-custom-${cThemeId}`);
}


function saveCustomTheme(cThemeId){
  let custom_theme = {
    "id": cThemeId
  };

  for (let i = 0; i < 400; i += 50){
    const input = document.getElementById(`--col-${i}`);
    custom_theme[`--col-${i}`] = input.value; 
  };

  custom_theme["--text"] = document.getElementById("--text").value;
  custom_theme["--exit"] = document.getElementById("--exit").value;
  custom_theme["--border"] = document.getElementById("--border").value;

  sendCustomTheme(custom_theme);
}

function closeCustomThemeConfig(){
  const ct_config = document.querySelector(".custom_theme_config");
  document.querySelector(".active_custom_theme").classList.remove("active_custom_theme");
  ct_config.remove();
}

export function injectCss(css){
  let el = document.getElementById("injected-custom-theme");
    
  if (!el){
    el = document.createElement("style");
    el.id = "injected-custom-theme";
    document.head.appendChild(el);
  }
  
  el.textContent = css;
}