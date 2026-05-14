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