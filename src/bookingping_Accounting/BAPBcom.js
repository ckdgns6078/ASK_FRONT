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
const BAPBcom = () => {


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
        compCode: null,
        dailyListId: null,
        dailyDate: null,
        dailyCode: "",
        dailyName: "",
        dailyRank: "",
        dailyInOutStart: null,
        dailyInOutEnd: null,
        dailyInOutDetail: null,
        dailyInOutOver: null,
        dailyYear: null,
        dailyMonth: null,
        dailyDay: null
    });
    const [magData, setMagData] = useState();
    const [prData, setPrData] = useState();
    const [PrNData, setPrNData] = useState();

  

    const [modify, setModify] = useState(false);
    const [add, setAdd] = useState(false);
    const [mag, setMag] = useState(false);
    const [Pr, setPr] = useState(false);
    const [PrN, setPrN] = useState(false);

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
    const magClose = (e) => setMag(false);
    const magShow = () => {
        axios.post('http://192.168.2.82:5000/searchDailyEmp', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            console.log("마그데이터 ", response.data);
            setMagData(response.data);
        }).catch(function (err) {
            console.log("searchDailyEmp error", error);
        });
        setMag(true);
    }
    const magSelect = (e) => {
        const temp = { ...addData };
        temp.dailyName = e.dailyName;
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
        axios.post('http://192.168.2.82:5000/readDailyPay', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setPrData(response.data);
            console.log("response.data readDailyPay ", response.data);
        }).catch(function (err) {
            console.log("readDailyPay error : ", err);
        })
        setPr(true);
    }
    // 초과시간 모델
    const PrNClose = (e) => setPrN(false);
    const PrNShow = () => {
        axios.post('http://192.168.2.82:5000/readDailyPay', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setPrNData(response.data);
            console.log("response.data readDailyPay ", response.data);
        }).catch(function (err) {
            console.log("readDailyPay error : ", err);
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
    const onClickProvision = (e) => {
        const temp = { ...modifyData };
        temp.dailyPayType = e.dailyPayName;
        setModifyData(temp);
        PrClose();
    }
    //초과시간 onClick
    const onClickProvisionN = (e) => {
        const temp = { ...modifyData };
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
                dailyCode: addData.dailyCode,
                dailyName: addData.dailyName,
                dailyRank: addData.dailyRank,
                dailyInOutStart: addData.dailyInOutStart,
                dailyInOutEnd: addData.dailyInOutEnd,
                dailyInOutDetail: addData.dailyInOutDetail,
                dailyDate: String(addData.dailyYear) + String(addData.dailyMonth) + String(addData.dailyDay)
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
    //모달

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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





    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong>매입관리 </strong></h2>
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
                             <td style={{border:"1px solid #d8d8d8",fontSize:'22px'}}>
                            <input type="checkbox" id="allCheck" value="allCheck"></input>
                            </td>



                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>구분</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>날짜</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>공급처명</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>유형</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>품목</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>수량</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>단기</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>공급가액</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>부가세</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>합계</strong>
                        </td>

                    </tr>
                </thead>
                <tbody>

                    {
                        data && data.map((e, idx) =>
                            <tr >

                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}> <input type="checkbox" id="allCheck" value="allCheck"></input></td>
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
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.dailyInOutStart}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.dailyInOutEnd}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.dailyInOutOver}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.dailyInOutDetail}</td>
                            </tr>
                        )
                    }

                    <tr style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>
                        <td colSpan='11'></td>

                    </tr>

                </tbody>
            </Table>
            <div>
                <button style={{ position: 'absolute', right: "0px", top: '0px' }} onClick={handleShow} className="Atmp1">  <strong>추가</strong></button>
            </div>




        

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
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px' ,width:'150px'  , backgroundColor: '#f7f7f7',color:'#777777'}}>구분</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'  ,width:'150px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'  ,width:'150px', backgroundColor: '#f7f7f7',color:'#777777'}}>공급처명</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px',width:'150px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px' ,width:'150px', backgroundColor: '#f7f7f7',color:'#777777'}}>연락처</td>
                        <td colSpan='2' style={{border:'1px solid #d8d8d8 ', height:'40px',width:'150px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                    </tr>
                  

                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>날짜</td>
                        <td colSpan='2' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>사업자번호</td>
                        <td colSpan='3' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                    </tr>
                    <tr>
                    <td rowSpan='2' style={{borderLeft:'1px solid #d8d8d8 ', height:'40px',borderBottom:'1px solid #d8d8d8 ', height:'40px' , backgroundColor: '#f7f7f7',color:'#777777'}}>통장</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777' }}>품목</td>
                        <td  style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>수량</td>
                        <td  style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777',width:'150px'}}>단가</td>
                        <td  style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                    </tr>
                    <tr>
                      
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>공급가액</td>
                        <td  style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>부가세</td>
                        <td  style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>합계</td>
                        <td  style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
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
            
















        </div>
    );
};

export default BAPBcom;