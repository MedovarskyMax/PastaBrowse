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
      <h3>Custom Theme ${cThemeId}</h3>
      <button id="closeCustomThemeConfigBtn" class="">X</button>
    </div>
  </div>`;

  themeSettings.insertAdjacentHTML("afterend", html);

  const closeCustomThemeConfigBtn = document.getElementById("closeCustomThemeConfigBtn");
  closeCustomThemeConfigBtn.addEventListener("click", closeCustomThemeConfig)
}


function closeCustomThemeConfig(e){
  e.target.parentElement.parentElement.remove();
}