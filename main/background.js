import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
const { autoUpdater, AppUpdater } = require("electron-updater");

const isProd = process.env.NODE_ENV === 'production'
let mainWindow;

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;


if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }

  autoUpdater.checkForUpdates();
  mainWindow.showMessage(`Checking for updates. Current version ${app.getVersion()}`);

  
})()


//........................knkjkjkgddg.....................



// ... rest of your code



autoUpdater.on("update-available", (info) => {
  mainWindow.showMessage(`Update available. Current version ${app.getVersion()}`);
  let pth = autoUpdater.downloadUpdate();
  mainWindow.showMessage(pth);
});

autoUpdater.on("update-not-available", (info) => {
  mainWindow.showMessage(`No update available. Current version ${app.getVersion()}`);
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
  mainWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`);
});

autoUpdater.on("error", (info) => {
  mainWindow.showMessage(info);
});


app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})
