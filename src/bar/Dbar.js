import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Grid from '@mui/material/Grid';
import DTabs from '../pages/DTabs';
import MiddleBar from '../pages/MiddleBar';
import { positions } from '@mui/system';
import TopBar from '../pages/TopBar';
const Dbar = () => {
    return (
        <div>
                 <TopBar/>
                 <MiddleBar/>
                <Navbar expand="lg" variant="dark"  style={{backgroundColor:'#2F58B8',height:'70px', positions:'relative '}}>
           
                    <Navbar.Brand href="#" style={{position:'absolute',left:'90px'}}>
                            <Grid container  >
                                
                                <Grid item  xs>
                                                <strong>일용직 등록</strong>
                                </Grid>
                               
                                <Grid item xs>
                                                <strong>수당 등록</strong>
                                </Grid>
                               
                                <Grid item  xs>
                                                <strong>출퇴근 관리</strong> 
                                </Grid>
                        
                                <Grid item  xs>
                                                <strong>출퇴근 현황</strong> 
                                </Grid>
                            </Grid>
                    </Navbar.Brand>
              
                </Navbar>
              
                <DTabs/>
                
        </div>
    );
};

export default Dbar;