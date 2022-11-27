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
import InputGroup from 'react-bootstrap/InputGroup';

const ATGDcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);
    const [MH, setMh] = useState(false);
    const [ mhData , setMhData] = useState();
    const [addData, setAddData] = useState({
        addinOut_Note: null,//비고
        addcompCode: null,//회사코드
        adddeleteList: null,
        adddepName: null,//부서명
        addempCode: null,//사원코드
        addempName: null,//이름
        addendDate: null,//사용안함
        addinOutDate: null,//날짜
        addinOutEnd: null,//퇴근시간
        addinOutListId: null,//프라이머리키
        addinOutOver: null,//초과시간
        addinOutStart: null,//출근시간
        addstartDate: null,//사용안함
        adddepCode: null,//부서코드
        addempRank: null,//직급
        addYear : null,
        addMonth : null,
        addDay : null

    });
    const [ modifyData , setModifyData] = useState({
        modifyinOut_Note: null,//비고
        modifycompCode: null,//회사코드
        modifydeleteList: null,
        modifydepName: null,//부서명
        modifyempCode: null,//사원코드
        modifyempName: null,//이름
        modifyendDate: null,//사용안함
        modifyinOutDate: null,//날짜
        modifyinOutEnd: null,//퇴근시간
        modifyinOutListId: null,//프라이머리키
        modifyinOutOver: null,//초과시간
        modifyinOutStart: null,//출근시간
        modifystartDate: null,//사용안함
        modifydepCode: null,//부서코드
        modifyempRank: null,//직급
    });
    //초기 저장된 데이터베이스 값 가져오기
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.post('http://192.168.2.91:5000/read_inOutInfo', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (err) {
            console.log("read_inOutInfo error", error);
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

    //입력값 onChange 함수
    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        setAddData({
            ...addData,
            [name]: value
        });
        console.log(addData);
    }

    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
        });
        console.log(modifyData);
    }

    //추가 모델에서 추가 눌렀을경우 함수
    const pushAddData = () => {
        axios.post('http://192.168.2.91:5000/create_inOutInfo ', {
            inOut_Note :addData.addinOut_Note,//비고
            compCode : sessionStorage.getItem("uid"),//회사코드
            depName : addData.adddepName,//부서명
            empCode : addData.addempCode,//사원코드
            empName : addData.addempName,//사원명
            inOutDate : addData.addYear + "-" + addData.addMonth + "-" + addData.addDay,//날짜
            inOutEnd : addData.addinOutEnd,//퇴근시간
            inOutStart : addData.addinOutStart,//출근시간
            depCode : addData.adddepCode,//부서코드
            empRank : addData.addempRank,//직급
        }).then(function (response) {
            if (response.data) {
                let contentText = "출퇴근 등록 완료.";
                getData();
                handleClose();
                success(contentText);
            }else{
                let contentText = "오류가 발생했습니다 새로고침 후 다시 실행하세요.";
                warning(contentText);
            }
        }).catch(function (er) {
            console.log("update_inOutInfo error", er);
            let contentText = "서버 연동 에러 발생";
            error(contentText);
        });

    }
    

    const modifyAddData = () => {
        axios.post('http://192.168.2.91:5000/update_inOutInfo ', {
            inOutListId: modifyData.modifyinOutListId,
            inOut_Note: modifyData.modifyinOut_Note,
            inOutStart: modifyData.modifyinOutStart,
            inOutEnd: modifyData.modifyinOutEnd
        }).then(function (response) {
            if (response.data) {
                let contentText = "출퇴근시간이 변경되었습니다.";
                getData();
                success(contentText);
                MdClose();
            }
            if (!response.data) {
                let contentText = "오류가 발생했습니다 새로고침 후 다시 실행하세요.";
                warning(contentText);
            }
        }).catch(function (er) {
            console.log("update_inOutInfo error", er);
            let contentText = "서버 연동 에러 발생";
            error(contentText);
        });

    }
    
    //등록
    const handleClose = () => {
       setAddData({
            "addinOut_Note": null,//비고
            "addcompCode": null,//회사코드
            "adddeleteList": null,
            "adddepName": null,//부서명
            "addempCode": null,//사원코드
            "addempName": null,//이름
            "addendDate": null,//사용안함
            "addinOutDate": null,//날짜
            "addinOutEnd": null,//퇴근시간
            "addinOutListId": null,//프라이머리키
            "addinOutOver": null,//초과시간
            "addinOutStart": null,//출근시간
            "addstartDate": null,//사용안함
            "adddepCode": null,//부서코드
            "addempRank": null,//직급
            "addYear" : null,
            "addMonth" : null,
            "addDay" : null
        });
        setShow(false);
    }
    const handleShow = (e) => {
        setShow(true);
    }
    
    //수정
    const MdClose = () => {
        setModifyData({
            "modifyinOut_Note": null, //비고
            "modifycompCode": null, //회사코드
            "modifydeleteList": null,
            "modifydepName": null,//부서명
            "modifyempCode": null,//사원코드
            "modifyempName": null,//이름
            "modifyendDate": null,//사용안함
            "modifyinOutDate": null,//날짜
            "modifyinOutEnd": null,//퇴근시간
            "modifyinOutListId": null,//프라이머리키
            "modifyinOutOver": null,//초과시간
            "modifyinOutStart": null,//출근시간
            "modifystartDate": null,//사용안함
            "modifydepCode": null,//부서코드
            "modifyempRank": null,//직급

        })
        setModifyShow(false);
    }
    const MdShow = (e) => {
        axios.post('http://192.168.2.91:5000/modal_inOutInfo', {
            inOutListId: e.inOutListId
        }).then(function (response) {
            setModifyData({
                "modifyinOut_Note": response.data[0].inOut_Note, //비고
                "modifycompCode": response.data[0].compCode, //회사코드
                "modifydeleteList": response.data[0].deleteList,
                "modifydepName": response.data[0].depName,//부서명
                "modifyempCode": response.data[0].empCode,//사원코드
                "modifyempName": response.data[0].empName,//이름
                "modifyendDate": response.data[0].endDate,//사용안함
                "modifyinOutDate": response.data[0].inOutDate,//날짜
                "modifyinOutEnd": response.data[0].inOutEnd,//퇴근시간
                "modifyinOutListId": response.data[0].inOutListId,//프라이머리키
                "modifyinOutOver": response.data[0].inOutOver,//초과시간
                "modifyinOutStart": response.data[0].inOutStart,//출근시간
                "modifystartDate": response.data[0].startDate,//사용안함
                "modifydepCode": response.data[0].depCode,//부서코드
                "modifyempRank": response.data[0].empRank,//직급
            });
        }).catch(function (err) {
            console.log("modal_inOutInfo error", err);
            let contentText = "데이터 불러오는데 오류가 발생했습니다. 새로고침 후 다시 시도해주세요";
            error(contentText);
        });
        setModifyShow(true);
    }

    //돋보기모달
    const MhClose = () => setMh(false);
    const Mhshow = () => {
        axios.post('http://192.168.2.82:5000/readEmp', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            console.log("readEmp", response.data);
            setMhData(response.data);
        }).catch(function (er) {
            console.log("readDep error :", er);
            let contentText = "부서 목록을 가져오는데 에러가 발생했습니다";
            error(contentText);
        });
        setMh(true);
    }
   
    const MhBtn = (e) => {
            console.log("Mhbtn e" ,e);
            const temp = {...addData};
            temp.addempCode = e.empNum;
            temp.addempName = e.empName;
            temp.addempRank = e.empRank;
            temp.adddepCode = e.depCode;
            temp.adddepName = e.depName;
            setAddData(temp);
        MhClose();
    }

    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong>출퇴근 관리 </strong></h2>
            <br />
            <br />
            <br />
            <Table >
                <thead style={{ height: '60px' }}>
                    <tr style={{ backgroundColor: '#ecf0f1', border: "1px solid #f1f2f6" }}>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>날짜</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>성명</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>부서</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>출근시간</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>퇴근시간</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>초과 근무 시간</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>비고</strong>
                        </td>
                    </tr>
                </thead>

                <tbody>


                    {
                        data && data.map((e, idx) =>
                            <tr >
                                <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>{e.inOutDate}</td>
                                <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                                    <Button style={{ fontSize: '22px' }} name={e.inOutListId} onClick={() => MdShow(e)} variant="link">
                                        <strong>
                                            {e.empName}
                                        </strong>
                                    </Button>
                                </td>
                                <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>{e.depName}</td>
                                <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>{e.inOutStart}</td>
                                <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>{e.inOutEnd}</td>
                                <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>{e.inOutOver}</td>
                                <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>{e.inOut_Note}</td>

                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <div>
                <button style={{ position: 'absolute', left: "110px", top: '550px' }} onClick={handleShow} className="Atmp1">  <strong>추가</strong></button>
            </div>




            {/* 수정 */}
            <Modal
                centered
                size="lg"
                show={ModifyShow} onHide={MdClose} animation={false} id="ModifyModal">
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>출퇴근상세</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>

                    <br />
                    <Container>         
                    <Table >
                        <thead style={{height:'60px'}}>
                            <tr style={{backgroundColor:'#ecf0f1' , color:'#777777' ,textAlign: "center", }}>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>사원명</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>사원코드</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>직급</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>부서명</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>부서코드</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>날짜 </strong></td>
                          
                            </tr>

                        </thead>
                        <tbody>
                                <tr style={{textAlign: "center",}}>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{modifyData && ModifyShow && modifyData.modifyempName}</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{modifyData && ModifyShow && modifyData.modifyempCode}</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{modifyData && ModifyShow && modifyData.modifyempRank}</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{modifyData && ModifyShow && modifyData.modifydepName}</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{modifyData && ModifyShow && modifyData.modifydepCode}</strong></td>    
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong> {modifyData && ModifyShow && modifyData.modifyinOutDate} </strong></td>
                            
                                </tr>
                        </tbody>

                

                       
                        {/* <Grid item xs={6} md={6} ml={20} style={{ fontSize: '25px' }}>
                                <strong>비고 </strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-28}>
                                <input style={{ width: '250px', height: '50px' }} name="modifyinOut_Note" value={modifyData.modifyinOut_Note} type="text" onChange={onChangeModifyData}></input>
                            </Grid>

                            <Grid item xs={6} md={6} ml={20} style={{ fontSize: '25px' }}>
                                <strong>출근시간 </strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-28}>
                                <input style={{ width: '250px', height: '50px' }} name="modifyinOutStart" value={modifyData.modifyinOutStart} type="text" onChange={onChangeModifyData}></input>
                            </Grid>

                            <Grid item xs={6} md={6} ml={20} style={{ fontSize: '25px' }}>
                                <strong>퇴근시간 </strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-28}>
                                <input style={{ width: '250px', height: '50px' }} name="modifyinOutEnd" value={modifyData.modifyinOutEnd} type="text" onChange={onChangeModifyData}></input>
                            </Grid>

                            <Grid item xs={6} md={6} ml={20} style={{ fontSize: '25px' }}>
                                <strong>초과시간 {modifyData && ModifyShow && modifyData.modifyinOutOver}</strong>
                            </Grid>
                     */}
                    
                    </Table> 
                    <br></br>
                    <Table  >
                            <thead style={{height:'60px'}}>
                            <tr style={{backgroundColor:'#ecf0f1' , color:'#777777' ,textAlign: "center", }}>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>비고</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>출근시간</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>퇴근시간</strong></td>
                              
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>초가시간</strong></td>
                            </tr>
                            </thead>
                            <tbody>
                                <tr style={{textAlign: "center",}}>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}> <strong>  <Form.Control style={{ width: '170px', height: '50px' }} name="modifyinOut_Note" value={modifyData.modifyinOut_Note} type="text" onChange={onChangeModifyData}/></strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong> <Form.Control style={{ width: '170px', height: '50px' }} name="modifyinOutStart" value={modifyData.modifyinOutStart} type="text" onChange={onChangeModifyData}/></strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong> <Form.Control style={{ width: '170px', height: '50px' }} name="modifyinOutEnd" value={modifyData.modifyinOutEnd} type="text" onChange={onChangeModifyData}/></strong></td>
                                
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong> {modifyData && ModifyShow && modifyData.modifyinOutOver}</strong></td>
                               
                             
                                </tr>
                        </tbody>


                        </Table>
                        <Box md={3}></Box>

                    </Container>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={MdClose}>
                        닫기
                    </Button>
                    <button className='addButton' variant="primary" onClick={modifyAddData}>
                        수정
                    </button>
                </Modal.Footer>
            </Modal>















            {/* 추가 */}
            <Modal
                centered
                size="xs,"
                show={show} onHide={handleClose} animation={false} id="AddModal">
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>출퇴근등록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6' }}>
                    <br />
                    <Container>

                        <Grid container spacing={4}>
                            <Grid item xs={3} md={0} ml={-2.5} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>사원명</strong>
                            </Grid>
                            <Grid item xs={1} md={0} mt={-0.5} ml={-6} >
                                <InputGroup style={{ width: '150px', height: '30px' }}>

                                    <Form.Control
                                        type="text"
                                        name='addempName'
                                        aria-describedby="btnGroupAddon"
                                        style={{ height: '30px' }}
                                        value={addData.addempName}
                                        onChange={onChangeAddData}
                                    />
                                    <InputGroup.Text id="btnGroupAddon" onClick={Mhshow} style={{ width: '40px', height: '30px' }}> <SearchIcon /></InputGroup.Text>
                                </InputGroup>
                            </Grid>


                            <Grid item xs={3} md={0} mt={0} ml={16} style={{ fontSize: '15px', color: '#777777' }}>
                            <strong>부서코드</strong>
                                
                            </Grid>
                            <Grid item xs={3} md={0} ml={-5}  mt={-0.5}>
                            <Form.Control style={{ width: '150px', height: '30px' }} type="text" name='adddepCode'  value={addData.adddepCode} aria-describedby="btnGroupAddon" onChange={onChangeAddData} />
                                
                            </Grid>


                        
                            <Grid item xs={3} md={0} ml={-3} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>사원코드</strong>
                            </Grid>
                            <Grid item xs={4} md={0} ml={-5.5} mt={-2} >
                             <Form.Control style={{ width: '150px', height: '30px' }} type="text" name='addempCode' value={addData.addempCode} aria-describedby="btnGroupAddon" onChange={onChangeAddData} />
                            </Grid>

                            <Grid item xs={3} md={0} ml={1.5} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>부서명</strong>
                            </Grid>
                            <Grid item xs={4} md={0} ml={-5}  mt={-2}>
                                <Form.Control style={{ width: '150px', height: '30px' }} type="text" name='adddepName' value ={addData.adddepName} aria-describedby="btnGroupAddon" onChange={onChangeAddData} />
                            </Grid>




                            <Grid item xs={4} md={0}  mt={-2.5} ml={-3} style={{ fontSize: '15px', color: '#777777' }}>
                               
                                <strong>직급</strong>
                            </Grid>
                            <Grid item xs={6} md={0} ml={-10} mt={-2.5} >
                            <Form.Control style={{ width: '150px', height: '30px' }} type="text" name='addempRank' value={addData.addempRank} aria-describedby="btnGroupAddon" onChange={onChangeAddData} />
                            </Grid> 
                            <Grid  item xs={12}  mt={-3}>
                                <hr></hr>
                            </Grid>
                            


                            <Grid item xs={2} md={0} ml={10}  mt={-3} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>날짜</strong>
                            </Grid>
                            <Grid item xs={4} md={1}  ml={0}mt={-3.5}>
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='addYear' aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                            </Grid>

                            <Grid item xs={2} md={1} ml={4} mt={-3.5} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>/</strong>
                            </Grid>

                            <Grid item xs={2} md={1} ml={-3} mt={-3.5} >
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='addMonth' aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                            </Grid>
                            <Grid item xs={2} md={1} ml={4} mt={-3.5} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>/</strong>
                            </Grid>
                            <Grid item xs={2} md={1} ml={-2.5} mt={-3.5} >
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='addDay' aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                            </Grid>

                            
                            <Grid item xs={6} md={0} ml={-3} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>출근 관리</strong>
                            </Grid>

                            <Grid item xs={4} md={0} ml={-15.5}mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>출근시간</strong>
                            </Grid>
                            <Grid item xs={6} md={0} ml={-9.5} mt={-2}>
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='addinOutStart' aria-describedby="btnGroupAddon" onChange={onChangeAddData} />
                            </Grid>

                            <Grid item xs={6} md={0} ml={10}mt={-3} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>퇴근시간</strong>
                            </Grid>
                            <Grid item xs={4} md={0} ml={-18.5} mt={-3}>
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='addinOutEnd' aria-describedby="btnGroupAddon" onChange={onChangeAddData} />
                            </Grid>
                            <Grid item xs={6} md={0} ml={10} mt={-2}style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>비고</strong>
                            </Grid>
                            <Grid item xs={6} md={-5} ml={-18.5}mt={-2} >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='addinOut_Note' aria-describedby="btnGroupAddon" onChange={onChangeAddData} />
                            </Grid>
                        

                        </Grid>
                    </Container>
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={pushAddData}>
                        저장
                    </Button>
                </Modal.Footer>
            </Modal>
        
        {/* 돋보기 모달 */}
        <Modal
                size="lg"
                centered
                show={MH} onHide={MhClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}> <strong>사원코드</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6' }}>
                    <table style={{
                        textAlign: "center",
                        width: "100%", border: "1px solid gray",
                    }} >
                        <tr style={{ border: "1px solid gray", backgroundColor: '#a4b0be' }}>
                            <td style={{ border: "1px solid gray", fontSize: '30px', color: '#ffffff' }}><strong></strong></td>
                            <td style={{ border: "1px solid gray", fontSize: '30px', color: '#ffffff' }}><strong>부서코드</strong></td>
                            <td style={{ border: "1px solid gray", fontSize: '30px', color: '#ffffff' }}><strong>부서명</strong></td>
                            <td style={{ border: "1px solid gray", fontSize: '30px', color: '#ffffff' }}><strong>사원코드</strong></td>
                            <td style={{ border: "1px solid gray", fontSize: '30px', color: '#ffffff' }}><strong>사원명</strong></td>
                            <td style={{ fontSize: '30px', color: '#ffffff' }}> <strong>직급</strong></td>
                        </tr>
                        {
                            mhData && mhData.map((e, idx) =>
                                <tr style={{ border: "1px solid gray" }}>
                                    <td style={{ border: "1px solid gray", fontSize: '30px' }}>{idx + 1}</td>
                                    <td style={{ border: "1px solid gray", fontSize: '30px' }}>{e.depCode}</td>
                                    <td style={{ border: "1px solid gray", fontSize: '30px' }}>{e.depName}</td>
                                    <td style={{ border: "1px solid gray", fontSize: '30px' }}>{e.empNum}</td>
                                    <Button name={e.empNum} onClick={() => MhBtn(e)} variant="link"><strong>{e.empName}</strong></Button>
                                    <td style={{ border: "1px solid gray", fontSize: '30px' }}>{e.empRank}</td>
                                </tr>

                            )
                        }

                    </table>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ATGDcom;