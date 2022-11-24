import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';

import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
const SMDFcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
 //모달 함수
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);

    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const DelClose = () => setMDelShow(false);
    const DeShow = () => setMDelShow(true);

    const MdClose = () => setModifyShow(false);
    const MdShow = () => setModifyShow(true);





    return (
        <div style={{width:'1400px' ,position:'relative'}}>
             <h2  style={{color:' #005b9e' ,position:'absolute' ,left:'0' ,top:'0px'}}><strong>임직원급여 관리</strong></h2>
            <br/>
            <br/>
            <br/>
          
            {/* <table style={{
                width:"1000px",
                // border:'1px solid black',
                
                solid:"#fffff",
                // backgroundColor:'#bdc3c7'
                position:'absolute',
                left:'100px'
            }}>
                <tr style={{backgroundColor:'#f1f2f6' , }}>
                <td style={{border:"1px solid gray"}}>
                        <strong>날짜</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>사원코드</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>사원명</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>금액</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>비고</strong>
                    </td>
                
             
                </tr>  
            
                    

                  {
                        data && data.map((e, idx) =>
                        <tr >
                            <td><Checkbox {...label} defaultChecked /></td>
                            <td>입사일자 데이터 넣을곳</td>
                            <td>입사일자 데이터 넣을곳</td>
                            <td>성명 머시기 받아올거</td>
                            <td>부서명 데이터 넣을곳 </td>
                            <td>직위/직급 데이터 넣을곳</td>
                      
                           
                        </tr>
                        )
                    }
                 
                 <tr >
                    <td style={{border:"1px solid gray"}}>
                    <Checkbox {...label} defaultChecked />
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>wdfkr0630</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>159487z@</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>2020315010</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>신종락</strong>
                    </td>
             
              
                </tr>  
           
             

            </table>  */}
           



           <Table >
                    <thead style={{height:'60px'}}>
                    {/* #769FCD */}
                    {/* ecf0f1 */}
                        <tr  style={{backgroundColor:'#ecf0f1' ,  }}>
                                <td style={{border:"1px solid #f1f2f6 " ,fontSize:'20px',color:'#777777'}}>
                                <strong>날짜</strong>
                            </td>
                            <td style={{border:"1px solid #f1f2f6 ",fontSize:'20px',color:'#777777'}}>
                                <strong>사원코드</strong>
                            </td>
                            <td style={{border:"1px solid  #f1f2f6",fontSize:'20px',color:'#777777'}}>
                                <strong>사원명</strong>
                            </td>
                            <td style={{border:"1px solid #f1f2f6" ,fontSize:'20px',color:'#777777'}}>
                                <strong>금액</strong>
                            </td>
                            <td style={{border:"1px solid #f1f2f6", fontSize:'20px',color:'#777777'}}>
                                <strong>비고</strong>
                            </td>
                        </tr>
                    </thead>
                    
                    <tbody>
                    {
                        data && data.map((e, idx) =>
                        <tr style={{height:'60px'}} >
                            <td style={{border:"2px solid #f1f2f6", fontSize:'20px',color:'#777777'}}><strong> {e.userId}</strong> </td>
                            <td style={{border:"2px solid #f1f2f6",fontSize:'20px',color:'#777777'}}><strong>  {e.userPw}</strong></td>
                            <td style={{border:"2px solid #f1f2f6",fontSize:'20px',color:'#777777'}}><strong>{e.userName} </strong></td>
                            <td style={{border:"2px solid #f1f2f6", fontSize:'20px',color:'#777777'}}><strong> {e.userGrant}</strong></td>
                        </tr>
                        )
                    }

                   
                    </tbody>
                    </Table>


















            {/* 추가 */}
            <Modal 
             centered
             size="xl"
            show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#2F58B8',}}>
                <Modal.Title style={{color:'#ffffff'}}><strong> 사원 등록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'#f1f2f6'}}>
             

                <br/>
              
                    <Container>
                    <Grid container spacing={4}>
                    <Grid item xs={6} md={2}  style={{fontSize:'25px'}}>
                        <strong>사원명</strong>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <input style={{width:'250px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>
                    <Grid item xs={6} md={2} style={{fontSize:'25px'}}>
                        <strong>사원 번호</strong>
                    </Grid>
                    <Grid item xs={6} md={4} ml={-5}>
                    <input style={{width:'290px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>
                    
                    <Grid item xs={6} md={3} style={{fontSize:'25px'}}>
                       <strong>주민등록번호</strong>
                    </Grid>
                    <Grid item xs={6} md={3} ml={-11}>
                    <input style={{width:'250px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>
                    <Grid item xs={6} md={2} ml={11} style={{fontSize:'25px'}}>
                        <strong>전화 번호</strong>
                    </Grid>
                    <Grid item xs={6} md={4} ml={-5} >
                    <input style={{width:'290px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>

                    <Grid item xs={6} md={2} style={{fontSize:'25px'}}>
                       <strong>부서코드</strong>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <input style={{width:'250px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>
                    <Grid item xs={6} md={2} ml={0} style={{fontSize:'25px'}}>
                        <strong>일급</strong>
                    </Grid>
                    <Grid item xs={6} md={4}  ml={-5}  >
                    <input style={{width:'290px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>
                    
                    <Grid item xs={6} md={2} style={{fontSize:'25px'}}>
                       <strong>입사일</strong>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <input style={{width:'250px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>

                    {/* <Grid item xs={6} md={2} style={{fontSize:'25px'}}>
                        <strong>휴가</strong>
                    </Grid>

                    <Grid item xs={6} md={2} ml={-14} >
                    <input style={{width:'110px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>
                    <Grid item xs={6} md={2} ml={-7}  style={{fontSize:'25px'}}>
                        <strong>잔여 휴가</strong>
                    </Grid>

                    <Grid item xs={6} md={2} ml={-7} >
                    <input style={{width:'110px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid> */}

                    <Grid item xs={6} md={6} ml={23} mt={5} style={{fontSize:'25px'}}>
                      <strong> 은행</strong>
                    </Grid>

                    <Grid item xs={6} md={6} ml={-48}mt={5} >
                    <input style={{width:'250px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>


                    
                    <Grid item xs={6} md={4}  style={{fontSize:'25px'}}>
                       <strong> 급여 통장</strong>
                    </Grid>

                
                    <Grid item xs={6} md={4} ml={-23}  style={{fontSize:'25px'}}>
                       <strong> 계좌 번호</strong>
                    </Grid>

                    <Grid item xs={6} md={4} ml={-25} >
                    <input style={{width:'250px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>


                    <Grid item xs={6} md={6} ml={23} style={{fontSize:'25px'}} >
                       <strong>예금주</strong>
                    </Grid>

                    <Grid item xs={6} md={6} ml={-48} >
                    <input style={{width:'250px' ,height:'40px'}} name='compNum' type="text"></input>
                    </Grid>


                 
                    
                    <Grid item xs={6} md={3} style={{fontSize:'25px'}} >
                      <strong>주소</strong>
                    </Grid>

                    <Grid item xs={6} md={10}  >
                    <input style={{width:'1000px' ,height:'70px'}} name='compNum' type="text"></input>
                    </Grid>
                    






        
                    </Grid>
                </Container>


                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button variant="primary" onClick={handleClose}>
                   추가
                </Button>
                </Modal.Footer>
            </Modal>

            {/* 수정 */}
            <Modal 
             centered
             size="lg"
            show={ModifyShow} onHide={MdClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>수정</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={MdClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={MdClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

            {/* 삭제 */}
            <Modal 
             centered
             size="xl"
            show={DelShow} onHide={DelClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>삭제 내용</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={DelClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={DelClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

       




        </div>
    );
};

export default SMDFcom;