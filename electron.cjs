const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const iconPath = path.join(__dirname, "build", "icon.png");

let win;

function createWindow() {
  const isDevelopment = !app.isPackaged;
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.cjs"),
      partition: 'persist:app'
    },
    icon: isDevelopment ? path.join(__dirname, "icon.png") : iconPath
  });

  app.commandLine.appendSwitch("enable-gpu-rasterization");
  app.commandLine.appendSwitch("enable-zero-copy");

  Menu.setApplicationMenu(null);

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "out", "index.html"));
  } else {
    win.loadURL("http://localhost:3000/app");
    // win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});