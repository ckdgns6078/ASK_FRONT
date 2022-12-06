import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import { Calendar, DatePicker } from 'antd';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { message, Space } from 'antd';

const OWDcom = () => {
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

    //기본 데이터
    const [data, setData] = useState();
    const [modifyData, setModifyData] = useState();
    const [addData, setAddData] = useState({
        compCode:null,
        dailyListId: null,
        dailyDate: null,
        dailyCode: "",
        dailyName: "",
        dailyRank: "",
        dailyInOutStart: null,
        dailyInOutEnd: null,
        dailyInOutDetail: null,
        dailyInOutOver: null,
        dailyYear : null,
        dailyMonth : null,
        dailyDay : null
    });
    const [magData , setMagData] = useState();
    const [prData , setPrData] = useState();
    const [PrNData , setPrNData] = useState();
    
    
    const [modify, setModify] = useState(false);
    const [add, setAdd] = useState(false);
    const [mag, setMag] = useState(false);
    const [Pr, setPr] = useState(false);
    const [PrN , setPrN] = useState(false);

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



    //추가 모델
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
    
    //돋보기 모델
    const magClose =(e)=>setMag(false);
    const magShow =()=>{
        axios.post('http://192.168.2.82:5000/searchDailyEmp', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            console.log("마그데이터 " , response.data);
            setMagData(response.data);
        }).catch(function (err) {
            console.log("searchDailyEmp error", error);
        });
        setMag(true);
    }
    const magSelect =(e)=>{
        const temp={...addData};
        temp.dailyName =e.dailyName;
        temp.dailyRank = e.dailyRank; 
        temp.dailyCode = e.dailyCode;
        setAddData(temp);
        magClose(false);
    }

    //수정 모델
    const modifyClose = () => setModify(false);
    const modifyShow = (e) => {
        axios.post('http://192.168.2.82:5000/updateDailyInOutModal', {
            dailyListId: e.dailyListId
        }).then(function (response) {
            console.log(response.data[0]);
            setModifyData(response.data[0]);
        }).catch(function (err) {
            console.log("updateDailyInOutModal err :", err);
            let text = "데이터를 가져오는데 오류가 발생하였습니다.";
            error(text);
        })
        setModify(true);
    }
    // 연장시간 모델
    const PrClose = (e) => setPr(false);
    const Prshow = () => {
        axios.post('http://192.168.2.82:5000/readDailyPay',{
            compCode:sessionStorage.getItem("uid")
        }).then(function(response){
            setPrData(response.data);
            console.log("response.data readDailyPay " ,response.data);
        }).catch(function(err){
            console.log("readDailyPay error : " ,err);
        })
        setPr(true);
    }
    // 초과시간 모델
    const PrNClose = (e) => setPrN(false);
    const PrNShow = ()=>{
        axios.post('http://192.168.2.82:5000/readDailyPay',{
            compCode:sessionStorage.getItem("uid")
        }).then(function(response){
            setPrNData(response.data);
            console.log("response.data readDailyPay " ,response.data);
        }).catch(function(err){
            console.log("readDailyPay error : " ,err);
        })
        setPrN(true);
    }



    //입력값 onChange 함수
    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
        });
    }
    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        setAddData({
            ...addData,
            [name]: value
        });
    }

    //연장시간 onClick
    const onClickProvision = (e) =>{
        const temp = {...modifyData};
        temp.dailyPayType = e.dailyPayName;
        setModifyData(temp);
        PrClose();
    }
    //초과시간 onClick
    const onClickProvisionN = (e) =>{
        const temp = {...modifyData};
        temp.dailyPayTypeNight = e.dailyPayName;
        setModifyData(temp);
        PrNClose();
    }


    //데이터 전송
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
            dailyListId: modifyData.dailyListId,
            dailyInOutDetail: modifyData.dailyInOutDetail,
            dailyInOutStart: modifyData.dailyInOutStart,
            dailyInOutEnd: modifyData.dailyInOutEnd
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



    //달력
    const [dateStart, setDateStart] = useState(); // 시작일
    const [dateEnd, setDateEnd] = useState();    // 종료일
    const [search, setSearch] = useState();     //이름

    const searchAddData = () => {
        console.log("daily Name :", search);
        console.log("daily Name :", dateStart);
        console.log("daily Name :", dateEnd);

        axios.post('http://192.168.2.82:5000/searchDailyInOut', {
            compCode: sessionStorage.getItem("uid"),
            dailyName: search,//이름,
            dailyStartDate: dateStart,//시작일 ,
            dailyEndDate: dateEnd,//종료일자
        }).then(function (response) {
            console.log("search_inOutInfo data : ", response.data);
            setData(response.data);
        }).catch(function (err) {
            console.log("search_inOutInfo error", err);
        });
    }
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());

    //시작일 onChange
    const onChangeStart = (date) => {
        console.log("@@@@@@@@@", date);
        let year = null;
        let month = null;
        let day = null;
        let total = null;
        if (date == null) {
            setDateStart(date);
        } else {
            year = String(date.$y);
            month = String(date.$M + 1);
            day = String(date.$D);
            if (month < 10) {
                month = "0" + String(month);
            }
            if (day < 10) {
                day = "0" + String(day);
            }
            total = year + month + day;
            console.log("year", year);
            console.log("month", month);
            console.log("day ", day);
            setDateStart(total);
        }
    }
    //종료일 onChange
    const onChangeEnd = (date) => {
        console.log("@@@@@@@@@@", date);
        let year = null;
        let month = null;
        let day = null;
        let total = null;
        if (date == null) {
            setDateEnd(date);
        } else {
            year = String(date.$y);
            month = String(date.$M + 1);
            day = String(date.$D);
            if (month < 10) {
                month = "0" + String(month);
            }
            if (day < 10) {
                day = "0" + String(day);
            }
            total = year + month + day;
            setDateEnd(total);
        }
    }
    //이름 입력 onChange
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    //엔터 입력 
    const enterkey = () => {
        if (window.event.keyCode == 13) {
            searchAddData();
        }
    }


    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong>출퇴근 현황 </strong></h2>
            <div>
                <button style={{ position: 'absolute', right: "0px", top: '65px' }} onClick={addShow} className="Atmp1">  <strong>추가</strong></button>
            </div>

            <br />
            <br />
            <br />


            <Grid container style={{ width: '1400px' }}>
                <Grid><div style={{ fontSize: '22px' }}>시작 날짜</div></Grid>
                <Grid>
                    <div >
                        <DatePicker
                            selected={date => setStartDate}
                            onChange={date => onChangeStart(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            style={{ height: '40px' }}
                        />


                    </div>
                </Grid>
                <Grid ml={1}><div style={{ fontSize: '22px' }}>종료 날짜</div></Grid>
                <Grid>
                    <div>
                        <DatePicker
                            selected={endDate => setendDate}
                            onChange={date => onChangeEnd(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            style={{ height: '40px' }}
                        />
                    </div>
                </Grid>




                {/* 검색창 */}
                <Grid item sx ml={1} >
                    <InputGroup style={{ width: '250px', height: '10px' }}>

                        <Form.Control
                            type="text"
                            name='search'
                            aria-describedby="btnGroupAddon"
                            onChange={onChangeSearch}
                            style={{ height: '40px' }}
                            onKeyUp={enterkey}

                        />
                        <InputGroup.Text id="btnGroupAddon" onClick={searchAddData} style={{ width: '50px', height: '40px' }}> <SearchIcon /></InputGroup.Text>
                    </InputGroup>

                </Grid>
            </Grid>
            <br />
            <Table >
                <thead style={{ height: '60px' }}>
                    <tr style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>



                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>날짜</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>성명</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>직급</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>출근시간</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>퇴근시간</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>초과근무시간</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
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
                                    <Button style={{ fontSize: '22px' }} name={e.inOutListId} onClick={() => modifyShow(e)} variant="link">
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
           

            {/* 추가 */}

                    
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
                        <Table>
                            <tr style={{ color: '#f7f7f7', textAlign: "center", }}>
                                <td  style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }} >성명</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' , width:'220px',  height:'50px'}}>  
                                <InputGroup style={{ width:'100%'}}>
                                    <Form.Control
                                        type="text"
                                        name='dailyName'
                                        value={addData.dailyName}
                                        aria-describedby="btnGroupAddon"
                                        style={{ height: '40px'  }}
                                        onChange={onChangeAddData}
                                    />
                                    <InputGroup.Text id="btnGroupAddon" onClick={magShow} style={{ width: '40px', height: '40px' }}> <SearchIcon /></InputGroup.Text>
                                    </InputGroup>
                                </td>
                                <td  style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' ,width:'100px' }}>일용직코드</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' , width:'150px',  height:'50px'}}>  <Form.Control style={{ width:'100%',height:'100%'}} type="text" name='dailyCode' value={addData.dailyCode} aria-describedby="btnGroupAddon" onChange={onChangeAddData} /></td>
                                <td  style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>직급</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' , width:'150px',  height:'50px'}}>  <Form.Control style={{ width:'100%',height:'100%'}} type="text" name='dailyRank' value={addData.dailyRank}  aria-describedby="btnGroupAddon" onChange={onChangeAddData} /></td>
                                
                            </tr>
                        </Table>

                        <br/>
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
                    <button  className='addButton' variant="primary" onClick={pushAddData}>
                        저장
                    </button>
                </Modal.Footer>
            </Modal>



            {/* 수정 */}
            <Modal
                centered
                size="lg"
                show={modify} onHide={modifyClose} animation={false} id="ModifyModal">
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>출퇴근상세</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>

                    <br />
                    <Container>
                        <Table >
                            <thead >
                                <tr style={{ color: '#f7f7f7', textAlign: "center", }}>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' , width:'100px' }}>날짜</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' , width:'150px' }}>{modifyData && modify && modifyData.dailyDate}</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' , width:'100px' }}>성명</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' , width:'150px'}}>{modifyData && modify && modifyData.dailyName}</td>
                                    {/* <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7', width:'100px' }}>부서</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', width:'150px' }}>???</td> */}

                                </tr>

                            </thead>
                            <tbody>
                                <tr style={{ textAlign: "center", }}>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>직위</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' }}>{modifyData && modify && modifyData.dailyRank}</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>일용직코드</td>
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
                                <td style={{ border: "1px solid #d8d8d8", width: '60px', height: '50px', fontSize: '14px' }}>{modifyData && modify && modifyData.dailyInOutOver}</td>
                                <td style={{ border: "1px solid #d8d8d8", width: '60px', height: '50px', fontSize: '14px' }}>{modifyData && modify && modifyData.dailyInOutNight}</td>
                                    <td  rowspan='2'style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>
                                        <Form.Control style={{ width: '100%', height:'100%' }} name="dailyInOutDetail" value={modifyData && modify && modifyData.dailyInOutDetail} type="text" onChange={onChangeModifyData} />
                                    </td>
                            </tr>


                            <tr style={{ backgroundColor: '', border: "1px solid #d8d8d8" }}>
                               
                               
                                <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}> 
                                  { modifyData && modifyData.dailyInOutOver != "00:00"&& 
                                  <InputGroup style={{ height: '60px' }}>

                                    <Form.Control
                                        type="addpayCalc"
                                        name="neverChange"
                                        aria-describedby="btnGroupAddon"
                                        value={modifyData && modifyData.dailyPayType}
                                        style={{ height: '100%' , fontSize:'12px'}}
                                        onChange={onChangeModifyData}
                                        
                                        />
                                    <InputGroup.Text id="btnGroupAddon" onClick={Prshow}  style={{ width: '50px', height: '100%' }}>  <SearchIcon /></InputGroup.Text>
                                </InputGroup>
                                    }
                                </td>


                                <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>    
                                    { modifyData && modifyData.dailyInOutNight !="00:00" &&
                                <InputGroup style={{ height: '60px' }}>
                                    <Form.Control
                                        type="addpayCalc"
                                        name="neverChange"
                                        aria-describedby="btnGroupAddon"
                                        value={modifyData && modifyData.dailyPayTypeNight}
                                        style={{ height: '100%' , fontSize:'12px' }}
                                        onChange={onChangeModifyData}
                                        
                                        />
                                    <InputGroup.Text id="btnGroupAddon" onClick={PrNShow}   style={{ width: '50px', height: '100%' }}>  <SearchIcon /></InputGroup.Text>
                                </InputGroup>
                                    }
                                </td>
            
                            </tr>
                        </Table>
                        <Box md={3}></Box>

                    </Container>
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
                size="lg"
                centered
                show={Pr} onHide={PrClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}> <strong>지급유형</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>

                    <Table
                        hover 
                        style={{
                        textAlign: "center",
                        width: "100%", height: '200px', border: "1px solid f1f2f6",
                    }} >
                        <tr style={{ border: "1px solid f1f2f6", backgroundColor: '#ecf0f1' }}>
                            <td style={{ border: "1px solid f1f2f6", fontSize: '20px' }}><strong></strong></td>
                            <td style={{ border: "1px solid f1f2f6", fontSize: '20px' }}><strong>수당코드</strong></td>
                            <td style={{ border: "1px solid f1f2f6", fontSize: '20px' }}><strong>수당명</strong></td>
                            <td style={{ border: "1px solid f1f2f6", fontSize: '20px' }}><strong>비과세</strong></td>
                            <td style={{ border: "1px solid f1f2f6", fontSize: '20px' }}><strong>지급유형</strong></td>
                        </tr>
                        <tbody>
                            {
                                prData && prData.map((e, idx) =>
                                    <tr style={{ border: "1px solid f1f2f6" }}>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{idx + 1}</td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.dailyPayCode}</td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>
                                            <Button variant="link" name={e.dailyPayId} onClick={() => onClickProvision(e)}>
                                                <strong>{e.dailyPayName}</strong>
                                            </Button></td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.dailyTaxFreeName}</td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.dailyTaxFreeType}</td>
                                        {/* <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>{e.takeVacation}</td> */}
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>

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

            {/*  야간 */}
            <Modal
                size="lg"
                centered
                show={PrN} onHide={PrNClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}> <strong>지급유형</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>

                    <Table  hover
                        style={{
                        textAlign: "center",
                        width: "100%", height: '200px', border: "1px solid #d8d8d8",
                    }} >
                        <tr style={{ border: "1px solid #d8d8d8", backgroundColor: '#f7f7f7' }}>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}><strong></strong></td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}><strong>수당코드</strong></td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}><strong>수당명</strong></td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}><strong>비과세</strong></td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}><strong>지급유형</strong></td>
                        </tr>
                        <tbody>
                            {
                                PrNData && PrNData.map((e, idx) =>
                                    <tr style={{ border: "1px solid #d8d8d8" }}>

                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{idx + 1}</td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.dailyPayCode}</td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>
                                            <Button variant="link" name={e.dailyPayId} onClick={() => onClickProvisionN(e)}>
                                                <strong>{e.dailyPayName}</strong>
                                            </Button></td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.dailyTaxFreeName}</td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.dailyTaxFreeType}</td>
                                        {/* <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>{e.takeVacation}</td> */}

                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
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



            {/* 추가 돋보기 모델 */}
            <Modal
                size="lg"
                centered
                show={mag} onHide={magClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}> <strong>사원코드</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>

                    <Table 
                        hover
                        style={{
                        textAlign: "center",
                        width: "100%", 
                       
                    }} >
                        <tr style={{ border: "1px solid #d8d8d8", backgroundColor: '#f7f7f7' }}>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}><strong></strong></td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}><strong>일용직코드</strong></td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}><strong>성명</strong></td>
                            <td style={{ fontSize: '22px', color: '#000' }}> <strong>직급</strong></td>

                        </tr>
                        {
                            magData && magData.map((e, idx) =>
                                <tr style={{ border: "1px solid #d8d8d8" }}>
                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '22px' ,color:'#000'}}>{idx + 1}</td>
                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '22px',color:'#000' }}>{e.dailyCode}</td>
                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '22px' ,color:'#000'}}>
                                    <Button name={e.dailyId} onClick={() => magSelect(e)} variant="link"><strong>{e.dailyName}</strong></Button>   
                                    </td>
                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '22px' }}>{e.dailyRank}</td>

                                </tr>

                            )
                        }

                    </Table>
                </Modal.Body>
            </Modal>


        </div>
    );

};

export default OWDcom;