const DELAY = 15;

class DaikinService {
  _timeout: any = null;

  _isStart = false;

  error: any = null;

  _isLoading = false;

  get isLoading() {
    return this._isLoading;
  }

  set isLoading(value) {
    this._isLoading = value;
    this.onIsLoadingChange(value);
  }

  _daikin = window.electron?.daikin;

  get daikin() {
    return this._daikin;
  }

  data = {
    basicInfos: null,
    sensorInfos:null,
    controlInfos: null,
  };

  onBasicInfos: (infos: any) => void;

  onSensorInfos: (infos: any) => void;

  onControlInfos: (infos: any) => void;

  onAllInfos: (data: any) => void;

  onIsLoadingChange: (isLoading: boolean) => void;

  constructor(
    onBasicInfos: (infos: any) => void = () => {},
    onSensorInfos: (infos: any) => void = () => {},
    onControlInfos: (infos: any) => void = () => {},
    onAllInfos: (data: any) => void = () => {},
    onIsLoadingChange: (isLoading: boolean) => void = () => {}
  ) {
    // console.debug('create a DaikinService');
    this.onBasicInfos = onBasicInfos;
    this.onSensorInfos = onSensorInfos;
    this.onControlInfos = onControlInfos;
    this.onIsLoadingChange = onIsLoadingChange;
		this.onAllInfos = onAllInfos;
  }

  async startSynchro() {
    // console.debug('startSynchro');
    this._clearTimout();
    this._isStart = true;
    return this.synchro();
  }

  stopSynchro() {
    this._isStart = false;
    // console.debug('stopSynchro');
    this._clearTimout();
  }

  _clearTimout() {
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  }

  async synchro() {
    this._clearTimout();
    if (!this._isStart) return;
    await this.update();
    this._timeout = setTimeout(() => this.synchro(), DELAY * 1000);
    return this.data;
  }

  async update() {
    this.isLoading = true;
    try {
      await this.getAll();
    } catch (e) {
      this.error = e;
    } finally {
      this.isLoading = false;
    }

    return this.data;
  }

  async getAll() {
    // console.debug('getAll');
    await this._getBasicInfos();
    await this._getSensorInfos();
    await this._getControlInfos();
		this.onAllInfos(this.data);
  }

  async _getBasicInfos() {
    this.data.basicInfos = await this.daikin.getBasicInfo();
    this.onBasicInfos(this.data.basicInfos);
    return this.data.basicInfos;
  }

  async _getSensorInfos() {
    this.data.sensorInfos = await this.daikin.getSensorInfo();
    this.onSensorInfos(this.data.sensorInfos);
    return this.data.sensorInfos;
  }

  async _getControlInfos() {
    this.data.controlInfos = await this.daikin.getControlInfo();
    this.onControlInfos(this.data.controlInfos);
    // console.log(this.data.controlInfos);
    return this.data.controlInfos;
  }

  async controlInfoToSet(info: any) {
    return await this.daikin.controlInfoToSet(info);
  }

  async setControlInfo(name: string, controls: any) {
    return await this.daikin.setControlInfo(name, controls);
  }
}

export default DaikinService;
