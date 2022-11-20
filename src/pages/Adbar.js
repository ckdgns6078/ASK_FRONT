import React from 'react';
import Grid from '@mui/material/Grid';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ask from '../img/ask.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from 'react-bootstrap/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Abar from '../bar/Abar';
import LoginIcon from '@mui/icons-material/Login';
const AdBar = () => {
    return (
        <div>
             <Navbar>
                <Container>
                    <Navbar.Brand href="#home"><img src={ask} style={{width:'200px'}}/></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    <Button variant="light"><LoginIcon/>로그인</Button>{' '}
                      
                    <button className="button">회원가입</button>
                        
                    </Navbar.Text>
                    </Navbar.Collapse>
                  
                </Container>
            
                </Navbar>
                <hr/>

           
        </div>
    );
};

export default AdBar;