import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Grid, TextField } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

export default function BKPCcom(props) {

    const [SH, setSh] = useState(false);


    const ShClose = () => setSh(false);
    const Shshow = () => setSh(true);
   

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  

    return (
        <div>
            <button onClick={Shshow}>asd</button>


            <Modal
                centered
                size="lg"
                show={SH} onHide={ShClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#2F58B8'}}>
                    <Modal.Title  style={{color:'#ffffff'}}>사용자관리 삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'#f1f2f6'}}>
                <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
     
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
            <Grid container>
                <Grid>asd</Grid>
                <Grid>asd</Grid>
            </Grid>
       
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
     
    </Box>
                   </Modal.Body>
                <Modal.Footer style={{backgroundColor:'#ffffff'}}>
                    <Button variant="secondary" onClick={ShClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={ShClose}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>

     
            
        </div>
    );
}
