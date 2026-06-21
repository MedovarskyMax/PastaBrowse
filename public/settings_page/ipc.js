export function setTheme(variant){
  window.settingsApi.setTheme(variant);
}


export function onResSettings(callback){
  window.settingsApi.onResSettings(callback);
}


export function setLinearGradient(){
  window.settingsApi.setLinearGradient();
}


export function toggleRGB(data){
  window.settingsApi.toggleRGB(data);
}


export function toggleAutoDarkMode(state){
  window.settingsApi.toggleAutoDarkMode(state);
}


export function sendCustomTheme(theme_obj){
  window.settingsApi.sendCustomTheme(theme_obj);
}


export function getCustomTheme(id){
  window.settingsApi.getCustomTheme(id);
}


export function onResCustomTheme(callback){
  window.settingsApi.onResCustomTheme(callback);
}


export function setSettingsTabId(page){
  window.settingsApi.setSettingsTabId(page);
}


export function onResCustomThemeCss(callback){
  window.settingsApi.onResCustomThemeCss(callback);
}


export function getCustomThemeCss(){
  window.settingsApi.getCustomThemeCss();
}