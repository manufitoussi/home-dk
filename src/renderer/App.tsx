import ThermostatIcon from '@mui/icons-material/Thermostat';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Room from './Room';
import RoomIcon from './RoomIcon';
import DaikinService from './services/Daikin';
let daikinService: DaikinService;

type infoTypes = {
	[key: string]: any
}

const Application = () => {
	function onBasicInfos(infos: any) {
		setBasicInfos(infos);
	}
	function onSensorInfos(infos: any) {
		setSensorInfos(infos);
		setTempExt(infos.parents.otemp);
	}
	function onControlInfos(infos: any) {
		setControlInfos(infos);
	}
	function onIsLoadingChange(isLoading: boolean) {
		setIsLoading(isLoading);
	}

	async function toggleOnOff (roomName: string) {
		const controlInfo = controlInfos[roomName] || {};
		const controls = await daikinService.controlInfoToSet(controlInfo);
		controls.pow = controls.pow === '1' ? '0' : '1';
		controls.mode = '4';
		controlInfo.pow = controls.pow;
		await daikinService.setControlInfo(roomName, controls);
	}

	const [ basicInfos, setBasicInfos ] = useState<infoTypes>({});
	const [ sensorInfos, setSensorInfos ] = useState<infoTypes>({});
	const [ controlInfos, setControlInfos ] = useState<infoTypes>({});

	const [ tempExt, setTempExt ] = useState('-');
	const [ isLoading, setIsLoading ] = useState(false);

	useEffect(() => {
		console.debug('useEffect', daikinService);
		if (!daikinService) {
			daikinService = new DaikinService(onBasicInfos, onSensorInfos, onControlInfos, onIsLoadingChange);
			daikinService.startSynchro();
		}

		return () => {
			daikinService.stopSynchro();
		};
	}, []);

	return (
		<Box className="application" sx={{ display: 'flex' }}>
			<AppBar sx={{ backgroundColor: '#fd611d'}} >
				<Toolbar>
					<Stack direction="row" sx={{ width: '100%' }} alignItems="center">
						<RoomIcon />
						<Typography variant="h6" color="inherit" component="div">
							Chauffage BibouHome
						</Typography>

						<Typography sx={{ flex: 1 }} component="div" />
						{isLoading && <CircularProgress sx={{ color: 'white' }} />}
						<Typography component="div" variant="h6" sx={{ display: 'flex' }} alignItems="center">
							Extérieur <ThermostatIcon /> {tempExt}°C
						</Typography>
					</Stack>
				</Toolbar>
			</AppBar>

			<Stack flexWrap='wrap' direction='row' sx={{ width: '100%' }}>
				<Toolbar />
				<Box sx={{ flex: 1, paddingTop: '5em' }}>
					<Room
						roomName="salon"
						title="Salon"
						sensorInfos={sensorInfos}
						controlInfos={controlInfos}
						toggleOnOff={toggleOnOff}
					/>
					<Room
						roomName="parents"
						title="Chambre Parents"
						sensorInfos={sensorInfos}
						controlInfos={controlInfos}
						toggleOnOff={toggleOnOff}
					/>
					<Room
						roomName="jeanne"
						title="Chambre Jeanne"
						sensorInfos={sensorInfos}
						controlInfos={controlInfos}
						toggleOnOff={toggleOnOff}
					/>
					<Room
						roomName="elina"
						title="Chambre Elina"
						sensorInfos={sensorInfos}
						controlInfos={controlInfos}
						toggleOnOff={toggleOnOff}
					/>
				</Box>
			</Stack>
		</Box>
	);
};

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Application />} />
			</Routes>
		</Router>
	);
}
