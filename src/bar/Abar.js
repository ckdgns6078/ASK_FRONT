import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Grid from '@mui/material/Grid';
import ATabs from '../pages/ATabs';
import MiddleBar from '../pages/MiddleBar';

import TopBar from '../pages/TopBar';
import Abut from '../aaTaps/Abut';

const Abar = () => {
    
    const [comp, setComp] = useState();

    return (
        <div>
                    <TopBar/>
                 <MiddleBar/>
                <Navbar expand="lg" variant="dark"  style={{backgroundColor:'#005b9e',height:'70px', positions:'relative ',boxShadow:'5px 5px 5px '}}>
           
                    <Navbar.Brand  style={{position:'absolute',left:'90px',}}>
                            <Grid container  >
                             
                                <Grid item  xs >
                                <Navbar.Brand href="/Abut" >  <strong>회사 설정</strong> </Navbar.Brand>     
                                </Grid>
                               
                                <Grid item xs>
                                <Navbar.Brand href="/Bbut"> <strong>시용자 관리</strong></Navbar.Brand>      
                                </Grid>
                               
                                <Grid item  xs>
                                <Navbar.Brand  href="/Cbut">  <strong>모바일 관리</strong></Navbar.Brand>           
                                </Grid>
                            </Grid>
                    </Navbar.Brand>
            
              
                </Navbar>
              {/* <Abut/> */}
                {/* <ATabs/> */}
                
        </div>
    );
};

export default Abar;