import { Grid, TextField } from '@mui/material';
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
import zIndex from '@mui/material/styles/zIndex';

const ATGccom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState("");
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);
    const [addData, setAddData] = useState({
        compCode: null,
        depName: null,
        disposeVactListId: null,
        empName: null,
        empNum: null,
        vactDetail: null,
        vactEndDate: null,
        vactName: null,
        vactNote: null,
        vactPeriod: null,
        vactStartDate: null,
        vactState: null,
    });

    //초기 저장된 데이터베이스 값 가져오기
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.post('http://192.168.2.91:5000/read_VactDispose', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (error) {
            console.log("readUser error", error);
        });
    }

    const [messageApi, contextHolder] = message.useMessage();
    //성공 alert
    const success = (contentText) => {
        messageApi.open({
            type: 'success',
            content: contentText,
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
        });
    };
    //주의 alert
    const warning = (contentText) => {
        messageApi.open({
            type: 'warning',
            content: contentText,
        });
    };

    //저장
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        axios.post('http://192.168.2.91:5000/modaldetail_Vactlist', {
            disposeVactListId: e.disposeVactListId
        }).then(function (response) {
            setAddData({
                "compCode": response.data[0].compCode,
                "depName": response.data[0].depName,
                "disposeVactListId": response.data[0].disposeVactListId,
                "empName": response.data[0].empName,
                "empNum": response.data[0].empNum,
                "vactDetail": response.data[0].vactDetail,
                "vactEndDate": response.data[0].vactEndDate,
                "vactName": response.data[0].vactName,
                "vactNote": response.data[0].vactNote,
                "vactPeriod": response.data[0].vactPeriod,
                "vactStartDate": response.data[0].vactStartDate,
                "vactState": response.data[0].vactState
            });
        }).catch(function (err) {
            console.log("", err);
            let contentText = "휴가 데이터 요청 에러가 발생했습니다. 새로고침 후 다시 실행해주세요";
            error(contentText);
        });
        setShow(true);
    }
    //수정
    const DelClose = () => setMDelShow(false);
    const DeShow = () => setMDelShow(true);
    //삭제
    const MdClose = () => setModifyShow(false);
    const MdShow = () => setModifyShow(true);
    //권한

    //onChage값
    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        setAddData({
            ...addData,
            [name]: value
        });
        console.log(addData);

    }

    //미승인처리
    const pushNonApproveData = () => {
        axios.post('http://192.168.2.91:5000/authority_VactDispose ', {
            depName: addData.depName,
            compCode: addData.compCode,
            disposeVactListId: addData.disposeVactListId,
            empName: addData.empName,
            empNum: addData.empNum,
            vactNote: addData.vactNote,
            vactState: "미승인"
        }).then(function (response) {
            if (response.data) {
                console.log(response.data);
                let contentText = "휴가 미승인처리 완료되었습니다.";
                getData();
                success(contentText);
                handleClose();
            }
            if (!response.data) {
                let contentText = "오류가 발생했습니다 새로고침 후 다시 실행하세요.";
                warning(contentText);
            }
        }).catch(function (er) {
            console.log("authority_VactDispose error", er);
            let contentText = "서버 연동 에러 발생";
            error(contentText);
        });
    }
    //승인처리
    const pushApproveData = () => {
        axios.post('http://192.168.2.91:5000/authority_VactDispose ', {
            depName: addData.depName,
            compCode: addData.compCode,
            disposeVactListId: addData.disposeVactListId,
            empName: addData.empName,
            empNum: addData.empNum,
            vactNote: addData.vactNote,
            vactState: "승인"
        }).then(function (response) {
            if (response.data) {
                let contentText = "휴가 승인처리 완료되었습니다.";
                getData();
                success(contentText);
                handleClose();
            }
            if (!response.data) {
                let contentText = "오류가 발생했습니다 새로고침 후 다시 실행하세요.";
                warning(contentText);
            }
        }).catch(function (er) {
            console.log("authority_VactDispose error", er);
            let contentText = "서버 연동 에러 발생";
            error(contentText);
        });
    }

    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong> 휴가 처리 </strong></h2>
            <br />
            <br />
            <br />
            <Table >
                <thead style={{ height: '60px' }}>

                    <tr style={{ backgroundColor: '#ecf0f1', backgroundColor: '#ecf0f1' }}>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>휴가시작일</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>휴가종료일</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>이름</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>휴가기간</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>휴가항목</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>휴가상세</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>상태</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>비고</strong>
                        </td>
                    </tr>
                </thead>
                {/* onClick={()=>ShBtn(e)} */}
                <tbody>

                    {
                        data && data.map((e, idx) =>
                            <tr >
                                <td style={{ border: "1px solid #f1f2f6", fontSize: '22px', color: '#777777' }}>{e.vactStartDate}</td>
                                <td style={{ border: "1px solid #f1f2f6", fontSize: '22px', color: '#777777' }}>{e.vactEndDate}</td>
                                <td style={{ border: "1px solid #f1f2f6", fontSize: '22px', color: '#777777' }}>
                                    <Button name={e.disposeVactListId} onClick={() => handleShow(e)} variant="link">
                                        <strong>
                                            {e.empName}
                                        </strong>
                                    </Button>
                                </td>
                                <td style={{ border: "1px solid #f1f2f6", fontSize: '22px', color: '#777777' }}>{e.vactPeriod}</td>
                                <td style={{ border: "1px solid #f1f2f6", fontSize: '22px', color: '#777777' }}>{e.vactName}</td>
                                <td style={{ border: "1px solid #f1f2f6", fontSize: '22px', color: '#777777' }}>{e.vactDetail}</td>
                                <td style={{ border: "1px solid #f1f2f6", fontSize: '22px', color: '#777777' }}>{e.vactState}</td>
                                <td style={{ border: "1px solid #f1f2f6", fontSize: '22px', color: '#777777' }}>{e.vactNote}</td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>

            <Box>
                <button style={{ position: 'absolute', left: "0px", top: '550px' }} onClick={DeShow} className="Atmp1"> <strong>승인</strong> </button>
                <button style={{ position: 'absolute', left: "110px", top: '550px' }} onClick={DeShow} className="Atmp1"> <strong>요청</strong> </button>
                <button style={{ position: 'absolute', left: "220px", top: '550px' }} onClick={DeShow} className="Atmp1"> <strong>미승인</strong> </button>
            </Box>

            {/* 추가 */}
            <Modal
                centered
                size="lg"
                show={show} onHide={handleClose} animation={false} id="AddModal" >
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>휴가정보</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6' }}>

                    <br />
                    <Container>
                        <Grid container spacing={4}>
                            <Grid item xs={6} md={5} ml={20} style={{ fontSize: '25px' }}>
                                <strong>이름 : {addData && show && addData.empName}</strong>
                            </Grid>

                            <Grid item xs={6} md={5} ml={20} style={{ fontSize: '25px' }}>
                                <strong>사원코드 : {addData && show && addData.empNum}</strong>
                            </Grid>

                            <Grid item xs={6} md={6} ml={20} style={{ fontSize: '25px' }}>
                                <strong>부서 :{addData && show && addData.depName}</strong>
                            </Grid>

                            <Grid item xs={6} md={6} ml={20} style={{ fontSize: '25px' }}>
                                <strong>휴가상세 : {addData && show && addData.vactDetail}</strong>
                            </Grid>

                            <Grid item xs={6} md={6} ml={20} style={{ fontSize: '25px' }}>
                                <strong>휴가종료일 : {addData && show && addData.vactEndDate}</strong>
                            </Grid>

                            <Grid item xs={6} md={6} ml={20} style={{ fontSize: '25px' }}>
                                <strong>휴가이름 : {addData && show && addData.vactName}</strong>
                            </Grid>

                            <Grid item xs={6} md={6} ml={20} style={{ fontSize: '25px' }}>
                                <strong>휴가기간 : {addData && show && addData.vactPeriod}</strong>
                            </Grid>

                            <Grid item xs={6} md={6} ml={20} style={{ fontSize: '25px' }}>
                                <strong>휴가시작일 : {addData && show && addData.vactStartDate}</strong>
                            </Grid>

                            <Grid item xs={6} md={6} ml={20} style={{ fontSize: '25px' }}>
                                <strong>상태 : {addData && show && addData.vactState}</strong>
                            </Grid>

                            <Grid item xs={6} md={6} ml={20} style={{ fontSize: '25px' }}>
                                <strong>승인/미승인 사유</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-20}>
                                <input style={{ width: '250px', height: '50px' }} name="vactNote" value={addData.vactNote} onChange={onChangeAddData} type="text" ></input>


                            </Grid>
                            <Grid item xs={6} md={6} ml={63} mt={-10}>
                            </Grid>
                        </Grid>

                    </Container>
                    <br />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onChangeAddData}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={pushNonApproveData}>
                        미승인
                    </Button>
                    <Button variant="primary" onClick={pushApproveData}>
                        승인
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default ATGccom;