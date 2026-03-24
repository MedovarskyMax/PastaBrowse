const {app, BrowserWindow} = require("electron");

const winSize = {width: 1600, height: 900}

function createWindow() {
    const win = new BrowserWindow({
        width: winSize.width,
        height: winSize.height,
        title: "PastaBrowse",
    });

    const topbar = new BrowserWindow({
        parent: win,
        width: winSize.width,
        height: winSize.height,
    })

    topbar.webContents.loadFile('./public/index.html');
    topbar.setPosition(win.getPosition()[0], win.getPosition()[1]);

    topbar.on('move', () => {
        win.setPosition(topbar.getPosition()[0], topbar.getPosition()[1]);
    });
}

app.on('ready', () => createWindow());
