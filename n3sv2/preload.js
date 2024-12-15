const { contextBridge, ipcRenderer } = require('electron');
const path = require('path'); // not available, here

contextBridge.exposeInMainWorld('api', {
        getCurrentDirectory: () => process.cwd()
});

