import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { message, Space } from 'antd';



// compCode: 회사 아이디
// dailyId: PRIMARY KEY
// dailyName: 성명
// dailyCode: 일용직코드
// dailyAddress: 주소
// dailyPhone: 전화번호
// dailySsn: 주민등록번호
// dailyEmail: 이메일
// dailyRank : 직급
// dailyStart: 입사일
// dailyEnd: 퇴사일
// dailyEndDetail: 퇴사 사유
// dailyBankName: 은행명
// dailyBankNum: 계좌번호
// dailyBankOwner: 예금주
// dailyPay: 일용직 급여


const OWAcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [addCheck, setAddCheck] = useState(false);
    const [modifyCheck, setModifyCheck] = useState(false);
    const [data, setData] = useState(); //초기 데이터 들어있는 함수
    const [addData, setAddData] = useState();  // 추가 데이터
    const [modifyData, setModifyData] = useState({
        dailyId:null,
        dailyName:null,
        dailyCode: null,
        dailyAddress: null,
        dailyPhone: null,
        dailyFirstSSN : null,
        dailySecondSSN : null,
        dailyEmail: null,
        dailyRank: null,
        dailyStartYear: null,
        dailyStartMonth: null,
        dailyStartDay: null,
        dailyEndYear: null,
        dailyEndMonth: null,
        dailyEndDay: null,
        dailyEndDetail: null,
        dailyBankName: null,
        dailyBankNum: null,
        dailyBankOwner: null,
        dailyPay : null
    }); // 수정 데이터
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


    //초기 데이터 불러오는 useEffect
    useEffect(() => {
        getData();
    }, []);

    //useEffect에서 실행되는 함수 ( axios )
    const getData = () => {
        axios.post('http://192.168.2.82:5000/readDailyEmp', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (er) {
            console.log("readDailyEmp error", er);
            let contentText = "데이터를 가져오는데 에러가 발생했어요 새로고침해주세요";
            error(contentText);
        });
    }

    //추가 onChange
    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        if (value == '') {
            setAddData({
                ...addData,
                [name]: null
            })
        } else {
            setAddData({
                ...addData,
                [name]: value
            })
        }
    }

    //수정 onChange
    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        console.log("value" , value);
        if(value==''){
            setModifyData({
                ...modifyData,
                [name] : null
            })
        }else{
            setModifyData({
                ...modifyData,
                [name]: value
            })
        }
    
    }

    const pushAddData = (e) =>{
        axios.post('http://192.168.2.82:5000/createDailyEmp', {
            compCode: sessionStorage.getItem("uid"),
            dailyId: addData.dailyId,
            dailyName: addData.dailyName,
            dailyCode: addData.dailyCode,
            dailyAddress: addData.dailyAddress,
            dailyPhone: addData.dailyPhone,
            dailySsn: String(addData.dailyFirstSSN)+String(addData.dailySecondSSN),
            dailyEmail: addData.dailyEmail,
            dailyRank: addData.dailyRank,
            dailyStart: String(addData.dailyStartYear) + String(addData.dailyStartMonth) + String(addData.dailyStartDay),
            dailyEnd: String(addData.dailyEndYear) + String(addData.dailyEndMonth) + String(addData.dailyEndDay),
            dailyEndDetail: addData.dailyEndDetail,
            dailyBankName: addData.dailyBankName,
            dailyBankNum: addData.dailyBankNum,
            dailyBankOwner: addData.dailyBankOwner,
            dailyPay: addData.dailyPay,
        }).then(function (response) {
            if(response.data){
                getData();
                addClose();
                let contentText = "일용직 등록 완료";
                success(contentText);
            }else{
                let contentText ="일용직 등록 실패 다시 시도해주세요";
                warning(contentText);
            }
        }).catch(function (er) {
            console.log("createDailyEmp error", er);
            let contentText = "데이터 저장 실패 , 새로고침 후 다시 실행해주세요";
            error(contentText);
        });
    }

    const pushModifyData = (e)=>{
       axios.post('http://192.168.2.82:5000/updateDailyEmp',{
            compCode : sessionStorage.getItem("uid"),
            dailyId : modifyData.dailyId,
            dailyId: modifyData.dailyId,
            dailyName: modifyData.dailyName,
            dailyCode: modifyData.dailyCode,
            dailyAddress:modifyData.dailyAddress,
            dailyPhone: modifyData.dailyPhone,
            dailySsn: String(modifyData.dailyFirstSSN)+String(modifyData.dailySecondSSN),
            dailyEmail: modifyData.dailyEmail,
            dailyRank: modifyData.dailyRank,
            dailyStart: String(modifyData.dailyStartYear) + String(modifyData.dailyStartMonth) + String(modifyData.dailyStartDay),
            dailyEnd: String(modifyData.dailyEndYear) + String(modifyData.dailyEndMonth) + String(modifyData.dailyEndDay),
            dailyEndDetail: modifyData.dailyEndDetail,
            dailyBankName: modifyData.dailyBankName,
            dailyBankNum: modifyData.dailyBankNum,
            dailyBankOwner: modifyData.dailyBankOwner,
            dailyPay: modifyData.dailyPay,
       }).then(function (response){
            if(response.data){
                let contentText = "일용직 수정 완료";
                getData();
                success(contentText);
                modifyClose();
            }else{
                let contentText = "공란은 입력할 수 없습니다.";
                warning(contentText);
            }
       }).catch(function(err){
            console.log("updateDailyEmp error :" ,err);
            let contentText  = "수정오류가 발생했습니다. 새로고침 후 다시 시도해주세요";
            error(contentText);
       })
    }
    const pushDeleteData = ()=>{
        axios.post('http://192.168.2.82:5000/deleteDailyEmp',{
            dailyId : modifyData.dailyId
        }).then(function (response){
            if(response.data){
                let contentText = "삭제 완료";
                getData();
                delClose();
                modifyClose();
                success(contentText);
            }else{
                let contentText = " 삭제 실패";
                warning(contentText);
            }
            console.log("삭제 response" , response.data);
        }).catch(function(err){
            console.log("deleteDailyEmp error :",err);
            let contentText = "일용직 삭제에서 오류가 발생하였습니다.";
            error(contentText);

        })

    }
    //모달 함수
    const [add, setAdd] = useState(false);
    const [modify, setModify] = useState(false);
    const [del, setDel] = useState(false);
    //추가
    const addShow = () => setAdd(true);
    const addClose = () => {
        setAdd(false);
        setAddData({});
    }
    //수정
    const modifyShow = (e) => {
        axios.post('http://192.168.2.82:5000/updateDailyEmpModal', {
            dailyId: e.dailyId
        }).then(function (response) {
            let dailyFirstSsn = null;
            let dailySecondSsn = null;
            let dailyfirst = null;
            let dailysecond = null;
            let dailyStart = null;
            let startYear = null;
            let startMonth = null;
            let startDay = null;
            let dailyEnd = null;
            let endYear = null;
            let endMonth = null;
            let endDay = null;
            if (response.data[0].dailySsn != null) {
                dailyFirstSsn = response.data[0].dailySsn.substr(0, 6);
                dailySecondSsn = response.data[0].dailySsn.substr(6);
            }
            if (response.data[0].dailyStart != null) {
                dailyStart = response.data[0].dailyStart.split("-");
                startYear = dailyStart[0];
                startMonth = dailyStart[1];
                startDay = dailyStart[2];
            }
            if (response.data[0].dailyEnd != null) {
                dailyEnd = response.data[0].dailyEnd.split("-");
                endYear = dailyEnd[0];
                endMonth = dailyEnd[1];
                endDay = dailyEnd[2];
            }
            setModifyData({
                dailyId:response.data[0].dailyId,
                dailyName:response.data[0].dailyName,
                dailyCode: response.data[0].dailyCode,
                dailyAddress: response.data[0].dailyAddress,
                dailyPhone: response.data[0].dailyPhone,
                dailyFirstSSN : dailyFirstSsn,
                dailySecondSSN : dailySecondSsn,
                dailyEmail: response.data[0].dailyEmail,
                dailyRank: response.data[0].dailyRank,
                dailyStartYear: startYear,
                dailyStartMonth: startMonth,
                dailyStartDay: startDay,
                dailyEndYear: endYear,
                dailyEndMonth: endMonth,
                dailyEndDay: endDay,
                dailyEndDetail: response.data[0].dailyEndDetail,
                dailyBankName: response.data[0].dailyBankName,
                dailyBankNum: response.data[0].dailyBankNum,
                dailyBankOwner: response.data[0].dailyBankOwner,
                dailyPay : response.data[0].dailyPay
            });

        }).catch(function (err) {
            console.log("updateDailyEmpModal error :", err);
            let contentText = "데이터를 가져오는데 오류가 발생했습니다. 새로고침 후 다시 시도해주세요";
            error(contentText);
        })
        setModify(true);
       
    }
    const modifyClose = () => {
        setModifyData({
            "dailyId":null,
            "dailyName":null,
            "dailyCode": null,
            "dailyAddress": null,
            "dailyPhone": null,
            "dailyFirstSSN" : null,
            "dailySecondSSN": null,
            "dailyEmail": null,
            "dailyRank": null,
            "dailyStartYear": null,
            "dailyStartMonth": null,
            "dailyStartDay": null,
            "dailyEndYear": null,
            "dailyEndMonth": null,
            "dailyEndDay": null,
            "dailyEndDetail": null,
            "dailyBankName": null,
            "dailyBankNum": null,
            "dailyBankOwner": null,
            "dailyPay" : null
        })
        setModify(false);
    }

    //삭제
    const delShow = () => setDel(true);
    const delClose = () => setDel(false);





    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: ' #005b9e', position: 'absolute', left: '0', top: '0px' }}><strong>일용직 등록 </strong></h2>
            
            <div>
                <button style={{ position: 'absolute', right: "0px", }} onClick={addShow} className="Atmp1">  <strong>등록</strong></button>

            </div>
            <br />
            <br />
            <br />

            <Table hover >
                <thead style={{ height: '60px' }}>
                    {/* #769FCD */}
                    {/* ecf0f1 */}
                    <tr style={{ backgroundColor: '#f7f7f7', }}>

                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>입사일자</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>일용직번호</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>성명</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>직위/직급</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>은행</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>계좌번호</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>이메일</strong>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {

                        data && data.map((e, idx) =>
                            <tr style={{ height: '60px' }} >
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '20px', color: '#000' }}>{e.dailyStart} </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '20px', color: '#000' }}> {e.dailyCode}</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '20px', color: '#000' }}>
                                    <Button style={{ fontSize: '22px' }} name={e.dailyId} onClick={() => modifyShow(e)} variant="link">
                                     
                                        {e.dailyName}
                                     
                                    </Button>
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '20px', color: '#000' }}> {e.dailyRank}</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '20px', color: '#000' }}> {e.dailyBankName}</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '20px', color: '#000' }}> {e.dailyBankNum}</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '20px', color: '#000' }}> {e.dailyEmail}</td>
                            </tr>
                        )
                    }


                </tbody>
            </Table>




            {/* 등록 */}
            <Modal
                centered
                size="lg"


                show={add} onHide={addClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>일용직등록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f3f3f3', }}>
                    <br />
                    <Container>
                        <Grid container spacing={4}>
                            <Grid item xs={6} md={2} ml={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>성명</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={2} >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='dailyName' onChange={onChangeAddData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={6} md={2} ml={-1} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>일용직번호</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={0}>
                                {/* outline:'1px solid #777777'/ */}
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='dailyCode' onChange={onChangeAddData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={6} md={3} ml={-2} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>주민등록번호</strong>
                            </Grid>
                            <Grid item xs={6} md={3} ml={-5.5} mt={-2} >
                                <Form.Control style={{ width: '100px', height: '30px' }} type="text" name='dailyFirstSSN' onChange={onChangeAddData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={6} md={3} ml={-10} mt={-1.8} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>ㅡ</strong>
                            </Grid>
                            <Grid item xs={6} md={3} ml={-20.5} mt={-2} >
                                <Form.Control style={{ width: '100px', height: '30px' }} type="password" name='dailySecondSSN' onChange={onChangeAddData} aria-describedby="btnGroupAddon" />
                            </Grid>
                            <Grid item xs={6} md={2} ml={-10} mt={-1.5} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>전화 번호</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={0} mt={-2} >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='dailyPhone' onChange={onChangeAddData} aria-describedby="btnGroupAddon" />
                            </Grid>
                            <Grid item xs={6} md={3} ml={-2} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>이메일</strong>
                            </Grid>
                            <Grid item xs={6} md={3} ml={-5.5} mt={-2} >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='dailyEmail' onChange={onChangeAddData} aria-describedby="btnGroupAddon" />
                            </Grid>
                            <Grid item xs={10} md={5} mt={4} ml={-41.5} style={{ fontSize: '15px', color: '#777777' }} >
                                <strong>주소</strong>
                            </Grid>

                            <Grid item xs={6} md={7} ml={-21} mt={4}  >
                               

                                    <Form.Control
                                        type="text"
                                        name='dailyAddress'
                                        aria-describedby="btnGroupAddon"
                                        style={{ height: '30px',width:'145%' }}
                                        onChange={onChangeAddData} 

                                    />
                               
                            </Grid>
                            <Grid item xs={12} ml={-5} mt={-2}>
                                <hr style={{ width: '800px' }} />
                            </Grid>
                            <Grid item xs={6} md={2} ml={-2} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>직위/직급</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={2} mt={-2}  >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='dailyRank'onChange={onChangeAddData}  aria-describedby="btnGroupAddon" />
                            </Grid>
                            <Grid item xs={2} md={2} ml={-1} mt={-1.5} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>입사일</strong>
                            </Grid>
                            <Grid item xs={2} md={1} mt={-2} ml={0}>
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='dailyStartYear' onChange={onChangeAddData}  aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={2} md={1} ml={1} mt={-1.8} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>/</strong>
                            </Grid>

                            <Grid item xs={2} md={1} ml={-6} mt={-2} >
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='dailyStartMonth' onChange={onChangeAddData} aria-describedby="btnGroupAddon" />
                            </Grid>
                            <Grid item xs={2} md={1} ml={1} mt={-1.8} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>/</strong>
                            </Grid>
                            <Grid item xs={2} md={1} ml={-6} mt={-2} >
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='dailyStartDay' onChange={onChangeAddData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={2} md={2} ml={-2} mt={-1.5} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>퇴사일</strong>
                            </Grid>
                            <Grid item xs={2} md={1} mt={-2} ml={2}>
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='dailyEndYear' onChange={onChangeAddData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={2} md={1} ml={1} mt={-1.8} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>/</strong>
                            </Grid>

                            <Grid item xs={2} md={1} ml={-6} mt={-2} >
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='dailyEndMonth' onChange={onChangeAddData} aria-describedby="btnGroupAddon" />
                            </Grid>
                            <Grid item xs={2} md={1} ml={1} mt={-1.8} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>/</strong>
                            </Grid>
                            <Grid item xs={2} md={1} ml={-6} mt={-2} >
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='dailyEndDay' onChange={onChangeAddData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={6} md={2} ml={1} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>퇴사 사유</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={0} mt={-2}  >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='dailyEndReason' onChange={onChangeAddData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={12} ml={-5} mt={-4}>
                                <hr style={{ width: '800px' }} />
                            </Grid>

                            <Grid item xs={6} md={6} ml={16} mt={-3} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong> 은행</strong>
                            </Grid>

                            <Grid item xs={6} md={6} ml={-32} mt={-4}  >

                                <Form.Control style={{ width: '280px', height: '30px' }} type="text" name='dailyBankName' onChange={onChangeAddData}  aria-describedby="btnGroupAddon" />
                            </Grid>



                            <Grid item xs={6} md={4} ml={-2} mt={2} style={{ fontSize: '15px', color: '#777777' }}>
                                <div ><strong> 급여 통장</strong></div>
                            </Grid>


                            <Grid item xs={6} md={4} ml={-13.5} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong> 계좌 번호</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={-16} mt={-2} >
                                <Form.Control style={{ width: '280px', height: '30px' }} type="text" name='dailyBankNum' onChange={onChangeAddData} aria-describedby="btnGroupAddon" />
                            </Grid>


                            <Grid item xs={6} md={6} ml={16} mt={-5} style={{ fontSize: '15px', color: '#777777' }} >
                                <strong>예금주</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-31.5} mt={-5}  >
                                <Form.Control style={{ width: '280px', height: '30px' }} type="text" name='dailyBankOwner' onChange={onChangeAddData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={6} md={6} ml={16} mt={-2} style={{ fontSize: '15px', color: '#777777' }} >
                                <strong>일급</strong>
                            </Grid>

                            <Grid item xs={6} md={6} ml={-31.5} mt={-2}  >
                                <Form.Control style={{ width: '280px', height: '30px' }} type="text" name='dailyPay' onChange={onChangeAddData}  aria-describedby="btnGroupAddon" />
                            </Grid>
                        </Grid>
                    </Container>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={addClose}>
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


                show={modify} onHide={modifyClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>일용직정보</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f3f3f3', }}>
                    <br />
                    <Container>
                        <Grid container spacing={4}>
                            <Grid item xs={6} md={2} ml={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>성명</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={2} >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='dailyName' value={modifyData.dailyName } onChange={onChangeModifyData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={6} md={2} ml={-1} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>일용직번호</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={0}>
                                {/* outline:'1px solid #777777'/ */}
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='dailyCode' value={modifyData.dailyCode } onChange={onChangeModifyData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={6} md={3} ml={-2} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>주민등록번호</strong>
                            </Grid>
                            <Grid item xs={6} md={3} ml={-5.5} mt={-2} >
                                <Form.Control style={{ width: '100px', height: '30px' }} type="text" name='dailyFirstSSN' value={modifyData.dailyFirstSSN } onChange={onChangeModifyData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={6} md={3} ml={-10} mt={-1.8} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>ㅡ</strong>
                            </Grid>
                            <Grid item xs={6} md={3} ml={-20.5} mt={-2} >
                                <Form.Control style={{ width: '100px', height: '30px' }} type="password" name='dailySecondSSN' value={modifyData.dailySecondSSN } onChange={onChangeModifyData} aria-describedby="btnGroupAddon" />
                            </Grid>
                            <Grid item xs={6} md={2} ml={-10} mt={-1.5} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>전화 번호</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={0} mt={-2} >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='dailyPhone' value={modifyData.dailyPhone} onChange={onChangeModifyData} aria-describedby="btnGroupAddon" />
                            </Grid>
                            <Grid item xs={6} md={3} ml={-2} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>이메일</strong>
                            </Grid>
                            <Grid item xs={6} md={3} ml={-5.5} mt={-2} >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='dailyEmail' value={modifyData.dailyEmail}  onChange={onChangeModifyData} aria-describedby="btnGroupAddon" />
                            </Grid>
                            <Grid item xs={10} md={5} mt={4} ml={-41.5} style={{ fontSize: '15px', color: '#777777' }} >
                                <strong>주소</strong>
                            </Grid>

                            <Grid item xs={6} md={7} ml={-21} mt={4}  >
                                
                             

                                    <Form.Control
                                        type="text"
                                        name='dailyAddress'
                                        aria-describedby="btnGroupAddon"
                                        style={{ height: '30px',width:'145%' }}
                                        onChange={onChangeModifyData} 
                                        value = {modifyData.dailyAddress}

                                    />
                                  
                            </Grid>
                            <Grid item xs={12} ml={-5} mt={-2}>
                                <hr style={{ width: '800px' }} />
                            </Grid>
                            <Grid item xs={6} md={2} ml={-2} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>직위/직급</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={2} mt={-2}  >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='dailyRank' value = {modifyData.dailyRank} onChange={onChangeModifyData}  aria-describedby="btnGroupAddon" />
                            </Grid>
                            <Grid item xs={2} md={2} ml={-1} mt={-1.5} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>입사일</strong>
                            </Grid>
                            <Grid item xs={2} md={1} mt={-2} ml={0}>
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='dailyStartYear' value = {modifyData.dailyStartYear} onChange={onChangeModifyData}  aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={2} md={1} ml={1} mt={-1.8} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>/</strong>
                            </Grid>

                            <Grid item xs={2} md={1} ml={-6} mt={-2} >
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='dailyStartMonth' value = {modifyData.dailyStartMonth} onChange={onChangeModifyData} aria-describedby="btnGroupAddon" />
                            </Grid>
                            <Grid item xs={2} md={1} ml={1} mt={-1.8} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>/</strong>
                            </Grid>
                            <Grid item xs={2} md={1} ml={-6} mt={-2} >
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='dailyStartDay' value = {modifyData.dailyStartDay} onChange={onChangeModifyData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={2} md={2} ml={-2} mt={-1.5} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>퇴사일</strong>
                            </Grid>
                            <Grid item xs={2} md={1} mt={-2} ml={2}>
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='dailyEndYear'  value = {modifyData.dailyEndYear} onChange={onChangeModifyData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={2} md={1} ml={1} mt={-1.8} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>/</strong>
                            </Grid>

                            <Grid item xs={2} md={1} ml={-6} mt={-2} >
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='dailyEndMonth' value = {modifyData.dailyEndMonth}onChange={onChangeModifyData} aria-describedby="btnGroupAddon" />
                            </Grid>
                            <Grid item xs={2} md={1} ml={1} mt={-1.8} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>/</strong>
                            </Grid>
                            <Grid item xs={2} md={1} ml={-6} mt={-2} >
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='dailyEndDay' value = {modifyData.dailyEndDay} onChange={onChangeModifyData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={6} md={2} ml={1} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>퇴사 사유</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={0} mt={-2}  >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='dailyEndReason' value = {modifyData.dailyEndReason} onChange={onChangeModifyData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={12} ml={-5} mt={-4}>
                                <hr style={{ width: '800px' }} />
                            </Grid>

                            <Grid item xs={6} md={6} ml={16} mt={-3} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong> 은행</strong>
                            </Grid>

                            <Grid item xs={6} md={6} ml={-32} mt={-4}  >

                                <Form.Control style={{ width: '280px', height: '30px' }} type="text" name='dailyBankName' value = {modifyData.dailyBankName} onChange={onChangeModifyData}  aria-describedby="btnGroupAddon" />
                            </Grid>



                            <Grid item xs={6} md={4} ml={-2} mt={2} style={{ fontSize: '15px', color: '#777777' }}>
                                <div ><strong> 급여 통장</strong></div>
                            </Grid>


                            <Grid item xs={6} md={4} ml={-13.5} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong> 계좌 번호</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={-16} mt={-2} >
                                <Form.Control style={{ width: '280px', height: '30px' }} type="text" name='dailyBankNum' value = {modifyData.dailyBankNum}  onChange={onChangeModifyData} aria-describedby="btnGroupAddon" />
                            </Grid>


                            <Grid item xs={6} md={6} ml={16} mt={-5} style={{ fontSize: '15px', color: '#777777' }} >
                                <strong>예금주</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-31.5} mt={-5}  >
                                <Form.Control style={{ width: '280px', height: '30px' }} type="text" name='dailyBankOwner' value = {modifyData.dailyBankOwner} onChange={onChangeModifyData} aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={6} md={6} ml={16} mt={-2} style={{ fontSize: '15px', color: '#777777' }} >
                                <strong>일급</strong>
                            </Grid>

                            <Grid item xs={6} md={6} ml={-31.5} mt={-2}  >
                                <Form.Control style={{ width: '280px', height: '30px' }} type="text" name='dailyPay' value = {modifyData.dailyPay} onChange={onChangeModifyData}  aria-describedby="btnGroupAddon" />
                            </Grid>
                        </Grid>
                    </Container>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={modifyClose}>
                        <strong>닫기</strong>
                    </Button>
                    <button className="addButton" onClick={delShow}>
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
                show={del} onHide={delClose} animation={true}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', width: '500px' }}>
                    <Modal.Title style={{ color: '#ffffff', width: '500px' } }><strong>삭제확인</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6', width: '500px', }}>
                    <strong>{modifyData.dailyName}을 삭제하시겠습니까?</strong></Modal.Body>
                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={delClose}>
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

export default OWAcom;