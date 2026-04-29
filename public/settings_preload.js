const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("settingsApi", {
  setTheme: (variant) => ipcRenderer.sendToHost("theme-change", variant),
  onResTheme: (callback) => ipcRenderer.on("res-theme", (_event, data) => callback(data))
})
