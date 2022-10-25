import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AirIcon from '@mui/icons-material/Air';
import Air from './Air';
import ConsignDialogContent from './ConsignDialogContent';

const AirConsignContent = (props: any) => {
  return (
    <ConsignDialogContent
      titleContent={
        <>
          {props.title} <AirIcon />
        </>
      }
      dialogContent={
        <ToggleButtonGroup
          exclusive
          color="primary"
          sx={{ textAlign: 'center' }}
          value={props.rateConsign}
          onChange={(event, newValue) => props.setRateConsign(newValue)}
        >
          {Object.entries(Air.Rates).map(([key, value]) => (
            <ToggleButton
              key={key}
              value={value}
              sx={{
                minWidth: '3em',
                color:
                  props.rateConsign === value
                    ? '#fd611d !important'
                    : 'currentColor  !important',
              }}
            >
              <Air f_rate={value} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      }
    />
  );
};

export default AirConsignContent;
