import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
const MiddleBar = () => {
    return (
        <div>

<Navbar style={{backgroundColor:'#ecf0f1'}} variant="light">
        <Container>
          <Navbar.Brand href="#home"><strong>회사 설정</strong></Navbar.Brand>
          <Navbar.Brand href="#home"><strong>인사 관리</strong></Navbar.Brand>
          <Navbar.Brand href="#home"><strong>근태 관리</strong></Navbar.Brand>
          <Navbar.Brand href="#home"><strong>일용직 관리</strong></Navbar.Brand>
          <Navbar.Brand href="#home"><strong>급여 관리</strong></Navbar.Brand>
          <Navbar.Brand href="#home"><strong>경리/회계</strong></Navbar.Brand>
   
        </Container>
      </Navbar>       
        </div>
    );
};

export default MiddleBar;