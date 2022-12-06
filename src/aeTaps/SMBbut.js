import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SMAcom from '../salary_management/SMAcom';
import SMBcom from '../salary_management/SMBcom';
import SMCcom from '../salary_management/SMCcom';
import SMDcom from '../salary_management/SMDcom';
import SMDFcom from '../salary_management/SMDFcom';
import Ebar from '../bar/Ebar';
function SMCbut(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="SMCbut"
      hidden={value !== index}
      id={`vertical-SMCbut-${index}`}
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

SMCbut.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-SMCbut-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
        
        <Ebar/>
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
        <h2  style={{color:'#005b9e'}}> &nbsp; &nbsp; <strong >급여 관리</strong>  &nbsp; &nbsp; </h2>
        </div>
    
        {/* <Tab label="통합 급여 관리" {...a11yProps(0)} style={{fontSize:'25px'}}/> */}
        <Tab label=" 임직원 급여 관리" {...a11yProps(1)}style={{fontSize:'25px'}} />
        <Tab label=" 일용직 급여 관리" {...a11yProps(2)} style={{fontSize:'25px'}}/>
        <Tab label=" 경비 관리" {...a11yProps(3)}style={{fontSize:'25px'}} />
        {/* <Tab label=" 경비 처리" {...a11yProps(4)} style={{fontSize:'25px'}}/> */}


      </Tabs>
      <SMCbut value={value} index={0}>
      <SMCcom/>
      </SMCbut>
      
      {/* <SMCbut value={value} index={2}>
      <SMAcom/>
      </SMCbut> */}
      <SMCbut value={value} index={2}>
      <SMBcom/>
      </SMCbut>

    
      <SMCbut value={value} index={3}>
      <SMCcom/>
      </SMCbut>

      <SMCbut value={value} index={4}>
       <SMDcom/>
      </SMCbut>
      {/* <SMCbut value={value} index={5}>
       <SMDFcom/>
      </SMCbut> */}




    </Box>
    </div>
  );
}