import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Grid from '@mui/material/Grid';
import ETabs from '../pages/ETabs';
import MiddleBar from '../pages/MiddleBar';
import { positions } from '@mui/system';
const Ebar = () => {
    return (
        <div>
                 <MiddleBar/>
                <Navbar expand="lg" variant="dark"  style={{backgroundColor:'#2F58B8',height:'70px', positions:'relative '}}>
           
                    <Navbar.Brand href="#" style={{position:'absolute',left:'90px'}}>
                            <Grid container  >
                                
                                <Grid item  xs>
                                                <strong>통합 급여 관리</strong>
                                </Grid>
                               
                                <Grid item xs>
                                                <strong>임직원 급여 관리</strong>
                                </Grid>
                               
                                <Grid item  xs>
                                                <strong>일용직 관리</strong> 
                                </Grid>
                        
                                <Grid item  xs>
                                                <strong>경비 관리</strong> 
                                </Grid>
                            </Grid>
                    </Navbar.Brand>
              
                </Navbar>
              
                <ETabs/>
                
        </div>
    );
};

export default Ebar;