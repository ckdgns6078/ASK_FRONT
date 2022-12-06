import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Grid from '@mui/material/Grid';
import CTabs from '../pages/CTabs';
import MiddleBar from '../pages/MiddleBar';
import { positions } from '@mui/system';
import TopBar from '../pages/TopBar';
const Cbar = () => {
    return (
        <div>
                 <TopBar/>
                 <MiddleBar/>
                <Navbar expand="lg" variant="dark"  style={{backgroundColor:'#005b9e',height:'70px', positions:'relative ',boxShadow:'5px 5px 5px '}}>
           
                    <Navbar.Brand href="#" style={{position:'absolute',left:'90px'}}>
                            <Grid container  >
                                
                                <Grid item  xs ml={39}>
                                <Navbar.Brand  href="/ATGAbut">  <strong>휴가항목등록</strong> </Navbar.Brand>     
                                               
                                </Grid>
                               
                                <Grid item xs ml={2}>
                                <Navbar.Brand  href="/ATGBbut">    <strong>보유휴가현황</strong> </Navbar.Brand>     
                                             
                                </Grid>
                               
                                <Grid item  xs ml={2}>
                                <Navbar.Brand  href="/ATGCbut">    <strong>휴가처리</strong>  </Navbar.Brand>     
                                             
                                </Grid>
                                <Grid item  xs ml={2}>
                                <Navbar.Brand  href="/ATGDbut">     <strong>출퇴근관리</strong> </Navbar.Brand>     
                                            
                                </Grid>
                                <Grid item  xs ml={2}>
                                <Navbar.Brand  href="/ATGEbut">  <strong>출퇴근현황</strong>  </Navbar.Brand>     
                                               
                                </Grid>
                            </Grid>
                    </Navbar.Brand>
              
                </Navbar>
              
                {/* <CTabs/> */}
                
        </div>
    );
};

export default Cbar;