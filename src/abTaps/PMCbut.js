import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PMAcom from '../component/PMAcom';
import PMBcom from '../component/PMBcom';
import PMCcom from '../component/PMCcom';
import PMDcom from '../component/PMDcom';
import Bbar from '../bar/Bbar';


function PMCbut(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="PMCbut"
      hidden={value !== index}
      id={`vertical-PMCbut-${index}`}
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

PMCbut.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-PMCbut-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
        <Bbar/>
        
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
          <div>
            <br/>
            <h2  style={{color:'#005b9e'}}> &nbsp; &nbsp; <strong >인사 관리</strong>  &nbsp; &nbsp; </h2>
        </div>
        <Tab label="사원 관리" {...a11yProps(1)} style={{fontSize:'25px'}}/>
        <Tab label=" 수당 관리" {...a11yProps(2)} style={{fontSize:'25px'}}/>
        <Tab label=" 부서 관리" {...a11yProps(3)} style={{fontSize:'25px'}}/>
        <Tab label=" 세금 관리" {...a11yProps(4)} style={{fontSize:'25px'}}/>

      </Tabs>
      <PMCbut value={value} index={0}>
      <PMCcom/>
      </PMCbut>
      <PMCbut value={value} index={1}>
      <PMAcom/>
      </PMCbut>
      <PMCbut value={value} index={2}>
        <PMBcom/>
      </PMCbut>
      <PMCbut value={value} index={3}>
       <PMCcom/>
      </PMCbut>
      <PMCbut value={value} index={4}>
       <PMDcom/>
      </PMCbut>

    </Box>
    </div>
  );
}