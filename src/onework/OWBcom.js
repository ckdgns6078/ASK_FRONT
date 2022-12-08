import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from '@mui/material/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { message, Space } from 'antd';
import axios from 'axios';




const OWBcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [addCheck, setAddCheck] = useState(false);
    const [modifyCheck, setModifyCheck] = useState(false);
    const [data, setData] = useState();
    const [addData, setAddData] = useState({
        dailyPayId: null,
        dailyPayCode: null,
        dailyPayName: null,
        dailyTaxFreeCode: null,
        dailyTaxFreeName: "",
        dailyTaxFreeType: "",
        dailyTaxFreeCalc: ""
    });
    const [modifyData, setModifyData] = useState({
        dailyPayId: null,
        dailyPayCode: null,
        dailyPayName: null,
        dailyTaxFreeCode: null,
        dailyTaxFreeName: null,
        dailyTaxFreeType: null,
        dailyTaxFreeCalc: null
    });
    const [Right, setRight] = useState();

    //모달 함수
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);
    const [SH, setSh] = useState(false);
    const [CH, setCh] = useState(false);

    // 계산기 함수
    const [CF, setCf] = useState(false);
    const CFClose = () => {
        setCf(false);
        setInput(null);

    }
    const CFSelect = () => {
        if (show) {
            const temp = { ...addData };
            temp.dailyTaxFreeCalc = input;
            setAddData(temp);
            CFClose();

        }
        if (ModifyShow) {
            const temp = { ...modifyData };
            temp.dailyTaxFreeCalc = input;
            setModifyData(temp);
            CFClose();

        }

    }

    const CFShow = () => setCf(true);

    // 지급 유형 모달 함수 
    const [Pr, setPr] = useState(false);

    const PrClose = (e) => setPr(false);
    const Prshow = () => setPr(true);

    const handleClose = () => {
        setShow(false);
        setAddCheck(false);
        setAddData({
            "dailyPayId": null,
            "dailyPayCode": null,
            "dailyPayName": null,
            "dailyTaxFreeCode": null,
            "dailyTaxFreeName": "",
            "dailyTaxFreeType": "",
            "dailyTaxFreeCalc": ""
        })
    }
    const handleShow = () => {
        setShow(true);
        setAddCheck(true);
    }

    const DeClose = () => setMDelShow(false);
    const DeShow = () => setMDelShow(true);

    const MdClose = () => {
        setModifyShow(false);
        setModifyCheck(false);
    }
    const MdShow = (e) => {
        axios.post('http://192.168.2.82:5000/updateDailyPayModal', {
            dailyPayId: e.dailyPayId
        }).then(function (response) {
            setModifyData({
                "dailyPayId": response.data[0].dailyPayId,
                "dailyPayCode": response.data[0].dailyPayCode,
                "dailyPayName": response.data[0].dailyPayName,
                "dailyTaxFreeCode": response.data[0].dailyTaxFreeCode,
                "dailyTaxFreeName": response.data[0].dailyTaxFreeName,
                "dailyTaxFreeType": response.data[0].dailyTaxFreeType,
                "dailyTaxFreeCalc": response.data[0].dailyTaxFreeCalc
            });
        }).catch(function (er) {
            console.log("updataEmpModal error", er);
            let contentText = "데이터를 가져오는데 실패했어요 다시 시도해주세요";
            error(contentText);
        });
        setModifyShow(true);
        setModifyCheck(true);
    }


    const ShClose = () => setSh(false);
    const Shshow = () => {
        axios.post('http://192.168.2.82:5000/readTaxFree', {
            check: 1
        }).then(function (response) {
            setRight(response.data);
        }).catch(function (er) {
            console.log("readTaxFree error :", er);
            let contentText = "데이터를 불러오는데 오류가 발생하였습니다. 다시 시도해주세요";
            error(contentText);
        })
        setSh(true);
    }


    const ShBtn = (e) => {
        console.log("e. taxFreeName", e.taxFreeName);
        console.log("e value", e);
        if (ModifyShow) {
            const temp1 = { ...modifyData };
            temp1.dailyTaxFreeCode = e.taxFreeCode;
            temp1.dailyTaxFreeName = e.taxFreeName;
            setModifyData(temp1);
        }
        if (show) {
            const temp = { ...addData };
            //비과세명
            temp.dailyTaxFreeCode = e.taxFreeCode;
            temp.dailyTaxFreeName = e.taxFreeName;
            setAddData(temp);
        }

        ShClose();
    }


    const ChClose = () => setCh(false);
    const Chshow = () => setCh(true);

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

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {    //초기값 가져오는 함수
        axios.post('http://192.168.2.82:5000/readDailyPay', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (er) {
            console.log("readDep error :", error);
            let contentText = "데이터를 호출 에러 발생";
            error(contentText);
        });
    }

    //추가 onChange
    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        setAddData({
            ...addData,
            [name]: value
        })
    }
    //수정 onChange
    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
        })
    }



    //추가 데이터 넣기 함수
    const pushAddData = () => {
        axios.post('http://192.168.2.82:5000/createDailyPay ', {
            compCode: sessionStorage.getItem("uid"),
            dailyPayId: addData.dailyPayId,
            dailyPayCode: addData.dailyPayCode,
            dailyPayName: addData.dailyPayName,
            dailyTaxFreeCode: addData.dailyTaxFreeCode,
            dailyTaxFreeName: addData.dailyTaxFreeName,
            dailyTaxFreeType: addData.dailyTaxFreeType,
            dailyTaxFreeCalc: addData.dailyTaxFreeCalc
        }).then(function (response) {
            if (response.data) {
                let contentText = "        수당 등록 완료        ";
                getData();
                success(contentText);
                handleClose();
            }
            if (!response.data) {
                let contentText = "        같은 수당코드가 존재합니다. 다른 코드로 변경하세요!       ";
                warning(contentText);
            }
        }).catch(function (er) {
            console.log("createEmp error", er);
            let contentText = "서버 연동 에러 발생";
            error(contentText);
        });
    }
    //수정 데이터 넣기
    const pushModifyData = () => {
        axios.post('http://192.168.2.82:5000/updateDailyPay', {
            dailyPayId: modifyData.dailyPayId,
            dailyPayCode: modifyData.dailyPayCode,
            dailyPayName: modifyData.dailyPayName,
            dailyTaxFreeCode: modifyData.dailyTaxFreeCode,
            dailyTaxFreeName: modifyData.dailyTaxFreeName,
            dailyTaxFreeType: modifyData.dailyTaxFreeType,
            dailyTaxFreeCalc: modifyData.dailyTaxFreeCalc
        }).then(function (response) {
            if (response.data) {
                getData();
                MdClose();
                let contentText = "부서코드 수정 완료";
                success(contentText);
            }
            if (!response.data) {
                let contentText = "이미 존재하는 부서코드입니다. 다른 부서코드를 입력하세요.";
                warning(contentText);
            }
        }).catch(function (er) {
            let contentText = "에러 발생";
            error(contentText);
            console.log("updateDailyPayModal error", er);
        });
    }
    //삭제 데이터 넣기
    const pushDeleteData = () => {
        axios.post('http://192.168.2.82:5000/deleteDailyPay ', {
            dailyPayId: modifyData.dailyPayId
        }).then(function (response) {
            if (response.data) {
                getData();
                MdClose();
                DeClose();
                let contentText = " 수당 삭제 완료";
                success(contentText);
            }
            if (!response.data) {
                let contentText = " 부서 삭제 실패 , 다시 실행해주세요";
                warning(contentText);
            }
        }).catch(function (er) {
            console.log("deleteEmp error", er);
            let contentText = " 에러 발생 ";
            error(contentText);
        })
    }



    const [input, setInput] = useState();

    const calculator = (e) => {
        const { value } = e.target;
        if (input == undefined) {
            setInput(value);
        }
        else {
            setInput(input + value);
        }

        if (value == '취소') {
            setInput("");
        }
        console.log("input value ", input);



    }
    const onchangrCalculatorData = (e) => {
        const { value, name } = e.target;
        setInput({
            ...input,
            [name]: value
        })
    }
    const [Cal, setCalyData] = useState({
        inputData: null,

    });


    // 지급유형 함수  지급: provision
    const [Provision, setProvision] = useState();
    const onClickProvision = (e) => {
        if (ModifyShow) {
            const temp = { ...modifyData };
            temp.dailyTaxFreeType = e.target.innerText;
            setModifyData(temp);
            PrClose();
        }
        if (show) {
            const temp = { ...addData };
            temp.dailyTaxFreeType = e.target.innerText;
            setAddData(temp);
            PrClose();
        }
    }










    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: '#005b9e', position: 'absolute', left: '0', top: '0px' }}><strong>수당 관리 </strong></h2>
            <Box >
                <button style={{ position: 'absolute', right: "0px", }} onClick={handleShow} className="Atmp1">  <strong>등록</strong></button>
            </Box>




            <br />
            <br />
            <br />

            <Table hover  >
                <thead style={{ height: '60px' }}>
                    <tr style={{ backgroundColor: '#f7f7f7', }}>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            수당코드
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            수당명
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            비과세
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            지급유형
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            계산식
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map((e, idx) =>
                            <tr style={{ height: '60px' }} >
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}> {e.dailyPayCode} </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}><Button name={e.dailyPayId} style={{ fontSize:'22px'}}onClick={() => MdShow(e)} variant="link">{e.dailyPayName}</Button></td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}>  {e.dailyTaxFreeName}</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}>{e.dailyTaxFreeType} </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}> {e.dailyTaxFreeCalc}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <Grid item xs={12} ml={-3} mt={55}>
                <hr style={{ width: '1440px' }} />
            </Grid>
          


            {/* 등록 */}
            <Modal
                centered
                size="lg"


                show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>수당등록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '', }}>






                       
                <Table style={{textAlign:'center'}}>

                        <tr>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7',width:'80px',height: '60px'  }}>수당코드</td>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px'}}>
                                    <Form.Control style={{  height: '57px',textAlign:'center' }} aria-describedby="btnGroupAddon"
                                        type="text" name='dailyPayCode' onChange={onChangeAddData} />
                        </td>



                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7',width:'80px',height: '60px' }}>수당명</td>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',}}> 
                                <Form.Control style={{  height: '57px',textAlign:'center' }} aria-describedby="btnGroupAddon"
                                    type="text" name='dailyPayName' onChange={onChangeAddData} />
                        </td >

                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7',width:'80px' }}>

                        </td>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',}}></td>
                        </tr>
                        <tr>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7'}}>지급유형</td>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px'}}>
                        <InputGroup >

                                    <Form.Control
                                        type="text"
                                        name="neverChange"
                                        aria-describedby="btnGroupAddon"
                                        value={addData.dailyTaxFreeType}
                                        style={{ height: '40px',textAlign:'center' }}
                                        onChange={onChangeAddData}

                                    />
                                    <InputGroup.Text id="btnGroupAddon" onClick={Prshow} style={{ width: '50px', height: '40px' }}>  <SearchIcon /></InputGroup.Text>
                                </InputGroup>



                        </td>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7'}}>계산식</td>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px' }}> 
         


                        <InputGroup >

                            <Form.Control
                                type="text"
                                name='neverChange'
                                aria-describedby="btnGroupAddon"
                                value={addData.dailyTaxFreeCalc}
                                style={{ height: '40px',textAlign:'center' }}
                                onChange={onChangeAddData}

                            />
                            <InputGroup.Text id="btnGroupAddon" onClick={CFShow} style={{ width: '50px', height: '40px' }}> <SearchIcon /></InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7', width:'50px'}}>비과세</td>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px'}}>
                        <InputGroup >
                                <Form.Control
                                    type="text"
                                    name='neverChange'
                                    value={addData.dailyTaxFreeName}
                                    aria-describedby="btnGroupAddon"
                                    style={{ height: '40px',textAlign:'center' ,fontSize:'15px' }}
                                    onChange={onChangeAddData}
                                    readonly
                                />
                                <InputGroup.Text id="btnGroupAddon" onClick={Shshow} style={{ width: '50px', height: '40px' }}> <SearchIcon /></InputGroup.Text>
                            </InputGroup>

                        </td>
                        </tr>
                        </Table>



                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={handleClose}>
                        <strong>닫기</strong>
                    </Button>
                    <button className="addButton" onClick={pushAddData}>
                        <strong>추가</strong>
                    </button>
                </Modal.Footer>
            </Modal>



            {/* 수당관리상세 수정 모달 ShShow*/}
            <Modal
                centered
                size="lg"
                // style={{width:'500px'}}
                show={ModifyShow} onHide={MdClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e'}}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>일용직수당상세</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body >

                        
                       
                <Table style={{textAlign:'center'}}>

                <tr>
                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7',width:'80px',height: '60px'  }}>수당코드</td>
                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px'}}>
                <Form.Control style={{ width: '100%', height: '57px',textAlign:'center' }} aria-describedby="btnGroupAddon"
                                    name="dailyPayCode" value={modifyData.dailyPayCode} onChange={onChangeModifyData} />
                </td>



                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7',width:'80px',height: '60px' }}>수당명</td>
                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',}}> 
          
                                       <Form.Control style={{ width: '100%', height: '57px' ,textAlign:'center' }} aria-describedby="btnGroupAddon"
                                    type="text" name="dailyPayName" value={modifyData.dailyPayName} onChange={onChangeModifyData} />
                </td >

                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7',width:'80px' }}>

                </td>
                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',}}></td>
                </tr>
                <tr>
                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7'}}>지급유형</td>
                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px'}}>
          

                        <InputGroup >

                        <Form.Control
                            type="addpayCalc"
                            name="neverChange"
                            aria-describedby="btnGroupAddon"
                            value={modifyData.dailyTaxFreeType}
                            style={{ height: '40px',textAlign:'center' ,fontSize:'15px' }}
                            onChange={onChangeModifyData}

                        />
                        <InputGroup.Text id="btnGroupAddon" onClick={Prshow} style={{ width: '50px', height: '40px' }}>  <SearchIcon /></InputGroup.Text>
                        </InputGroup>




                </td>
                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7'}}>계산식</td>
                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px' }}> 

                <InputGroup >

                <Form.Control
                    type="addpayCalc"
                    name="neverChange"
                    aria-describedby="btnGroupAddon"
                    value={modifyData.dailyTaxFreeCalc}
                    style={{ height: '40px',textAlign:'center' ,fontSize:'15px' }}
                    onChange={onChangeModifyData}

                />
                <InputGroup.Text id="btnGroupAddon" onClick={CFShow} style={{ width: '50px', height: '40px' }}>  <SearchIcon /></InputGroup.Text>
                </InputGroup>


                </td>
                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7', width:'50px'}}>비과세</td>
                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px'}}>
                              
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    name="neverChange"
                                    value={modifyData.dailyTaxFreeName}
                                    aria-describedby="btnGroupAddon"
                                    style={{ height: '40px',textAlign:'center' ,fontSize:'15px'  }}
                                    onChange={onChangeModifyData}
                                />
                                <InputGroup.Text id="btnGroupAddon" onClick={Shshow} style={{ width: '50px', height: '40px' }}> <SearchIcon /></InputGroup.Text>
                            </InputGroup>
                     
                </td>
                </tr>
                </Table>


{/* 
                    <Container>
                        <Grid container spacing={4}>


                            <Grid item xs={6} md={6} ml={3} style={{ fontSize: '20px', color: '#777777' }}>
                                <strong>수당코드</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-12}>
                                <Form.Control style={{ width: '250px', height: '40px' }} aria-describedby="btnGroupAddon"
                                    name="dailyPayCode" value={modifyData.dailyPayCode} onChange={onChangeModifyData} />
                            </Grid>


                            <Grid item xs={6} md={6} ml={3} mt={-2} style={{ fontSize: '20px', color: '#777777' }}>
                                <strong>수당명</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-12} mt={-2}>
                                <Form.Control style={{ width: '250px', height: '40px' }} aria-describedby="btnGroupAddon"
                                    type="text" name="dailyPayName" value={modifyData.dailyPayName} onChange={onChangeModifyData} />
                            </Grid>




                        </Grid>
                        <Grid item xs={6} md={6} ml={3} mt={3} style={{ fontSize: '20px', color: '#777777' }}>
                            <strong>비과세</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={19} mt={-5}>
                         
                            <InputGroup style={{ width: '250px', height: '40px' }}>
                                <Form.Control
                                    type="text"
                                    name="neverChange"
                                    value={modifyData.dailyTaxFreeName}
                                    aria-describedby="btnGroupAddon"
                                    style={{ height: '40px' }}
                                    onChange={onChangeModifyData}
                                />
                                <InputGroup.Text id="btnGroupAddon" onClick={Shshow} style={{ width: '50px', height: '40px' }}> <SearchIcon /></InputGroup.Text>
                            </InputGroup>



                            <Grid item xs={6} md={6} ml={-16} mt={3} style={{ fontSize: '20px', color: '#777777' }}>
                                <strong>지급유형</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={0} mt={-5}>
                                <InputGroup style={{ width: '250px', height: '40px' }}>

                                    <Form.Control
                                        type="addpayCalc"
                                        name="neverChange"
                                        aria-describedby="btnGroupAddon"
                                        value={modifyData.dailyTaxFreeType}
                                        style={{ height: '40px' }}
                                        onChange={onChangeModifyData}

                                    />
                                    <InputGroup.Text id="btnGroupAddon" onClick={Prshow} style={{ width: '50px', height: '40px' }}>  <SearchIcon /></InputGroup.Text>
                                </InputGroup>

                            </Grid>


                        </Grid>
                        <Grid item xs={6} md={6} ml={3} mt={3} style={{ fontSize: '20px', color: '#777777' }}>
                            <strong>계산식</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={19} mt={-5}>
                        
                            <InputGroup style={{ width: '250px', height: '40px' }}>

                                <Form.Control
                                    type="addpayCalc"
                                    name="neverChange"
                                    aria-describedby="btnGroupAddon"
                                    value={modifyData.dailyTaxFreeCalc}
                                    style={{ height: '40px' }}
                                    onChange={onChangeModifyData}

                                />
                                <InputGroup.Text id="btnGroupAddon" onClick={CFShow} style={{ width: '50px', height: '40px' }}>  <SearchIcon /></InputGroup.Text>
                            </InputGroup>

                        </Grid>
                    </Container> */}

                </Modal.Body>

                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={MdClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={DeShow}>
                        삭제
                    </button>
                    <button variant="primary" className='addButton' onClick={pushModifyData}>
                        수정
                    </button>
                </Modal.Footer>
            </Modal>

            {/* 삭제 */}
            <Modal
                centered
                size="xsm"
                show={DelShow} onHide={DeClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', width: '500px' }}>
                    <Modal.Title style={{ color: '#ffffff', width: '500px' }}><strong>삭제확인</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6', width: '500px', }}>
                    {/* {checkedItems.size} */}
                    <strong>{modifyData.dailyPayName}을 삭제하시겠습니까?</strong>
                </Modal.Body>
                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={DeClose}>
                        닫기
                    </Button>
                    <button className='addButton' variant="primary" onClick={pushDeleteData}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>

            {/* 비과세 버튼 눌렀을때 나오는 Modal */}
            <Modal
                size="xl"
                centered
                show={SH} onHide={ShClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}> <strong>비과세항목</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>

                    <Table 
                        hover
                        style={{
                        textAlign: "center",
                        width: "100%", height: '200px'
                    }} >
                        <thead>                       
                            <tr style={{ border: "1px solid #d8d8d8", backgroundColor: '#f7f7f7' }}>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '20px',  }}> 비과세코드</td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}> 비과세명</td>
                            <td style={{ fontSize: '20px' }}>  비과세상세</td>
                            </tr>
                        </thead>
                        <tbody>                    
                        {
                            Right && Right.map((e, idx) =>
                                <tr style={{ border: "1px solid #d8d8d8" }}>

                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}>{e.taxFreeCode}</td>
                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}>
                                        <Button name={e.taxFreeCode} onClick={() => ShBtn(e)} variant="link">
                                            <strong>{e.taxFreeName}</strong>
                                        </Button></td>
                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' }}>{e.taxFreeDetail}</td>
                                </tr>

                            )
                        }
                        </tbody>
 
                        
                       
                    </Table>
                </Modal.Body>

            </Modal>

       

            {/* 계산식 모달 */}
            <Modal
                size="lg"
                centered
                show={CF} onHide={CFClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}> <strong>계산기</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6', height: '350px' }}>
                    <Grid container>

                        <Grid item xs={3} mt={7} ml={2}>
                            <h2><strong>*계산식</strong></h2>
                        </Grid>
                        <Grid item xs={3} mt={13} ml={-24}>
                            


                            <Form.Control style={{ width: '300px', height: '60px', fontSize: '20px', outline: '#005b9e' }}
                                type="text" value={input} />
                        </Grid>
                        
                        <Grid item xs={3}  ml={-23} mt={25}>
                            <div style={{width:'300px'}}><strong>초과근무시간 : dailyInOutOver</strong></div>
                        </Grid>

                        <Grid item xs={3}  ml={-24} mt={30}>
                            <div style={{width:'300px'}}><strong>지급유형 : dailyPayType</strong></div>
                        </Grid>



                        <Grid item xs={6} ml={20} mt={3}>
                            <Table >
                                <tr>
                                    <td ><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='timeWage'>시간</button></td>
                                    <td ><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='dayWage'>일</button></td>
                                    <td ><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='('>(</button></td>
                                    <td ><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value=')'>)</button></td>
                                </tr>

                                <tr>
                                    <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='7'>7</button></td>
                                    <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='8'>8</button></td>
                                    <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='9'>9</button></td>
                                    <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='/'>/</button></td>
                                </tr>

                                <tr>
                                    <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='4' >4</button></td>
                                    <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='5'>5</button></td>
                                    <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='6'>6</button></td>
                                    <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='*'>*</button></td>
                                </tr>


                                <tr>
                                    <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='1'> 1</button></td>
                                    <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='2'>2</button></td>
                                    <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='3'>3</button></td>
                                    <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='-'>-</button></td>
                                </tr>


                                <tr>

                                    <td ><button className='Atmp1' style={{ backgroundColor: '#005b9e', }} onClick={calculator} value='.'>.</button></td>
                                    <td ><button className='Atmp1' style={{ backgroundColor: '#005b9e', }} onClick={calculator} value='0'>0</button></td>
                                    <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='취소'>취소</button></td>

                                    <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='+'>+</button></td>

                                </tr>


                            </Table >

                        </Grid>

                    </Grid>


                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={CFClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={CFSelect} onChange={onchangrCalculatorData}>
                        완료
                    </button>
                </Modal.Footer>

            </Modal>





                    


            {/*  지급 유형 모달 */}
            <Modal
                size="xsm"
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
                        width: "100%",
                    }} >
                        <thead>
                        <tr style={{ border: "1px solid #d8d8d8", backgroundColor: '#f7f7f7' }}>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '15px' ,color:'#777777'}}> 비고</td>
                            <td style={{ fontSize: '15px' ,color:'#777777'}}>  지급유형</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr style={{ border: "1px solid #d8d8d8" }}>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '15px' }}>1</td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '15px' }}><Button onClick={(e) => onClickProvision(e)} value="change1" variant="link"><strong> 변동(일)</strong></Button></td>
                        </tr>
                        <tr style={{ border: "1px solid #d8d8d8" }}>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '15px' }}>2</td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '15px' }}><Button onClick={(e) => onClickProvision(e)} value="change2" variant="link"> <strong> 변동(시간)</strong></Button></td>
                        </tr>
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


        </div>
    );
};

export default OWBcom;