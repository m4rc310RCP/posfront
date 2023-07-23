const {contextBridge, ipcRenderer} = require('electron');

let bridge = {
    updateMessage : (callback) => ipcRenderer.on('updateMessage', callback),
}

contextBridge.exposeInIsolatedWorld('bridge', bridge);