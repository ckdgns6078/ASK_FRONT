import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Grid from '@mui/material/Grid';
import FTabs from '../pages/FTabs';
import MiddleBar from '../pages/MiddleBar';
import TopBar from '../pages/TopBar';

const Fbar = () => {
    return (
        <div>
                 <TopBar/>
                 <MiddleBar/>
                <Navbar expand="lg" variant="dark"  style={{backgroundColor:'#005b9e',height:'70px', positions:'relative ',boxShadow:'5px 5px 5px '}}>
           
                    <Navbar.Brand href="#" style={{position:'absolute'}}>
                            <Grid container  >
                                
                                <Grid item  xs ml={165} mt={0.6}> 
                                <Navbar.Brand  href="/BAAbut">    <strong>거래관리</strong> </Navbar.Brand>     
                                              
                                </Grid>
                               
                               
                                <Navbar.Brand  href="/BABbut">   <strong>매입/매출 </strong> </Navbar.Brand>     
                                              
                              
                               
                           
                              
                                <Navbar.Brand  href="/BACbut">  <strong>통계</strong> </Navbar.Brand>     
                                               
                               
                            </Grid>
                    </Navbar.Brand>
              
                </Navbar>
              
                {/* <FTabs/> */}
                
        </div>
    );
};

export default Fbar;