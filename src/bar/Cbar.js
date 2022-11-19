import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Grid from '@mui/material/Grid';
import CTabs from '../pages/CTabs';
import MiddleBar from '../pages/MiddleBar';
import { positions } from '@mui/system';
const Cbar = () => {
    return (
        <div>
                 <MiddleBar/>
                <Navbar expand="lg" variant="dark"  style={{backgroundColor:'#2F58B8',height:'70px', positions:'relative '}}>
           
                    <Navbar.Brand href="#" style={{position:'absolute',left:'90px'}}>
                            <Grid container  >
                                
                                <Grid item  xs>
                                                <strong>휴가 항목 등록</strong>
                                </Grid>
                               
                                <Grid item xs>
                                                <strong>보유 휴가 현황</strong>
                                </Grid>
                               
                                <Grid item  xs>
                                                <strong>휴가 처리</strong> 
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
              
                <CTabs/>
                
        </div>
    );
};

export default Cbar;