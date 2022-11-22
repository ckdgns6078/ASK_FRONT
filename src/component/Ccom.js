import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';




const Ccom = () => {
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
        <div style={{width:'1080px' ,position:'relative'}}>
             <h2  style={{color:' #2F58B8' ,position:'absolute' ,left:'0' ,top:'0px'}}><strong>사용자 관리 </strong></h2>
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
                <tr style={{backgroundColor:'#bdc3c7' , }}>
                <td style={{border:"1px solid gray"}}>
                    <Checkbox {...label} defaultChecked />
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>아이디</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>비밀번호</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>사원 코드</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>사용자명</strong>
                    </td>
                </tr>  
       
                    

                  {
                        data && data.map((e, idx) =>
                        <tr >
                            <td><Checkbox {...label} defaultChecked /></td>
                            <td>아이디 넣을거</td>
                            <td>비번</td>
                            <td>사용자 머시기 받아올거</td>
                            <td>권한 머시기</td>
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
                <button   style={{position:'absolute' ,left:"0px"}} onClick={handleShow} className="Atmp1">  <strong>추가</strong></button> 
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
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>추가!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                   추가
                </Button>
                </Modal.Footer>
            </Modal>

            {/* 수정 */}
            <Modal 
             centered
             size="xl"
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

export default Ccom;