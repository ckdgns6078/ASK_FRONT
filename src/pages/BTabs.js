import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function BTabs(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="BTabs"
      hidden={value !== index}
      id={`vertical-BTabs-${index}`}
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

BTabs.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-BTabs-${index}`,
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
            <div>
        <h4  style={{Color:'#2F58B8'}}> &nbsp; &nbsp; <strong >인사 관리</strong>  &nbsp; &nbsp; </h4>
        </div>
    
        <Tab label="사원 관리" {...a11yProps(0)} />
        <Tab label=" 수당 관리" {...a11yProps(1)} />
        <Tab label=" 부서 관리" {...a11yProps(2)} />
        <Tab label=" 세금 관리" {...a11yProps(3)} />

      </Tabs>
      <BTabs value={value} index={0}>
       ????????
      </BTabs>
      <BTabs value={value} index={1}>
       ??????????
      </BTabs>
      <BTabs value={value} index={2}>
      ????????????
      </BTabs>
      <BTabs value={value} index={3}>
        Item Four
      </BTabs>

    </Box>
    </div>
  );
}