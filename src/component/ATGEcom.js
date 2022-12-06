import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Rsearch from './Rsearch';
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
import ReplayIcon from '@mui/icons-material/Replay';


const ATGEcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
    const [del, setDel] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);
    const [SH, setSh] = useState(false);
    const [addData, setAddData] = useState();
    const [prData, setPrData] = useState();
    const [modifyData, setModifyData] = useState();
    const [dateStart, setDateStart] = useState(); // 시작일
    const [dateEnd, setDateEnd] = useState();    // 종료일
    const [search, setSearch] = useState();     //이름

    const ShClose = () => setSh(false);
    const Shshow = () => setSh(true);
    const delShow = () => setDel(true);
    const delClose = () => setDel(false);

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
            console.log("read_inOutInfo error", err);
        });
    }

    const modifyAddData = () => {
        axios.post('http://192.168.2.91:5000/update_inOutInfo ', {
            inOutListId: modifyData.inOutListId,
            inOut_Note: modifyData.inOut_Note,
            inOutStart: modifyData.inOutStart,
            inOutEnd: modifyData.inOutEnd,
            payType : modifyData.payType,
            payTypeNight : modifyData.payTypeNight,
            inOut_Note : modifyData.inOut_Note
        }).then(function (response) {
            if (response.data) {
                let contentText = "출퇴근시간이 변경되었습니다.";
                success(contentText);
                getData();
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

    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
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

    const searchAddData = () => {
        axios.post('http://192.168.2.91:5000/search_inOutInfo', {
            compCode: sessionStorage.getItem("uid"),
            empName: search,//이름,
            startDate: dateStart,//시작일 ,
            endDate: dateEnd,//종료일자
        }).then(function (response) {
            setData(response.data);
        }).catch(function (err) {
            console.log("search_inOutInfo error", err);
        });
    }
    //추가 모델에서 추가 눌렀을경우 함수
    const pushAddData = () => {
        axios.post('http://192.168.2.91:5000/create_inOutInfo ', {
            inOut_Note: addData.addinOut_Note,//비고
            compCode: sessionStorage.getItem("uid"),//회사코드
            depName: addData.adddepName,//부서명
            empCode: addData.addempCode,//사원코드
            empName: addData.addempName,//사원명
            inOutDate: addData.addYear + "-" + addData.addMonth + "-" + addData.addDay,//날짜
            inOutEnd: addData.addinOutEnd,//퇴근시간
            inOutStart: addData.addinOutStart,//출근시간
            depCode: addData.adddepCode,//부서코드
            empRank: addData.addempRank,//직급
        }).then(function (response) {
            if (response.data) {
                let contentText = "출퇴근 등록 완료.";
                getData();
                handleClose();
                success(contentText);
            } else {
                let contentText = "오류가 발생했습니다 새로고침 후 다시 실행하세요.";
                warning(contentText);
            }
        }).catch(function (er) {
            console.log("update_inOutInfo error", er);
            let contentText = "서버 연동 에러 발생";
            error(contentText);
        });

    }
    //모델에서 데이터 삭제할때 실행되는 함수
    const delAddData = () => {
        axios.post('http://192.168.2.91:5000/delete_inOutInfo', {
            inOutListId: modifyData.inOutListId
        }).then(function (response) {
            if (response.data) {
                let contentText = "삭제완료";
                getData();
                delClose();
                MdClose();
                success(contentText);
            }
        }).catch(function (err) {
            console.log("search_inOutInfo error", err);
            let contentText = "출퇴근 삭제에 오류가 발생했습니다. 새로고침 후 다시 시도해주세요.";
            success(contentText);
        });
    }
    const [modify, setModify] = useState(false);

    //검색 모달함수 
    const [Pr, setPr] = useState(false);
    const PrClose = (e) => setPr(false);
    const Prshow = () => {
        axios.post('http://192.168.2.82:5000/readEmpPay', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setPrData(response.data);
        }).catch(function (err) {
            console.log("readDailyPay error : ", err);
        })
        setPr(true);
    }
    const [prNData, setPrNData] = useState();
    const [PrN, setPrN] = useState(false);
    const PrNClose = () => setPrN(false);
    const PrNshow = () => {
        axios.post('http://192.168.2.82:5000/readEmpPay', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setPrNData(response.data);
        }).catch(function (err) {
            console.log("readDailyPay error : ", err);
        })
        setPrN(true);
    }




    //연장시간 onClick
    const onClickProvision1 = (e) => {
        const temp = { ...modifyData };
        temp.payType = e.payName;
        setModifyData(temp);
        PrClose();
    }

    const onClickProvision2 = (e) => {
        const temp = { ...modifyData };
        temp.payTypeNight = e.payName;
        setModifyData(temp);
        PrNClose();

    }


    //저장
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //수정
    const DelClose = () => setDel(false);
    const DelShow = () => setDel(true);
    //삭제
    const MdClose = () => {
        setModifyData();
        setModifyShow(false);
    }
    const MdShow = (e) => {
        axios.post('http://192.168.2.91:5000/modal_inOutInfo', {
            inOutListId: e.inOutListId
        }).then(function (response) {
            console.log(response.data[0]);
            setModifyData(response.data[0]);
        }).catch(function (err) {
            console.log("modal_inOutInfo error", err);
            let contentText = "데이터 불러오는데 오류가 발생했습니다. 새로고침 후 다시 시도해주세요";
            error(contentText);
        });
        setModifyShow(true);
    }
    //권한

    //달력

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());

    //시작일 onChange
    const onChangeStart = (date) => {
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
            if (date.$M < 10) {
                month = "0" + String(date.$M + 1);
            }
            if (date.$D < 10) {
                day = "0" + String(date.$D);
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
            if (date.$M < 10) {
                month = "0" + String(date.$M + 1);
            }
            if (date.$D < 10) {
                day = "0" + String(date.$D);
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


    //새로고침
    const hello = () => {
        getData();
    }

    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong>출퇴근 현황 </strong></h2>
            <br />
            <br />
            <br />


            <Grid container style={{ width: '1400px' }}>
                <Grid><div style={{ fontSize: '22px' }}> <strong>시작 날짜 </strong></div></Grid>
                <Grid item sx ml={1}>
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
                <Grid ml={1}><div style={{ fontSize: '22px' }}><strong> 종료 날짜</strong></div></Grid>
                <Grid item sx ml={1}>
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
                {/* 로딩 버튼 */}
                <Grid item sx ml={59}>
                    <button className='addButton' style={{ width: '150px' }} onClick={hello}>새로고침 <ReplayIcon /></button>
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
                            <strong>부서</strong>
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
                    </tr>
                </thead>
                <tbody>

                    {
                        data && data.map((e, idx) =>
                            <tr >

                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.inOutDate}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.depName}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>
                                    <Button style={{ fontSize: '22px' }} name={e.inOutListId} onClick={() => MdShow(e)} variant="link">
                                        <strong>
                                            {e.empName}
                                        </strong>
                                    </Button>
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.empRank}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.inOutStart}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.inOutEnd}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.inOutOver}</td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>




            {/* 추가 */}
            <Modal
                centered
                size="lg"
                show={show} onHide={handleClose} animation={false} id="AddModal">
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong> 사용자관리 추가</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6' }}>

                    <br />
                    <Container>
                        <Grid container spacing={4}>
                            <Grid item xs={6} md={5} ml={20} style={{ fontSize: '25px' }}>
                                <strong>아이디</strong>
                            </Grid>
                            <Grid item xs={6} md={5} ml={-20}>
                                <input style={{ width: '250px', height: '50px' }} name="saveId" type="text" onChange={onChangeAddData}></input>
                            </Grid>
                            <Grid item xs={6} md={6} ml={20} style={{ fontSize: '25px' }}>
                                <strong>비밀번호</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-28}>
                                <input style={{ width: '250px', height: '50px' }} name="savePw" type="password" onChange={onChangeAddData}></input>
                            </Grid>
                            <Grid item xs={6} md={6} ml={20} style={{ fontSize: '25px' }}>
                                <strong>사용자명</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-28}>
                                <input style={{ width: '250px', height: '50px' }} name="saveUser" type="text" onChange={onChangeAddData}></input>
                            </Grid>
                            <Grid item xs={6} md={6} ml={20} style={{ fontSize: '25px' }}>
                                <strong>권한</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-28}>
                                <input style={{ width: '250px', height: '50px' }} name="saveAdvice" type="text" onChange={onChangeAddData}></input>


                            </Grid>
                            <Grid item xs={6} md={6} ml={63} mt={-10}>
                                <Rsearch />

                            </Grid>
                        </Grid>

                    </Container>
                    <br />


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeAddData}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={pushAddData}>
                        추가
                    </Button>
                </Modal.Footer>
            </Modal>



            {/* 출퇴근상세 수정 */}
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
                            <thead >
                                <tr style={{ color: '#f7f7f7', textAlign: "center", }}>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7', width: '100px' }}>날짜</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', width: '150px' }}>{modifyData && ModifyShow && modifyData.inOutDate}</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7', width: '100px' }}>사원명</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', width: '150px' }}>{modifyData && ModifyShow && modifyData.empName}</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7', width: '100px' }}>사원코드</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', width: '150px' }}>{modifyData && ModifyShow && modifyData.empCode}</td>

                                </tr>

                            </thead>
                            <tbody>
                                <tr style={{ textAlign: "center", }}>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>직급</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' }}>{modifyData && ModifyShow && modifyData.empRank}</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>부서명 </td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' }}>{modifyData && ModifyShow && modifyData.depName}</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>부서코드</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' }}>{modifyData && ModifyShow && modifyData.depCode}</td>
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
                                <td rowspan='2' style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px', }}> <Form.Control style={{ width: '100%', height: '100%', textAlign: "center" }} name="inOutStart" value={modifyData && modifyData.inOutStart} type="text" onChange={onChangeModifyData} /></td>
                                <td rowspan='2' style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px' }}> <Form.Control style={{ width: '100%', height: '100%', textAlign: "center" }} name="inOutEnd" value={modifyData && modifyData.inOutEnd} type="text" onChange={onChangeModifyData} /></td>
                                <td style={{ border: "1px solid #d8d8d8", width: '60px', height: '50px', fontSize: '15px' }}>{modifyData && modifyData.inOutOver}</td>
                                <td style={{ border: "1px solid #d8d8d8", width: '60px', height: '50px', fontSize: '15px' }}>{modifyData && modifyData.inOutnight}</td>
                                <td rowspan='2' style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>
                                    <Form.Control style={{ width: '100%', height: '100%', textAlign: "center" }} name="inOut_Note" value={modifyData && modifyData.inOut_Note} type="text" onChange={onChangeModifyData} />
                                </td>
                            </tr>


                            <tr style={{ backgroundColor: '', border: "1px solid #d8d8d8" }}>


                                <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>
                                    {modifyData && ModifyShow && modifyData.inOutOver != "00:00" &&
                                        <InputGroup style={{ height: '60px' }}>

                                            <Form.Control
                                                type="addpayCalc"
                                                name="payType"
                                                aria-describedby="btnGroupAddon"
                                                value={modifyData && ModifyShow && modifyData.payType}
                                                style={{ height: '100%' }}
                                                onChange={onChangeModifyData}

                                            />
                                            <InputGroup.Text id="btnGroupAddon" onClick={Prshow} style={{ width: '50px', height: '100%' }}>  <SearchIcon /></InputGroup.Text>
                                        </InputGroup>
                                    }


                                </td>


                                <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>
                                    {modifyData && ModifyShow && modifyData.inOutnight != "00:00" &&
                                        <InputGroup style={{ height: '60px' }}>

                                            <Form.Control
                                                type="addpayCalc"
                                                name="payTypeNight"
                                                aria-describedby="btnGroupAddon"
                                                value={modifyData && ModifyShow && modifyData.payTypeNight}
                                                style={{ height: '100%' }}
                                                onChange={onChangeModifyData}

                                            />
                                            <InputGroup.Text id="btnGroupAddon" onClick={PrNshow} style={{ width: '50px', height: '100%' }}>  <SearchIcon /></InputGroup.Text>
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
                    <Button variant="secondary" onClick={MdClose}>
                        닫기
                    </Button>
                    <button className='addButton' variant="primary" onClick={DelShow}>
                        삭제
                    </button>
                    <button className='addButton' variant="primary" onClick={modifyAddData}>
                        수정
                    </button>
                </Modal.Footer>
            </Modal>



            {/* 삭제 */}
            <Modal
                centered
                size="xsm"
                show={del} onHide={DelClose} animation={true}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', width: '500px' }}>
                    <Modal.Title style={{ color: '#ffffff', width: '500px' }}><strong>삭제확인</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6', width: '500px', }}>
                    <strong>
                        {modifyData && ModifyShow && modifyData.empName}의 출/퇴근 현황을 삭제하시겠습니까?
                    </strong>
                </Modal.Body>
                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={DelClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={delAddData}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>

            {/*  연장 */}
            <Modal
                size="lg"
                centered
                show={Pr} onHide={PrClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', }}>
                    <Modal.Title style={{ color: '#ffffff' }}> <strong>지급유형</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>

                    <Table
                        hover 
                        style={{
                        textAlign: "center",
                        width: "100%", height: '200px'
                    }} >
                        <thead>
                        <tr style={{backgroundColor: '#f7f7f7' }}>
                            <td style={{ border: "1px solid #f1f2f6'", fontSize: '20px', color: '#777777' }}><strong></strong></td>
                            <td style={{ border: "1px solid #f1f2f6'", fontSize: '20px', color: '#777777' }}><strong>수당코드</strong></td>
                            <td style={{ border: "1px solid #f1f2f6'", fontSize: '20px', color: '#777777' }}><strong>수당명</strong></td>
                            <td style={{ border: "1px solid #f1f2f6'", fontSize: '20px', color: '#777777' }}><strong>비과세</strong></td>
                            <td style={{ border: "1px solid #f1f2f6'", fontSize: '20px', color: '#777777' }}><strong>지급유형</strong></td>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                prData && prData.map((e, idx) =>
                                    <tr style={{ border: "1px solid , color: '#f1f2f6'" }}>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{idx + 1}</td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.payCode}</td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>
                                            <Button variant="link" name={e.empPayID} onClick={() => onClickProvision1(e)}>
                                                <strong>{e.payName}</strong>
                                            </Button></td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.taxFreeName}</td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.payType}</td>
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
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', }}>
                    <Modal.Title style={{ color: '#ffffff' }}> <strong>지급유형</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>

                    <Table
                        hover 
                        style={{
                        textAlign: "center",
                        width: "100%", height: '200px'
                    }} >
                        <thead>
                        <tr style={{ border: "1px solid #f1f2f6", backgroundColor: '#f7f7f7' }}>
                            <td style={{ border: "1px solid #f1f2f6",color: '#777777', fontSize: '20px' }}><strong></strong></td>
                            <td style={{ border: "1px solid #f1f2f6",color: '#777777', fontSize: '20px' }}><strong>수당코드</strong></td>
                            <td style={{ border: "1px solid #f1f2f6",color: '#777777', fontSize: '20px' }}><strong>수당명</strong></td>
                            <td style={{ border: "1px solid #f1f2f6",color: '#777777', fontSize: '20px' }}><strong>비과세</strong></td>
                            <td style={{ border: "1px solid #f1f2f6",color: '#777777', fontSize: '20px' }}><strong>지급유형</strong></td>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                prNData && prNData.map((e, idx) =>
                                    <tr style={{ border: "1px solid #f1f2f6" }}>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{idx + 1}</td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.payCode}</td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>
                                            <Button variant="link" name={e.empPayID} onClick={() => onClickProvision2(e)}>
                                                <strong>{e.payName}</strong>
                                            </Button></td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.taxFreeName}</td>
                                        <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.payType}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={PrNClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={PrNClose}>
                        완료
                    </button>
                </Modal.Footer>

            </Modal>


        </div>
    );
};

export default ATGEcom;