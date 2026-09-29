const { randomUUID } = require("crypto");
const path = require("path");
const { ipcMain } = require("electron");

const downloadItems = {};
// TODO: use ipcMain not a pass through function from main.js
function handleDownload(event, item, webContents, downloadsDirPath, win, app) {
  const savePath = path.join(downloadsDirPath, item.getFilename())
  
  item.setSavePath(savePath);
  win.webContents.send("started-download");

  const downloadObj = createDownloadObj(item);
  
  downloadItems[downloadObj["id"]] = item;
  
  win.webContents.send("add-download-obj", downloadObj);

  item.on("updated", (event, state) => {
    if (state === "interrupted") {
      console.log("Download is interrupted but can be resumed")
    } else if (state === "progressing") {
      if (item.isPaused()) {
        console.log("Download is paused")
      } else {
        console.log(`Recieved bytes: ${item.getReceivedBytes()}`)
        win.webContents.send("update-progressbar", downloadObj["id"], item.getPercentComplete());
      }
    }
  })

  item.once("done", async (event, state) => {
    if (state === "completed") {
      console.log("Download Successful")
      try{
        const icon = await app.getFileIcon(savePath, {size: 'normal'});
        const iconUrl = icon.toDataURL();
        win.webContents.send("update-download-obj-icon", {
          "id": downloadObj["id"],
          "icon": iconUrl
        })
      } catch (err){ console.error("Failed to get file icon: ", err)} // doesn't notify renderer of download success at all
    
    } else if (state === "cancelled"){
      console.log("Download cancelled");
      win.webContents.send("download-cancel-successful", downloadObj["id"]);
    } else {
      console.log(`Download failed: ${state}`) 
    }
  })
}


ipcMain.on("toggle-pause-download", (_event, id) => {
  const item = downloadItems[id];

  if (!item.isPaused()){
    item.pause();
  } else {
    item.resume();
  }
})


ipcMain.on("cancel-download", (_event, id) => {
  const item = downloadItems[id];
  item.cancel();
})


function createDownloadObj(item){
  const tempDate = new Date();

  return {
    "id": randomUUID(),
    "fileName": item.getFilename(),
    "savePath": item.getSavePath(),
    "date": tempDate.toLocaleDateString("en-US", {dateStyle: "long"}),
    "icon": "downloadInProgress",
    "downloadUrl": item.getURL()
  }
}


module.exports = {handleDownload}
