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

    //로그아웃 함수
    const logOut = ()=>{
        sessionStorage.clear(); //session 삭제하는 함수
        window.location.href = '/'
    }
    
    const goMain = ()=>{
        window.location.href = "http://localhost:3000/Abut?id="+sessionStorage.getItem("id")+"?uId="+sessionStorage.getItem("uId");
    }


    return (
        <div>
             
             <Navbar>
                <Container>
                    <Navbar.Brand href="#home"><img src={ask} onClick = {goMain} style={{width:'200px'}}/></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    <Button variant="light" onClick = {logOut}><LogoutIcon/>로그아웃</Button>{' '}
                        <AccountCircleIcon style={{width:'100px',height:'50px'}}/>
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
                </Navbar>

           
        </div>
    );
};

export default TopBar;