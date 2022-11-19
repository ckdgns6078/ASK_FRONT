import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Grid from '@mui/material/Grid';
import BTabs from '../pages/BTabs';
import MiddleBar from '../pages/MiddleBar';
const Bbar = () => {
    return (
        <div>
                 <MiddleBar/>
                <Navbar expand="lg" variant="dark"  style={{backgroundColor:'#2F58B8',height:'40px'}}>
           
                    <Navbar.Brand href="#" style={{position:'absolute',left:'90px'}}>
                            <Grid container>
                                <Grid item  xs>
                                <Navbar.Brand href="#"><strong>사원 관리</strong></Navbar.Brand>
                                </Grid>
                                <Grid item xs>
                                       <strong>수당 관리</strong>
                                </Grid>
                                <Grid item  xs>
                                    <strong>부서 관리</strong>
                                </Grid>
                                <Grid item  xs>
                                    <strong>세금 관리</strong>
                                </Grid>
                            </Grid>
                    </Navbar.Brand>
              
                </Navbar>
              
                <BTabs/>
                
        </div>
    );
};

export default Bbar;