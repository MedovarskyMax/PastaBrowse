export function setTheme(variant){
  window.settingsApi.setTheme(variant);
}


export function onResTheme(callback){
  window.settingsApi.onResTheme(callback);
}