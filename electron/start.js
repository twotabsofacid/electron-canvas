require('dotenv').config();
// Modules to control application life and create native browser window
const { app, BrowserWindow, screen } = require('electron');
const { join, dirname, resolve } = require('path');

const port = process.env.PORT ? process.env.PORT : 6969;

console.log('what is the port', port);

const v8 = require('v8');
v8.setFlagsFromString('--expose_gc');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.commandLine.appendSwitch('js-flags', '--expose_gc');
app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('enable-precise-memory-info');
app.commandLine.appendSwitch('use-fake-ui-for-media-stream');
app.commandLine.appendSwitch('force_high_performance_gpu');
app.commandLine.appendSwitch('enable-speech-input');

let canvasWindow = null;

function createMainWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: false,
    width: 1152,
    height: 720,
    alwaysOnTop: false,
    enableLargerThanScreen: true,
    autoHideMenuBar: false,
    webPreferences: {
      backgroundThrottling: false
    }
  });
  // and load the index.html of the app.
  mainWindow.loadURL(`http://0.0.0.0:${port}`);
  mainWindow.setBackgroundThrottling(false);
  mainWindow.webContents.setBackgroundThrottling(false);
  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  canvasWindow = createMainWindow();
  console.log('we created the windows....');
  const displays = screen.getAllDisplays();
  process.on('SIGINT', function () {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
    // some other closing procedures go here
    process.exit(0);
  });
  // After 5 seconds, do some wild stuff
  setTimeout(() => {
    console.log('we have hit the timeout...', displays);
    canvasWindow.setFullScreen(true);
    // You could do custom sizing here if you want to e.g.
    // print out stuff at a certain resolution
    // canvasWindow.setSize(1080, 1920);
    // canvasWindow.setPosition(0, 0);
  }, 5000);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
