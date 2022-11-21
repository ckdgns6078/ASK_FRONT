import React from 'react';
import Grid from '@mui/material/Grid';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ask from '../img/ask.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from 'react-bootstrap/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Abar from '../bar/Abar';

const TopBar = () => {

    return (
        <div>
             
             <Navbar>
                <Container>
                    <Navbar.Brand href="#home"><img src={ask} style={{width:'200px'}}/></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    <Button variant="light"><LogoutIcon/>로그아웃</Button>{' '}
                        <AccountCircleIcon style={{width:'100px',height:'50px'}}/>
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
                </Navbar>

           
        </div>
    );
};

export default TopBar;