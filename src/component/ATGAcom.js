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
import { message, Space } from 'antd';
// 버튼을 내릴려고 하다 밥먹으러 갔음 ㅇㅇ

const ATGAcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);
    const [addData, setAddData] = useState({    //추가 관련 변수
        addvactCode: null,
        addvactDetail: null,
        addvactName: null,
        vactNameListId: null,
    });
    const [modifyData, setModifyData] = useState({
        modifyvactCode: null,
        modifyvactDetail: null,
        modifyvactName: null,
        modifyvactNameListId: null,
    });

    //alert 창
    const [messageApi, contextHolder] = message.useMessage();
    //성공 alert
    const success = (contentText) => {
        messageApi.open({
            type: 'success',
            content: contentText,
        });
    };
    //실패 alert
    const error = (contentText) => {
        messageApi.open({
            type: 'error',
            content: contentText,
        });
    };
    //주의 alert
    const warning = (contentText) => {
        messageApi.open({
            type: 'warning',
            content: contentText,
        });
    };


    //초기 저장된 데이터베이스 값 가져오기
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {    //초기값 가져오는 함수
        axios.post('http://192.168.2.82:5000/read_Vactcategory', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (er) {
            console.log("readDep error :", error);
            let contentText = "데이터를 호출 에러 발생";
            error(contentText);
        });
    }


    //입력값 onChange 함수

    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        setAddData({
            ...addData,
            [name]: value
        });

    }
    //수정 onChange
    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
        });
    }


    //저장
    const handleClose = () => {
        setShow(false);
        setAddData({
            "addvactCode": null,
            "addvactDetail": null,
            "addvactName": null,
            "vactNameListId": null,
        })
    }
    const handleShow = () => setShow(true);
    //수정
    const MdClose = () => setModifyShow(false);
    const MdShow = (e) => {
        axios.post('http://192.168.2.82:5000/modal_Vactcategory ', {
            vactNameListId: e.vactNameListId
        }).then(function (response) {

            setModifyData({
                "modifyvactCode": response.data[0].vactCode,
                "modifyvactDetail": response.data[0].vactDetail,
                "modifyvactName": response.data[0].vactName,
                "modifyvactNameListId": response.data[0].vactNameListId
            });
        }).catch(function (er) {
            console.log("updataEmpModal error", er);
            let contentText = "데이터를 가져오는데 실패했어요 다시 시도해주세요";
            error(contentText);
        });
        setModifyShow(true);
    }
    //삭제
    const DeShow = () => setMDelShow(true);
    const DeClose = () => setMDelShow(false);

    //추가 데이터 넣기 함수
    const pushAddData = () => {
        axios.post('http://192.168.2.82:5000/create_Vactcategory ', {
            compCode: sessionStorage.getItem("uid"),
            vactCode: addData.addvactCode,
            vactDetail: addData.addvactDetail,
            vactName: addData.addvactName,
        }).then(function (response) {
            if (response.data) {
                let contentText = "        수당 등록 완료        ";
                getData();
                success(contentText);
                handleClose();
            }
            if (!response.data) {
                let contentText = "        이미 등록되어있는 휴가 코드가 있습니다. 다른 휴가코드를 선택하세요.       ";
                warning(contentText);
            }
        }).catch(function (er) {
            console.log("createEmp error", er);
            let contentText = "서버 연동 에러 발생";
            error(contentText);
        });
    }

    //수정 데이터 넣기
    const pushModifyData = () => {
        axios.post('http://192.168.2.82:5000/update_Vactcategory', {
            compCode: sessionStorage.getItem("uid"),
            vactNameListId: modifyData.modifyvactNameListId,
            vactCode: modifyData.modifyvactCode,
            vactName: modifyData.modifyvactName,
            vactDetail: modifyData.modifyvactDetail
        }).then(function (response) {
            if (response.data) {
                getData();
                MdClose();
                let contentText = "        휴가정보 수정완료        ";
                success(contentText);
            }
            if (!response.data) {
                let contentText = "이미 존재하는 휴가코드입니다. 다른 휴가코드를 입력하세요.";
                warning(contentText);
            }
        }).catch(function (er) {
            let contentText = "        에러 발생        ";
            error(contentText);
            console.log("updataEmp error", er);
        });

    }

    //삭제 데이터 넣기
    const pushDeleteData = () => {
        console.log("modifyData.vact" , modifyData.modifyvactNameListId);
        axios.post('http://192.168.2.82:5000/delete_Vactcategory ', {
            vactNameListId: modifyData.modifyvactNameListId
        }).then(function (response) {
            console.log("delete_Vactcategory 값 ", response.data);
            if (response.data) {
                getData();
                MdClose();
                DeClose();
                let contentText = " 휴가 삭제 완료";
                success(contentText);
            }
            if (!response.data) {
                let contentText = " 휴가 삭제 실패 , 다시 실행해주세요";
                warning(contentText);
            }
        }).catch(function (er) {
            console.log("delete_Vactcategory error", er);
            let contentText = " 에러 발생 ";
            error(contentText);
        })
    }

    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: '#005b9e', position: 'absolute', left: '0', top: '0px' }}><strong> 휴가항목 등록 </strong></h2>
            <Box>
                <button style={{ position: 'absolute', right: "0px", }} onClick={handleShow} className="Atmp1">  <strong>추가</strong></button>
            </Box>

            <br />
            <br />
            <br />





            <Table hover>
                <thead style={{ height: '60px' }}>
                    <tr style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>

                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            휴가코드
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            휴가명
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            휴가상세내용
                        </td>

                    </tr>
                </thead>
                {/* onClick={()=>ShBtn(e)} */}
                <tbody>

                    {
                        data && data.map((e, idx) =>
                            <tr >

                                <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}>{e.vactCode}</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}><Button name={e.vactNameListId} style={{ fontSize:'22px'}}onClick={() => MdShow(e)} variant="link"><strong>{e.vactName}</strong></Button></td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}>{e.vactDetail}</td>

                            </tr>
                        )
                    }
                </tbody>
            </Table>
          



            {/* 추가 */}
            <Modal
                centered
                size="lg"


                show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>휴가등록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '', }}>


                    

                <Table style={{textAlign:'center'}}>
                            <tr>
                                <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'80px' }}>휴가코드</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                                <Form.Control style={{  height: '57px' ,textAlign:'center'}} aria-describedby="btnGroupAddon"
                                    type='text' name='addvactCode' onChange={onChangeAddData} />
                                </td>
                                <td style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" ,width:'80px'}}>휴가명</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                                <Form.Control style={{  height: '57px',textAlign:'center' }} aria-describedby="btnGroupAddon"
                                    type='text' name='addvactName' onChange={onChangeAddData} />
                                </td>
                                <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'80px' }}>휴가상세내용</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                                <Form.Control style={{  height: '57px',textAlign:'center' }} aria-describedby="btnGroupAddon"
                                    type='text' name='addvactDetail' onChange={onChangeAddData} />
                                </td>
                            </tr>
                        </Table>



                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={handleClose}>
                        <strong>취소</strong>
                    </Button>
                    <button className="addButton" onClick={pushAddData}>
                        <strong>추가</strong>
                    </button>
                </Modal.Footer>
            </Modal>

            {/* 수정 */}
            <Modal
                centered
                size="lg"


                show={ModifyShow} onHide={MdClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>휴가정보</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '', }}>



                        
                <Table style={{textAlign:'center'}}>
                            <tr>
                                <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'80px',color: '#777777' }}>휴가코드</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>
                              

                                <Form.Control style={{ height: '57px' ,textAlign:'center' }} aria-describedby="btnGroupAddon"
                                    type='text' name='modifyvactCode' value={modifyData.modifyvactCode} onChange={onChangeModifyData} />
                                </td>
                                <td style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" ,width:'80px',color: '#777777'}}>휴가명</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>
                                <Form.Control style={{ height: '57px' ,textAlign:'center' }} aria-describedby="btnGroupAddon"
                                    type='text' name='modifyvactName' value={modifyData.modifyvactName} onChange={onChangeModifyData} />
                                </td>
                                <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'120px',color: '#777777' }}>휴가상세내용</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>
                                <Form.Control style={{ height: '57px' ,textAlign:'center' }}  aria-describedby="btnGroupAddon"
                                    type='text' name='modifyvactDetail' value={modifyData.modifyvactDetail} onChange={onChangeModifyData} />
                                </td>
                            </tr>
                        </Table>


                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={MdClose}>
                        <strong>취소</strong>
                    </Button>
                    <button className="addButton" onClick={DeShow}>
                        <strong>삭제</strong>
                    </button>
                    <button className="addButton" onClick={pushModifyData}>
                        <strong>수정</strong>
                    </button>
                </Modal.Footer>
            </Modal>


            {/* 삭제 */}
            <Modal
                centered
                size="xsm"
                show={DelShow} onHide={DeClose} animation={true}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', width: '500px' }}>
                    <Modal.Title style={{ color: '#ffffff', width: '500px' } }><strong>삭제확인</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6', width: '500px', }}>
                    <strong>{modifyData.modifyvactName}를 삭제하시겠습니까?</strong></Modal.Body>
                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={DeClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={pushDeleteData}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>


    


        </div>
    );
};

export default ATGAcom;