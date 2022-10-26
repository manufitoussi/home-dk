import fetch from 'electron-fetch';
const { hash, resolve } = require('rsvp');
import Store from 'electron-store';
import { ipcMain } from 'electron';

const parseResponse = (txt:string) => {
  const keyValueTexts = txt.split(',');
  if (keyValueTexts.length === 0) return null;

  const obj :any = {};
  keyValueTexts.forEach(keyValueTxt => {
    const keyValueArr = keyValueTxt.split('=');
    obj[keyValueArr[0]] = keyValueArr[1];
  });

  return obj;
};

const parseBasicInfo = (txt:string) => {
  // console.log('txt:', txt);
  var obj = parseResponse(txt);
  if (!obj) return null;
  if (!obj.name) return null;
  if (!obj.mac) return null;
  obj.name = decodeURI(obj.name);
  obj.mac = decodeURI(obj.mac);
  // console.log(obj);
  return obj;
};

const _parseDefault = (txt:string) => {
  var obj = parseResponse(txt);
  if (!obj) return null;
  return obj;
};

const parseSensorInfo = (txt:string) => {
  return _parseDefault(txt);
};

const parseControlInfo = (txt:string) => {
  var obj = parseResponse(txt);
  if (!obj) return null;
  return obj;
};

const store = new Store({
  defaults: {
    devices: {
      "salon": "192.168.1.97",
      "elina": "192.168.1.167",
      "parents": "192.168.1.76",
      "jeanne": "192.168.1.115"
    }
  }
});

// IPC listener
ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});

const DEVICES:any = {
  salon: store.get('devices.salon'),
  elina: store.get('devices.elina'),
  parents: store.get('devices.parents'),
  jeanne: store.get('devices.jeanne')
};

const getBasicInfo = async (name:string) => {
  const result = await fetch(`http://${DEVICES[name]}/common/basic_info`)
  const text = await result.text();
  return parseBasicInfo(text);
}

const getSensorInfo = (name:string) => {
  return fetch(`http://${DEVICES[name]}/aircon/get_sensor_info`)
    .then(result => result.text())
    .then(parseSensorInfo);
}

const getControlInfo = (name:string) => {
  return fetch(`http://${DEVICES[name]}/aircon/get_control_info`)
    .then(result => result.text())
    .then(parseControlInfo);
}

const setControlInfo = (name:string, request:string) => {
  console.log('setControlInfo:', name, request);
  return fetch(`http://${DEVICES[name]}/aircon/set_control_info?${request}`)
    .then(result => result.text())
    .then(parseControlInfo);
}

const Daikin = {
  getBasicInfo(...names: any[]) {
    if (names.length === 0) {
      names = Object.keys(DEVICES);
    }

    var requests : any = {};
    names.forEach(name => requests[name] = getBasicInfo(name));

    return hash(requests);
  },

  getSensorInfo(...names: any[]) {
    if (names.length === 0) {
      names = Object.keys(DEVICES);
    }

    var requests : any = {};
    names.forEach(name => requests[name] = getSensorInfo(name));

    return hash(requests);
  },

  getControlInfo(...names: any[]) {
    if (names.length === 0) {
      names = Object.keys(DEVICES);
    }

    var requests :any = {};
    names.forEach(name => requests[name] = getControlInfo(name));

    return hash(requests);
  },

  setControlInfo(name:string, controls:any) {
    var instructions = Object.keys(controls).map(key => `${key}=${controls[key]}`);
    if (instructions.length === 0) return resolve({});
    const request = instructions.join('&');
    return setControlInfo(name, request);
  },

  controlInfoToSet(info:any) {
    var controls :any = {};
    var minimals = ['pow', 'mode', 'stemp', 'shum', 'f_rate', 'f_dir'];
    minimals.forEach(key => {
      controls[key] = info[key];
    });
    return controls;
  }
};

export default Daikin;

ipcMain.handle('getBasicInfo', async (event, ...args) => {
  return Daikin.getBasicInfo(...args);
});

ipcMain.handle('getSensorInfo', async (event, ...args) => {
  return Daikin.getSensorInfo(...args);
});

ipcMain.handle('getControlInfo', async (event, ...args) => {
  return Daikin.getControlInfo(...args);
});

ipcMain.handle('setControlInfo', async (event, name, controls) => {
  return Daikin.setControlInfo(name, controls);
});

ipcMain.handle('controlInfoToSet', async (event, info) => {
  return Daikin.controlInfoToSet(info);
});