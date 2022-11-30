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
import axios from 'axios';
import { message, Space } from 'antd';


const PMCcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
    const [addData, setAddData] = useState({
        addcompCode: null, // compCode
        adddepCode: null, // depCode
        adddepName: null, // depName
        adddepDetail: null, // depDetail

    });
    const [modifyData, setModifyData] = useState({
        modifycompCode: null, // compCode
        modifydepCode: null, // depCode
        modifydepName: null, // depName
        modifydepDetail: null, // depDetail
        modifydepId: null,
    });
    //모달 함수
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);
    const [SH, setSh] = useState(false);
    const handleClose = () => {
        setShow(false);
        setAddData({
            "addcompCode": null, // compCode
            "adddepCode": null, // depCode
            "adddepName": null, // depName
            "adddepDetail": null, // depDetail
        });
    }
    const handleShow = () => setShow(true);
    const DeClose = () => setMDelShow(false);
    const DeShow = () => setMDelShow(true);
    const MdClose = () => setModifyShow(false);

    const MdShow = (e) => {
        axios.post('http://192.168.2.82:5000/updateDepModal', {
            depId: e.depId,
        }).then(function (response) {
            setModifyData({
                "modifydepId": response.data[0].depId,
                "modifycompCode": response.data[0].compCode, // compCode
                "modifydepCode": response.data[0].depCode, // depCode
                "modifydepName": response.data[0].depName, // depName
                "modifydepDetail": response.data[0].depDetail, // depDetail
            });
        }).catch(function (er) {
            console.log("updataEmpModal error", er);
            let contentText = "데이터를 가져오는데 실패했어요 다시 시도해주세요";
            error(contentText);
        });
        setModifyShow(true);
    }
    const ShClose = () => setSh(false);
    const Shshow = () => setSh(true);

    //alert 창
    const [messageApi, contextHolder] = message.useMessage();
    //성공 alert
    const success = (contentText) => {
        messageApi.open({
            type: 'success',
            content: contentText,
            className: 'custom-class',
            style: {
                marginTop: '20vh',

            },

        });
    };
    //실패 alert
    const error = (contentText) => {
        messageApi.open({
            type: 'error',
            content: contentText,
            className: 'custom-class',
            style: {
                marginTop: '20vh',
                width: '500px'
            },
        });
    };
    //주의 alert
    const warning = (contentText) => {
        messageApi.open({
            type: 'warning',
            content: contentText,
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {    //초기값 가져오는 함수
        axios.post('http://192.168.2.82:5000/readDep', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (er) {
            console.log("readDep error :", error);
            let contentText = "데이터를 호출 에러 발생";
            error(contentText);
        });
    }

    //추가 onChange
    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        setAddData({
            ...addData,
            [name]: value
        })
    }
    //수정 onChange
    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
        })
    }
    //추가 데이터 넣기 함수
    const pushAddData = () => {
        axios.post('http://192.168.2.82:5000/createDep', {
            compCode: sessionStorage.getItem("uid"),
            depCode: addData.adddepCode,
            depName: addData.adddepName,
            depDetail: addData.adddepDetail,
        }).then(function (response) {
            if (response.data) {
                let contentText = "        부서 추가 완료        ";
                getData();
                success(contentText);
                handleClose();
            }
            if (!response.data) {
                let contentText = "부서 코드가 이미 존재합니다. 부서 코드를 변경해주세요";
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
        axios.post('http://192.168.2.82:5000/updateDep', {
            compCode: modifyData.modifycompCode, // compCode
            depCode: modifyData.modifydepCode, // depCode
            depName: modifyData.modifydepName, // depName
            depDetail: modifyData.modifydepDetail, // depDetail
            depId: modifyData.modifydepId
        }).then(function (response) {
            if (response.data) {
                getData();
                MdClose();
                let contentText = "        부서코드 수정 완료        ";
                success(contentText);
            }
            if (!response.data) {
                let contentText = "이미 존재하는 부서코드입니다. 다른 부서코드를 입력하세요.";
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
        axios.post('http://192.168.2.82:5000/deleteDep', {
            depId: modifyData.modifydepId
        }).then(function (response) {
            if (response.data) {
                getData();
                MdClose();
                DeClose();
                let contentText = " 부서 삭제 성공";
                success(contentText);
            }
            if (!response.data) {
                let contentText = " 부서 삭제 실패 , 다시 실행해주세요";
                warning(contentText);
            }
        }).catch(function (er) {
            console.log("deleteEmp error", er);
            let contentText = " 에러 발생 ";
            error(contentText);
        })
    }

    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong>부서관리</strong></h2>
            <Box >
                <button style={{ position: 'absolute', right: "0px", }} onClick={handleShow} className="Atmp1"><strong>등록</strong></button>
            </Box>

            <br />
            <br />
            <br />

            <Table hover >
                <thead style={{ height: '60px' }}>
                    <tr style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>부서코드</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>부서명</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>부서상세</strong>
                        </td>

                    </tr>
                </thead>
                {/* onClick={()=>ShBtn(e)} */}
                <tbody>
                    {
                        data && data.map((e, idx) =>
                            <tr style={{ height: '60px' }} >
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}><strong> {e.depCode}</strong> </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}><Button name={e.depId} onClick={() => MdShow(e)} variant="link"><strong>{e.depName}</strong></Button></td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}><strong>{e.depDetail}</strong></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
     

            {/* 등록 */}

            <Modal
                centered
                size="lg"


                show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>부서관리</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '', }}>
                        <Table style={{textAlign:'center'}}>
                            <tr>
                                <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'80px' }}>부서코드</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                                <Form.Control style={{  height: '57px' }} aria-describedby="btnGroupAddon"
                                    type='text' name='adddepCode' onChange={onChangeAddData} />
                                </td>
                                <td style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" ,width:'80px'}}>부서명</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                                <Form.Control style={{  height: '57px' }} aria-describedby="btnGroupAddon"
                                    type='text' name='adddepName' onChange={onChangeAddData} />
                                </td>
                                <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'80px' }}>부서상세</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                                <Form.Control style={{  height: '57px' }} aria-describedby="btnGroupAddon"
                                    type='text' name='adddepDetail' onChange={onChangeAddData} />
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



                    {/* 부서상세 */}
            <Modal
                centered
                size="lg"
                show={ModifyShow} onHide={MdClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e' }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>부서상세</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '', }}>


                <Table style={{textAlign:'center'}}>
                            <tr>
                                <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'80px' }}>부서코드</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                             
                                        <Form.Control style={{ height: '57px' }} aria-describedby="btnGroupAddon"
                                    type='text' name='modifydepCode' value={modifyData.modifydepCode} onChange={onChangeModifyData} />
                                </td>
                                <td style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" ,width:'80px'}}>부서명</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                             
                                       <Form.Control style={{ height: '57px' }} aria-describedby="btnGroupAddon"
                                    type='text' name='modifydepName' value={modifyData.modifydepName} onChange={onChangeModifyData} />
                                    
                                </td>
                                <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'80px' }}>부서상세</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                                <Form.Control style={{  height: '57px' }} aria-describedby="btnGroupAddon"
                                    type='text' name='modifydepDetail' value={modifyData.modifydepDetail} onChange={onChangeModifyData} />
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







            {/* 삭제 확인창 */}
            <Modal
                centered
                size="xsm"
                show={DelShow} onHide={DeClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', width: '500px' }}>
                    <Modal.Title style={{ color: '#ffffff', width: '500px' }}>삭제확인</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6', width: '500px', }}>
                    <strong>{modifyData.modifydepName}를 삭제하시겠습니까?</strong></Modal.Body>
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

export default PMCcom;