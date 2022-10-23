import ThermostatIcon from '@mui/icons-material/Thermostat';
import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CircularProgress,
	Stack,
	Switch,
	Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import './Room.scss';
import RoomIcon from './RoomIcon';

const Room = (props: any) => {
	const getsensorInfo = () => {
		return props.sensorInfos && props.roomName in props.sensorInfos ? props.sensorInfos[props.roomName] : null;
	};

	const getControlInfo = () => {
		return props.controlInfos && props.roomName in props.controlInfos ? props.controlInfos[props.roomName] : null;
	};

	const setupIsOn = () => {
		const controlInfo: any = getControlInfo();
		setIsOn(Boolean(controlInfo) && controlInfo.pow === '1');
	};

	const toggleOnOff = async () => {
		await props.toggleOnOff(props.roomName);
		setupIsOn();
	};

	const [ isOn, setIsOn ] = useState(false);

	useEffect(() => {
		setupIsOn();
	});

	if (getsensorInfo()) {
		return (
			<Card className={`room flex ${isOn ? 'is-on' : 'is-off'}`}>
				<CardHeader
					title={
						<Stack direction="row" sx={{ width: '100%' }} alignItems="center">
							<RoomIcon />
							<Typography>{props.title}</Typography>
						</Stack>
					}
				/>
				<CardContent>
					<Stack direction="row" alignItems="center">
						<Typography
							component="div"
							variant="h5"
							sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', flex: 1 }}
						>
							<ThermostatIcon sx={{ fontSize: '2em' }} /> {getsensorInfo().htemp}°C
						</Typography>
						<div className={`room-pic ${props.roomName}`} />
					</Stack>
				</CardContent>
				<CardActions>
					<Stack direction="row" alignItems="center">
						<Switch checked={isOn} onChange={toggleOnOff} /> <Typography>{isOn ? 'ON' : 'OFF'}</Typography>
					</Stack>
					{/* <Button>coco</Button> */}
				</CardActions>
			</Card>
		);
	} else {
		return (
			<Box>
				<CircularProgress />
			</Box>
		);
	}
};

export default Room;
