import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
// import coco from './data-layer/coco';

export type Channels = 'ipc-example';
 
contextBridge.exposeInMainWorld('electron', {
  daikin: {
    getBasicInfo(...names : any[]) {
      return ipcRenderer.invoke('getBasicInfo', ...names);
    },
    getSensorInfo(...names : any[]) {
      return ipcRenderer.invoke('getSensorInfo', ...names);
    },
    getControlInfo(...names : any[]) {
      return ipcRenderer.invoke('getControlInfo', ...names);
    },
    setControlInfo(name:string, controls:any) {
      return ipcRenderer.invoke('setControlInfo', name, controls);
    },
    controlInfoToSet(info : any) {
      return ipcRenderer.invoke('controlInfoToSet', info);
    }
  }, 
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
