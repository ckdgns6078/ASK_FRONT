import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SearchIcon from '@mui/icons-material/Search';

// 권한 검색 버튼 
const Rsearch = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <div>
             <Button variant="light" onClick={handleShow}>
             <SearchIcon/>
             </Button>

      <Modal 

       size="lg"
       centered
       show={show} onHide={handleClose}>
        <Modal.Header closeButton  style={{backgroundColor:'#2F58B8',}}>
          <Modal.Title  style={{color:'#ffffff'}}> <strong> 권한 부여</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:'#f1f2f6'}}> 

        <br/><br/><br/><br/>
          <table style={{
                textAlign:"center",
                width:"100%",height:'200px', border:"1px solid gray" ,}} >
            <tr style={{border:"1px solid gray",backgroundColor:'#a4b0be'}}>
              <td style={{border:"1px solid gray",fontSize:'30px'}}><strong> 비고</strong></td>
              <td style={{fontSize:'30px'}}> <strong> 권한명</strong></td>
            </tr>
            <tr style={{border:"1px solid gray"}}>
              <td style={{border:"1px solid gray",fontSize:'30px'}}>1</td>
              <td style={{border:"1px solid gray",fontSize:'30px'}}>Master</td>
            </tr>
            <tr style={{border:"1px solid gray"}}>
              <td style={{border:"1px solid gray",fontSize:'30px'}}>2</td>
              <td style={{border:"1px solid gray",fontSize:'30px'}}>Manager</td>
            </tr>
          </table>
          <br/><br/><br/><br/><br/>    <br/><br/>
        </Modal.Body>
     
      </Modal>
            
        </div>
    );
};

export default Rsearch;