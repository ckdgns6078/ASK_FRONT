import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CTabs(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="CTabs"
      hidden={value !== index}
      id={`vertical-CTabs-${index}`}
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

CTabs.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-CTabs-${index}`,
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
        <h4  style={{color:'#2F58B8'}}> &nbsp; &nbsp; <strong >근태 관리</strong>  &nbsp; &nbsp; </h4>
        </div>
    
        <Tab label="휴가 항목 등록" {...a11yProps(0)} />
        <Tab label=" 보유 휴가 현황" {...a11yProps(1)} />
        <Tab label=" 휴가 처리" {...a11yProps(2)} />
        <Tab label=" 출퇴근 관리" {...a11yProps(3)} />
        <Tab label=" 출퇴근 현황" {...a11yProps(4)} />

      </Tabs>
      <CTabs value={value} index={0}>
       ????????
      </CTabs>
      <CTabs value={value} index={1}>
       ??????????
      </CTabs>
      <CTabs value={value} index={2}>
      ????????????
      </CTabs>
      <CTabs value={value} index={3}>
        Item Four
      </CTabs>
      <CTabs value={value} index={4}>
        Item Four
      </CTabs>

    </Box>
    </div>
  );
}