import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
const MiddleBar = () => {



  const Apage = () => {
    window.location.href="/Abut"
  }
  const Bpage = () => {
    window.location.href="/PMAbut"
  }
  const Cpage = () => {
    window.location.href="/ATGAbut"
  }
  const Dpage = () => {
    window.location.href="/OWAbut"
  }
  const Epage = () => {
    window.location.href="/SMAbut"
  }
  const Fpage = () => {
    window.location.href="/BAAbut"
  }




    return (
        <div>

<Navbar style={{backgroundColor:'#ecf0f1'}} variant="light">
        <Container>
          <Navbar.Brand href="#home" onClick={Apage}><strong>회사 설정</strong></Navbar.Brand>
          <Navbar.Brand href="#home" onClick={Bpage}><strong>인사 관리</strong></Navbar.Brand>
          <Navbar.Brand href="#home" onClick={Cpage}><strong>근태 관리</strong></Navbar.Brand>
          <Navbar.Brand href="#home" onClick={Dpage}><strong>일용직 관리</strong></Navbar.Brand>
          <Navbar.Brand href="#home" onClick={Epage}><strong>급여 관리</strong></Navbar.Brand>
          <Navbar.Brand href="#home" onClick={Fpage}><strong>경리/회계</strong></Navbar.Brand>
   
        </Container>
      </Navbar>       
        </div>
    );
};

export default MiddleBar;