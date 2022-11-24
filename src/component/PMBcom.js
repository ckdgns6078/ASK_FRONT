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

const PMBcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [addCheck , setAddCheck] = useState(false);
    const [modifyCheck , setModifyCheck] = useState(false);
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
    const [Right , setRight] = useState();

    //모달 함수
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);
    const [SH, setSh] = useState(false);
    const [CH, setCh] = useState(false);


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
    const handleShow = () => 
    {
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
            empPayID : e.empPayID
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
        axios.post('http://192.168.2.82:5000/readTaxFree',{
            check : 1
        }).then(function(response){
            setRight(response.data);
        }).catch(function(er){
            console.log("readTaxFree error :" ,er);
            let contentText = "데이터를 불러오는데 오류가 발생하였습니다. 다시 시도해주세요";
            error(contentText);    
        })
        setSh(true);
    }
    const ShBtn = (e) => {
        console.log("e pay " ,e)
        if (modifyCheck) {
            console.log("modify")
            const temp = {...modifyData};
            temp.modifytaxFreeName = e.taxFreeName;
            setModifyData(temp);
        }
        if (addCheck) {
            console.log("addCheck")
            const temp = {...addData};
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
        console.log("addData값 " , addData);
    }
    //수정 onChange
    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
        })
        console.log("modifyData" , modifyData);
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
        if (addData.addtaxFreeName != "연장근로수당"
            && addData.addtaxFreeName != "야간근로수당"
            && addData.addtaxFreeName != "휴일근로수당"
            && addData.addtaxFreeName != "식대"
            && addData.addtaxFreeName != "차량유지보조금"
            && addData.addtaxFreeName != "출산/보육수당") {
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
                payCalc: modifyData.modifypayCalc
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
            empPayID : modifyData.modifyempPayID
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



    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong>수당 관리 </strong></h2>
            <br />
            <br />
            <br />

            <Table striped bordered hover >
                <thead style={{ height: '60px' }}>
                    <tr style={{ backgroundColor: '#005b9e', }}>
                        <td style={{ border: "1px solid gray", color: '#ffffff', fontSize: '22px' }}>
                            <strong>수당코드</strong>
                        </td>
                        <td style={{ border: "1px solid gray", color: '#ffffff', fontSize: '22px' }}>
                            <strong>수당명</strong>
                        </td>
                        <td style={{ border: "1px solid gray", color: '#ffffff', fontSize: '22px' }}>
                            <strong>비과세</strong>
                        </td>
                        <td style={{ border: "1px solid gray", color: '#ffffff', fontSize: '22px' }}>
                            <strong>지급유형</strong>
                        </td>
                        <td style={{ border: "1px solid gray", color: '#ffffff', fontSize: '22px' }}>
                            <strong>계산식</strong>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map((e, idx) =>
                            <tr style={{ height: '60px' }} >
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px' }}><strong> {e.payCode}</strong> </td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px' }}><Button name={e.empPayID} onClick={() => MdShow(e)} variant="link"><strong>{e.payName}</strong></Button></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px' }}><strong>  {e.taxFreeName}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px' }}><strong>{e.payType} </strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px' }}><strong> {e.payCalc}</strong></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <Grid item xs={12} ml={-3} mt={55}>
                <hr style={{ width: '1440px' }} />
            </Grid>
            <Box >
                <button style={{ position: 'absolute', left: "0px", top: '600px' }} onClick={handleShow} className="Atmp1">  <strong>등록</strong></button>
            </Box>



            {/* 등록 */}
            <Modal
                centered
                size="lg"


                show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>수당등록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f3f3f3', }}>

                    <p>수당코드</p>
                    <input type="text" name='addpayCode' onChange={onChangeAddData}></input>
                    <p>수당명</p>
                    <input type="text" name = 'addpayName' onChange={onChangeAddData}></input>
                    <p>비과세</p>
                    <InputGroup style={{ width: '600px', height: '30px' }}>
                        <Form.Control
                            type="text"
                            name = 'addtaxFreeName'
                            value={addData.addtaxFreeName}
                            aria-describedby="btnGroupAddon"
                            style={{ height: '30px' }}
                            onChange={onChangeAddData}
                        />
                        <InputGroup.Text id="btnGroupAddon" onClick={Shshow} style={{ width: '50px', height: '30px' }}> <SearchIcon /></InputGroup.Text>
                    </InputGroup>
                    <p>지급유형</p>
                    <input type="text" name='addpayType' onChange={onChangeAddData}></input>

                    <p>계산식</p>
                    <InputGroup style={{ width: '600px', height: '30px' }}>
                        <Form.Control
                            type="text"
                            name = 'addpayCalc'
                            aria-describedby="btnGroupAddon"
                            value={addData.addpayCalc}
                            style={{ height: '30px' }}
                            onChange={onChangeAddData}
                        />
                        <InputGroup.Text id="btnGroupAddon" onClick={Chshow} style={{ width: '50px', height: '30px' }}> <SearchIcon /></InputGroup.Text>
                    </InputGroup>

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



            {/* 수정 모달 ShShow*/}
            <Modal
                centered
                size="xsm"
                // style={{width:'500px'}}
                show={ModifyShow} onHide={MdClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', width: '500px', height: '70px' }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>수당관리상세</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f3f3f3', width: '500px' }}>

                <p>수당코드</p>
                    <input type="text" name="modifypayCode" value={modifyData.modifypayCode} onChange={onChangeModifyData}></input>
                    <p>수당명</p>
                    <input type="text" name="modifypayName" value={modifyData.modifypayName} onChange={onChangeModifyData}></input>
                    <p>비과세</p>
                    <InputGroup style={{ width: '600px', height: '30px' }}>
                        <Form.Control
                            type="text"
                            name="modifytaxFreeName"
                            value={modifyData.modifytaxFreeName}
                            aria-describedby="btnGroupAddon"
                            style={{ height: '30px' }}
                            onChange={onChangeModifyData}
                        />
                        <InputGroup.Text id="btnGroupAddon" onClick={Shshow} style={{ width: '50px', height: '30px' }}> <SearchIcon /></InputGroup.Text>
                    </InputGroup>
                    <p>지급유형</p>
                    <input type="text" name="modifypayType" value={modifyData.modifypayType} onChange={onChangeModifyData}></input>
                    <p>계산식</p>
                    <InputGroup style={{ width: '600px', height: '30px' }}>
                        <Form.Control
                            type="addpayCalc"
                            name="modifypayCalc"
                            aria-describedby="btnGroupAddon"
                            value={modifyData.modifypayCalc}
                            style={{ height: '30px' }}
                            onChange={onChangeModifyData}
                        />
                        <InputGroup.Text id="btnGroupAddon" onClick={Shshow} style={{ width: '50px', height: '30px' }}> <SearchIcon /></InputGroup.Text>
                    </InputGroup>

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
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', width: '500px' }}>
                    <Modal.Title style={{ color: '#ffffff', width: '500px' }}><strong>모바일 삭제</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6', width: '500px', }}>
                    {/* {checkedItems.size} */}
                    <strong>{modifyData.modifypayName}명의 수당을 삭제하시겠습니까?</strong>
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




            {/* 버튼 눌렀을때 나오는 Modal */}
            <Modal
                size="xl"
                centered
                show={SH} onHide={ShClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', }}>
                    <Modal.Title style={{ color: '#ffffff' }}> <strong>비과세항목</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6' }}>
                    <table style={{
                        textAlign: "center",
                        width: "100%", height: '200px', border: "1px solid gray",
                    }} >
                        <tr style={{ border: "1px solid gray", backgroundColor: '#a4b0be' }}>
                            <td style={{ border: "1px solid gray", fontSize: '20px' ,width:'100px' ,height:'50px'}}><strong> 비과세코드</strong></td>
                            <td style={{ border: "1px solid gray", fontSize: '20px' }}><strong> 비과세명</strong></td>
                            <td style={{ fontSize: '20px' }}> <strong> 비과세상세</strong></td>
                        </tr>

                        {
                        Right && Right.map((e, idx) =>
                        <tr style={{border:"1px solid gray"}}>
                        
                        <td style={{border:"1px solid gray",fontSize:'20px'}}>{e.taxFreeCode}</td>
                        <td style={{ border: "1px solid gray", fontSize: '20px' }}>
                            <Button name={e.taxFreeCode} onClick={() => ShBtn(e)} variant="link">
                                <strong>{e.taxFreeName}</strong>
                            </Button></td>
                        <td style={{border:"1px solid gray",fontSize:'20px'}}>{e.taxFreeDetail}</td>
                        </tr>
                        
                        )
                    }
                    </table>
                </Modal.Body>

            </Modal>

            {/* 계산식 Modal */}
            <Modal
                size="sm"
                centered
                show={CH} onHide={ChClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', }}>
                    <Modal.Title style={{ color: '#ffffff' }}> <strong>수당계산</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6' }}>

                    <br /><br /><br /><br />
                    <table style={{
                        textAlign: "center",
                        width: "100%", height: '200px', border: "1px solid gray",
                    }} >
                        <tr style={{ border: "1px solid gray", backgroundColor: '#a4b0be' }}>
                            <td style={{ border: "1px solid gray", fontSize: '30px' }}><strong> 비고</strong></td>
                            <td style={{ fontSize: '30px' }}> <strong> 권한명</strong></td>
                        </tr>
                        <tr style={{ border: "1px solid gray" }}>
                            <td style={{ border: "1px solid gray", fontSize: '30px' }}>1</td>
                            <td style={{ border: "1px solid gray", fontSize: '30px' }}>Master</td>
                        </tr>
                        <tr style={{ border: "1px solid gray" }}>
                            <td style={{ border: "1px solid gray", fontSize: '30px' }}>2</td>
                            <td style={{ border: "1px solid gray", fontSize: '30px' }}>Manager</td>
                        </tr>
                        
                    </table>
                </Modal.Body>
                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={ChClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={ChClose}>
                        완료
                    </button>
                </Modal.Footer>

            </Modal>


        </div>
    );
};

export default PMBcom;