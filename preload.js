const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("api", {
  killApp: () => ipcRenderer.send("kill-app")
});