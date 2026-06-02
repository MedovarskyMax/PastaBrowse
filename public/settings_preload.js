const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("settingsApi", {
  setTheme: (variant) => ipcRenderer.sendToHost("theme-change", variant),
  onResSettings: (callback) => ipcRenderer.on("res-settings", (_event, data) => callback(data)),
  setLinearGradient: () => ipcRenderer.sendToHost("set-linear-gradient"),
  toggleRGB: (data) => ipcRenderer.sendToHost("toggle-rgb", data),
  toggleAutoDarkMode: (state) => ipcRenderer.sendToHost("toggle-auto-dark-mode", state),
  sendCustomTheme: (cTheme) => ipcRenderer.sendToHost("save-custom-theme", cTheme),
  getCustomTheme: (id) => ipcRenderer.sendToHost("get-custom-theme", id),
  onResCustomTheme: (callback) => ipcRenderer.on("res-custom-theme", (_event, theme) => callback(theme))
})
