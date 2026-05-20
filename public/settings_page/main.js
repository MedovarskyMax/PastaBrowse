import {onResSettings} from "./ipc.js";

onResSettings((settings) => {
  document.documentElement.classList = settings["theme"];
})
