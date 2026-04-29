import {onResTheme} from "./settings_ipc.js";

onResTheme((theme) => {
  document.documentElement.classList = theme;
})
