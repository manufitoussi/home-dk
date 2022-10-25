import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ConsignDialogContent from './ConsignDialogContent';
import Dir from './Dir';

const DirConsignContent = (props: any) => {
  return (
    <ConsignDialogContent
      titleContent={
        <>
          {props.title} <ControlCameraIcon />
        </>
      }
      dialogContent={
        <ToggleButtonGroup
          exclusive
          color="primary"
          sx={{ textAlign: 'center' }}
          value={props.consign}
          onChange={(event, newValue) => props.setConsign(newValue)}
        >
          {Object.entries(Dir.Dirs).map(([key, value]) => (
            <ToggleButton
              key={key}
              value={value}
              sx={{
                minWidth: '3em',
                color:
                  props.consign === value
                    ? '#fd611d !important'
                    : 'currentColor  !important',
              }}
            >
              <Dir f_dir={value} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      }
    />
  );
};

export default DirConsignContent;
