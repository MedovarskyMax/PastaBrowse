const path = require("path");

function handleDownload(event, item, webContents, downloadsDirPath, win) {
  item.setSavePath(path.join(downloadsDirPath, item.getFilename()));
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

  item.once("done", (event, state) => {
    if (state === "completed") {
      console.log("Download Successful")
      console.log(downloadObj) // TODO: remove when done developing
    } else {
      console.log(`Download failed: ${state}`)
    }
  })
}


function createDownloadObj(item){
  const tempDate = new Date();

  return {
    "fileName": item.getFilename(),
    "savePath": item.getSavePath(),
    "date": tempDate.toLocaleDateString("en-US", {dateStyle: "long"}),
    "icon": "downloadInProgress"
  }
}


module.exports = {handleDownload}
