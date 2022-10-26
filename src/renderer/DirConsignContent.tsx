import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import ToggleButton from '@mui/material/ToggleButton';
import Tooltip from '@mui/material/Tooltip';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ConsignDialogContent from './ConsignDialogContent';
import Dir from './Dir';

const DirConsignContent = (props: any) => {
  return (
    <ConsignDialogContent
      titleContent={
        <>
          {props.title} <ControlCameraIcon /> Direction de l'air
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
          {Object.entries(Dir.DirEnum).map(([key, value]) => (
            <Tooltip title={Dir.getDirText(key)}>
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
                <Dir f_dir={value} />
              </ToggleButton>
            </Tooltip>
          ))}
        </ToggleButtonGroup>
      }
    />
  );
};

export default DirConsignContent;
