import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AirIcon from '@mui/icons-material/Air';
import Tooltip from '@mui/material/Tooltip';
import Air from './Air';
import ConsignDialogContent from './ConsignDialogContent';

const AirConsignContent = (props: any) => {
  return (
    <ConsignDialogContent
      titleContent={
        <>
          {props.title} <AirIcon /> Flux d'air
        </>
      }
      dialogContent={
        <ToggleButtonGroup
          exclusive
          color="primary"
          sx={{ textAlign: 'center' }}
          value={props.consign}
          onChange={(_event, newValue) => {
            if (newValue !== null) props.setConsign(newValue);
          }}
        >
          {Object.entries(Air.Rate).map(([key, value]) => (
            <Tooltip title={Air.getRateText(key)}>
              <ToggleButton
                key={key}
                value={value}
                sx={{
                  minWidth: '3em',
                  color:
                    props.consign === value
                      ? `${props.themeColor} !important`
                      : 'currentColor  !important',
                }}
              >
                <Air f_rate={value} />
              </ToggleButton>
            </Tooltip>
          ))}
        </ToggleButtonGroup>
      }
    />
  );
};

export default AirConsignContent;
