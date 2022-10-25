import {
  DialogContent,
  DialogTitle, Stack
} from '@mui/material';

const ConsignDialogContent = (props: any) => {
  return (
    <>
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          {props.titleContent}
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ width: '40vw', overflow: 'visible' }}>
        {props.dialogContent}
      </DialogContent>
    </>
  );
};

export default ConsignDialogContent;
