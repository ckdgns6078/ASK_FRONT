import { getAccordionDetailsUtilityClass, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from '@mui/material/Container';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import Success from '../alert/Success';
import MuiAlert from '@mui/material/Alert';
import { message, Space } from 'antd';


const OWCcom = () => {
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


    const [data, setData] = useState();
    const [modifyData, setModifyData] = useState();
    const [addData, setAddData] = useState({
        compCode:null,
        dailyListId: null,
        dailyDate: null,
        dailyCode: null,
        dailyName: null,
        dailyRank: null,
        dailyInOutStart: null,
        dailyInOutEnd: null,
        dailyInOutDetail: null,
        dailyInOutOver: null,
        dailyYear : null,
        dailyMonth : null,
        dailyDay : null
    });
    const [magData , setMagData] = useState();
    const [add, setAdd] = useState(false);
    const [modify, setModify] = useState(false);
    const [del, setDel] = useState(false);
    const [mag, setMag] = useState(false);

    const addShow = () => setAdd(true);
    const addClose = () => {
        setAddData({
            "compCode": null,
            "dailyListId": null,
            "dailyDate": null,
            "dailyCode": null,
            "dailyName": null,
            "dailyRank": null,
            "dailyInOutStart": null,
            "dailyInOutEnd": null,
            "dailyInOutDetail": null,
            "dailyInOutOver": null,
            "dailyYear": null,
            "dailyMonth": null,
            "dailyDay": null
        })
        setAdd(false);
    }
    const modifyShow = (e) => {
        axios.post('http://192.168.2.82:5000/updateDailyInOutModal',{
            dailyListId : e.dailyListId
        }).then(function(response){
            setModifyData(response.data[0]);
        }).catch(function(err){
            console.log("updateDailyInOutModal err :" ,err);
            let text = "데이터를 가져오는데 오류가 발생하였습니다.";
            error(text);
        })
        setModify(true);
    }
    const modifyClose = () => setModify(false);
    const delShow = () => setDel(true);
    const delClose = () => setDel(false);
    const magShow =()=>{
        axios.post('http://192.168.2.82:5000/searchDailyEmp', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setMagData(response.data);
        }).catch(function (err) {
            console.log("searchDailyEmp error", error);
        });
        setMag(true);
    }
    const magClose =(e)=>setMag(false);
    const magSelect =(e)=>{
        const temp={...addData};
        temp.dailyName =e.dailyName;
        temp.dailyRank = e.dailyRank; 
        temp.dailyCode = e.dailyCode;
        setAddData(temp);
        magClose(false);
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.post('http://192.168.2.82:5000/readDailyInOut', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (err) {
            console.log("createDailyInOut error", error);
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

    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
        });
        console.log(modifyData);
    }

    const pushAddData = () => {
        if (addData.dailyYear == null || addData.dailyMonth == null || addData.dailyDay == null) {
            let contentText = "날짜에 공란을 넣을 수 없습니다."
            warning(contentText);
        } else {
            axios.post('http://192.168.2.82:5000/createDailyInOut', {
                compCode: sessionStorage.getItem("uid"),
                dailyCode : addData.dailyCode,
                dailyName: addData.dailyName,
                dailyRank: addData.dailyRank,
                dailyInOutStart: addData.dailyInOutStart,
                dailyInOutEnd: addData.dailyInOutEnd,
                dailyInOutDetail: addData.dailyInOutDetail,
                dailyDate : String(addData.dailyYear) + String(addData.dailyMonth)+String(addData.dailyDay)
            }).then(function (response) {
                if (response.data) {
                    let text = "출퇴근 등록 완료"
                    getData();
                    addClose();
                    success(text);
                } else {
                    let text = "출퇴근 등록 실패 , 공란이 있는지 확인해주세요."
                    warning(text);
                }
            }).catch(function (err) {
                console.log("createDailyInOut error", err);
                let text = "출퇴근 등록 에러 발생 , 새로고침 후 다시 실행해주세요"
                error(text);
            });
        }
    }
    const pushModifyData = () => {
        axios.post('http://192.168.2.82:5000/updateDailyInOut', {
                dailyListId : modifyData.dailyListId,
                dailyInOutDetail :modifyData.dailyInOutDetail,
                dailyInOutStart :modifyData.dailyInOutStart,
                dailyInOutEnd : modifyData.dailyInOutEnd
            }).then(function (response) {
                if (response.data) {
                    let text = "출퇴근 수정 완료"
                    getData();
                    modifyClose();
                    success(text);
                } else {
                    let text = "출퇴근 수정 실패 , 공란이 있는지 확인해주세요."
                    warning(text);
                }
            }).catch(function (err) {
                console.log("updateDailyInOut error", err);
                let text = "출퇴근 수정 에러 발생 , 새로고침 후 다시 실행해주세요"
                error(text);
            });

    }

        //검색 모달함수 
        const [Pr, setPr] = useState(false);

        const PrClose = (e) => setPr(false);
    
    
        const Prshow = () => setPr(true);
    
        const onClickProvision = (e) =>{
            const temp = {...modifyData};
            temp.modifypayType = e.target.innerText;
            setModifyData(temp);
            PrClose();
        }
    


    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong>출퇴근 관리 </strong></h2>
      
            <br />
            <br />
            <br />
            <div>
                <button  style={{ position: 'absolute', left: "0px",  top:'100px'}} onClick={addShow} className="Atmp1">  <strong>추가</strong></button>
                <button style={{ position: 'absolute', right: "100px", top: '70px' }}className="Atmp1"><strong>추가</strong></button>
            </div>
            <Table >
                <thead style={{ height: '60px' }}>
                    <tr style={{ backgroundColor: '#f7f7f7'}}>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>날짜</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>성명</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>직급</strong>
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
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.dailyDate}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>
                                    <Button style={{ fontSize: '22px' }} name={e.dailyListId} onClick={() => modifyShow(e)} variant="link">
                                        <strong>
                                            {e.dailyName}
                                        </strong>
                                    </Button>
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.dailyRank}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.dailyInOutStart}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.dailyInOutEnd}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.dailyInOutOver}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.dailyInOutDetail}</td>

                            </tr>
                        )
                    }
                </tbody>
            </Table>
           

        {/*  출퇴근 등록 추가 */}
            <Modal
                centered
                size="lg"
                show={add} onHide={addClose} animation={false} id="AddModal">
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>출퇴근등록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>
                    <br />
                        <Table >
                            <tr style={{ color: '#f7f7f7', textAlign: "center", }}>
                                <td  style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }} >성명</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' , width:'150px',  height:'50px'}}>  
                                <InputGroup style={{ width:'100%'}}>
                                    <Form.Control
                                        type="text"
                                        name='dailyName'
                                        value={addData.dailyName}
                                        aria-describedby="btnGroupAddon"
                                        style={{ height: '40px' }}
                                        onChange={onChangeAddData}
                                    />
                                    <InputGroup.Text id="btnGroupAddon" onClick={magShow} style={{ width: '40px', height: '40px' }}> <SearchIcon /></InputGroup.Text>
                                    </InputGroup>
                                </td>
                                <td  style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>일용직코드</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' , width:'150px',  height:'50px'}}>  <Form.Control style={{ width:'100%',height:'100%'}} type="text" name='dailyCode' value={addData.dailyCode} aria-describedby="btnGroupAddon" onChange={onChangeAddData} /></td>
                                <td  style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>직급</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' , width:'150px',  height:'50px'}}>  <Form.Control style={{ width:'100%',height:'100%'}} type="text" name='dailyRank' value={addData.dailyRank}  aria-describedby="btnGroupAddon" onChange={onChangeAddData} /></td>
                                
                            </tr>
                        </Table>


                        <Table  >


                            <tr  style={{ color: '#f7f7f7', textAlign: "center", }}>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' , width:'100px' }}>날짜</td>


                                <td colspan="5"style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' , width:'150px' , textAlign: "center"}}  >
                                    <Grid container>                                            
                                        <Grid item   ml={1} ><Form.Control style={{ width: '100px', height: '40px' }} type="text" name='dailyYear' aria-describedby="btnGroupAddon" onChange={onChangeAddData} /></Grid>
                                        <Grid item ml={2.5} mt={1}>/</Grid>
                                        <Grid item ml={3}> <Form.Control style={{ width: '100px', height: '40px' }} type="text" name='dailyMonth' aria-describedby="btnGroupAddon" onChange={onChangeAddData} /></Grid>
                                        <Grid item ml={4}  mt={1}>/</Grid>
                                        <Grid item ml={3}> <Form.Control style={{ width: '100px', height: '40px' }} type="text" name='dailyDay' aria-describedby="btnGroupAddon" onChange={onChangeAddData} /></Grid>
                                    </Grid>
                                </td>
                                
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' , width:'100px' }}>비고</td>
                               
                            </tr>
                            <tr style={{ color: '#f7f7f7', textAlign: "center", height:'50px' }}>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' , width:'100px' ,height:'50px' }}>출근시간</td>
                                <td colspan="2" style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' , width:'150px',  height:'50px'}}>
                                    <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='dailyInOutStart' aria-describedby="btnGroupAddon" onChange={onChangeAddData} />
                                </td>
                               
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' , width:'100px',height:'50px' }}>퇴근시간</td>
                                <td  colspan="2" style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' , width:'150px',height:'50px' }}>
                                     <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='dailyInOutEnd' aria-describedby="btnGroupAddon" onChange={onChangeAddData} />
                                </td>
                                
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' , width:'200px',height:'50px' }}>
                                <Form.Control style={{ width: '100%'  ,height:'50px'}} type="text" name='dailyInOutDetail' aria-describedby="btnGroupAddon" onChange={onChangeAddData} />
                                </td>
                               
                            </tr>


                        </Table>

                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={addClose}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={pushAddData}>
                        저장
                    </Button>
                </Modal.Footer>
            </Modal>



            {/* 출퇴근상세 수정 */}
            <Modal
                centered
                size="lg"
                show={modify} onHide={modifyClose} animation={false} id="ModifyModal">
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>출퇴근상세</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>

                          <Container>
                        <Table  >
                            <thead >
                                <tr style={{ color: '#f7f7f7', textAlign: "center", }}>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' , width:'100px' }}>날짜</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' , width:'150px' }}>{modifyData && modify && modifyData.dailyDate}</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' , width:'100px' }}>이름</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' , width:'150px'}}>{modifyData && modify && modifyData.dailyName}</td>
                                    {/* <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7', width:'100px' }}>부서</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', width:'150px' }}>???</td> */}

                                </tr>

                            </thead>
                            <tbody>
                                <tr style={{ textAlign: "center", }}>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>직급</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' }}>{modifyData && modify && modifyData.dailyRank}</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>일용직코드 </td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' }}>{modifyData && modify && modifyData.dailyCode}</td>
                                    {/* <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>사번</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' }}>???</td> */}
                                </tr>
                            </tbody>

                        </Table>
                        <br></br>
                        <Table style={{ textAlign: 'center', width: '100%', border: "1px solid #d8d8d8" }} >
                            <tr style={{ backgroundColor: '#f7f7f7', }}>
                                <td style={{ border: "1px solid #d8d8d8", width: '60px', height: '50px', fontSize: '12px' }} >출근</td>
                                <td style={{ border: "1px solid #d8d8d8", width: '60px', height: '50px', fontSize: '12px' }}>퇴근</td>
                                <td style={{ border: "1px solid #d8d8d8", width: '60px', height: '50px', fontSize: '12px' }}>연장</td>
                                <td style={{ border: "1px solid #d8d8d8", width: '60px', height: '50px', fontSize: '12px' }}>야간</td>
                                <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>비교</td>
                            </tr>
                            <tr style={{ backgroundColor: '', border: "1px solid #d8d8d8" }}>
                                <td rowspan='2' style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px', }}> <Form.Control style={{ width: '100%', height: '100%', textAlign: "center" }} name="dailyInOutStart" value={modifyData && modify && modifyData.dailyInOutStart} type="text" onChange={onChangeModifyData} /></td>
                                <td rowspan='2' style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px' }}><Form.Control style={{ width: '100%', height: '100%', textAlign: "center" }} name="dailyInOutEnd" value={modifyData && modify && modifyData.dailyInOutEnd} type="text" onChange={onChangeModifyData} /></td>
                                <td style={{ border: "1px solid #d8d8d8", width: '60px', height: '50px', fontSize: '12px' }}> 시간</td>
                                <td style={{ border: "1px solid #d8d8d8", width: '60px', height: '50px', fontSize: '12px' }}>시간</td>
                                    <td  rowspan='2'style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>
                                        <Form.Control style={{ width: '100%', height:'100%' }} name="dailyInOutDetail" value={modifyData && modify && modifyData.dailyInOutDetail} type="text" onChange={onChangeModifyData} />
                                    </td>
                            </tr>


                            <tr style={{ backgroundColor: '', border: "1px solid #d8d8d8" }}>
                               
                               
                                <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}> 
                                  <InputGroup style={{ height: '60px' }}>

                                    <Form.Control
                                        type="addpayCalc"
                                        name="modifypayCalc"
                                        aria-describedby="btnGroupAddon"
                                        // value={modifyData.modifypayCalc}
                                        style={{ height: '100%' }}
                                        onChange={onChangeModifyData}

                                    />
                                    <InputGroup.Text id="btnGroupAddon" onClick={Prshow}  style={{ width: '50px', height: '100%' }}>  <SearchIcon /></InputGroup.Text>
                                </InputGroup>
                                </td>


                                <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>    
                                <InputGroup style={{ height: '60px' }}>

                                    <Form.Control
                                        type="addpayCalc"
                                        name="modifypayCalc"
                                        aria-describedby="btnGroupAddon"
                                        // value={modifyData.modifypayCalc}
                                        style={{ height: '100%'  }}
                                        onChange={onChangeModifyData}

                                    />
                                    <InputGroup.Text id="btnGroupAddon" onClick={Prshow}   style={{ width: '50px', height: '100%' }}>  <SearchIcon /></InputGroup.Text>
                                </InputGroup>
                                </td>
            
                            </tr>




                        </Table>
                      

                    </Container>


                    {/* <Container>         
                    <Table >
                        <thead style={{height:'60px'}}>
                            <tr style={{backgroundColor:'#ecf0f1' , color:'#777777' ,textAlign: "center", }}>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>성명</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>일용직코드</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>직급</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>날짜 </strong></td>
                          
                            </tr>

                        </thead>
                        <tbody>
                                <tr style={{textAlign: "center",}}>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{modifyData && modify && modifyData.dailyName}</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{modifyData && modify && modifyData.dailyCode}</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{modifyData && modify && modifyData.dailyRank}</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>{modifyData && modify && modifyData.dailyDate}</strong></td>
                                </tr>
                        </tbody>
                    
                    </Table> 
                    <br></br>
                    <Table  >
                            <thead style={{height:'60px'}}>
                            <tr style={{backgroundColor:'#ecf0f1' , color:'#777777' ,textAlign: "center", }}>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>비고</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>출근시간</strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>퇴근시간</strong></td>
                              
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>초과시간</strong></td>
                            </tr>
                            </thead>
                            <tbody>
                                <tr style={{textAlign: "center",}}>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}> <strong>  <Form.Control style={{ width: '170px', height: '50px' }} name="dailyInOutDetail" value={modifyData && modify &&modifyData.dailyInOutDetail} type="text" onChange={onChangeModifyData}/></strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong> <Form.Control style={{ width: '170px', height: '50px' }} name="dailyInOutStart" value={modifyData && modify &&modifyData.dailyInOutStart} type="text" onChange={onChangeModifyData}/></strong></td>
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong> <Form.Control style={{ width: '170px', height: '50px' }} name="dailyInOutEnd" value={modifyData && modify &&modifyData.dailyInOutEnd} type="text" onChange={onChangeModifyData}/></strong></td>
                                
                                <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong> {modifyData && modify && modifyData.dailyInOutOver}</strong></td>
                               
                             
                                </tr>
                        </tbody>


                        </Table>
                        <Box md={3}></Box>

                    </Container> */}
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modifyClose}>
                        닫기
                    </Button>
                    <button className='addButton' variant="primary" onClick={pushModifyData}>
                        수정
                    </button>
                </Modal.Footer>
            </Modal>



                   {/*  지급 유형 모달 */}
                   <Modal
                size="xsm"
                centered
                show={Pr} onHide={PrClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', }}>
                    <Modal.Title style={{ color: '#ffffff' }}> <strong>지급유형</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6' }}>

                    <table style={{
                        textAlign: "center",
                        width: "100%", height: '200px', border: "1px solid gray",
                    }} >
                        <tr style={{ border: "1px solid gray", backgroundColor: '#a4b0be' }}>
                            <td style={{ border: "1px solid gray", fontSize: '30px' }}><strong> 비고</strong></td>
                            <td style={{ fontSize: '30px' }}> <strong> 지급유형</strong></td>
                        </tr>
                        <tr style={{ border: "1px solid gray" }}>
                            <td style={{ border: "1px solid gray", fontSize: '30px' }}>1</td>
                            <td style={{ border: "1px solid gray", fontSize: '30px' }}><Button onClick={(e) => onClickProvision(e)}  value = "change1"variant="link"><strong> 변동(일)</strong></Button></td>
                        </tr>
                        <tr style={{ border: "1px solid gray" }}>
                            <td style={{ border: "1px solid gray", fontSize: '30px' }}>2</td>
                            <td style={{ border: "1px solid gray", fontSize: '30px' }}><Button  onClick={(e) => onClickProvision(e)} value = "change2"variant="link"> <strong> 변동(시간)</strong></Button></td>
                        </tr>
                        <tr style={{ border: "1px solid gray" }}>
                            <td style={{ border: "1px solid gray", fontSize: '30px' }}>3</td>
                            <td style={{ border: "1px solid gray", fontSize: '30px' }}><Button onClick={(e) => onClickProvision(e)}  value="고정" variant="link"><strong> 고정</strong></Button></td>
                        </tr>

                    </table>
                </Modal.Body>
                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={PrClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={PrClose}>
                        완료
                    </button>
                </Modal.Footer>

            </Modal>


        </div>
    );
};

export default OWCcom;