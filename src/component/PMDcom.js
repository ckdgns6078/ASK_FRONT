import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from '@mui/material/Container';

const PMDcom = () => {
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
    
    //세금
    const [taxdata, setTaxData] = useState();



    return (
        <div style={{width:'1080px' ,position:'relative'}}>
             <h2  style={{color:' #2F58B8' ,position:'absolute' ,left:'0' ,top:'0px'}}><strong>세금 관리 </strong></h2>
            <br/>
            <br/>
            <br/>
            <table style={{
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
                        <strong>세금 코드</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>세금명</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>세금 항목</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>비고</strong>
                    </td>
                    
                
                </tr>  
       
                    

                  {
                        data && data.map((e, idx) =>
                        <tr >
                            <td><Checkbox {...label} defaultChecked /></td>
                            <td>세금 코드 넣을곳</td>
                            <td>세금명 넣을곳</td>
                            <td> 세금 항목 받아올거</td>
                            <td>비고 넣을곳 </td>
                          
                        
                        </tr>
                        )
                    }
                    <tr >
                    <td style={{border:"1px solid gray"}}>
                    <Checkbox {...label} defaultChecked />
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>0001</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>4대보험@</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>국민연금</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong></strong>
                    </td>
                   
                
                </tr>  

                    
             

            </table> 
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/><br/><br/><br/>
            <hr style={{width:'1350px'}}></hr>
          
            {/* <Grid componenter style={{position:'absolute', }}>
                <Grid item  sx={{md:3}}><button  onClick={handleShow} className="Atmp1">  추가</button> </Grid>
                <Grid   sx={{md:-50}}><button  onClick={MdShow} className="Atmp1">  수정</button></Grid>
                <Grid   sx={{md:30}} > <button onClick={DeShow} className="Atmp1">  삭제</button></Grid>
            </Grid> */}
                <div>
                <button   style={{position:'absolute' ,left:"0px"}} onClick={handleShow} className="Atmp1">  <strong>등록</strong></button> 
                <button style={{position:'absolute' ,left:"110px"}} onClick={MdShow} className="Atmp1">  <strong>수정</strong></button>
                <button style={{position:'absolute' ,left:"220px"}} onClick={DeShow} className="Atmp1"> <strong>삭제</strong> </button>

                </div>
              <br/>  
              <br/>  
              <br/>  
              <hr style={{width:'1350px'}}></hr>




            {/* 추가 */}
            <Modal 
             centered
             size="xl"
            show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#2F58B8',}}>
                <Modal.Title style={{color:'#ffffff'}}><strong> 사원 등록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'#f1f2f6'}}>
             
                <Container> 
                <br/>
                <table style={{border:'1px solid', width:'1000px', textAlign:"center", }}>
                    <tr  style={{border:'1px solid'}}>
                        <td  style={{border:'1px solid'}}> </td>
                        <td  style={{border:'1px solid'}}>세금 목록</td>
                        <td  style={{border:'1px solid'}}>  <Checkbox {...label} defaultChecked /> </td>
                    </tr>
                    
                    { 
                       
                            taxdata && taxdata.map((e,idx) =>
                        <tr>  
                            <td  style={{border:'1px solid'}}>{idx + 1}</td>
                            <td  style={{border:'1px solid'}}> 세금명 넣을거</td>
                            <td  style={{border:'1px solid'}}>  <Checkbox {...label} defaultChecked /> </td>
                        </tr>  

                    )}

                    <tr>
                        <td  style={{border:'1px solid'}}>1</td>
                        <td  style={{border:'1px solid'}}>소득세</td>
                        <td  style={{border:'1px solid'}}><Checkbox {...label} defaultChecked /></td>
                    </tr>
                </table>
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

export default PMDcom;