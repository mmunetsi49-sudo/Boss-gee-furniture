/**
 * BOSS GEE FURNITURE - PC APP PRELOAD SCRIPT
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('bossGeeDesktop', {
  isDesktopApp: true,
  getVersion: () => ipcRenderer.invoke('app:version'),
  getPlatform: () => ipcRenderer.invoke('app:platform'),
  minimize: () => ipcRenderer.send('window:minimize'),
  maximize: () => ipcRenderer.send('window:maximize'),
  close: () => ipcRenderer.send('window:close'),
});
