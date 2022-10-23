import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      daikin: {
        getBasicInfo(...names: any[]): any;
        getSensorInfo(...names: any[]): any;
        getControlInfo(...names: any[]): any;
        setControlInfo(name:string, controls:any): any;
        controlInfoToSet(info : any): any;
      },
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
