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
import axios from 'axios';
import { message, Space } from 'antd';
const PMDcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [add, setAdd] = useState(false);
    const [data, setData] = useState();
    const [addData , setAddData] = useState({
        taxCode : null,
        taxInfoID : null,
        taxItem : null,
        taxName : null,
        taxNote : null
    });
    const [modifyData , setModifyData] = useState({
        taxCode : null,
        taxInfoID : null,
        taxItem : null,
        taxName : null,
        taxNote : null
    });
    const [magData , setMagData] = useState();

   
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

    //useEffect에서 실행되는 함수 ( axios )
    const getData = () => {
        axios.post('http://192.168.2.82:5000/readTax', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (er) {
            console.log("readDailyEmp error", er);
            let contentText = "데이터를 가져오는데 에러가 발생했어요 새로고침해주세요";
            error(contentText);
        });
    }

    //추가 onChange
    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        setAddData({
            ...addData,
            [name]: value
        });
    }
    //수정 onChange
    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
        });
    }

    const pushAddData = () => {
        axios.post('http://192.168.2.82:5000/createTax', {
            compCode : sessionStorage.getItem("uid"),
            taxCode: addData.taxCode,
            taxInfoID: addData.taxInfoID,
            taxItem: addData.taxItem,
            taxName: addData.taxName,
            taxNote: addData.taxNote
        }).then(function (response) {
            if (response.data) {
                let contentText = "세금 등록 완료";
                getData();
                success(contentText);
                addClose();
            }
            if (!response.data) {
                let contentText = "이미 등록되어 있는 코드가 있습니다. 코드 변경하세요.";
                warning(contentText);
            }
        }).catch(function (er) {
            console.log("createEmp error", er);
            let contentText = "서버 연동 에러 발생";
            error(contentText);
        });
    }
    const pushModifyData = () =>{
        axios.post('http://192.168.2.82:5000/updateTax', {
            compCode : sessionStorage.getItem("uid"),
            taxCode: modifyData.taxCode,
            taxInfoID: modifyData.taxInfoID,
            taxItem: modifyData.taxItem,
            taxName: modifyData.taxName,
            taxNote: modifyData.taxNote
        }).then(function (response) {
            if (response.data) {
                let contentText = "세금 수정 완료";
                getData();
                success(contentText);
                modifyClose();
            }
            if (!response.data) {
                let contentText = "이미 등록되어 있는 코드가 있습니다. 코드 변경하세요.";
                warning(contentText);
            }
        }).catch(function (er) {
            console.log("createEmp error", er);
            let contentText = "서버 연동 에러 발생";
            error(contentText);
        });

    }
    const pushDeleteData = (e)=>{
        axios.post('http://192.168.2.82:5000/deleteTax', {
            taxInfoID: modifyData.taxInfoID,
        }).then(function (response) {
            if (response.data) {
                let contentText = "세금 삭제 완료";
                getData();
                success(contentText);
                delClose();
                modifyClose();
                
            }
            if (!response.data) {
                let contentText = "세금 삭제 실패";
                warning(contentText);
            }
        }).catch(function (er) {
            console.log("deleteTax error", er);
            let contentText = "서버 연동 에러 발생";
            error(contentText);
        });
        
    }


    // //수정 데이터 넣기
    // const pushModifyData = () => {
    //     axios.post('http://192.168.2.91:5000/updateTax', {
    //         compCode: sessionStorage.getItem("uid"),
    //         vactNameListId: modifyData.modifyvactNameListId,
    //         vactCode: modifyData.modifyvactCode,
    //         vactName: modifyData.modifyvactName,
    //         vactDetail: modifyData.modifyvactDetail
    //     }).then(function (response) {
    //         if (response.data) {
    //             getData();
    //             MdClose();
    //             let contentText = "        휴가정보 수정완료        ";
    //             success(contentText);
    //         }
    //         if (!response.data) {
    //             let contentText = "이미 존재하는 휴가코드입니다. 다른 휴가코드를 입력하세요.";
    //             warning(contentText);
    //         }
    //     }).catch(function (er) {
    //         let contentText = "        에러 발생        ";
    //         error(contentText);
    //         console.log("updataEmp error", er);
    //     });

    // }

    // //삭제 데이터 넣기
    // const pushDeleteData = () => {
    //     axios.post('http://192.168.2.91:5000/deleteTax ', {
    //         vactNameListId: modifyData.modifyvactNameListId
    //     }).then(function (response) {
    //         console.log("delete_Vactcategory 값 ", response.data);
    //         if (response.data) {
    //             getData();
    //             MdClose();
    //             DeClose();
    //             let contentText = " 휴가 삭제 완료";
    //             success(contentText);
    //         }
    //         if (!response.data) {
    //             let contentText = " 휴가 삭제 실패 , 다시 실행해주세요";
    //             warning(contentText);
    //         }
    //     }).catch(function (er) {
    //         console.log("delete_Vactcategory error", er);
    //         let contentText = " 에러 발생 ";
    //         error(contentText);
    //     })
    // }

 //모달 함수
    //추가 모달
    const addClose = () => {
        setAddData({
            "taxCode" : null,
            "taxInfoID" : null,
            "taxItem" : null,
            "taxName" : null,
            "taxNote" : null
        });
        setAdd(false);
    }
    const addShow = () => setAdd(true);
    //삭제 모달
    const [del, setDel] = useState(false);
    const delClose = () => setDel(false);
    const delShow = () => setDel(true);
    //수정 모달
    const [modify, setModify] = useState(false);
    const modifyClose = () => setModify(false);
    
    const modifyShow = (e) => {
        console.log("tax" ,e.taxInfoID);
        axios.post('http://192.168.2.82:5000/updateTaxModal', {
            taxInfoID : e.taxInfoID
        }).then(function (response) {
            setModifyData({
                taxCode: response.data[0].taxCode,
                taxInfoID: response.data[0].taxInfoID,
                taxItem: response.data[0].taxItem,
                taxName: response.data[0].taxName,
                taxNote: response.data[0].taxNote
            });
        }).catch(function (er) {
            console.log("readTaxCategory error", er);
            let contentText = "데이터를 가져오는데 에러가 발생했어요 새로고침해주세요";
            error(contentText);
        });
        setModify(true);
    }

    //돋보기
    const [mag , setMag] = useState(false);
    const magClose = ()=>setMag(false);
    const magSelect =(e)=>{
        console.log("taxItem " , e.taxItem);
        if(add){
            const temp = {...addData};
            temp.taxItem = e.taxItem;
            setAddData(temp);
            console.log("temp 후 addData" , addData);
        }
        if(modify){
            const temp = {...modifyData};
            temp.taxItem = e.taxItem;
            setModifyData(temp);
        }
        magClose();
    
    }
    const magShow = ()=>{
        axios.post('http://192.168.2.82:5000/readTaxCategory', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            console.log("magdata", response.data);
            setMagData(response.data);
        }).catch(function (er) {
            console.log("readTaxCategory error", er);
            let contentText = "데이터를 가져오는데 에러가 발생했어요 새로고침해주세요";
            error(contentText);
        });
        setMag(true);
    }




    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' , color:'#005b9e'}}><strong>세금 관리</strong></h2>
           
            <Box >
                <button style={{ position: 'absolute', right: "0px",  }} onClick={addShow} className="Atmp1">  <strong>추가</strong></button>
            </Box>  

            <br />
            <br />
            <br />


            <Table hover >
                <thead style={{ height: '60px' }}>
                    <tr style={{ backgroundColor: '#f7f7f7', }}>

                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            세금 코드
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            세금명
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            세금 항목
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            비고
                        </td>


                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map((e, idx) =>
                            <tr style={{ height: '60px' }} >

                                <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}> {e.taxCode} </td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>
                                    <Button variant="link" style={{ fontSize:'22px' }}name={e.taxInfoID} onClick={() => modifyShow(e)}>
                                        {e.taxName}
                                    </Button>
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}>{e.taxItem} </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '22px', color: '#000' }}>{e.taxNote} </td>


                            </tr>
                        )
                    }


                </tbody>
            </Table>

            <Grid item xs={12} ml={-3} mt={55}>
                <hr style={{ width: '1440px' }} />
            </Grid>




            {/* 추가 */}
            <Modal
                centered
                size="lg"


                show={add} onHide={addClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>부서관리</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '', }}>



                            <Table style={{textAlign:'center'}}>
                                <tr>
                                    <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'80px' ,color:'#777777'}}>세금코드</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' ,width:'300px'}}>
                                    <Form.Control style={{  height: '50px', fontSize: '15px',textAlign:'center' }} aria-describedby="btnGroupAddon" name='taxCode' type="text" onChange={onChangeAddData}/>
                                    </td>
                                    <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'80px',color:'#777777' }}>세금명</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' }}>
                                    <Form.Control style={{  height: '50px' , fontSize: '15px' ,textAlign:'center'}} aria-describedby="btnGroupAddon" name='taxName' type="text" onChange={onChangeAddData}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'80px',color:'#777777' }}>세금항목</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' ,textAlign:'center'}}>
                                    <InputGroup >
                                    <Form.Control
                                        type="addpayCalc"
                                        name="taxItem"
                                        value={addData.taxItem}
                                        aria-describedby="btnGroupAddon"
                                        style={{ height: '40px' ,fontSize:'15px',textAlign:'center'}}
                                        onChange={onChangeAddData}
                                    />
                                    <InputGroup.Text id="btnGroupAddon" style={{ width: '50px', height: '40px' }}> <SearchIcon onClick= {magShow}/></InputGroup.Text>
                                </InputGroup>
                                    </td>
                                    <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'80px',color:'#777777' }}>비고</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' }}>
                                    <Form.Control style={{  height: '50px' , fontSize: '15px',textAlign:'center'}} aria-describedby="btnGroupAddon" name='taxNote' type="text" onChange={onChangeAddData}/>
                                    </td>
                                </tr>
                            </Table>

                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={addClose}>
                        <strong>취소</strong>
                    </Button>
                    <button className="addButton" onClick={pushAddData}>
                        <strong>추가</strong>
                    </button>
                </Modal.Footer>
            </Modal>

            {/* 부서 관리 수정 */}
            <Modal
                centered
                size="lg"


                show={modify} onHide={modifyClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>부서관리</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '', }}>




                <Table style={{textAlign:'center'}}>
                                <tr>
                                    <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'80px' ,color:'#777777'}}>세금코드</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' ,width:'300px'}}>
                                    
                                    <Form.Control style={{  height: '50px', fontSize: '15px',textAlign:'center' }} aria-describedby="btnGroupAddon" name='taxCode' type="text" value={modifyData.taxCode} onChange={onChangeModifyData}/>
                                    </td>
                                    <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'80px',color:'#777777' }}>세금명</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' }}>
                             
                                    <Form.Control style={{  height: '50px' , fontSize: '15px' ,textAlign:'center'}}
                                    aria-describedby="btnGroupAddon" name='taxName' type="text" value={modifyData.taxName} onChange={onChangeModifyData}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'80px',color:'#777777' }}>세금항목</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' ,textAlign:'center'}}>
      

                                <InputGroup>
                                    <Form.Control
                                        type="addpayCalc"
                                        name="taxItem"
                                        value={modifyData.taxItem}
                                        aria-describedby="btnGroupAddon"
                                        style={{ height: '40px',fontSize:'15px' ,textAlign:'center' }}
                                        onChange={onChangeModifyData}
                                    />
                                    <InputGroup.Text id="btnGroupAddon" style={{ width: '50px', height: '40px' }}> <SearchIcon onClick= {magShow}/></InputGroup.Text>
                                </InputGroup>
                                    </td>
                                    <td style={{ backgroundColor: '#f7f7f7',border: "1px solid #d8d8d8" ,width:'80px',color:'#777777' }}>비고</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px' }}>

                                    <Form.Control  style={{  height: '50px' , fontSize: '15px',textAlign:'center'}} aria-describedby="btnGroupAddon" name='taxNote' value={modifyData.taxNote} type="text" onChange={onChangeModifyData}/>
                                    </td>
                                </tr>
                            </Table>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={addClose}>
                        <strong>취소</strong>
                    </Button>
                    <button className="addButton" onClick={pushModifyData}>
                        <strong>수정</strong>
                    </button>
                    <button className="addButton" onClick={delShow}>
                        <strong>삭제</strong>
                    </button>
                </Modal.Footer>
            </Modal>

            {/* 삭제 */}
            <Modal
                centered
                size="xsm"
                show={del} onHide={delClose} animation={true}>
                <Modal.Header closeButton style={{backgroundColor:'#005b9e',width:'500px'}}>
                    <Modal.Title style={{color:'#ffffff',width:'500px'}}><strong>세금삭제</strong></Modal.Title>
                </Modal.Header>              
                <Modal.Body style={{backgroundColor:'#f1f2f6', width:'500px',}}>
                    <strong>{modifyData.taxName}을 삭제하시겠습니까?</strong>
                </Modal.Body>
                <Modal.Footer style={{width:'500px',backgroundColor:'#ffffff'}}>
                    <Button variant="secondary" onClick={delClose}>
                        닫기
                    </Button>
                    <button className='addButton' variant="primary" onClick={pushDeleteData}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>




            {/* 부서 코드 둗보기 모달 */}
            <Modal 
                size="xsm"
                centered
                show={mag} onHide={magClose} animation={true}>
                <Modal.Header closeButton  style={{backgroundColor:'#005b9e',}}>
                <Modal.Title  style={{color:'#ffffff'}}> <strong>세금목록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:''}}> 

        
                <Table 
                        hover
                        style={{
                        textAlign:"center",
                      }} >
                    <tr style={{border:"1px solid #d8d8d8",backgroundColor:'#f7f7f7'}}>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'22px'}}><strong></strong></td>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'18px'  ,color:'#777777'}}>세금코드</td>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'18px' ,color:'#777777'}}>세금항목</td>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'18px '  ,color:'#777777'}}>세금명</td>
                    </tr>

                    <tbody>
                    {
                        magData && magData.map((e, idx) =>
                            <tr  >
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '17px', color: '#000' }}> {idx+1} </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '17px', color: '#000' }}>{e.taxCode} </td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '17px' }}>
                                    <Button variant="link" style={{ fontSize:'17px'}}name={e.taxInfoID} onClick={() => magSelect(e)}>
                                        {e.taxItem}
                                    </Button>
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '17px', color: '#000' }}>{e.taxName} </td>
                            </tr>
                        )
                    }


                </tbody>
                </Table>

                </Modal.Body>

                </Modal>




        </div>
    );
};

export default PMDcom;