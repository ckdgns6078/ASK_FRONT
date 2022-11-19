import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function ATabs(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="ATabs"
      hidden={value !== index}
      id={`vertical-ATabs-${index}`}
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

ATabs.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-ATabs-${index}`,
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
                <br/>
        <h4  style={{color:'#2F58B8'}}> &nbsp; &nbsp; <strong >회사 설정</strong>  &nbsp; &nbsp; </h4>
        </div>
    
        <Tab label="회사 설정" {...a11yProps(0)} />
        <Tab label=" 시용자 관리" {...a11yProps(1)} />
        <Tab label=" 모바일관리" {...a11yProps(2)} />

      </Tabs>
      <ATabs value={value} index={0}>
        회사 설정
      </ATabs>
      <ATabs value={value} index={1}>
       사용자 관리
      </ATabs>
      <ATabs value={value} index={2}>
      모바일관리
      </ATabs>
      <ATabs value={value} index={3}>
        Item Four
      </ATabs>

    </Box>
    </div>
  );
}