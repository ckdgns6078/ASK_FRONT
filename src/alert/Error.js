import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
const Error = () => {


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
        <Button onClick={handleClick}>빨간 모달</Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        
        >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
           ㅄ 실패함 ㅋㅋㄹ
            </Alert>

        </Snackbar>
            <div>

      
        </div>
      </div>
    );
};

export default Error;