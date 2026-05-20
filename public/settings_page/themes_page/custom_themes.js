export function openCustomThemeConfig(e){
  const cThemeId = e.target.id.slice(17);

  const themeSettings = document.getElementById("themeSettings");
  const customThemeConfig = document.querySelector(".custom_theme_config");

  if (customThemeConfig){
    customThemeConfig.remove();
  };

  const html = `<div id="customThemeConfig_${cThemeId}" class="custom_theme_config"><p>${cThemeId}</p></div>`;

  themeSettings.insertAdjacentHTML("afterend", html);
}