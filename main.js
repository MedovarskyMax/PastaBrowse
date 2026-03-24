const {app, BrowserWindow} = require("electron");

const winSize = {width: 1600, height: 900}

function createWindow(){
	const win = new BrowserWindow({
		width: winSize.width,
		height: winSize.height,
		title: "PastaBrowse",
		webPreferences: {
			webviewTag: true
		},
		icon: "./pasta_icon.png",
		frame: false,
		center: true,
		movable: true
	});

	win.loadFile("public/index.html");
	win.maximize();
	win.webContents.setZoomFactor(1.0);
}

app.whenReady().then(createWindow)
