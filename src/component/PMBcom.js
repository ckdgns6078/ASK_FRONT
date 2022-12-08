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
import Calculator from '../calculator/Calculator';
import Cal from '../calculator/Cal';


let sign = "";
let calculate = "";
const PMBcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [addCheck, setAddCheck] = useState(false);
    const [modifyCheck, setModifyCheck] = useState(false);
    const [data, setData] = useState();
    const [addData, setAddData] = useState({
        addempPayID: null, //수당 리스트 PRIMARYKEY
        addcompCode: null, // 회사 코드 (관리자 아이디)
        addpayCode: null,  // 수당 코드
        addpayName: null,  // 수당명
        addtaxFreeCode: null, // 비과세 코드
        addtaxFreeName: null, // 비과세 명
        addpayType: null,  // 지급 유형
        addpayCalc: null,  // 계산식
    });
    const [modifyData, setModifyData] = useState({
        modifyempPayID: null, //수당 리스트 PRIMARYKEY
        modifycompCode: null, // 회사 코드 (관리자 아이디)
        modifypayCode: null,  // 수당 코드
        modifypayName: null,  // 수당명
        modifytaxFreeCode: null, // 비과세 코드
        modifytaxFreeName: null, // 비과세 명
        modifypayType: null,  // 지급 유형
        modifypayCalc: null,  // 계산식
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
        console.log("input value " , input);
    }
    const CFSelect = () =>{
        if (show) {
            const temp = { ...addData };
            temp.addpayCalc = input;
            setAddData(temp);
            CFClose();
            
        }
        if (ModifyShow) {
            const temp = { ...modifyData };
            temp.modifypayCalc = input;
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
            "addempPayID": null, //수당 리스트 PRIMARYKEY
            "addcompCode": null, // 회사 코드 (관리자 아이디)
            "addpayCode": null,  // 수당 코드
            "addpayName": null,  // 수당명
            "addtaxFreeCode": null, // 비과세 코드
            "addtaxFreeName": null, // 비과세 명
            "addpayType": null,  // 지급 유형
            "addpayCalc": null,  // 계산식

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
        axios.post('http://192.168.2.82:5000/updateEmpPayModal ', {
            empPayID: e.empPayID
        }).then(function (response) {
            setModifyData({
                "modifyempPayID": response.data[0].empPayID, //수당 리스트 PRIMARYKEY
                "modifycompCode": response.data[0].compCode, // 회사 코드 (관리자 아이디)
                "modifypayCode": response.data[0].payCode,  // 수당 코드
                "modifypayName": response.data[0].payName,  // 수당명
                "modifytaxFreeCode": response.data[0].taxFreeCode, // 비과세 코드
                "modifytaxFreeName": response.data[0].taxFreeName, // 비과세 명
                "modifypayType": response.data[0].payType,  // 지급 유형
                "modifypayCalc": response.data[0].payCalc,  // 계산식


                
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
        console.log("e pay ", e)
        if (modifyCheck) {
            console.log("modify")
            const temp = { ...modifyData };
            temp.modifytaxFreeName = e.taxFreeName;
            setModifyData(temp);
        }
        if (addCheck) {
            console.log("addCheck")
            const temp = { ...addData };
            //비과세명
            temp.addtaxFreeCode = e.taxFreeCode;
            temp.addtaxFreeName = e.taxFreeName;
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
        axios.post('http://192.168.2.82:5000/readEmpPay', {
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
        console.log("addData값 ", addData);
    }
    //수정 onChange
    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
        })
        console.log("modifyData", modifyData);
    }

    // addempPayID: null, //수당 리스트 PRIMARYKEY
    // addcompCode: null, // 회사 코드 (관리자 아이디)
    // addpayCode: null,  // 수당 코드
    // addpayName: null,  // 수당명
    // addtaxFreeCode: null, // 비과세 코드
    // addtaxFreeName: null, // 비과세 명
    // addpayType: null,  // 지급 유형
    // addpayClac: null,  // 계산식

    //추가 데이터 넣기 함수
    const pushAddData = () => {
        if (addData.addtaxFreeName != "연장근로수당"
            && addData.addtaxFreeName != "야간근로수당"
            && addData.addtaxFreeName != "휴일근로수당"
            && addData.addtaxFreeName != "식대"
            && addData.addtaxFreeName != "차량유지보조금"
            && addData.addtaxFreeName != "출산/보육수당") {
            let contentText = "비과세 항목에 없는 데이터를 입력하셨습니다. 비과세항목에 맞는 데이터를 넣어주세요";
            warning(contentText);
        }
        else {
            axios.post('http://192.168.2.82:5000/createEmpPay ', {
                compCode: sessionStorage.getItem("uid"),
                payCode: addData.addpayCode,
                payName: addData.addpayName,
                taxFreeCode: addData.addtaxFreeCode,
                taxFreeName: addData.addtaxFreeName,
                payType: addData.addpayType,
                payCalc: addData.addpayCalc,

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

    }
    //수정 데이터 넣기
    const pushModifyData = () => {
        if (modifyData.modifytaxFreeName != "연장근로수당"
            && modifyData.modifytaxFreeName != "야간근로수당"
            && modifyData.modifytaxFreeName != "휴일근로수당"
            && modifyData.modifytaxFreeName != "식대"
            && modifyData.modifytaxFreeName != "차량유지보조금"
            && modifyData.modifytaxFreeName != "출산/보육수당") {
            let contentText = "비과세 항목에 없는 데이터를 입력하셨습니다. 비과세항목에 맞는 데이터를 넣어주세요";
            warning(contentText);
        } else {
            axios.post('http://192.168.2.82:5000/updateEmpPay', {
                empPayID: modifyData.modifyempPayID,
                compCode: modifyData.modifycompCode,
                payCode: modifyData.modifypayCode,
                payName: modifyData.modifypayName,
                taxFreeCode: modifyData.modifytaxFreeCode,
                taxFreeName: modifyData.modifytaxFreeName,
                payType: modifyData.modifypayType,
                taxFreeCalC: modifyData.modifypayCalc
            }).then(function (response) {
                if (response.data) {
                    getData();
                    MdClose();
                    let contentText = "        부서코드 수정 완료        ";
                    success(contentText);
                }
                if (!response.data) {
                    let contentText = "이미 존재하는 부서코드입니다. 다른 부서코드를 입력하세요.";
                    warning(contentText);
                }
            }).catch(function (er) {
                let contentText = "        에러 발생        ";
                error(contentText);
                console.log("updataEmp error", er);
            });
        }
    }
    //삭제 데이터 넣기
    const pushDeleteData = () => {
        axios.post('http://192.168.2.82:5000/deleteEmpPay ', {
            empPayID: modifyData.modifyempPayID
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






    // 계산기
    let arr = [];

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
    const onchangrCalculatorData = (e) =>{
        const {value, name} = e.target;
        setInput({
            ...input,
            [name] :value
        })
    }
    const [Cal, setCalyData] = useState({
        inputData: null,
    
    });


    // 지급유형 함수  지급: provision
    const [Provision, setProvision] = useState();


    const onClickProvision = (e) =>{
        const temp = {...modifyData};
        temp.modifypayType = e.target.innerText;
        setModifyData(temp);
        PrClose();
    }










    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' , color:'#005b9e'}}><strong>수당 관리 </strong></h2>
            <Box >
                <button style={{ position: 'absolute', right: "0px",  }} onClick={handleShow} className="Atmp1">  <strong>등록</strong></button>
            </Box>


            <br />
            <br />
            <br />

            <Table  hover  >
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
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '20px', color: '#000' }}> {e.payCode} </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '20px', color: '#000' }}><Button name={e.empPayID} style = {{fontSize:'20px'}}onClick={() => MdShow(e)} variant="link">{e.payName}</Button></td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '20px', color: '#000' }}>  {e.taxFreeName}</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '20px', color: '#000' }}>{e.payType} </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '20px', color: '#000' }}> {e.payCalc}</td>
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
                                    <Form.Control style={{  height: '57px' , textAlign:'center'}} aria-describedby="btnGroupAddon"  
                                        type="text" name='addpayCode' onChange={onChangeAddData} />
                        </td>
                 


                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7',width:'80px',height: '60px' }}>수당명</td>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',}}> 
                        <Form.Control style={{  height: '57px' , textAlign:'center' }} aria-describedby="btnGroupAddon"  
                                    type="text" name='addpayName' onChange={onChangeAddData} />
                        </td >

                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7',width:'80px'}}>

                        </td>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',}}></td>
                    </tr>
                    <tr>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7'}}>지급유형</td>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px'}}>
                            <InputGroup >

                                <Form.Control
                                    type="addpayCalc"
                                    name="modifypayType"
                                    aria-describedby="btnGroupAddon"
                                    value={modifyData.modifypayType}
                                    style={{ height: '40px' }}
                                    onChange={onChangeModifyData}
                                />
                                <InputGroup.Text id="btnGroupAddon" onClick={Prshow} style={{ width: '50px', height: '40px' }}>  <SearchIcon /></InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7'}}>계산식</td>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px' }}> 
                        <InputGroup >

                            <Form.Control
                                type="text"
                                name='addpayCalc'
                                aria-describedby="btnGroupAddon"
                                value={addData.addpayCalc}
                                style={{ height: '40px' }}
                                onChange={onChangeAddData}

                            />
                            <InputGroup.Text id="btnGroupAddon" onClick={CFShow} style={{ width: '50px', height: '40px' }}> <SearchIcon /></InputGroup.Text>
                            </InputGroup>

                        </td>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7'}}>비과세</td>
                        <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px'}}>
                        <InputGroup >
                                <Form.Control
                                    type="text"
                                    name='addtaxFreeName'
                                    value={addData.addtaxFreeName}
                                    aria-describedby="btnGroupAddon"
                                    style={{ height: '40px' }}
                                    onChange={onChangeAddData}
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
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', height: '70px' }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>수당관리상세</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '',  }}>



                    <Table style={{textAlign:'center'}}>

                        <tr>
                            <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7',width:'80px',height: '60px'  }}>수당코드</td>
                            <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px'}}>
                                <Form.Control aria-describedby="btnGroupAddon" style={{width:'100%', height:'57px' , textAlign:'center'}}
                                    name="modifypayCode" value={modifyData.modifypayCode} onChange={onChangeModifyData} />
                            </td>
                            <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7',width:'80px',height: '60px' }}>수당명</td>
                            <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px'}}>
                                <Form.Control aria-describedby="btnGroupAddon" style={{width:'100%', height:'57px' , textAlign:'center'}}
                                    type="text" name="modifypayName" value={modifyData.modifypayName} onChange={onChangeModifyData} />
                            </td >
                            <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7',width:'80px'}}>

                            </td>
                            <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',}}></td>
                        </tr>
                        <tr>
                            <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7'}}>지급유형</td>
                            <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px'}}>
                                <InputGroup >

                                    <Form.Control
                                        type="addpayCalc"
                                        name="modifypayType"
                                        aria-describedby="btnGroupAddon"
                                        value={modifyData.modifypayType}
                                        style={{ height: '40px' }}
                                        onChange={onChangeModifyData}
                                    />
                                    <InputGroup.Text id="btnGroupAddon" onClick={Prshow} style={{ width: '50px', height: '40px' }}>  <SearchIcon /></InputGroup.Text>
                                </InputGroup>
                            </td>
                            <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7'}}>계산식</td>
                            <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px'}}> <InputGroup >

                                <Form.Control
                                    type="addpayCalc"
                                    name="modifypayCalc"
                                    aria-describedby="btnGroupAddon"
                                    value={modifyData.modifypayCalc}
                                    style={{ height: '40px' }}
                                    onChange={onChangeModifyData}

                                />
                                <InputGroup.Text id="btnGroupAddon" onClick={CFShow} style={{ width: '50px', height: '40px' }}>  <SearchIcon /></InputGroup.Text>
                            </InputGroup></td>
                            <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor: '#f7f7f7'}}>비과세</td>
                            <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px'}}>
                                <InputGroup >
                                    <Form.Control
                                        type="text"
                                        name="modifytaxFreeName"
                                        value={modifyData.modifytaxFreeName}
                                        aria-describedby="btnGroupAddon"
                                        style={{ height: '40px' }}
                                        onChange={onChangeModifyData}
                                    />
                                    <InputGroup.Text id="btnGroupAddon" onClick={Shshow} style={{ width: '50px', height: '40px' }}> <SearchIcon /></InputGroup.Text>
                                </InputGroup>
                            </td>
                        </tr>
                    </Table>




                </Modal.Body>

                <Modal.Footer style={{  backgroundColor: '#ffffff' }}>
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
                    <strong>{modifyData.modifypayName}을 삭제하시겠습니까?</strong>
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
                    <Modal.Title style={{ color: '#f7f7f7' }}> <strong>비과세항목</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body >

                    <Table 
                      hover
                        style={{
                        textAlign: "center",
                      
                    }} >
                        <thead>
                        <tr style={{backgroundColor: '#f7f7f7' }}>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '20px', width: '120px', height: '50px' , color:'#777777' }}><strong> 비과세코드</strong></td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '20px' , color:'#777777'}}><strong> 비과세명</strong></td>
                            <td style={{ fontSize: '20px' , border: "1px solid #d8d8d8" , color:'#777777'}}> <strong> 비과세상세</strong></td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Right && Right.map((e, idx) =>
                                <tr>

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
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', }}>
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
                            <div style={{width:'300px'}}><strong>초과근무시간 : InOutOver</strong></div>
                        </Grid>

                        <Grid item xs={3}  ml={-24} mt={30}>
                            <div style={{width:'300px'}}><strong>지급유형 : PayType</strong></div>
                        </Grid>


                     




                        <Grid item xs={6} ml={45} mt={-30}>
                            <Table >
                                <tr>
                                    <td colspan='2'><button className='addButton2' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='시급'>시급</button></td>
                                    <td colspan='2'><button className='addButton2' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='일급'>일급</button></td>

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
                hover
                size="xsm"
                centered
                show={Pr} onHide={PrClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}> <strong>지급유형</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>

                    <Table style={{
                        textAlign: "center",
                        width: "100%", height: '200px', border: "1px solid #d8d8d8",
                    }} >
                        <tr style={{ border: "1px solid #d8d8d8", backgroundColor: '#f7f7f7' }}>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '20px', color:'#777777' }}><strong> 비고</strong></td>
                            <td style={{ fontSize: '20px', color:'#777777' }}> <strong> 지급유형</strong></td>
                        </tr>
                        <tr style={{ border: "1px solid #d8d8d8" }}>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '15px' }}>1</td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '15px' }}><Button onClick={(e) => onClickProvision(e)}  value = "change1"variant="link"><strong> 변동(일)</strong></Button></td>
                        </tr>
                        <tr style={{ border: "1px solid #d8d8d8" }}>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '15px' }}>2</td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '15px' }}><Button  onClick={(e) => onClickProvision(e)} value = "change2"variant="link"> <strong> 변동(시간)</strong></Button></td>
                        </tr>
                        <tr style={{ border: "1px solid #d8d8d8" }}>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '15px' }}>3</td>
                            <td style={{ border: "1px solid #d8d8d8", fontSize: '15px' }}><Button onClick={(e) => onClickProvision(e)}  value="고정" variant="link"><strong> 고정</strong></Button></td>
                        </tr>

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

export default PMBcom;