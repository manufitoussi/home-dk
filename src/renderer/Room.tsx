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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Switch,
  Slider,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import './Room.scss';
import RoomIcon from './RoomIcon';

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

    await props.setControlInfo(props.roomName, props.controlInfo);
  }

  function getTemperature() {
    return props.sensorInfo.htemp;
  }

  function getCurrentTemperatureConsign() {
    return props.controlInfo.stemp;
  }

  function getCurrentIsOn() {
    return props.controlInfo.pow === '1';
  }

  const [isOn, setIsOn] = useState(getCurrentIsOn);
  const [temperatureConsign, setTemperatureConsign] = useState(
    getCurrentTemperatureConsign
  );

  const [consignName, setConsignName] = useState('');
  const [isModalShown, setIsModalShown] = useState(false);

  if (props.sensorInfo) {
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
                  {props.title} <SwipeRightAlt /> {temperatureConsign}°C{' '}
                </DialogTitle>
              )}

              <DialogContent  sx={{width: '40vw'}}>
                <Slider
                  marks
                  step={0.5}
                  value={temperatureConsign}
                  min={15}
                  max={30}
                  onChange={(event, newValue) =>
                    setTemperatureConsign(newValue as number)
                  }
                />
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
            <Switch checked={isOn} onChange={toggleOnOff} />{' '}
            <Typography>{isOn ? 'ON' : 'OFF'}</Typography>
          </Stack>
          <Button onClick={() => showModal('temp')}>
            <SwipeRightAlt /> {getCurrentTemperatureConsign()}°C
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
