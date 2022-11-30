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
import {  DatePicker } from 'antd';
import ReplayIcon from '@mui/icons-material/Replay';

const SMDcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);
    const [addData, setAddData] = useState({    //추가 관련 변수
        saveId: '',
        savePw: '',
        saveUser: '',
        saveAdvice: ''
    });

    const [dateStart, setDateStart] = useState(); // 시작일
    const [dateEnd, setDateEnd] = useState();    // 종료일
    const [search, setSearch] = useState();     //이름

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

    //초기 저장된 데이터베이스 값 가져오기
    useEffect(() => {
        axios.post('http://192.168.2.82:5000/readUser', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (error) {
            console.log("readUser error", error);
        });
    }, []);


    //입력값 onChange 함수
    const { saveId, savePw, saveUser, saveAdvice } = addData;
    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        setAddData({
            ...addData,
            [name]: value
        });
        console.log(addData);
    }

    //추가 모델에서 추가 눌렀을경우 함수
    const pushAddData = () => {
        
        if (addData.saveId == '' || addData.savePw == '' || addData.saveUser == '' || addData.saveAdvice == '') {
            window.alert("공란은 입력할 수 없습니다.");
        } else {
            axios.post('http://192.168.2.82:5000/createUser', {
                userId: addData.saveId,
                userPw: addData.savePw,
                userName: addData.saveUser,
                userGrant: addData.saveAdvice,
                compCode: sessionStorage.getItem("uid")
            }).then(function (response) {
                if (!response.data) {
                    window.alert("중복 아이디는 추가할 수 없습니다.");
                } else {
                    window.alert("추가 완료");
                    handleClose();
                    setAddData({
                        "saveId": '',
                        "savePw": '',
                        "saveUser": '',
                        "saveAdvice": '',
                    })
                }
            }).catch(function (error) {
                console.log("createUser error :", error);
            });

        }

    }


//추가 모델에서 닫기 눌렀을 경우
const closeAddData = () => {
    handleClose();
    if(show) {
        console.log("if문 실행");
        setAddData({
            "saveId": '',
            "savePw": '',
            "saveUser": '',
            "saveAdvice": '',
        });
    }
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


        //새로고침
        const hello = () => {
            getData();
        }




    return (
        <div style={{width:'1400px' ,position:'relative'}}>
             <h2  style={{color:' #2F58B8' ,position:'absolute' ,left:'0' ,top:'0px'}}><strong>출퇴근 현황 </strong></h2>
            <br/>
            <br/>
            <br/>


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
            <br/>
        


            <Table >
                    <thead style={{height:'60px'}}>
              
                        <tr  style={{backgroundColor:'#ecf0f1' ,  }}>
                    


                    <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                        <Checkbox {...label} defaultChecked />
                    </td>
                    <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                        <strong>날짜</strong>
                    </td>
                    <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                        <strong>사원코드</strong>
                    </td>
              
                    <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                        <strong>사원명</strong>
                    </td>
                    <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                        <strong>항목</strong>
                    </td>
                    <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                        <strong>금액</strong>
                    </td>
                 
                        </tr>

                    </thead>
                    <tbody>
                 
                    {
                        data && data.map((e, idx) =>
                        <tr >
                            <td style={{border:"1px solid #f1f2f6",color:'#000',fontSize:'22px'}}><Checkbox {...label} defaultChecked /></td>
                            <td style={{border:"1px solid #f1f2f6",color:'#000',fontSize:'22px'}}>날짜 넣을거</td>
                            <td style={{border:"1px solid #f1f2f6",color:'#000',fontSize:'22px'}}>휴가기간</td>
                            <td style={{border:"1px solid #f1f2f6",color:'#000',fontSize:'22px'}}>항목 머시기 받아올거</td>
                            <td style={{border:"1px solid #f1f2f6",color:'#000',fontSize:'22px'}}>싱세 머시기</td>
                            <td style={{border:"1px solid #f1f2f6",color:'#000',fontSize:'22px'}}>상태 머시기 받아올거</td>
                      
                           
                 
                        </tr>
                        )
                    }

                    <tr  style={{backgroundColor:'#f1f2f6' , }}>    
                        <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong></strong></td>
                        <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}></td>
                        <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong>합계</strong></td>
                        <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}></td>
                    
                        <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong></strong></td>
                        <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}><strong> </strong></td>
                    
                    </tr>
                   
                    </tbody>
                    </Table>
        

          




            {/* 추가 */}
            <Modal
            centered
            size="lg"
            show={show} onHide={handleClose} animation={false} id="AddModal">
            <Modal.Header closeButton  style={{backgroundColor:'#2F58B8',}}>
                <Modal.Title style={{color:'#ffffff'}}><strong> 사용자관리 추가</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:'#f1f2f6'}}>

            <br/>
             <Container>
                <Grid container spacing={4}>
                    <Grid item xs={6} md={5} ml={20} style={{fontSize:'25px'}}>
                        <strong>아이디</strong>
                    </Grid>
                    <Grid item xs={6} md={5} ml={-20}>
                    <input style={{width:'250px',height:'50px'}}  name="saveId" type="text" onChange={onChangeAddData}></input>
                    </Grid>
                    <Grid item xs={6} md={6} ml={20} style={{fontSize:'25px'}}>
                        <strong>비밀번호</strong>
                    </Grid>
                    <Grid item xs={6} md={6} ml={-28}>
                    <input style={{width:'250px',height:'50px'}}name="savePw" type="password" onChange={onChangeAddData}></input>
                    </Grid>
                    <Grid item xs={6} md={6} ml={20} style={{fontSize:'25px'}}>
                        <strong>사용자명</strong>
                    </Grid>
                    <Grid item xs={6} md={6} ml={-28}>
                    <input style={{width:'250px',height:'50px'}}name="saveUser" type="text" onChange={onChangeAddData}></input>
                    </Grid>
                    <Grid item xs={6} md={6} ml={20} style={{fontSize:'25px'}}>
                        <strong>권한</strong>
                    </Grid>
                    <Grid item xs={6} md={6} ml={-28}>
                    <input style={{width:'250px',height:'50px'}}name="saveAdvice" type="text" onChange={onChangeAddData}></input>
           

                    </Grid>
                    <Grid item xs={6} md={6} ml={63}  mt={-10}>
                    <Rsearch />

                    </Grid>
                </Grid>

             </Container>
             <br/>


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
            {/* 수정 */}
            <Modal 
             centered
             size="xl"
            show={ModifyShow} onHide={MdClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>수정</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={MdClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={MdClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

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



            {/* 검색  */}
  




        </div>
    );
};

export default SMDcom;