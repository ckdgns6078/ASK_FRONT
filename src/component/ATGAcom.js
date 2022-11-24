import { Alert, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Rsearch from './Rsearch';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
// 버튼을 내릴려고 하다 밥먹으러 갔음 ㅇㅇ

const ATGAcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
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
        axios.post('http://192.168.2.82:5000/readUser', {
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
            axios.post('http://192.168.2.82:5000/createUser', {
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
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong> 휴가항목 등록 </strong></h2>
            <br />
            <br />
            <br />
    



               
                <Table >
                    <thead style={{ height: '60px' }}>
                        <tr style={{ backgroundColor: '#ecf0f1', border: "1px solid #f1f2f6" }}>
                       
                            <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                                <strong>휴가코드</strong>
                            </td>
                            <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                                <strong>휴가명</strong>
                            </td>
                            <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                                <strong>휴가상세내용</strong>
                            </td>

                        </tr>
                    </thead>
                    {/* onClick={()=>ShBtn(e)} */}
                    <tbody>
                       
                        {
                            data && data.map((e, idx) =>
                                <tr >
                                  
                                    <td style={{ border: "1px solid #f1f2f6",fontSize: '22px', color: '#777777' }}>휴가코드 넣을거</td>
                                    <td style={{ border: "1px solid #f1f2f6",fontSize: '22px', color: '#777777' }}>휴가명</td>
                                    <td style={{ border: "1px solid #f1f2f6",fontSize: '22px', color: '#777777' }}>휴가상세 머시기 받아올거</td>

                                </tr>
                            )
                        }
                    </tbody>
                </Table>


        

            

     
            <Box>
                <button style={{ position: 'absolute', left: "0px" ,top: '550px'}} onClick={handleShow} className="Atmp1">  <strong>추가</strong></button>
                <button style={{ position: 'absolute', left: "110px" ,top: '550px'}} onClick={MdShow} className="Atmp1">  <strong>수정</strong></button>
                <button style={{ position: 'absolute', left: "220px" ,top: '550px'}} onClick={DeShow} className="Atmp1"> <strong>삭제</strong> </button>

            </Box>




            {/* 추가 */}
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
                            <strong>휴가코드</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12}>
                        {/* <input style={{width:'250px',height:'40px'}} name="saveId" type="text" onChange={onChangeAddData}></input> */}
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                       type='text' name='adddepCode' onChange={onChangeAddData}/>
                        </Grid>
                        <Grid item xs={6} md={6} ml={3} mt={-2}style={{fontSize:'20px',color:'#777777'}}>
                            <strong>휴가명</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                        type='text' name='adddepName' onChange={onChangeAddData}/>
                        </Grid>


                        <Grid item xs={6} md={6} ml={3}mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>휴가상세내용</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                        type='text' name='adddepDetail' onChange={onChangeAddData}/>
                        </Grid>                    
                     </Grid>
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
            {/* <Modal
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
            </Modal> */}



            {/* 검색  */}
            <Modal
                centered
                size="xsm"
                show={DelShow} onHide={DelClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', width: '500px' }}>
                    <Modal.Title style={{ color: '#ffffff', width: '500px' }}>삭제확인</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6', width: '500px', }}>
                    <strong>를 삭제하시겠습니까?</strong></Modal.Body>
                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={DelClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={DelClose}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>





        </div>
    );
};

export default ATGAcom;