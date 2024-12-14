const { contextBridge, ipcRenderer } = require('electron');
const path = require('node:path'); // not available, here

contextBridge.exposeInMainWorld('api', {
        getCurrentDirectory: () => process.cwd()
});

