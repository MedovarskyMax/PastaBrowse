const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("settingsApi", {
  setTheme: (variant) => ipcRenderer.sendToHost("theme-change", variant),
  onResSettings: (callback) => ipcRenderer.on("res-settings", (_event, data) => callback(data)),
  setLinearGradient: () => ipcRenderer.sendToHost("set-linear-gradient"),
  toggleRGB: (data) => ipcRenderer.sendToHost("toggle-rgb", data),
  toggleAutoDarkMode: (state) => ipcRenderer.sendToHost("toggle-auto-dark-mode", state)
})
