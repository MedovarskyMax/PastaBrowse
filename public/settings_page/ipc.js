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