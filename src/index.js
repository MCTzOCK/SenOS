const { app, BrowserWindow, globalShortcut, ipcMain, crashReporter} = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');
let debug = true;
let forceInstall = false;
let forceLogin = true;
if(app.commandLine.hasSwitch('debug')){
  debug = true;
}
if(app.commandLine.hasSwitch('forceInstall')){
  forceInstall = true;
}

if (require('electron-squirrel-startup')) {
  app.quit();
}

console.log(app.getPath("userData"))

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      webSecurity: false,
      webviewTag: true,
      allowRunningInsecureContent: true
    }
  });

  mainWindow.webContents.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246");
  if(!debug){
    if(fs.existsSync('./INSTALLED'))
    {
      const uConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'user.json')));
      if(uConfig.enabled){
        mainWindow.loadFile(path.join(__dirname, 'login/login.html'));
      }else {
        mainWindow.loadFile(path.join(__dirname, 'index.html'));
      }
    }else
    {
      mainWindow.loadFile(path.join(__dirname, 'setup/setup.html'));
    }
  }else {
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    mainWindow.webContents.toggleDevTools();
  }
  if(forceInstall){
    mainWindow.loadFile(path.join(__dirname, 'setup/setup.html'));
  }
  if(forceLogin){
    mainWindow.loadFile(path.join(__dirname, 'login/login.html'));
  }
  if(!debug){
    mainWindow.setClosable(false);
    mainWindow.setMinimizable(false);
    mainWindow.setAlwaysOnTop(true);
  }
  mainWindow.setMenuBarVisibility(false);

  // download event
  var session = mainWindow.webContents.session;
  // session.on('will-download', function(event, item, webContents) {
  //   webContents.loadURL('http://g.co');
  //   event.preventDefault();
  // });
  session.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36')
  // disable xframe
  mainWindow.webContents.session.webRequest.onHeadersReceived({urls: [ "*://*/*" ]}, 
    (d, c) => {
      if(d.responseHeaders['X-Frame-Options'])
      {
        delete d.responseHeaders['X-Frame-Options'];
      }else if(d.responseHeaders['x-frame-options'])
      {
        delete d.responseHeaders['x-frame-options'];
      }
      // set headers
      delete d.responseHeaders['content-security-policy'];
      delete d.responseHeaders['p3p'];
      d.responseHeaders['access-control-allow-origin']  = "[ '*' ]";
      d.responseHeaders['Content-Security-Policy']      = "default-src *; script-src 'self' data: 'unsafe-inline' 'unsafe-eval' *; object-src *; style-src 'self' data: 'unsafe-inline' *; img-src 'self' data: *; media-src *; frame-src *; font-src *; connect-src *; cookie-scope host";
      d.responseHeaders['X-Content-Security-Policy']    = "default-src *; script-src 'self' data: 'unsafe-inline' 'unsafe-eval' *; object-src *; style-src 'self' data: 'unsafe-inline' *; img-src 'self' data: *; media-src *; frame-src *; font-src *; connect-src *; cookie-scope host";
      d.responseHeaders['X-WebKit-CSP']                 = "default-src *; script-src 'self' data: 'unsafe-inline' 'unsafe-eval' *; object-src *; style-src 'self' data: 'unsafe-inline' *; img-src 'self' data: *; media-src *; frame-src *; font-src *; connect-src *; cookie-scope host";
      console.log(d.responseHeaders);
      c({cancel: false, responseHeaders: d.responseHeaders});
    }
  );

  mainWindow.on('close', (e) => {
    if(!debug){
      e.preventDefault();
    }
  })
  
  // const file = fs.createWriteStream(path.join(__dirname, "./apps/store/store.json"));
  //   const request = http.get("http://mctzock.de/store.json", function(response) {
  //   response.pipe(file);
  // });
  const C = globalShortcut.register('CommandOrControl+M', (event) => {mainWindow.webContents.toggleDevTools()});
  mainWindow.on('leave-full-screen', (event) => {
    if(!debug){
      mainWindow.fullscreen = true;
    }
  })

  mainWindow.webContents.on('new-window', function(e, url){
    e.preventDefault();
  })
  mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    item.setSavePath(path.join(__dirname, "/files/Downloads/" + item.getFilename()))
    alert("Die Datei wurde herruntergeladen!")
  })
};

app.commandLine.appendSwitch('disable-site-isolation-trials');

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// register shortcuts
app.whenReady().then(() => {
  // disable Controll + R refresh
  // const dCpRr = globalShortcut.register('CommandOrControl+R', (event) => {});
  const T = globalShortcut.register('Alt+0', (event) => {console.log('Prevented ALT+TAB')});
});

ipcMain.on('appQuit', (event, arg) => {
  console.log(arg);
  app.quit();
})
app.on('quit', () => {
  var isWin = process.platform === "win32";
        if(isWin) {
            // exec('explorer.exe', (err, stdout, stderr) => {
            //     if(err) {
            //         console.log(err);
            //     }
            //     console.log(`stdout:${stdout}`)
            //     console.log(`stderr:${stderr}`)
            // })
        }
        // console.log(isWin) // debug
})

app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

ipcMain.on('relaunch', (evt, arg) => {
  console.log('restarting...');
  app.relaunch();
  app.exit();
})