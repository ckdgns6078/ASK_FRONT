import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';

import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import { height } from '@mui/system';


const BAPAcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
    const [OKdata, setOKData] = useState();
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);
    const [addData, setAddData] = useState({    //추가 관련 변수
        saveId: '',
        savePw: '',
        saveUser: '',
        saveAdvice: ''
    });

    //초기 저장된 데이터베이스 값 가져오기
    useEffect(() => {
        axios.post('http://192.168.2.82:5d8d8d8/readUser', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (error) {
            console.log("readUser error", error);
        });
    }, []);


    //입력값 onChange 함수
    const { saveId, savePw, saveUser, saveAdvice } = addData;
    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        setAddData({
            ...addData,
            [name]: value
        });
        console.log(addData);
    }

    //추가 모델에서 추가 눌렀을경우 함수
    const pushAddData = () => {

        if (addData.saveId == '' || addData.savePw == '' || addData.saveUser == '' || addData.saveAdvice == '') {
            window.alert("공란은 입력할 수 없습니다.");
        } else {
            axios.post('http://192.168.2.82:5d8d8d8/createUser', {
                userId: addData.saveId,
                userPw: addData.savePw,
                userName: addData.saveUser,
                userGrant: addData.saveAdvice,
                compCode: sessionStorage.getItem("uid")
            }).then(function (response) {
                if (!response.data) {
                    window.alert("중복 아이디는 추가할 수 없습니다.");
                } else {
                    window.alert("추가 완료");
                    handleClose();
                    setAddData({
                        "saveId": '',
                        "savePw": '',
                        "saveUser": '',
                        "saveAdvice": '',
                    })
                }
            }).catch(function (error) {
                console.log("createUser error :", error);
            });

        }

    }


    //추가 모델에서 닫기 눌렀을 경우
    const closeAddData = () => {
        handleClose();
        if (show) {
            console.log("if문 실행");
            setAddData({
                "saveId": '',
                "savePw": '',
                "saveUser": '',
                "saveAdvice": '',
            });
        }
    }

    //저장
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //수정
    const DelClose = () => setMDelShow(false);
    const DeShow = () => setMDelShow(true);
    //삭제
    const MdClose = () => setModifyShow(false);
    const MdShow = () => setModifyShow(true);
    //권한




    //체크박스 관련 ---------------------------------------
    const [isChecked, setIsChecked] = useState(false); //체크여부
    const [checkedItems, setCheckedItems] = useState(new Set());

    const checkHandler = ({ target }) => {
        setIsChecked(!isChecked);
        checkedItemHandle(target.value, target.checked);
    }

    const checkedItemHandle = (id, isChecked) => {
        if (isChecked) {
            checkedItems.add(id);
            setCheckedItems(checkedItems);
            console.log("if문 checked ", checkedItems);
        } else if (!isChecked && checkedItems.has(id)) {
            checkedItems.delete(id);
            setCheckedItems(checkedItems);
            console.log("else문 checked", checkedItems);
        }
        return checkedItems;
    }





    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong>거래처 관리 </strong></h2>
            <Box >
                    
                    <button   style={{position:'absolute' ,right:"180px",}} onClick={handleShow} className="Atmp1">  <strong>추가</strong></button> 
                    <button style={{position:'absolute' ,right:"90px",}}onClick={DeShow} className="Atmp1">  <strong>수정</strong></button>
                    <button style={{position:'absolute' ,right:"0px",}} onClick={MdShow} className="Atmp1"> <strong>삭제</strong> </button>
                        
                    </Box>
            <br />
            <br />
            <br />
            


            <Table >
                <thead style={{ height: '60px' }}>
                    <tr style={{backgroundColor:'#f7f7f7' , textAlign:'center', border: "1px solid #d8d8d8" }}>
                        {/* <td style={{border:"1px solid #d8d8d8", color: '#d8d8d8', fontSize: '22px'}}>
                        <Checkbox {...label} defaultChecked />
                        </td> */}
                        <td style={{border:"1px solid #d8d8d8", color: '#777777', fontSize: '22px'}}>
                            <strong>거래처명</strong>
                        </td>
                        <td style={{border:"1px solid #d8d8d8", color: '#777777', fontSize: '22px'}}>
                            <strong>대표자명</strong>
                        </td>
                        <td style={{border:"1px solid #d8d8d8", color: '#777777', fontSize: '22px'}}>
                            <strong>사업자 등록번호</strong>
                        </td>
                        <td style={{border:"1px solid #d8d8d8", color: '#777777', fontSize: '22px'}}>
                            <strong>연락처</strong>
                        </td>
                        <td style={{border:"1px solid #d8d8d8", color: '#777777', fontSize: '22px'}}>
                            <strong>Email</strong>
                        </td>
                       

                    </tr>                 
                 </thead>
                <tbody>

                {
                        data && data.map((e, idx) =>
                        <tr  style={{border:"1px solid gray"}} >
                            {/* <td style={{border:"1px solid #d8d8d8", color: '#d8d8d8', fontSize: '22px'}}><Checkbox {...label} defaultChecked /></td> */}
                            <td style={{border:"1px solid #d8d8d8", color: '#000', fontSize: '22px'}}><Button  variant="link" onClick={DeShow}><strong>거래처명</strong></Button></td>
                            <td style={{border:"1px solid #d8d8d8", color: '#000', fontSize: '22px'}}><strong>대표자명</strong></td>
                            <td style={{border:"1px solid #d8d8d8", color: '#000', fontSize: '22px'}}><strong> 사업자 번호</strong></td>
                            <td style={{border:"1px solid #d8d8d8", color: '#000', fontSize: '22px'}}><strong>연락처</strong></td>
                            <td style={{border:"1px solid #d8d8d8", color: '#000', fontSize: '22px'}}><strong>Email</strong></td>
                         
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
                <Modal.Header closeButton style={{backgroundColor:'#005b9e',}}>
                <Modal.Title style={{color:'#ffffff'}}><strong>부서관리</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'',}}>
            
                <Container>
                    <Table style={{
                        textAlign: "center",
                        width: "100%", border: "1px solid #d8d8d8",
                    }} >
                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px' ,width:'150px'  , backgroundColor: '#f7f7f7',color:'#777777'}}>사업자등록번호</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'  ,width:'300px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'  ,width:'150px', backgroundColor: '#f7f7f7',color:'#777777'}}>사업자명</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px' ,width:'150px', backgroundColor: '#f7f7f7',color:'#777777'}}>연락처</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                    </tr>
                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>상호</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>종목</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>업태</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                    </tr>

                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>이메일</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>주소</td>
                        <td colSpan='3' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                    </tr>
                    <tr>
                    <td rowSpan='3' style={{borderLeft:'1px solid #d8d8d8 ', height:'40px',borderBottom:'1px solid #d8d8d8 ', height:'40px' , backgroundColor: '#f7f7f7',color:'#777777'}}>통장</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>은행</td>
                        <td colSpan='4' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                    </tr>
                    <tr>
                      
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>계좌번호</td>
                        <td colSpan='4' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                    </tr>
                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>예금주</td>
                        <td colSpan='4' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                    </tr>
                    </Table>


                </Container>
            </Modal.Body>
                <Modal.Footer style={{ backgroundColor:'#ffffff'}}>
                <Button variant="secondary" onClick={handleClose}>
                    <strong>취소</strong>
                </Button>
                <button className="addButton"  onClick={pushAddData}>
                    <strong>추가</strong>
                </button>
                </Modal.Footer>
            </Modal>
            


            {/* 수정  */}
            <Modal
                centered
                size="xl"
                show={DelShow} onHide={DelClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong> 상세 확인</strong> </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <Container>
                    <Table style={{
                        textAlign: "center",
                        width: "100%", border: "1px solid #d8d8d8",
                    }} >
                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px' ,width:'150px'  , backgroundColor: '#f7f7f7',color:'#777777'}}>사업자등록번호</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'  ,width:'300px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'  ,width:'150px', backgroundColor: '#f7f7f7',color:'#777777'}}>사업자명</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px' ,width:'150px', backgroundColor: '#f7f7f7',color:'#777777'}}>연락처</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                    </tr>
                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>상호</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>종목</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>업태</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                    </tr>

                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>이메일</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>주소</td>
                        <td colSpan='3' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                    </tr>
                    <tr>
                    <td rowSpan='3' style={{borderLeft:'1px solid #d8d8d8 ', height:'40px',borderBottom:'1px solid #d8d8d8 ', height:'40px' , backgroundColor: '#f7f7f7',color:'#777777'}}>통장</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>은행</td>
                        <td colSpan='4' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                    </tr>
                    <tr>
                      
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>계좌번호</td>
                        <td colSpan='4' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                    </tr>
                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>예금주</td>
                        <td colSpan='4' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                    </tr>
                    </Table>


                </Container>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={DelClose}>
                        추가
                    </Button>
                    <Button variant="primary" onClick={DelClose}>
                        저장
                    </Button>
                    <Button variant="secondary" onClick={DelClose}>
                        닫기
                    </Button>
                </Modal.Footer>

            </Modal>





        </div>
    );
};

export default BAPAcom;