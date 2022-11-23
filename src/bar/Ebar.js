import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Grid from '@mui/material/Grid';
import ETabs from '../pages/ETabs';
import MiddleBar from '../pages/MiddleBar';
import { positions } from '@mui/system';
import TopBar from '../pages/TopBar';
const Ebar = () => {
    return (
        <div>
                 <TopBar/>
                 <MiddleBar/>
                <Navbar expand="lg" variant="dark"  style={{backgroundColor:'#005b9e',height:'70px', positions:'relative ',boxShadow:'5px 5px 5px '}}>
           
                    <Navbar.Brand href="#" style={{position:'absolute'}}>
                            <Grid container  >
                                
                                <Grid item  xs ml={118}>
                                                <strong>통합급여관리</strong>
                                </Grid>
                               
                                <Grid item xs ml={2}>
                                                <strong>임직원급여관리</strong>
                                </Grid>
                               
                                <Grid item  xs  ml={2}>
                                                <strong>일용직관리</strong> 
                                </Grid>
                        
                                <Grid item  xs  ml={2}>
                                                <strong>경비관리</strong> 
                                </Grid>
                            </Grid>
                    </Navbar.Brand>
              
                </Navbar>
              
                <ETabs/>
                
        </div>
    );
};

export default Ebar;