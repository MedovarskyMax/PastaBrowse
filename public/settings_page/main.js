import {onResSettings} from "./ipc.js";

onResSettings((settings) => {
  document.documentElement.removeAttribute("class");
  document.documentElement.classList = settings["theme"];
})
