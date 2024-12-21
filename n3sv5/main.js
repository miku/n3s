const {
    app,
    BrowserWindow
} = require('electron/main');
// Include the Node.js 'path' module at the top of your file
const path = require('node:path');

// App, which controls your application's event lifecycle.
// BrowserWindow, which creates and manages app windows.

const createWindow = () => {
    const win = new BrowserWindow({
        width: 960,
        height: 680,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            sandbox: false,
        },
    });
    win.loadFile('index.html');
};

// Many of Electron's core modules are Node.js event emitters that adhere to
// Node's asynchronous event-driven architecture. The app module is one of
// these emitters.

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'Darwin') {
        app.quit();
    }
});

// You might have noticed the capitalization difference between the app and
// BrowserWindow modules. Electron follows typical JavaScript conventions here,
// where PascalCase modules are instantiable class constructors (e.g.
// BrowserWindow, Tray, Notification) whereas camelCase modules are not
// instantiable (e.g. app, ipcRenderer, webContents).
