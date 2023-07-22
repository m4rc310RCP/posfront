const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
    const w = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src','electron','preload.js')
          }
    });

    w.loadURL('http://www.google.com');
} 

app.whenReady().then(()=>{
    createWindow();

    app.on('activate', ()=>{
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow();
        }
    });
});

app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

