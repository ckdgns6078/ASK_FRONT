import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Rsearch from '../component/Rsearch';
import { Calendar } from 'antd';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { DatePicker } from 'antd';
import ReplayIcon from '@mui/icons-material/Replay';
import { message, Space } from 'antd';

const SMDcom = () => {
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
    const [del, setDel] = useState(false);
    const [modify, setModify] = useState(false);


    //초기 저장된 데이터베이스 값 가져오기
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.post('http://192.168.2.82:5000/expenseRead', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            console.log(" expenseRead ", response.data);
            setData(response.data);
        }).catch(function (err) {
            console.log("expenseRead error", err);
        });
    }

    //이름 클릭했을때 나오는 내용
    const modifyClick = (e) => {
        axios.post('http://192.168.2.82:5000/expenseModal', {
            expenseListId: e.expenseListId
        }).then(function (response) {
            console.log("response.data value : " , response.data[0]);
            setModifyData(response.data[0]);
        }).catch(function (err) {
            console.log("expenseModal error :", err);
            let text = "데이터를 불러오는데 에러가 발생했습니다.";
            error(text);
        });
        modifyShow();
    }

    //모델 값 저장
    const pushModifyData = () => {
        axios.post('http://192.168.2.82:5000/expenseUpdate', {
            expenseListId: modifyData.expenseListId,
            approval: modifyData.approval,
            history: modifyData.history
        }).then(function (response) {
            if (response) {
                getData();
                let text = "경비 처리 완료.";
                success(text);
                modifyClose();
            } else {
                let text = "경비 처리 실패.";
                warning(text);
            }

        }).catch(function (err) {
            console.log(err);
            let text = "경비 처리에 오류가 발생했습니다. 새로고침 후 다시 실행 해주세요";
            error(text);
        });

    }

    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
        });
        console.log("name", name, "value", value);
    }



    const [mag, setMag] = useState(false);

    //수정
    const delClose = () => setDel(false);
    const delShow = () => setDel(true);
    //삭제
    const modifyClose = () => {
        setModifyData();
        setModify(false);
    }
    const modifyShow = () => setModify(true);
    //돋보기 클릭
    const magClose = () => setMag(false);
    const magShow = () => setMag(true);
    const magBtn = (e) => {
        const temp = { ...modifyData };
        temp.approval = e.target.innerText;
        setModifyData(temp);
        magClose();
    }

    const searchAddData = () => {
        axios.post('http://192.168.2.82:5000/expenseSearch', {
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

    //달력
    const [dateStart, setDateStart] = useState(); // 시작일
    const [dateEnd, setDateEnd] = useState();    // 종료일
    const [search, setSearch] = useState();     //이름

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
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong>경비 관리</strong></h2>
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

                    <tr style={{ backgroundColor: '#ecf0f1', }}>



                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>날짜</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>부서명</strong>
                        </td>

                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>사원명</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>항목</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>승인여부</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>금액</strong>
                        </td>

                    </tr>

                </thead>
                <tbody>

                    {
                        data && data.map((e, idx) =>
                            <tr >
                                <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.expenseDate}</td>
                                <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.depName}</td>
                                <Button style={{ fontSize: '22px' }} name={e.expenseListId} onClick={() => modifyClick(e)} variant="link">
                                    <strong>
                                        {e.empName}
                                    </strong>
                                </Button>
                                <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.expenseName}</td>
                                <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.approval}</td>
                                <td style={{ border: "1px solid #f1f2f6", color: '#000', fontSize: '22px' }}>{e.price}</td>



                            </tr>
                        )
                    }

                    {/* <tr  style={{backgroundColor:'#f1f2f6' , }}>    
                        <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong></strong></td>
                        <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}></td>
                        <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>합계</strong></td>
                        <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}></td>
                    
                        <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong></strong></td>
                        <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong> </strong></td>
                    
                    </tr> */}

                </tbody>
            </Table>



            {/* 수정 */}
            <Modal
                centered
                size="lg"
                show={modify} onHide={modifyClose} animation={false} id="AddModal">
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>경비상세</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>

                    <br />
                    <Container>
                        <Table style={{ border: "1px solid #d8d8d8", textAlign: 'center' }}>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", backgroundColor: '#f7f7f7', width: '150px', height: '45px' }}>신청일</td>
                                <td style={{ border: "1px solid #d8d8d8" }}>{modify && modifyData && modifyData.requestDate}</td>
                                <td style={{ border: "1px solid #d8d8d8", backgroundColor: '#f7f7f7', width: '150px' }}>이름</td>
                                <td style={{ border: "1px solid #d8d8d8" }}>{modify && modifyData && modifyData.empName}</td>
                            </tr>

                            <tr>
                                <td style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8", height: '45px' }}>사원코드</td>
                                <td style={{ border: "1px solid #d8d8d8" }}>{modify && modifyData && modifyData.empNum}</td>
                                <td style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>부서명</td>
                                <td style={{ border: "1px solid #d8d8d8" }}>{modify && modifyData && modifyData.depName}</td>
                            </tr>
                        </Table>

                        <Table style={{ border: "1px solid #d8d8d8", textAlign: 'center' }}>
                            <tr style={{ height: '40px' }}>
                                <td style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }} >날짜</td>
                                <td style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>가게명</td>
                                <td style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>사업자번호</td>
                                <td style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>항목</td>
                                <td style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>승인여부</td>
                                <td style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>가격</td>

                            </tr>
                            <tr style={{ border: "1px solid #d8d8d8" }}>
                                <td style={{ border: "1px solid #d8d8d8" }}>{modify && modifyData && modifyData.expenseDate}</td>
                                <td style={{ border: "1px solid #d8d8d8" }}>{modify && modifyData && modifyData.shopName}</td>
                                <td style={{ border: "1px solid #d8d8d8" }}>{modify && modifyData && modifyData.shopName}</td>
                                <td style={{ border: "1px solid #d8d8d8" }}>{modify && modifyData && modifyData.expenseName}</td>
                                <td style={{ border: "1px solid #d8d8d8", width: '150px' }}>
                                    <InputGroup style={{ width: '150px' }}>

                                        <Form.Control
                                            type="text"
                                            name='expenseName'
                                            aria-describedby="btnGroupAddon"
                                            onChange={onChangeModifyData}
                                            value={modify && modifyData && modifyData.approval}
                                           



                                        />
                                        <InputGroup.Text id="btnGroupAddon" onClick={magShow} style={{ width: '40px', height: '40px' }}> <SearchIcon /></InputGroup.Text>
                                    </InputGroup></td>
                                <td style={{ border: "1px solid #d8d8d8" }}>{modify && modifyData && modifyData.price}</td>

                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", backgroundColor: '#f7f7f7', height: '45px' }}>비고</td>
                                <td colSpan='5' style={{ border: "1px solid #d8d8d8" }}>
                                    <Form.Control style={{ width: '100%', height: '40px' }} type="text" name='history' aria-describedby="btnGroupAddon" value={modify && modifyData && modifyData.history} onChange={onChangeModifyData} />
                                </td>
                            </tr>
                        </Table>

                    </Container>
                    <br />


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modifyClose}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={pushModifyData}>
                        수정
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* 삭제 */}
            <Modal
                centered
                size="xl"
                show={del} onHide={delClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>삭제 내용</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={delClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={delClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>



            {/* 돋보기 모달 */}
            <Modal
                centered
                size="sm"
                show={mag} onHide={magClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', color: '#ffffff' }}>
                    <Modal.Title ><strong>승인 / 미승인처리</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Table
                        hover
                        style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", backgroundColor: '#f7f7f7', height: '45px', color: '#777777' }}><strong>비고</strong></td>
                                <td style={{ border: "1px solid #d8d8d8", backgroundColor: '#f7f7f7', height: '45px', color: '#777777' }}><strong>항목</strong></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", height: '45px' }}>1</td>
                                <td style={{ border: "1px solid #d8d8d8", height: '45px' }}><Button variant="link" onClick={magBtn}>승인</Button></td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", height: '45px' }}>2</td>
                                <td style={{ border: "1px solid #d8d8d8", height: '45px' }}><Button variant="link" onClick={magBtn}>미승인</Button></td>
                            </tr>

                        </tbody>

                    </Table>
                </Modal.Body>

            </Modal>





        </div>
    );
};

export default SMDcom;