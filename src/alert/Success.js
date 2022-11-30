import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
const Success = () => {


const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

    return (
        <div>
        <Button onClick={handleClick}>퍼런 모달</Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        
        >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            추가 했음 ㅇㅇ
            </Alert>

        </Snackbar>
      </div>
    );
};

export default Success;