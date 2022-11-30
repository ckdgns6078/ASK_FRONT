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


const ATGBcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [Okdata, setOkdata] = useState("");
    const [data, setData] = useState("");
    const [DelShow, setDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);
    const [check , setCheck] = useState(false);
    const [value , setValue] = useState({});

    const [addData, setAddData] = useState({    //추가 관련 변수
        adddepName: "",    //부서명
        addempName: "",    //이름
        addempNum: "",     //부서번호
        addtotalVacation: "",  //총 휴가
        addtakeVacation: "",   //사용휴가
        addremindVacation: ""  //일반휴가
    });

    //초기 저장된 데이터베이스 값 가져오기
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {    //초기값 가져오는 함수
        axios.post('http://192.168.2.91:5000/read_Vactlist', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (er) {
            console.log("readDep error :", error);
            let contentText = "데이터를 호출 에러 발생";
            error(contentText);
        });
    }

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
    

    //저장
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //수정
    const DelClose = () => {
        setValue({});
        setDelShow(false);
    }


    const DeShow = (e) => {
        setValue(e);
        
        axios.post('http://192.168.2.91:5000/modal_Vaclist',{
            compCode : sessionStorage.getItem("uid"),
            empNum : e.empNum
        }).then(function(response){
            setOkdata(response.data);
            setCheck(true);
        }).catch(function(err){
            console.log("read_Vactlist error :" , err);
            let contentText = "상세정보를 가져오는데 오류가 발생했습니다. 다시 실행해주세요";
            error(contentText);
        })
        setDelShow(true);
    }



    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong>보유휴가 현황 </strong></h2>
            <br />
            <br />
            <br />



            <Table hover >
                <thead style={{ height: '60px' }}>
                    <tr style={{ backgroundColor: '#f7f7f7', textAlign: 'center', border: "1px solid #d8d8d8" }}>

                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>부서명</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>사원명</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>총휴가</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>사용휴가</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>잔여휴가</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>상세확인</strong>
                        </td>

                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map((e, idx) =>
                            <tr style={{ border: "1px solid gray" }}>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.depName}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.empName}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.totalVacation}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.takeVacation}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.remindVacation}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}><Button variant="link" name={e.empNum} onClick={() => DeShow(e)}><strong>확인</strong></Button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>

            {/* 확인  */}
            <Modal
                centered
                size="xl"
                show={DelShow} onHide={DelClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong> 상세 확인</strong> </Modal.Title>
                </Modal.Header>
                <Modal.Body >

                        <Table>
                            <tr>
                                <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'120px' ,textAlign:'center' }}> 이름</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px',textAlign:'center' }}> {value &&DelShow && value.empName}</td>
                                <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'120px' ,textAlign:'center'}}>  부서 </td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' ,textAlign:'center'}}> { value && DelShow && value.depName}</td>
                           
                            </tr>
                        </Table>


{/* 
                        <Grid container>
                        <Grid item xs style={{ fontSize: '25px' }}>
                            <strong>
                                이름 : {value &&DelShow && value.empName}
                            </strong>
                        </Grid>
                        <Grid item xs style={{ fontSize: '25px' }}>
                            <strong> 부서 : { value && DelShow && value.depName}</strong>
                        </Grid>
                    </Grid> */}
                    <br/>
                    <div style={{ fontSize: '25px' }}><strong>휴가 내역</strong></div>


                    <Table 
                        hover
                        style={{
                        width: "100%", textAlign: 'center'
                    }}>
                        <thead>
                        <tr style={{ border: "1px solid #d8d8d8", backgroundColor: '#f7f7f7' }}>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}><strong>시작일</strong></td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}><strong>종료일</strong></td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}><strong>휴가기간</strong></td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}><strong>휴가항목</strong></td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}><strong>휴가상세</strong></td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Okdata && Okdata.map((e, idx) =>
                                <tr style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}>
                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}>{e.vactStartDate}</td>
                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}>{e.vactEndDate}</td>
                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}>{e.vactPeriod}</td>
                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}>{e.vactDetail}</td>
                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}>{e.vactDetail}</td>
                                </tr>
                            )

                        }
                       </tbody>
                    </Table>


                    <br></br>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={DelClose}>
                        닫기
                    </Button>
                </Modal.Footer>

            </Modal>

            {/* 등록 */}
            <Modal
                centered
                size="xsm"


                show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>부서관리</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f3f3f3', }}>

                    <Container>
                        <Grid container spacing={4}>


                            <Grid item xs={6} md={6} ml={3} style={{ fontSize: '20px', color: '#777777' }}>
                                <strong>부서명</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-12}>
                                {/* <input style={{width:'250px',height:'40px'}} name="saveId" type="text" onChange={onChangeAddData}></input> */}
                                <Form.Control style={{ width: '250px', height: '40px' }} aria-describedby="btnGroupAddon"
                                    type='text' name='adddepCode' onChange={onChangeAddData} />
                            </Grid>
                            <Grid item xs={6} md={6} ml={3} mt={-2} style={{ fontSize: '20px', color: '#777777' }}>
                                <strong>사원명</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-12} mt={-2}>
                                <Form.Control style={{ width: '250px', height: '40px' }} aria-describedby="btnGroupAddon"
                                    type='text' name='adddepName' onChange={onChangeAddData} />
                            </Grid>


                            <Grid item xs={6} md={6} ml={3} mt={-2} style={{ fontSize: '20px', color: '#777777' }}>
                                <strong>총 휴가</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-12} mt={-2}>
                                <Form.Control style={{ width: '250px', height: '40px' }} aria-describedby="btnGroupAddon"
                                    type='text' name='adddepDetail' onChange={onChangeAddData} />
                            </Grid>
                            <Grid item xs={6} md={6} ml={3} mt={-2} style={{ fontSize: '20px', color: '#777777' }}>
                                <strong>사용 휴가</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-12} mt={-2}>
                                <Form.Control style={{ width: '250px', height: '40px' }} aria-describedby="btnGroupAddon"
                                    type='text' name='adddepDetail' onChange={onChangeAddData} />
                            </Grid>

                            <Grid item xs={6} md={6} ml={3} mt={-2} style={{ fontSize: '20px', color: '#777777' }}>
                                <strong>잔여 휴가</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-12} mt={-2}>
                                <Form.Control style={{ width: '250px', height: '40px' }} aria-describedby="btnGroupAddon"
                                    type='text' name='adddepDetail' onChange={onChangeAddData} />
                            </Grid>

                            <Grid item xs={6} md={6} ml={3} mt={-2} style={{ fontSize: '20px', color: '#777777' }}>
                                <strong>상세 확인</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-12} mt={-2}>
                                <Form.Control style={{ width: '250px', height: '40px' }} aria-describedby="btnGroupAddon"
                                    type='text' name='adddepDetail' onChange={onChangeAddData} />
                            </Grid>


                        </Grid>
                    </Container>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={handleClose}>
                        <strong>취소</strong>
                    </Button>
                    <button className="addButton" >
                        <strong>추가</strong>
                    </button>
                </Modal.Footer>
            </Modal>









        </div>
    );
};

export default ATGBcom;