import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Stack } from '@mui/material';

const Room = () => {
	return (
		<Stack direction="row" >
			<WbSunnyIcon />
			<ThermostatIcon sx={{ transform: 'translateX(-0.4em)' }} />
		</Stack>
	);
};

export default Room;
