const { randomUUID } = require("crypto");
const path = require("path");

function handleDownload(event, item, webContents, downloadsDirPath, win, app) {
  const savePath = path.join(downloadsDirPath, item.getFilename())
  
  item.setSavePath(savePath);
  win.webContents.send("started-download");

  const downloadObj = createDownloadObj(item);
  win.webContents.send("add-download-obj", downloadObj);

  item.on("updated", (event, state) => {
    if (state === "interrupted") {
      console.log("Download is interrupted but can be resumed")
    } else if (state === "progressing") {
      if (item.isPaused()) {
        console.log("Download is paused")
      } else {
        console.log(`Recieved bytes: ${item.getReceivedBytes()}`)
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
      } catch (err){ console.error("Failed to get file icon: ", err)}
      
    } else {
      console.log(`Download failed: ${state}`)
    }
  })
}


function createDownloadObj(item){
  const tempDate = new Date();

  return {
    "id": randomUUID(),
    "fileName": item.getFilename(),
    "savePath": item.getSavePath(),
    "date": tempDate.toLocaleDateString("en-US", {dateStyle: "long"}),
    "icon": "downloadInProgress"
  }
}


module.exports = {handleDownload}
