import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OWAcom from '../onework/OWAcom';
import OWBcom from '../onework/OWBcom';
import Success from '../alert/Success';
import OWCcom from '../onework/OWCcom';
import OWDcom from '../onework/OWDcom';

function DTabs(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="DTabs"
      hidden={value !== index}
      id={`vertical-DTabs-${index}`}
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

DTabs.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-DTabs-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
        
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
      >
        <br/>
            <div>
        <h4  style={{color:'#2F58B8'}}> &nbsp; &nbsp; <strong >일용직 관리</strong>  &nbsp; &nbsp; </h4>
        </div>
    
        <Tab label="일용직 등록" {...a11yProps(0)} />
        <Tab label=" 수당 등록" {...a11yProps(1)} />
        <Tab label=" 출퇴근 관리" {...a11yProps(2)} />
        <Tab label=" 출퇴근 현황" {...a11yProps(3)} />

      </Tabs>
      <DTabs value={value} index={0}>
      <OWAcom/>
      </DTabs>
      <DTabs value={value} index={1}>
      <OWAcom/>
      </DTabs>
      <DTabs value={value} index={2}>
      <OWAcom/>
      </DTabs>
      <DTabs value={value} index={3}>
        <OWBcom/>
      </DTabs>
      <DTabs value={value} index={4}>
        <OWCcom/>
      </DTabs>
      <DTabs value={value} index={5}>
        <OWDcom/>
      </DTabs>



      
    </Box>
    </div>
  );
}