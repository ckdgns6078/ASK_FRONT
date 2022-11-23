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
const PMBcom = () => {
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
                    <Checkbox {...label} defaultChecked />
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>수당코드</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>수당명</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>비고세</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>지급유형</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>계산식</strong>
                    </td>
                
                </tr>  

                  {
                        data && data.map((e, idx) =>
                        <tr >
                            <td><Checkbox {...label} defaultChecked /></td>
                            <td>수당 코드 넣을곳</td>
                            <td>수당명 넣을곳</td>
                            <td> 비과세 받아올거</td>
                            <td>지급 유형 넣을곳 </td>
                            <td>계산식 넣을곳</td>
                        
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
                    <td style={{border:"1px solid gray"}}>
                        <strong>wdfkr0630</strong>
                    </td>
                
                </tr>  
            </table>  */}

            <Table striped bordered hover >
                    <thead style={{height:'60px'}}>
                        <tr  style={{backgroundColor:'#005b9e' ,  }}>
                        <td style={{border:"1px solid gray",color:'#ffffff',fontSize:'22px'}}>
                        {/* onChange={(e) => allHandler(e)} */}
                        <input type="checkbox" id="allCheck" value="allCheck" ></input>
                            </td>
                            <td style={{border:"1px solid gray",color:'#ffffff',fontSize:'22px'}}>
                                <strong>수당코드</strong>
                            </td>
                            <td style={{border:"1px solid gray",color:'#ffffff',fontSize:'22px'}}>
                                <strong>수당명</strong>
                            </td>
                            <td style={{border:"1px solid gray",color:'#ffffff',fontSize:'22px'}}>
                                <strong>비고세</strong>
                            </td>
                            <td style={{border:"1px solid gray",color:'#ffffff',fontSize:'22px'}}>
                                <strong>지급유형</strong>
                            </td>
                            <td style={{border:"1px solid gray",color:'#ffffff',fontSize:'22px'}}>
                                <strong>계산식</strong>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data && data.map((e, idx) =>
                        <tr style={{height:'60px'}} >
                           <td style={{border:"2px solid #f1f2f6", fontSize:'20px'}}><input type="checkbox" id={e.userId} value={e.userId} ></input></td>
                            <td style={{border:"2px solid #f1f2f6", fontSize:'20px'}}><strong> {e.userId}</strong> </td>
                            <td style={{border:"2px solid #f1f2f6",fontSize:'20px'}}><strong>  {e.userPw}</strong></td>
                            <td style={{border:"2px solid #f1f2f6",fontSize:'20px'}}><strong>{e.userName} </strong></td>
                            <td style={{border:"2px solid #f1f2f6", fontSize:'20px'}}><strong> {e.userGrant}</strong></td>
                        </tr>
                        )
                    }

                   
                    </tbody>
                    </Table>



















    
                    <Grid item xs={12} ml={-3} mt={55}>
                    <hr style={{width:'1440px'}}/>
                    </Grid>
                    
          
      
                {/* <div>
                <button   style={{position:'absolute' ,left:"0px"}} onClick={handleShow} className="Atmp1">  <strong>등록</strong></button> 
                <button style={{position:'absolute' ,left:"110px"}} onClick={MdShow} className="Atmp1">  <strong>수정</strong></button>
                <button style={{position:'absolute' ,left:"220px"}} onClick={DeShow} className="Atmp1"> <strong>삭제</strong> </button>

                </div> */}

                <Box >
              
              <button   style={{position:'absolute' ,left:"0px",top:'600px' }} onClick={handleShow} className="Atmp1">  <strong>추가</strong></button> 
              <button style={{position:'absolute' ,left:"110px",top:'600px'}}onClick={MdShow} className="Atmp1">  <strong>수정</strong></button>
              <button style={{position:'absolute' ,left:"220px",top:'600px'}} onClick={DeShow} className="Atmp1"> <strong>삭제</strong> </button>
                
              </Box>
            




            {/* 추가 */}
              {/* 등록 */}
              <Modal 
             centered
             size="lg"
         
             
            show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#005b9e',}}>
                <Modal.Title style={{color:'#ffffff'}}><strong> 사원 등록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'#f3f3f3',}}>
             

                <br/>
              
                    <Container>
                    <Grid container spacing={4}>
                    <Grid item xs={6} md={2} ml={-2} style={{fontSize:'15px' ,color:'#777777'}}>
                        <strong>사원명</strong>
                    </Grid>
                    <Grid item xs={6} md={4} ml={2} >
                    <Form.Control style={{width:'230px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>

                    <Grid item xs={6} md={2} ml={-1} style={{fontSize:'15px' ,color:'#777777'}}>
                        <strong>사원 번호</strong>
                    </Grid>
                    <Grid item xs={6} md={4} ml={0}>
                    {/* outline:'1px solid #777777'/ */}
                    <Form.Control style={{width:'230px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>
                    
                    <Grid item xs={6} md={3} ml={-2} mt={-2} style={{fontSize:'15px',color:'#777777'}}>
                       <strong>주민등록번호</strong>
                    </Grid>
                    <Grid item xs={6} md={3} ml={-5.5} mt={-2} >
                    <Form.Control style={{width:'100px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>

                    <Grid item xs={6} md={3} ml={-10} mt={-1.8} style={{fontSize:'15px',color:'#777777'}}>
                       <strong>ㅡ</strong>
                    </Grid>
                    <Grid item xs={6} md={3} ml={-20.5} mt={-2} >
                    <Form.Control style={{width:'100px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>






                    <Grid item xs={6} md={2} ml={-10} mt={-1.5}  style={{fontSize:'15px',color:'#777777'}}>
                        <strong>전화 번호</strong>
                    </Grid>
                    <Grid item xs={6} md={4} ml={0} mt={-2} >
                    <Form.Control style={{width:'230px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>





                        
                    <Grid item xs={6} md={3} ml={-2} mt={-2} style={{fontSize:'15px',color:'#777777'}}>
                       <strong>이메일</strong>
                    </Grid>
                    <Grid item xs={6} md={3} ml={-5.5} mt={-2} >
                    <Form.Control style={{width:'230px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>

                    <Grid item xs={6} md={2} ml={6.5} mt={-1.5}  style={{fontSize:'15px',color:'#777777'}}>
                        <strong>부양 가족 수</strong>
                    </Grid>
                    <Grid item xs={6} md={4} ml={0} mt={-2} >
                    <Form.Control style={{width:'230px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid> 

                    <Grid item xs={10} md={5} mt={-1.5}ml={-2} style={{fontSize:'15px',color:'#777777'}} >
                      <strong>주소</strong>
                    </Grid>

                    <Grid item xs={6} md={7}  ml={-21} mt={-2}  >



                    <InputGroup   style={{width:'600px' ,height:'30px'}}>
                      
                      <Form.Control
                          type="text"
                          name='compNum'
                          aria-describedby="btnGroupAddon"
                          style={{height:'30px'}}
                        
                      />
                        <InputGroup.Text id="btnGroupAddon"   onClick={Shshow} style={{width:'40px' ,height:'30px'}}> <SearchIcon/></InputGroup.Text>
                      </InputGroup>
                    </Grid>
                 

                    <Grid item xs={12} ml={-5} mt={-2}>
                    <hr style={{width:'800px'}}/>
                    </Grid>


                    <Grid item xs={6} md={4} mt={-1} ml={-2} style={{fontSize:'15px',color:'#777777'}}>
                       <strong>부서코드</strong>
                    </Grid>
                    <Grid item xs={6} md={4} mt={-2} ml={-13.5} >
                    
                      
                    <InputGroup   style={{width:'230px' ,height:'30px'}}>
                      
                      <Form.Control
                          type="text"
                          name='compNum'
                          aria-describedby="btnGroupAddon"
                          style={{height:'30px'}}
                        
                      />
                        <InputGroup.Text id="btnGroupAddon"   onClick={Shshow} style={{width:'40px' ,height:'30px'}}> <SearchIcon/></InputGroup.Text>
                      </InputGroup>
                

                    </Grid>
                    <Grid item xs={6} md={2} ml={-1}  mt={-1} style={{fontSize:'15px',color:'#777777'}}>
                        <strong>부서명</strong>
                    </Grid>
                    <Grid item xs={6} md={4}  ml={0} mt={-2}  >
                        <Form.Control style={{width:'230px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>


                    <Grid item xs={6} md={4} mt={-1} ml={-2} style={{fontSize:'15px',color:'#777777'}}>
                       <strong>부서코드</strong>
                    </Grid>
                    <Grid item xs={6} md={4} mt={-2} ml={-13.5} >
                      <Form.Control style={{width:'230px' ,height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>
                    <Grid item xs={6} md={2} ml={-1}  mt={-2} style={{fontSize:'15px',color:'#777777'}}>
                        <strong>직위/직급</strong>
                    </Grid>
                    <Grid item xs={6} md={4}  ml={0} mt={-2}  >
                    <Form.Control style={{width:'230px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>

                    
                    
                    <Grid item xs={2} md={2}ml={-2}  mt={-1.5} style={{fontSize:'15px',color:'#777777'}}>
                       <strong>입사일</strong>
                    </Grid>
                    <Grid item xs={2} md={1} mt={-2} ml={2}>
                     <Form.Control style={{width:'60px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>

                    <Grid item xs={2} md={1} ml={1} mt={-1.8} style={{fontSize:'15px',color:'#777777'}}>
                       <strong>/</strong>
                    </Grid>

                    <Grid item xs={2} md={1} ml={-6} mt={-2} >
                    <Form.Control style={{width:'60px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>
                    <Grid item xs={2} md={1} ml={1} mt={-1.8} style={{fontSize:'15px',color:'#777777'}}>
                       <strong>/</strong>
                    </Grid>
                    <Grid item xs={2} md={1} ml={-6} mt={-2} >
                    <Form.Control style={{width:'60px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>



                  

                    <Grid item xs={6} md={2} ml={1} mt={-1.5}  style={{fontSize:'15px',color:'#777777'}}>
                        <strong>휴가</strong>
                    </Grid>

                    <Grid item xs={6} md={2} ml={-10}mt={-2}  >
                    <Form.Control style={{width:'100px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>
                    <Grid item xs={6} md={2} ml={-1} mt={-1.5}  style={{fontSize:'15px',color:'#777777'}}>
                        <strong>잔여 휴가</strong>
                    </Grid>

                    <Grid item xs={6} md={1} ml={-4} mt={-2} >
                    <Form.Control style={{width:'100px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid >
                    
                    
                    <Grid item xs={6} md={4} mt={-2} ml={-2} style={{fontSize:'15px',color:'#777777'}}>
                       <strong>퇴사일</strong>
                    </Grid>
                    <Grid item xs={6} md={4} mt={-2} ml={-13.5} >
                    <Form.Control style={{width:'230px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>
                    <Grid item xs={6} md={2} ml={-1}  mt={-2} style={{fontSize:'15px',color:'#777777'}}>
                        <strong>퇴사 사유</strong>
                    </Grid>
                    <Grid item xs={6} md={4}  ml={0} mt={-2}  >
                    <Form.Control style={{width:'230px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>


                    <Grid item xs={12} ml={-5} mt={-4}>
                    <hr style={{width:'800px'}}/>
                    </Grid>
                    
                    <Grid item xs={6} md={6} ml={16} mt={-3}  style={{fontSize:'15px',color:'#777777'}}>
                      <strong> 은행</strong>
                    </Grid>

                    <Grid item xs={6} md={6} ml={-32}mt={-4}  >
                    
                    <Form.Control style={{width:'280px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>


                    
                    <Grid item xs={6} md={4}  ml={-2}mt={2}  style={{fontSize:'15px' ,color:'#777777'}}>
                       <div ><strong> 급여 통장</strong></div>
                    </Grid>



                
                    <Grid item xs={6} md={4} ml={-13.5} mt={-2}  style={{fontSize:'15px',color:'#777777'}}>
                       <strong> 계좌 번호</strong>
                    </Grid>

                    <Grid item xs={6} md={4} ml={-16} mt={-2} >
                    <Form.Control style={{width:'280px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>


                    <Grid item xs={6} md={6} ml={16} mt={-5} style={{fontSize:'15px',color:'#777777'}} >
                       <strong>예금주</strong>
                    </Grid>

                    <Grid item xs={6} md={6} ml={-31.5}mt={-5}  >
                    <Form.Control style={{width:'280px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
                    </Grid>
                    
                    <Grid item xs={6} md={6} ml={16} mt={-2} style={{fontSize:'15px',color:'#777777'}} >
                       <strong>연봉</strong>
                    </Grid>

                    <Grid item xs={6} md={6} ml={-31.5}mt={-2}  >
                    <Form.Control style={{width:'280px',height:'30px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" />
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
            {/* <Modal 
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
            </Modal> */}

            <Modal
                centered
                size="xsm"
                // style={{width:'500px'}}
                show={ModifyShow} onHide={MdClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#005b9e', width:'500px',height:'70px'}}>
                    <Modal.Title  style={{color:'#ffffff'}}><strong>사용자관리 수정</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'#f3f3f3', width:'500px'}}>
                    <Container>
                    <Grid container spacing={4}>
                  

                        <Grid item xs={6} md={6} ml={3} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>입사 일자</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12}>
                        {/* <input style={{width:'250px',height:'40px'}} name="saveId" type="text" onChange={onChangeAddData}></input> */}
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                        name="userId" type="text"  />
                        </Grid>
                        <Grid item xs={6} md={6} ml={3} mt={-2}style={{fontSize:'20px',color:'#777777'}}>
                            <strong>사원번호</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                         name="userPw" type="password"  />
                        </Grid>


                        <Grid item xs={6} md={6} ml={3}mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>사원명</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                         name="userName" type="text"  />
                        </Grid>
                        <Grid item xs={6} md={6} ml={3}mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>부서명</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                         name="userName" type="text"  />
                        </Grid>
                        <Grid item xs={6} md={6} ml={3}mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>직위/직급</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                         name="userName" type="text"  />
                        </Grid>
                        <Grid item xs={6} md={6} ml={3}mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>은행</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                         name="userName" type="text"  />
                        </Grid>
                        <Grid item xs={6} md={6} ml={3}mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>계좌번호</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                         name="userName" type="text"  />
                        </Grid>
                        <Grid item xs={6} md={6} ml={3}mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>Email</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                         name="userName" type="text"  />
                        </Grid>

                   
                        <Grid item xs={6} md={6} ml={3} mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>혹시 검색할게 있나?</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        {/* <input style={{width:'250px',height:'40px'}}name="saveAdvice" type="text" onChange={onChangeAddData}></input> */}
                        <InputGroup   style={{width:'250px' ,height:'40px'}}>
                      
                        <Form.Control
                            type="text"
                            name='userGrant'
                            aria-describedby="btnGroupAddon"
                            style={{height:'40px'}}
                             
                                   
                        />
                            <InputGroup.Text id="btnGroupAddon"   onClick={Shshow} style={{width:'50px' ,height:'40px'}}> <SearchIcon/></InputGroup.Text>
                        </InputGroup>
                        </Grid>


                        
                       
                     </Grid>
                </Container>
                </Modal.Body>
                <Modal.Footer style={{width:'500px',backgroundColor:'#ffffff' }}>
                    <Button variant="secondary" onClick={MdClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={MdClose}>
                        저장
                    </button>
                </Modal.Footer>
            </Modal>



            {/* 수정 */}
         
            {/* 삭제 */}
            <Modal
                centered
                size="xsm"
                show={DelShow} onHide={DelClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#2F58B8',width:'500px'}}>
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

export default PMBcom;