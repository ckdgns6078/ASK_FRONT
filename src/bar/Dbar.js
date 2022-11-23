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
                <Navbar expand="lg" variant="dark"  style={{backgroundColor:'#005b9e',height:'70px', positions:'relative ',boxShadow:'5px 5px 5px '}}>
           
                    <Navbar.Brand href="#" style={{position:'absolute',}}>
                            <Grid container  >
                                
                                <Grid item  xs ml={93}>
                                                <strong>일용직등록</strong>
                                </Grid>
                               
                                <Grid item xs ml={2}>
                                                <strong>수당등록</strong>
                                </Grid>
                               
                                <Grid item  xs ml={2}>
                                                <strong>출퇴근관리</strong> 
                                </Grid>
                        
                                <Grid item  xs ml={2}>
                                                <strong>출퇴근현황</strong> 
                                </Grid>
                            </Grid>
                    </Navbar.Brand>
              
                </Navbar>
              
                <DTabs/>
                
        </div>
    );
};

export default Dbar;