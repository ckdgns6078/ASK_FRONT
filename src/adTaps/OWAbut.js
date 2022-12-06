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
import Dbar from '../bar/Dbar';

function OWAbut(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="OWAbut"
      hidden={value !== index}
      id={`vertical-OWAbut-${index}`}
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

OWAbut.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-OWAbut-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
        <Dbar/>
        
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '700px' }}
    >
      
      <Tabs
        orientation="vertical"
        // variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
        style={{width:'300px'}}
      >
        <br/>
            <div>
        <h2  style={{color:'#005b9e'}}> &nbsp; &nbsp; <strong >일용직 관리</strong>  &nbsp; &nbsp; </h2>
        </div>
    
        <Tab label="일용직 등록" {...a11yProps(0)}style={{fontSize:'25px'}} />
        <Tab label=" 수당 등록" {...a11yProps(1)} style={{fontSize:'25px'}}/>
        {/* <Tab label=" 출퇴근 관리" {...a11yProps(2)} style={{fontSize:'25px'}}/> */}
        <Tab label=" 출퇴근 현황" {...a11yProps(3)} style={{fontSize:'25px'}}/>

      </Tabs>
      <OWAbut value={value} index={0}>
      <OWAcom/>
      </OWAbut>
      <OWAbut value={value} index={1}>
      <OWAcom/>
      </OWAbut>
      <OWAbut value={value} index={2}>
      <OWAcom/>
      </OWAbut>
      <OWAbut value={value} index={3}>
        <OWBcom/>
      </OWAbut>
      {/* <OWAbut value={value} index={4}>
        <OWCcom/>
      </OWAbut> */}
      <OWAbut value={value} index={4}>
        <OWDcom/>
      </OWAbut>



      
    </Box>
    </div>
  );
}