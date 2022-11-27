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


const ATGEcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);
    const [SH, setSh] = useState(false);
    const [addData, setAddData] = useState({    //추가 관련 변수
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
    const [dateStart, setDateStart] = useState(); // 시작일
    const [dateEnd, setDateEnd] = useState();    // 종료일
    const [search, setSearch] = useState();     //이름
    const ShClose = () => setSh(false);
    const Shshow = () => setSh(true);

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

    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
        });
        console.log(modifyData);
    }

    //입력값 onChange 함수
    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        setAddData({
            ...addData,
            [name]: value
        });
        console.log(addData);
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
            console.log("search_inOutInfo data : ", response.data);
            setData(response.data);
        }).catch(function (err) {
            console.log("search_inOutInfo error", err);
        });
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







    //저장
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //수정
    const DelClose = () => setMDelShow(false);
    const DeShow = () => setMDelShow(true);
    //삭제
    const MdClose = () => setModifyShow(false);
    const MdShow = () => setModifyShow(true);
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
    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong>출퇴근 현황 </strong></h2>
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
                    <tr style={{ backgroundColor: '#ecf0f1', border: "1px solid #f1f2f6" }}>



                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>날짜</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>부서</strong>
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
                            <strong>초과근무시간</strong>
                        </td>
                    </tr>
                </thead>
                <tbody>

                    {
                        data && data.map((e, idx) =>
                            <tr >

                                <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>{e.inOutDate}</td>
                                <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>{e.depName}</td>
                                <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                                    <Button style={{ fontSize: '22px' }} name={e.inOutListId} onClick={() => MdShow(e)} variant="link">
                                        <strong>
                                            {e.empName}
                                        </strong>
                                    </Button>
                                </td>
                                <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>{e.empRank}</td>
                                <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>{e.inOutStart}</td>
                                <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>{e.inOutEnd}</td>
                                <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>{e.inOutOver}</td>
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



            {/* 수정
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
                            <thead style={{ height: '60px' }}>
                                <tr style={{ backgroundColor: '#ecf0f1', color: '#777777', textAlign: "center", }}>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong>사원명</strong></td>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong>사원코드</strong></td>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong>직급</strong></td>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong>부서명</strong></td>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong>부서코드</strong></td>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong>날짜 </strong></td>

                                </tr>

                            </thead>
                            <tbody>
                                <tr style={{ textAlign: "center", }}>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong>{modifyData && ModifyShow && modifyData.modifyempName}</strong></td>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong>{modifyData && ModifyShow && modifyData.modifyempCode}</strong></td>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong>{modifyData && ModifyShow && modifyData.modifyempRank}</strong></td>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong>{modifyData && ModifyShow && modifyData.modifydepName}</strong></td>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong>{modifyData && ModifyShow && modifyData.modifydepCode}</strong></td>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong> {modifyData && ModifyShow && modifyData.modifyinOutDate} </strong></td>

                                </tr>
                            </tbody>

                        </Table>
                        <br></br>
                        <Table  >
                            <thead style={{ height: '60px' }}>
                                <tr style={{ backgroundColor: '#ecf0f1', color: '#777777', textAlign: "center", }}>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong>비고</strong></td>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong>출근시간</strong></td>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong>퇴근시간</strong></td>

                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong>초가시간</strong></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ textAlign: "center", }}>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}> <strong>  <Form.Control style={{ width: '170px', height: '50px' }} name="modifyinOut_Note" value={modifyData.modifyinOut_Note} type="text" onChange={onChangeModifyData} /></strong></td>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong> <Form.Control style={{ width: '170px', height: '50px' }} name="modifyinOutStart" value={modifyData.modifyinOutStart} type="text" onChange={onChangeModifyData} /></strong></td>
                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong> <Form.Control style={{ width: '170px', height: '50px' }} name="modifyinOutEnd" value={modifyData.modifyinOutEnd} type="text" onChange={onChangeModifyData} /></strong></td>

                                    <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}><strong> {modifyData && ModifyShow && modifyData.modifyinOutOver}</strong></td>


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
            </Modal> */}



            {/* 삭제 */}
            <Modal
                centered
                size="xl"
                show={DelShow} onHide={DelClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>삭제 내용</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={DelClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={DelClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>



 





        </div>
    );
};

export default ATGEcom;