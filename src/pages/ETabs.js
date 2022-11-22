import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SMAcom from '../salary_management/SMAcom';

function ETabs(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="ETabs"
      hidden={value !== index}
      id={`vertical-ETabs-${index}`}
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

ETabs.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-ETabs-${index}`,
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
        <h4  style={{color:'#2F58B8'}}> &nbsp; &nbsp; <strong >급여 관리</strong>  &nbsp; &nbsp; </h4>
        </div>
    
        <Tab label="통합 급여 관리" {...a11yProps(0)} />
        <Tab label=" 임직원 급여 관리" {...a11yProps(1)} />
        <Tab label=" 일용직 급여 관리" {...a11yProps(2)} />
        <Tab label=" 경비 관리" {...a11yProps(3)} />

      </Tabs>
      <ETabs value={value} index={0}>
       <SMAcom/>
      </ETabs>
      <ETabs value={value} index={1}>
       ??????????
      </ETabs>
      <ETabs value={value} index={2}>
      ????????????
      </ETabs>
      <ETabs value={value} index={3}>
        Item Four
      </ETabs>

    </Box>
    </div>
  );
}