import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Grid from '@mui/material/Grid';
import BTabs from '../pages/BTabs';
import MiddleBar from '../pages/MiddleBar';
import TopBar from '../pages/TopBar';
const Bbar = () => {
    return (
        <div>
                 <TopBar/>
                 <MiddleBar/>
                <Navbar expand="lg" variant="dark"  style={{backgroundColor:'#005b9e',height:'70px',boxShadow:'5px 5px 5px '}}>
           
                    <Navbar.Brand href="#" style={{position:'absolute',left:'300px'}}>
                            <Grid container>
                                <Grid item  xs >
                                <Navbar.Brand  href="/PMAbut"> <strong>사원 관리</strong> </Navbar.Brand>     
                                   
                                </Grid>
                                <Grid item xs ml={2}>
                                <Navbar.Brand  href="/PMBbut">   <strong>수당관리</strong> </Navbar.Brand>     
                                  
                                </Grid>
                                <Grid item  xs ml={2}>
                                <Navbar.Brand  href="/PMCbut">    <strong>부서관리</strong> </Navbar.Brand>     
                                   
                                </Grid>
                                <Grid item  xs  ml={2}>
                                <Navbar.Brand  href="/PMDbut">    <strong>세금관리</strong> </Navbar.Brand>     
                                   
                                
                                </Grid>
                            </Grid>
                    </Navbar.Brand>
              
                </Navbar>
              
                {/* <BTabs/>
                 */}
        </div>
    );
};

export default Bbar;