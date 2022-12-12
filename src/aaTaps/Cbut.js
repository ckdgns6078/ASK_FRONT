import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState , useEffect} from 'react';
import Acom from '../component/Acom';

import Bcom from '../component/Bcom';
import Ccom from '../component/Ccom';
import Abar from '../bar/Abar';

function Cbut(props) {
    const { children, value, index, ...other } = props;
  
    useEffect(() =>{
      console.log("useEffect실행");
      
    },[]);
  
    return (
      <div
        role="Cbut"
        hidden={value !== index}
        id={`vertical-Cbut-${index}`}
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
  
  Cbut.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-Cbut-${index}`,
    };
  }
  
  export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
        

    return (
        <div>
                      <Abar/>
                <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '700px'  }}
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
                <div>
                    <br/>
            <h2  style={{color:'#005b9e'}}>&nbsp; &nbsp; <strong >회사 설정</strong> &nbsp; &nbsp; </h2>
            </div>
    
        
            <Tab label="회사 설정" {...a11yProps(0)} style={{fontSize:'25px'}}  />
            <Tab label=" 사용자 관리" {...a11yProps(1)} style={{fontSize:'25px'}} />
            <Tab label=" 모바일관리" {...a11yProps(2)}  style={{fontSize:'25px'}}/>

        </Tabs>
        <Cbut value={value} index={0}>
        <Ccom/>
        </Cbut>
        <Cbut value={value} index={1}>
            <Acom/>
        </Cbut>
        <Cbut value={value} index={2}>
            <Bcom/>
        </Cbut>
        <Cbut value={value} index={3}>
            <Ccom/>
        </Cbut>

        </Box>
                
        </div>
    );
}

