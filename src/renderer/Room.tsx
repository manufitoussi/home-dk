import AirIcon from '@mui/icons-material/Air';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
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
  DialogActions,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import HvacIcon from '@mui/icons-material/Hvac';
import Air from './Air';
import AirConsignContent from './AirConsignContent';
import Dir from './Dir';
import DirConsignContent from './DirConsignContent';
import './Room.scss';
import RoomIcon from './RoomIcon';
import TemperatureConsignContent from './TemperatureConsignContent';

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

  function getIcon() {
    return props.icon ?? <HvacIcon />;
  }

  async function submitConsign(consignName: string) {
    hideModal();
    if (consignName === 'temp') {
      props.controlInfo.stemp = `${temperatureConsign}`;
    }

    if (consignName === 'air') {
      props.controlInfo.f_rate = `${rateConsign}`;
    }

    if (consignName === 'dir') {
      props.controlInfo.f_dir = `${dirConsign}`;
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

  function getCurrentDirConsign() {
    return props.controlInfo.f_dir;
  }

  function getCurrentIsOn() {
    return props.controlInfo.pow === '1';
  }

  const [isOn, setIsOn] = useState(getCurrentIsOn);
  const [temperatureConsign, setTemperatureConsign] = useState(
    getCurrentTemperatureConsign
  );
  const [rateConsign, setRateConsign] = useState(getCurrentRateConsign);
  const [dirConsign, setDirConsign] = useState(getCurrentDirConsign);

  const [consignName, setConsignName] = useState('');
  const [isModalShown, setIsModalShown] = useState(false);

  if (props.sensorInfo) {
    return (
      <Card className={`room flex ${isOn ? 'is-on' : 'is-off'}`}>
        <CardHeader
          className="room-header"
          title={
            <Stack direction="row" sx={{ width: '100%' }} alignItems="center">
              {getIcon()}
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
                <TemperatureConsignContent
                  title={props.title}
                  consign={temperatureConsign}
                  setConsign={setTemperatureConsign}
                />
              )}

              {consignName === 'air' && (
                <AirConsignContent
                  title={props.title}
                  consign={rateConsign}
                  setConsign={setRateConsign}
                />
              )}

              {consignName === 'dir' && (
                <DirConsignContent
                  title={props.title}
                  consign={dirConsign}
                  setConsign={setDirConsign}
                />
              )}

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
          <Tooltip title={Air.getValueText(getCurrentRateConsign())}>
            <Button onClick={() => showModal('air')} className="command">
              <AirIcon /> <Air f_rate={getCurrentRateConsign()} />
            </Button>
          </Tooltip>
          <Tooltip title={Dir.getValueText(getCurrentDirConsign())}>
            <Button onClick={() => showModal('dir')} className="command">
              <ControlCameraIcon /> <Dir f_dir={getCurrentDirConsign()} />
            </Button>
          </Tooltip>
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
