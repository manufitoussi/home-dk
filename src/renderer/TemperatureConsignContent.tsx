import SwipeRightAlt from '@mui/icons-material/SwipeRightAlt';
import { Slider } from '@mui/material';
import ConsignDialogContent from './ConsignDialogContent';

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
  { value: 26 },
  { value: 27 },
  { value: 28 },
  { value: 29 },
  { value: 30, label: '30°C' },
];

const range = {
  heater: {
    min: 15,
    max: 30,
  },
  cooler: {
    min: 18,
    max: 30,
  },
};

interface EnumType {
  [key: string]: any;
}

function formatConsign(consign: string) {
  return Intl.NumberFormat('en', { minimumFractionDigits: 1 }).format(
    parseFloat(consign)
  );
}

function modeToRange(mode: string) {
  return (range as EnumType)[mode];
}

const TemperatureConsignContent = (props: any) => {
  return (
    <ConsignDialogContent
      titleContent={
        <>
          {props.title} <SwipeRightAlt /> {formatConsign(props.consign)}°C
        </>
      }
      dialogContent={
        <Slider
          marks={marks}
          valueLabelDisplay="auto"
          step={0.5}
          value={props.consign}
          min={modeToRange(props.mode).min}
          max={modeToRange(props.mode).max}
          sx={{ color: props.themeColor }}
          onChange={(_event, newValue) => props.setConsign(newValue as number)}
        />
      }
    />
  );
};

export default TemperatureConsignContent;
