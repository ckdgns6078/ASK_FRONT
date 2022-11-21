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
                <Navbar expand="lg" variant="dark"  style={{backgroundColor:'#2F58B8',height:'70px', positions:'relative '}}>
           
                    <Navbar.Brand href="#" style={{position:'absolute',left:'90px'}}>
                            <Grid container  >
                                
                                <Grid item  xs>
                                                <strong>거래처 관리</strong>
                                </Grid>
                               
                                <Grid item xs>
                                                <strong>매입 관리</strong>
                                </Grid>
                               
                                <Grid item  xs>
                                                <strong>매출 관리</strong> 
                                </Grid>
                        
                                <Grid item  xs>
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