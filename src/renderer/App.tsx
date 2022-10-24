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

const Application = () => {
  function onBasicInfos(infos: any) {
    // setBasicInfos(infos);
  }
  function onSensorInfos(infos: any) {
    // setSensorInfos(infos);
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
    // setControlInfos(infos);
    if (infos.salon) {
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
  function onIsLoadingChange(isLoading: boolean) {
    setIsLoading(isLoading);
  }

  async function setControlInfo(roomName: string, controlInfo: any) {
    const controls = await daikinService.controlInfoToSet(controlInfo);
    controls.mode = '4'; // '3' : froid, '4' : chaud
    await daikinService.setControlInfo(roomName, controls);
  }

  // const [basicInfos, setBasicInfos] = useState<InfoTypes>({});
  // const [sensorInfos, setSensorInfos] = useState<InfoTypes>({});
  // const [controlInfos, setControlInfos] = useState<InfoTypes>({});

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

  console.log('createApp');

  if (!daikinService) {
    daikinService = new DaikinService(
      onBasicInfos,
      onSensorInfos,
      onControlInfos,
      onIsLoadingChange
    );
  }

  useEffect(() => {
    console.debug('useEffect', daikinService);
    daikinService.startSynchro();

    return () => {
      daikinService.stopSynchro();
    };
  }, []);

  useEffect(() => {}, ['controlInfos']);

  return (
    <Box className="application" sx={{ display: 'flex' }}>
      <AppBar sx={{ backgroundColor: '#fd611d' }}>
        <Toolbar>
          <Stack direction="row" sx={{ width: '100%' }} alignItems="center">
            <RoomIcon />
            <Typography variant="h6" color="inherit" component="div">
              Chauffage BibouHome
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

      <Stack flexWrap="wrap" direction="row" sx={{ width: '100%' }}>
        <Toolbar />
        <Box sx={{ flex: 1, display: "flex", paddingTop: '5em', flexDirection: "row", flexWrap: 'wrap'}}>
          {salonSensorInfo && salonControlInfo && (
            <Room
              roomName="salon"
              title="Salon"
              sensorInfo={salonSensorInfo}
              controlInfo={salonControlInfo}
              setControlInfo={setControlInfo}
            />
          )}
          {parentsSensorInfo && parentsControlInfo && (
            <Room
              roomName="parents"
              title="Chambre Parents"
              sensorInfo={parentsSensorInfo}
              controlInfo={parentsControlInfo}
              setControlInfo={setControlInfo}
            />
          )}
         {jeanneSensorInfo && jeanneControlInfo && (
            <Room
              roomName="jeanne"
              title="Chambre Jeanne"
              sensorInfo={jeanneSensorInfo}
              controlInfo={jeanneControlInfo}
              setControlInfo={setControlInfo}
            />
          )}
          {elinaSensorInfo && elinaControlInfo && (
            <Room
              roomName="elina"
              title="Chambre Elina"
              sensorInfo={elinaSensorInfo}
              controlInfo={elinaControlInfo}
              setControlInfo={setControlInfo}
            />
          )}
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
