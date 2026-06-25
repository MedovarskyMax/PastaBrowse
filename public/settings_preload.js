const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("settingsApi", {
  setTheme: (variant) => ipcRenderer.sendToHost("theme-change", variant),
  onResSettings: (callback) => ipcRenderer.on("res-settings", (_event, data) => callback(data)),
  setLinearGradient: () => ipcRenderer.sendToHost("set-linear-gradient"),
  toggleRGB: (data) => ipcRenderer.sendToHost("toggle-rgb", data),
  toggleAutoDarkMode: (state) => ipcRenderer.sendToHost("toggle-auto-dark-mode", state),
  sendCustomTheme: (cTheme) => ipcRenderer.sendToHost("save-custom-theme", cTheme),
  getCustomTheme: (id) => ipcRenderer.sendToHost("get-custom-theme", id),
  onResCustomTheme: (callback) => ipcRenderer.once("res-custom-theme", (_event, theme) => callback(theme)),
  setSettingsTabId: (page) => ipcRenderer.sendToHost("set-settings-tab-id", page),
  onResCustomThemeCss: (callback) => ipcRenderer.on("res-custom-theme-css", (_event, css) => callback(css)),
  getCustomThemeCss: () => ipcRenderer.sendToHost("get-custom-theme-css"),
  getBookmarks: () => ipcRenderer.sendToHost("get-bookmarks"),
  onResBookmarks: (callback) => ipcRenderer.on("res-bookmarks", (_event, bookmarks) => callback(bookmarks)),
  sendRemoveBookmark: (url) => ipcRenderer.sendToHost("remove-bookmark", url),
  openBookmark: (url) => ipcRenderer.sendToHost("open-bookmark", url)
})
