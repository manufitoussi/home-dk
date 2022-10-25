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
];

const TemperatureConsignContent = (props: any) => {
  return (
    <ConsignDialogContent
      titleContent={
        <>
          {props.title} <SwipeRightAlt /> {props.consign}°C
        </>
      }
      dialogContent={
        <Slider
          marks={marks}
          valueLabelDisplay="auto"
          step={0.5}
          value={props.consign}
          min={15}
          max={25}
          sx={{ color: '#fd611d' }}
          onChange={(event, newValue) =>
            props.setConsign(newValue as number)
          }
        />
      }
    />
  );
};

export default TemperatureConsignContent;
