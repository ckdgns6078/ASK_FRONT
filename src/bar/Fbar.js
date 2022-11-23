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
                                
                                <Grid item  xs ml={155}> 
                                                <strong>거래처관리</strong>
                                </Grid>
                               
                                <Grid item xs ml={2}>
                                                <strong>매입관리</strong>
                                </Grid>
                               
                                <Grid item  xs  ml={2}>
                                                <strong>매출관리</strong> 
                                </Grid>
                        
                                <Grid item  xs  ml={2}>
                                                <strong>조회</strong> 
                                </Grid>
                            </Grid>
                    </Navbar.Brand>
              
                </Navbar>
              
                <FTabs/>
                
        </div>
    );
};

export default Fbar;