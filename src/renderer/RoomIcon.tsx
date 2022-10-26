import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Stack } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const Room = (props: any) => {
	return (
		<Stack direction="row" >
			{ props.mode === 'heater' && <WbSunnyIcon /> }
			{ props.mode === 'cooler' && <AcUnitIcon /> }
 			<ThermostatIcon sx={{ transform: 'translateX(-0.4em)' }} />
		</Stack>
	);
};

export default Room;
