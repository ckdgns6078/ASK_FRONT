import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Grid from '@mui/material/Grid';
import ATabs from '../pages/ATabs';
import MiddleBar from '../pages/MiddleBar';
import { positions } from '@mui/system';
const Abar = () => {
    return (
        <div>
                 <MiddleBar/>
                <Navbar expand="lg" variant="dark"  style={{backgroundColor:'#2F58B8',height:'70px', positions:'relative '}}>
           
                    <Navbar.Brand href="#" style={{position:'absolute',left:'90px'}}>
                            <Grid container  >
                                
                                <Grid item  xs >
                                <Navbar.Brand href="#"> <strong>회사 설정</strong></Navbar.Brand>     
                                </Grid>
                               
                                <Grid item xs>
                                <Navbar.Brand href="#"> <strong>시용자 관리</strong></Navbar.Brand>      
                                </Grid>
                               
                                <Grid item  xs>
                                <Navbar.Brand href="#"> <strong>모바일 관리</strong></Navbar.Brand>           
                                </Grid>
                            </Grid>
                    </Navbar.Brand>
              
                </Navbar>
              
                <ATabs/>
                
        </div>
    );
};

export default Abar;