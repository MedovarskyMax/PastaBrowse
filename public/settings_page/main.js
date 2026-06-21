import {onResSettings, getCustomThemeCss, onResCustomThemeCss} from "./ipc.js";

onResCustomThemeCss((css) => {
  let el = document.getElementById("injected-custom-theme");
    
  if (!el){
    el = document.createElement("style");
    el.id = "injected-custom-theme";
    document.head.appendChild(el);
  }
  
  el.textContent = css;
})

onResSettings((settings) => {
  document.documentElement.removeAttribute("class");
  document.documentElement.classList = settings["theme"];

  if (settings["theme"].includes("custom")){
    getCustomThemeCss();
  }
})
