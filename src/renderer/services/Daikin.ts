const DELAY = 3; // s

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

	_daikin = window.electron.daikin;
	get daikin() {
		return this._daikin;
	}

	data = {
		basicInfos: null,
		sensorInfos: null,
		controlInfos: null
	};

	onBasicInfos: (infos: any) => void;
	onSensorInfos: (infos: any) => void;
	onControlInfos: (infos: any) => void;
	onIsLoadingChange: (isLoading:boolean) => void;

	constructor(
		onBasicInfos: (infos: any) => void = () => {},
		onSensorInfos: (infos: any) => void = () => {},
		onControlInfos: (infos: any) => void = () => {},
		onIsLoadingChange: (isLoading:boolean) => void = () => {},
	) {
    console.debug('create a DaikinService');
		this.onBasicInfos = onBasicInfos;
		this.onSensorInfos = onSensorInfos;
		this.onControlInfos = onControlInfos;
		this.onIsLoadingChange = onIsLoadingChange;
	}

	async startSynchro() {
		console.debug('startSynchro');
		this.stopSynchro();
    this._isStart = true;
		return await this.synchro();
	}

	stopSynchro() {
    if(this._isStart) return;
    this._isStart = false;
		if (this._timeout) {
			console.debug('stopSynchro');
			clearTimeout(this._timeout);
			this._timeout = null;
		}
	}

	async synchro() {
    if(!this._isStart) return;
		await this.update();
		this.stopSynchro();
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
		console.debug('getAll');
		await this._getBasicInfos();
		await this._getSensorInfos();
		await this._getControlInfos();
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
		console.log(this.data.controlInfos);
		return this.data.controlInfos;
	}

	async controlInfoToSet(info:any) {
		return await this.daikin.controlInfoToSet(info);
	}

	async setControlInfo(name:string, controls:any) {
		return await this.daikin.setControlInfo(name, controls);
	}
}

export default DaikinService;
