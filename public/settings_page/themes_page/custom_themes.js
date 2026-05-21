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
  </div>`;

  themeSettings.insertAdjacentHTML("afterend", html);

  const closeCustomThemeConfigBtn = document.getElementById("closeCustomThemeConfigBtn");
  closeCustomThemeConfigBtn.addEventListener("click", closeCustomThemeConfig)
}


function closeCustomThemeConfig(){
  const ct_config = document.querySelector(".custom_theme_config");
  ct_config.remove();
}