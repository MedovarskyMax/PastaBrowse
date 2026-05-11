import {onResSettings} from "./settings_ipc.js";

onResSettings((settings) => {
  document.documentElement.classList = settings["theme"];
})
