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
    //날짜 가져오기


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
    const handleClose = () => {
        setAddData({});
        setShow(false);
    }
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

    //전체목록
    const allList = () =>{
        getData();
    }
    //승인목록
    const approvalList = () =>{
        axios.post('http://192.168.2.91:5000/Approval_VactDispose', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (error) {
            console.log("readUser error", error);
        });
    }
    //요청목록
    const requestList = () =>{
        axios.post('http://192.168.2.91:5000/request_VactDispose', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (error) {
            console.log("readUser error", error);
        });
    }
    //미승인목록
    const unapprovedList = () =>{
        axios.post('http://192.168.2.91:5000/process_VactDispose', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (error) {
            console.log("readUser error", error);
        });
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
            vactState: "미승인",
            vactPeriod : addData.vactPeriod

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
            vactState: "승인",
            vactPeriod : addData.vactPeriod,
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
            <Box>
                <button style={{ position: 'absolute', right:'310px',  }} onClick={allList} className="Atmp1"> <strong>전체목록</strong> </button>
                <button style={{ position: 'absolute', right: "220px",  }} onClick={approvalList} className="Atmp1"> <strong>승인목록</strong> </button>
                <button style={{ position: 'absolute', right: "130px",  }} onClick={requestList} className="Atmp1"> <strong>요청목록</strong> </button>
                <button style={{ position: 'absolute', right: "0px", width:'120px' }} onClick={unapprovedList} className="Atmp1"> <strong>미승인목록</strong> </button>
            </Box>
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong> 휴가 처리 </strong></h2>
            <br />
            <br />
            <br />
          

            <Table >
                <thead style={{ height: '60px' }}>

                    <tr style={{ backgroundColor: '#ecf0f1',  }}>
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
{/* 
            <Box>
                <button style={{ position: 'absolute', left: "0px", top: '550px' }} onClick={DeShow} className="Atmp1"> <strong>승인</strong> </button>
                <button style={{ position: 'absolute', left: "110px", top: '550px' }} onClick={DeShow} className="Atmp1"> <strong>요청</strong> </button>
                <button style={{ position: 'absolute', left: "220px", top: '550px' }} onClick={DeShow} className="Atmp1"> <strong>미승인</strong> </button>
            </Box> */}
      
            {/* 추가 */}
            <Modal
                centered
                size="xl"
                show={show} onHide={handleClose} animation={false} id="AddModal" >
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>휴가정보</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>

                    <br/>
                    <Container>
                    <Grid item xs={6} md={6} ml={1} mt={-2}style={{ fontSize: '25px' }}>
                                <strong>휴가 정보</strong>
                            </Grid> 
    

                    <Table >
                        <thead style={{height:'60px'}}>
                            <tr style={{backgroundColor:'#ecf0f1' , color:'#777777' ,textAlign: "center", }}>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>이름</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>사원코드</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>부서</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>휴가이름</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>휴가상세</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>휴가 시작일</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>휴거 종료일</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>휴가 기간</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>상태</strong></td>
                           
                            </tr>

                        </thead>
                        <tbody>
                                <tr style={{textAlign: "center",}}>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{addData && show && addData.empName}</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{addData && show && addData.empNum}</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{addData && show && addData.depName}</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{addData && show && addData.vactName}</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{addData && show && addData.vactDetail}</strong></td>    
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{addData && show && addData.vactStartDate} </strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{addData && show && addData.vactEndDate}</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{addData && show && addData.vactPeriod}</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{addData && show && addData.vactState}</strong></td>
                                </tr>
                        </tbody>
                    
                    
                    </Table>

                        <Grid container spacing={4}>
                            <Grid item xs={6} md={6} ml={1} mt={2}style={{ fontSize: '25px' }}>
                                <strong>승인/미승인 사유</strong>
                            </Grid> 
    


                            <Grid item xs={6} md={6} ml={-68.5} mt={8}>
                                <Form.Control style={{ width: '1060px', height: '60px' }} aria-describedby="btnGroupAddon"
                                    name="vactNote" value={addData.vactNote} onChange={onChangeAddData} type="text" />
                            </Grid>


                            
                        </Grid>

                    </Container>
                    <br />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onChangeAddData} style={{width:'70px'}}>
                        닫기
                    </Button>
                    <button className='addButton' variant="primary" onClick={pushNonApproveData} style={{width:'70px'}}>
                        미승인
                    </button>
                    <button className='addButton' variant="primary" onClick={pushApproveData} style={{width:'70px'}}>
                        승인
                    </button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default ATGccom;