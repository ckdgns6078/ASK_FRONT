import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BAPAcom from '../bookingping_Accounting/BAPAcom';
import BAPBcom from '../bookingping_Accounting/BAPBcom';
import BKPCcom from '../bookingping_Accounting/BKPCcom';
import Fbar from '../bar/Fbar';
import BKPDcom from '../bookingping_Accounting/BKPDcom';

function BACbut(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="BACbut"
      hidden={value !== index}
      id={`vertical-BACbut-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

BACbut.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-BACbut-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
          <Fbar/>
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '700px' }}
    >
      
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
        style={{width:'300px'}}
      >
        <br/>
            <div>
        <h2  style={{color:'#005b9e'}}> &nbsp; &nbsp; <strong >경리/회계</strong>  &nbsp; &nbsp; </h2>
        </div>
    
        <Tab label="거래 관리" {...a11yProps(0)} style={{fontSize:'25px'}}/>
        <Tab label=" 매입/매출 관리" {...a11yProps(1)}style={{fontSize:'25px'}} />
        {/* <Tab label=" 매출 관리" {...a11yProps(2)} style={{fontSize:'25px'}}/> */}
        <Tab label=" 통계" {...a11yProps(3)}style={{fontSize:'25px'}} />

      </Tabs>
      <BACbut value={value} index={0}>
      <BKPDcom/>
      </BACbut>
    
      <BACbut value={value} index={2}>
      <BAPAcom/>
      </BACbut>
      <BACbut value={value} index={3}>
       <BAPBcom/>
      </BACbut>
      {/* <BACbut value={value} index={4}>
        <BKPCcom/>
      </BACbut> */}
      <BACbut value={value} index={4}>
        <BKPDcom/>
      </BACbut>


    </Box>
    </div>
  );
}