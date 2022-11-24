import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from '@mui/material/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
const PMDcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
 //모달 함수
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);   
    const [SH, setSh] = useState(false);

    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const DelClose = () => setMDelShow(false);
    const DeShow = () => setMDelShow(true);

    const MdClose = () => setModifyShow(false);
    const MdShow = () => setModifyShow(true);

    const ShClose = () => setSh(false);
    const Shshow = () => setSh(true);




    return (
        <div style={{width:'1400px' ,position:'relative'}}>
             <h2  style={{color:' #2F58B8' ,position:'absolute' ,left:'0' ,top:'0px'}}><strong>수당 관리 </strong></h2>
            <br/>
            <br/>
            <br/>
           

            <Table striped bordered hover >
                    <thead style={{height:'60px'}}>
                        <tr  style={{backgroundColor:'#ecf0f1' ,  }}>
                       
                            <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                                <strong>세금 코드</strong>
                            </td>
                            <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                                <strong>세금명</strong>
                            </td>
                            <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                                <strong>세금 항목</strong>
                            </td>
                            <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                                <strong>비고</strong>
                            </td>
                         
                         
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data && data.map((e, idx) =>
                        <tr style={{height:'60px'}} >
                          
                            <td style={{border:"2px solid #f1f2f6", fontSize:'22px',color:'#777777'}}><strong> {e.userId}</strong> </td>
                            <td style={{border:"2px solid #f1f2f6",fontSize:'22px',color:'#777777'}}><strong>  {e.userPw}</strong></td>
                            <td style={{border:"2px solid #f1f2f6",fontSize:'22px',color:'#777777'}}><strong>{e.userName} </strong></td>
                            <td style={{border:"2px solid #f1f2f6",fontSize:'22px',color:'#777777'}}><strong>{e.userName} </strong></td>
                           
                           
                        </tr>
                        )
                    }

                   
                    </tbody>
                    </Table>


                    <Grid item xs={12} ml={-3} mt={55}>
                    <hr style={{width:'1440px'}}/>
                    </Grid>

                <Box >
              
              <button   style={{position:'absolute' ,left:"0px",top:'600px' }} onClick={handleShow} className="Atmp1">  <strong>추가</strong></button> 
              <button style={{position:'absolute' ,left:"110px",top:'600px'}}onClick={MdShow} className="Atmp1">  <strong>수정</strong></button>
              <button style={{position:'absolute' ,left:"220px",top:'600px'}} onClick={DeShow} className="Atmp1"> <strong>삭제</strong> </button>
                
              </Box>
            




            {/* 추가 */}
                   {/* 등록 */}
                   <Modal 
             centered
             size="xsm"
         
             
            show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#005b9e',}}>
                <Modal.Title style={{color:'#ffffff'}}><strong>부서관리</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'#f3f3f3',}}>
             




                <Container>
                    <Grid container spacing={4}>
                  

                        <Grid item xs={6} md={6} ml={3} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>세금코드</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12}>
                        {/* <input style={{width:'250px',height:'40px'}} name="saveId" type="text" onChange={onChangeAddData}></input> */}
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                       name = 'adddepCode' type="text" />
                        </Grid>
                        <Grid item xs={6} md={6} ml={3} mt={-2}style={{fontSize:'20px',color:'#777777'}}>
                            <strong>세금명</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                         name='adddepName' type="text" />
                        </Grid>


                        <Grid item xs={6} md={6} ml={3}mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>세금항목</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                         name='adddepDetail' type="text"  />
                        </Grid>

                        
                        <Grid item xs={6} md={6} ml={3}mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>비고</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                         name='adddepDetail' type="text"  />
                        </Grid>

                       
                     </Grid>
                </Container>



                 
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor:'#ffffff'}}>
                <Button variant="secondary" onClick={handleClose}>
                    <strong>취소</strong>
                </Button>
                <button className="addButton"  onClick={handleClose}>
                    <strong>추가</strong>
                </button>
                </Modal.Footer>
            </Modal>



            {/* 수정 */}
         
            {/* 삭제 */}
            <Modal
                centered
                size="xsm"
                show={DelShow} onHide={DelClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#005b9e',width:'500px'}}>
                    <Modal.Title style={{color:'#ffffff',width:'500px'}}><strong>모바일 삭제</strong></Modal.Title>
                </Modal.Header>              
                <Modal.Body style={{backgroundColor:'#f1f2f6', width:'500px',}}>
                {/* {checkedItems.size} */}
                    <strong>개 항목을 삭제하시겠습니까?</strong>
                </Modal.Body>
                <Modal.Footer style={{width:'500px',backgroundColor:'#ffffff'}}>
                    <Button variant="secondary" onClick={DelClose}>
                        닫기
                    </Button>
                    <button className='addButton' variant="primary" onClick={DelClose}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>


            

            {/* 부서 코드 둗보기 모달 */}
            <Modal 
                size="sm"
                centered
                show={SH} onHide={ShClose}>
                <Modal.Header closeButton  style={{backgroundColor:'#005b9e',}}>
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

export default PMDcom;