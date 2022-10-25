import AirIcon from '@mui/icons-material/Air';
import SwipeRightAlt from '@mui/icons-material/SwipeRightAlt';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CircularProgress,
	Dialog, DialogActions, DialogContent, DialogTitle, Slider, Stack,
	Switch, Typography
} from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import Air from './Air';
import './Room.scss';
import RoomIcon from './RoomIcon';



const marks = [
  { value: 15, label: '15°C' },
  { value: 16 },
  { value: 17 },
  { value: 18 },
  { value: 19 },
  { value: 20, label: '20°C' },
  { value: 21 },
  { value: 22 },
  { value: 23 },
  { value: 24 },
  { value: 25, label: '25°C' },
];

const Room = (props: any) => {
  const toggleOnOff = async () => {
    props.controlInfo.pow = getCurrentIsOn() ? '0' : '1';
    await props.setControlInfo(props.roomName, props.controlInfo);
    setIsOn(getCurrentIsOn());
  };

  function showModal(consignName: string) {
    setConsignName(consignName);
    setIsModalShown(true);
  }

  function hideModal() {
    setConsignName('');
    setIsModalShown(false);
  }

  async function submitConsign(consignName: string) {
    hideModal();
    if (consignName === 'temp') {
      props.controlInfo.stemp = `${temperatureConsign}`;
    }

    if (consignName === 'air') {
      props.controlInfo.f_rate = `${rateConsign}`;
    }

    await props.setControlInfo(props.roomName, props.controlInfo);
  }

  function getTemperature() {
    return props.sensorInfo.htemp;
  }

  function getCurrentTemperatureConsign() {
    return props.controlInfo.stemp;
  }

  function getCurrentRateConsign() {
    return props.controlInfo.f_rate;
  }

  function getCurrentIsOn() {
    return props.controlInfo.pow === '1';
  }

  const [isOn, setIsOn] = useState(getCurrentIsOn);
  const [temperatureConsign, setTemperatureConsign] = useState(
    getCurrentTemperatureConsign
  );
  const [rateConsign, setRateConsign] = useState(getCurrentRateConsign);

  const [consignName, setConsignName] = useState('');
  const [isModalShown, setIsModalShown] = useState(false);

  if (props.sensorInfo) {
    return (
      <Card className={`room flex ${isOn ? 'is-on' : 'is-off'}`}>
        <CardHeader
          className="room-header"
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
              sx={{
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <ThermostatIcon sx={{ fontSize: '2em' }} /> {getTemperature()}°C
            </Typography>
            <div className={`room-pic ${props.roomName}`} />
            <Dialog open={isModalShown}>
              {consignName === 'temp' && (
                <DialogTitle>
                  <Stack direction="row" alignItems="center">
                    {props.title} <SwipeRightAlt /> {temperatureConsign}°C
                  </Stack>
                </DialogTitle>
              )}
              {consignName === 'air' && (
                <DialogTitle>
                  <Stack direction="row" alignItems="center">
                    {props.title} <AirIcon />
                  </Stack>
                </DialogTitle>
              )}

              <DialogContent sx={{ width: '40vw', overflow: 'visible' }}>
                {consignName === 'temp' && (
                  <Slider
                    marks={marks}
                    valueLabelDisplay="auto"
                    step={0.5}
                    value={temperatureConsign}
                    min={15}
                    max={25}
                    sx={{ color: '#fd611d' }}
                    onChange={(event, newValue) =>
                      setTemperatureConsign(newValue as number)
                    }
                  />
                )}

                {consignName === 'air' && (
                  <ToggleButtonGroup
                    exclusive
                    color="primary"
                    sx={{ textAlign: 'center' }}

                    value={rateConsign}
                    onChange={(event, newValue) => setRateConsign(newValue)}
                  >
                    {Object.entries(Air.Rates).map(([key, value]) => (
                      <ToggleButton key={key} value={value} sx={{minWidth: '3em', color: rateConsign === value ? '#fd611d !important' : 'currentColor  !important' }}>
                        <Air f_rate={value} />
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={hideModal}>Annuler</Button>
                <Button onClick={() => submitConsign(consignName)}>OK</Button>
              </DialogActions>
            </Dialog>
          </Stack>
        </CardContent>
        <CardActions>
          <Stack direction="row" alignItems="center">
            <Switch checked={isOn} onChange={toggleOnOff} color="success" />{' '}
            <Typography>{isOn ? 'ON' : 'OFF'}</Typography>
          </Stack>
          <Button onClick={() => showModal('temp')} className="command">
            <SwipeRightAlt /> {getCurrentTemperatureConsign()}°C
          </Button>
          <Button onClick={() => showModal('air')} className="command">
            <AirIcon /> <Air f_rate={getCurrentRateConsign()} />
          </Button>
        </CardActions>
      </Card>
    );
  }
  return (
    <Box>
      <CircularProgress />
    </Box>
  );
};

export default Room;
