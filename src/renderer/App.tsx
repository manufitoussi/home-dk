import KingBedIcon from '@mui/icons-material/KingBed';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WeekendIcon from '@mui/icons-material/Weekend';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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

interface EnumType {
  [key: string]: string;
}

enum Mode {
  heater = 'heater',
  cooler = 'cooler',
}

enum ModeColor {
  heater = '#fd611d',
  cooler = '#1976d2',
}

enum ModeText {
  heater = 'Chauffage',
  cooler = 'Climatisation',
}

enum ModeConsign {
  heater = '4',
  cooler = '3',
}

const Application = () => {
  function onBasicInfos(_infos: any) {}
  function onSensorInfos(infos: any) {
    if (infos.salon) {
      setSalonSensorInfo(infos.salon);
    }

    if (infos.parents) {
      setTempExt(infos.parents.otemp);
      setParentsSensorInfo(infos.parents);
    }

    if (infos.jeanne) {
      setJeanneSensorInfo(infos.jeanne);
    }

    if (infos.elina) {
      setElinaSensorInfo(infos.elina);
    }
  }

  function onControlInfos(infos: any) {
    if (infos.salon) {
      const [mode] = Object.entries(ModeConsign).find(
        ([_key, value]) => value === infos.salon.mode
      ) as [string, string];
      setMode(mode);
      setSalonControlInfo(infos.salon);
    }

    if (infos.parents) {
      setParentsControlInfo(infos.parents);
    }

    if (infos.jeanne) {
      setJeanneControlInfo(infos.jeanne);
    }

    if (infos.elina) {
      setElinaControlInfo(infos.elina);
    }
  }

  function onAllInfos(_data: any) {
    setIsReady(true);
  }

  function onIsLoadingChange(isLoading: boolean) {
    setIsLoading(isLoading);
  }

  async function setControlInfo(roomName: string, controlInfo: any = null) {
    if (!controlInfo) {
      controlInfo = (daikinService.data.controlInfos || {})[roomName];
    }

    controlInfo.mode = (ModeConsign as EnumType)[getCurrentMode()];
    const controls = await daikinService.controlInfoToSet(controlInfo);
    await daikinService.setControlInfo(roomName, controls);
  }

  async function changeMode(newMode: Mode) {
    const changeControlInfo = async (roomName: string) => {
      const controlInfo: any = (daikinService.data.controlInfos || {})[
        roomName
      ];
      controlInfo.pow = '0';
      controlInfo.mode = (ModeConsign as EnumType)[newMode as string];
      const controls = await daikinService.controlInfoToSet(controlInfo);
      await daikinService.setControlInfo(roomName, controls);
    };

    setMode(newMode);
    await changeControlInfo('salon');
    await changeControlInfo('parents');
    await changeControlInfo('elina');
    await changeControlInfo('jeanne');

    await daikinService.getAll();
  }

  function onModeChange(newMode: string) {
    changeMode(newMode as Mode);
  }

  function getCurrentMode() {
    const [mode] = Object.entries(ModeConsign).find(
      ([_key, value]) =>
        value ===
        (
          daikinService?.data.controlInfos || {
            salon: { mode: ModeConsign.heater },
          }
        ).salon.mode
    ) as [string, string];
    return mode;
  }

  function getCurrentModeColor() {
    return (ModeColor as EnumType)[getCurrentMode()];
  }

  function getCurrentModeText() {
    return (ModeText as EnumType)[getCurrentMode()];
  }

  const [isReady, setIsReady] = useState(false);
  const [mode, setMode] = useState(getCurrentMode());
  const [tempExt, setTempExt] = useState('-');
  const [isLoading, setIsLoading] = useState(false);

  const [salonSensorInfo, setSalonSensorInfo] = useState(null);
  const [salonControlInfo, setSalonControlInfo] = useState(null);

  const [parentsSensorInfo, setParentsSensorInfo] = useState(null);
  const [parentsControlInfo, setParentsControlInfo] = useState(null);

  const [jeanneSensorInfo, setJeanneSensorInfo] = useState(null);
  const [jeanneControlInfo, setJeanneControlInfo] = useState(null);

  const [elinaSensorInfo, setElinaSensorInfo] = useState(null);
  const [elinaControlInfo, setElinaControlInfo] = useState(null);

  // console.log('createApp');

  if (!daikinService) {
    daikinService = new DaikinService(
      onBasicInfos,
      onSensorInfos,
      onControlInfos,
      onAllInfos,
      onIsLoadingChange
    );
  }

  useEffect(() => {
    // console.debug('useEffect', daikinService);
    daikinService.startSynchro();

    return () => {
      daikinService.stopSynchro();
    };
  }, []);

  if (isReady) {
    return (
      <Box className={`application ${getCurrentMode()}`} sx={{ display: 'flex' }}>
        <AppBar sx={{ backgroundColor: getCurrentModeColor() }}>
          <Toolbar>
            <Stack direction="row" sx={{ width: '100%' }} alignItems="center">
              <Select
                className="mode-selector"
                variant="standard"
                value={mode}
                sx={{ color: 'white', border: 'none' }}
                onChange={(e) => onModeChange(e.target.value)}
              >
                <MenuItem
                  value={Mode.heater}
                  sx={{ color: (ModeColor as EnumType)[Mode.heater] }}
                >
                  <RoomIcon mode={Mode.heater} />
                </MenuItem>
                <MenuItem
                  value={Mode.cooler}
                  sx={{ color: (ModeColor as EnumType)[Mode.cooler] }}
                >
                  <RoomIcon mode={Mode.cooler} />
                </MenuItem>
              </Select>
              <Typography variant="h6" color="inherit" component="div">
                {getCurrentModeText()} BibouHome
              </Typography>

              <Typography sx={{ flex: 1 }} component="div" />
              {isLoading && <CircularProgress sx={{ color: 'white' }} />}
              <Typography
                component="div"
                variant="h6"
                sx={{ display: 'flex' }}
                alignItems="center"
              >
                Extérieur <ThermostatIcon /> {tempExt}°C
              </Typography>
            </Stack>
          </Toolbar>
        </AppBar>

        <Stack
          flexWrap="wrap"
          direction="row"
          sx={{ width: '100%', overflow: 'auto' }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              paddingTop: '4em',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignContent: 'start',
            }}
          >
            {salonSensorInfo && salonControlInfo && (
              <Room
                roomName="salon"
                mode={getCurrentMode()}
                icon={<WeekendIcon />}
                title="Salon"
                sensorInfo={salonSensorInfo}
                controlInfo={salonControlInfo}
                setControlInfo={setControlInfo}
                themeColor={getCurrentModeColor()}
              />
            )}
            {parentsSensorInfo && parentsControlInfo && (
              <Room
                roomName="parents"
                mode={getCurrentMode()}
                icon={<KingBedIcon />}
                title="Chambre Parents"
                sensorInfo={parentsSensorInfo}
                controlInfo={parentsControlInfo}
                setControlInfo={setControlInfo}
                themeColor={getCurrentModeColor()}
              />
            )}
            {jeanneSensorInfo && jeanneControlInfo && (
              <Room
                roomName="jeanne"
                mode={getCurrentMode()}
                icon={<SingleBedIcon />}
                title="Chambre Jeanne"
                sensorInfo={jeanneSensorInfo}
                controlInfo={jeanneControlInfo}
                setControlInfo={setControlInfo}
                themeColor={getCurrentModeColor()}
              />
            )}
            {elinaSensorInfo && elinaControlInfo && (
              <Room
                roomName="elina"
                mode={getCurrentMode()}
                icon={<SingleBedIcon />}
                title="Chambre Elina"
                sensorInfo={elinaSensorInfo}
                controlInfo={elinaControlInfo}
                setControlInfo={setControlInfo}
                themeColor={getCurrentModeColor()}
              />
            )}
          </Box>
        </Stack>
      </Box>
    );
  }
  return (
    <Box
      className="application loading"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Typography component="div" variant="h6" sx={{display: 'flex', alignItems: 'center'}}>
        BibouHome <CircularProgress sx={{marginLeft: '1em'}} />
      </Typography>
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
