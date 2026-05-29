import {sendCustomTheme} from "../ipc.js" 

export function openCustomThemeConfig(e){
  const cThemeId = e.target.id.slice(17);

  const themeSettings = document.getElementById("themeSettings");
  const customThemeConfig = document.querySelector(".custom_theme_config");

  if (customThemeConfig){
    customThemeConfig.remove();
  };

  const html = `
  <div id="customThemeConfig_${cThemeId}" class="custom_theme_config">
    <div class="topbar">
      <h2 class="h2_underline">Custom Theme ${cThemeId}</h2>
      <button id="closeCustomThemeConfigBtn" class="closeCustomThemeConfigBtn"><img src="../../../Icons/close.svg"></button>
    </div>
    <div class="column">
      <div class="ct_flex">
        <h3>--col-0 :</h3>
        <input type="color" id="--col-0">
      </div>
      <div class="ct_flex">
        <h3>--col-50 :</h3>
        <input type="color" id="--col-50">
      </div>
      <div class="ct_flex">
        <h3>--col-100 :</h3>
        <input type="color" id="--col-100">
      </div>
      <div class="ct_flex">
        <h3>--col-150 :</h3>
        <input type="color" id="--col-150">
      </div>
      <div class="ct_flex">
        <h3>--col-200 :</h3>
        <input type="color" id="--col-200">
      </div>
      <div class="ct_flex">
        <h3>--col-250 :</h3>
        <input type="color" id="--col-250">
      </div>
      <div class="ct_flex">
        <h3>--col-300 :</h3>
        <input type="color" id="--col-300">
      </div>
      <div class="ct_flex">
        <h3>--col-350 :</h3>
        <input type="color" id="--col-350">
      </div>
    </div>
    <div class="ct_controls">
      <button id="cancelBtn">Cancel</button>
      <button id="confirmBtn">Confirm</button>
    </div>
  </div>`;

  themeSettings.insertAdjacentHTML("afterend", html);

  const closeCustomThemeConfigBtn = document.getElementById("closeCustomThemeConfigBtn");
  closeCustomThemeConfigBtn.addEventListener("click", closeCustomThemeConfig)

  const cancelBtn = document.getElementById("cancelBtn");
  cancelBtn.addEventListener("click", closeCustomThemeConfig);

  const confirmBtn = document.getElementById("confirmBtn");
  confirmBtn.addEventListener("click", () => {
    saveCustomTheme(cThemeId);
  })
}

function saveCustomTheme(cThemeId){
  let custom_theme = {
    "id": cThemeId
  };

  for (let i = 0; i < 400; i + 50){
    const input = document.getElementById(`--col-${i}`);
    custom_theme[`--col-${i}`] = input.value; 
  };

  sendCustomTheme(custom_theme);
}

function closeCustomThemeConfig(){
  const ct_config = document.querySelector(".custom_theme_config");
  ct_config.remove();
}