const { app, dialog, BrowserWindow } = require("electron");
const { autoUpdater, AppUpdater } = require("electron-updater");
const log = require("electron-log");

const path = require("path");

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

log.transports.file.resolvePath = () =>
  path.join("/Users/mlsilva/Desktop/logs/main.log");
log.info("Hello, teste");
let w;

const createWindow = () => {
  w = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "src", "electron", "preload.js"),
    },
  });

  //w.loadURL('http://www.google.com');
  w.loadFile(path.join(__dirname, "main.html"));
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  autoUpdater.checkForUpdates();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
  }
  app.quit();
});

const showMessage = (message) => {
  console.log(message);
  dialog
    .showMessageBox({
      type: "info",
      title: "Atualização disponível",
      message: `${message}`,
      buttons: ["Sim", "Não"],
    })
    .then((result) => {});
};

autoUpdater.on("update-available", (info) => {
  log.info("Update avaliable");
  autoUpdater.downloadUpdate();
});

autoUpdater.on("update-not-available", (info) => {
  log.info(`No update available. Current version ${app.getVersion()}`);
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
  log.info(`Update downloaded. Current version ${app.getVersion()}`);
  autoUpdater.quitAndInstall();
});

autoUpdater.on("error", (info) => {
  log.error(info);
});

// Auto update's
/*
autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'm4rc310RCP',
    repo: 'posfront',
    token: "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",
    private: true
});

// Verificar por atualizações ao iniciar o aplicativo
app.on('ready', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });

  // Eventos de atualização
autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Atualização disponível',
      message: 'Uma nova versão está disponível. Deseja baixar e instalar agora?',
      buttons: ['Sim', 'Não'],
    }).then((result) => {
      if (result.response === 0) {
        autoUpdater.downloadUpdate();
      }
    });
  });

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Atualização baixada',
      message: 'A atualização foi baixada e será instalada no próximo reinício do aplicativo.',
    });
  });
  
  autoUpdater.on('error', (err) => {
    dialog.showErrorBox('Erro de atualização', err == null ? 'Erro desconhecido' : (err.stack || err).toString());
  });  
  */
