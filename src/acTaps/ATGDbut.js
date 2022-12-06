import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ATGAcom from '../component/ATGAcom';
import ATGBcom from '../component/ATGBcom';
import ATGccom from '../component/ATGccom';
import ATGDcom from '../component/ATGDcom';
import ATGEcom from '../component/ATGEcom';
import Cbar from '../bar/Cbar';

function ATGDbut(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="ATGDbut"
      hidden={value !== index}
      id={`vertical-ATGDbut-${index}`}
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

ATGDbut.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-ATGDbut-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
         <Cbar/>
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
        <h4  style={{color:'#005b9e'}}> &nbsp; &nbsp; <strong >근태 관리</strong>  &nbsp; &nbsp; </h4>
        </div>
    
        <Tab label="휴가 항목 등록" {...a11yProps(0)} style={{fontSize:'25px'}}/>
        <Tab label=" 보유 휴가 현황" {...a11yProps(1)} style={{fontSize:'25px'}}/>
        <Tab label=" 휴가 처리" {...a11yProps(2)} style={{fontSize:'25px'}}/>
        <Tab label=" 출퇴근 관리" {...a11yProps(3)} style={{fontSize:'25px'}}/>
        <Tab label=" 출퇴근 현황" {...a11yProps(4)} style={{fontSize:'25px'}}/>

      </Tabs>
      <ATGDbut value={value} index={0}>
      <ATGDcom/>
      </ATGDbut>
      <ATGDbut value={value} index={2}>
        <ATGAcom/>
      </ATGDbut>
      <ATGDbut value={value} index={3}>
        <ATGBcom/>
      </ATGDbut>
      <ATGDbut value={value} index={4}>
      <ATGccom/>
      </ATGDbut>
      <ATGDbut value={value} index={5}>
       <ATGDcom/>
      </ATGDbut>
      <ATGDbut value={value} index={6}>
        <ATGEcom/>
      </ATGDbut>

    </Box>
    </div>
  );
}