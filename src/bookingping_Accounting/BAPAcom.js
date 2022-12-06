import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import { height } from '@mui/system';
import { message, Space } from 'antd';

const BAPAcom = () => {
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

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [ data, setData ] = useState();
    const [ addData , setAddData ] = useState({
        clientBankName :"",
        clientBankNum :"",
        clientBankOwner :"",
        clientCEO :"",
        clientCompNum :"",
        clientCompNum1 :"",
        clientCompNum2 :"",
        clientCompNum3 :"",
        clientDetail :"",
        clientEmail :"",
        clientName :"",
        clientPhone :"",
        clientevent :"",
        clientstate :"",
        clientAddress :"",

    });
    const [ modifyData , setModifyData] = useState({
        clientBankName :"",
        clientBankNum :"",
        clientBankOwner :"",
        clientCEO :"",
        clientCompNum :"",
        clientCompNum1 :"",
        clientCompNum2 :"",
        clientCompNum3 :"",
        clientDetail :"",
        clientEmail :"",
        clientName :"",
        clientPhone :"",
        clientevent :"",
        clientstate :"",
        clientAddress :"",
    });

    //초기 저장된 데이터베이스 값 가져오기
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.post('http://192.168.2.82:5000/clientRead', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            console.log("초기 getDATA " , response.data);
            setData(response.data);
        }).catch(function (err) {
            console.log("clientRead error", err);
            let text = "데이터를 읽어오는데 오류가 발생하였습니다. 새로고침 후 실행해주세요".
            warning(text);
        });
    }

    //입력값 onChange 함수
    const onChangeAdd = (e) => {
        const { value, name } = e.target;
            setAddData({
                ...addData,
                [name]: value
            });


        console.log(addData);
    }


    const onChangeModify = (e) => {
        const { value, name } = e.target;
            setModifyData({
                ...modifyData,
                [name]: value
            });
    }

    const pushAddData =()=>{
        axios.post('http://192.168.2.82:5000/clientCreate' ,{
            compCode : sessionStorage.getItem('uid'),
            clientBankName : addData.clientBankName,
            clientBankNum : addData.clientBankNum,
            clientBankOwner : addData.clientBankOwner,
            clientCEO : addData.clientCEO,
            clientCompNum : String(addData.clientCompNum1) + String(addData.clientCompNum2) + String(addData.clientCompNum3)  ,
            clientDetail : addData.clientDetail,
            clientEmail : addData.clientEmail,
            clientName : addData.clientName,
            clientPhone : addData.clientPhone,
            clientevent : addData.clientevent,
            clientstate : addData.clientstate,
            clientAddress : addData.clientAddress
        }).then(function(response){
            if(response.data){
                let text = "거래처 등록 완료";
                success(text);
                getData();
                addClose();
            }else{
                let text = "명세표 등록에 실패했습니다";
                warning(text);
            }
        }).catch(function(err){
            console.log("clientCreate error :" , err);
            let text = "명세표 저장에서 오류가 발생했습니다. 새로고침 후 다시 실행해 주세요.";
            error(text);
        });
    }

    const pushModifyData = () =>{
        axios.post('http://192.168.2.82:5000/clientUpdate' ,{
            compCode : sessionStorage.getItem('uid'),
            clientBankName : modifyData.clientBankName,
            clientBankNum : modifyData.clientBankNum,
            clientBankOwner : modifyData.clientBankOwner,
            clientCEO : modifyData.clientCEO,
            clientCompNum : String(modifyData.clientCompNum1) + String(modifyData.clientCompNum2) + String(modifyData.clientCompNum3)  ,
            clientDetail : modifyData.clientDetail,
            clientEmail : modifyData.clientEmail,
            clientName : modifyData.clientName,
            clientPhone : modifyData.clientPhone,
            clientevent : modifyData.clientevent,
            clientstate : modifyData.clientstate,
            clientAddress : modifyData.clientAddress
        }).then(function(response){
            if(response.data){
                let text = "거래처 수정 완료";
                success(text);
                getData();
                modifyClose();
            }else{
                let text = "명세표 등록에 실패했습니다";
                warning(text);
            }
        }).catch(function(err){
            console.log("clientUpdate error :" , err);
            let text = "명세표 저장에서 오류가 발생했습니다. 새로고침 후 다시 실행해 주세요.";
            error(text);
        });
    }

    const pushDeleteData =()=>{
        axios.post('http://192.168.2.82:5000/clientDelete',{
            clientCompNum :  String(modifyData.clientCompNum1) + String(modifyData.clientCompNum2) + String(modifyData.clientCompNum3)
        }).then(function(response){
            if(response.data){
                let text = "거래처를 삭제했습니다.";
                success(text);
                getData();
                delClose();
                modifyClose();
            }else{
                let text = "거래처 삭제에 실패했습니다.";
                warning(text);
                delClose();
            }
        }).catch(function(err){
            console.log("clientDelete error :" ,err);
            let text = "명세서 삭제에서 오류가 발생하였습니다.";
            error(text);
        })
    }
    
    //저장
    const [add, setAdd] = useState(false);
    const addClose = () => {
        setAddData({
            clientBankName :"",
            clientBankNum :"",
            clientBankOwner :"",
            clientCEO :"",
            clientCompNum :"",
            clientCompNum1 :"",
            clientCompNum2 :"",
            clientCompNum3 :"",
            clientDetail :"",
            clientEmail :"",
            clientName :"",
            clientPhone :"",
            clientevent :"",
            clientstate :"",
            clientAddress :"",
        });
        setAdd(false);
    }
    const addShow = () => setAdd(true);
    //삭제
    const [del , setDel] = useState(false);
    const delClose = () => setDel(false);
    const delShow = () => setDel(true);
    //수정
    const [modify, setModify] = useState(false);
    const modifyClose = () => setModify(false);
    const modifyShow = (e) => {
        axios.post('http://192.168.2.82:5000/clientModal',{
            clientCompNum :  e.clientCompNum
        }).then(function(response){
            console.log(response.data[0]);
            setModifyData({
                clientBankName : response.data[0].clientBankName,
                clientBankNum : response.data[0].clientBankNum,
                clientBankOwner : response.data[0].clientBankOwner,
                clientCEO : response.data[0].clientCEO,
                clientCompNum : response.data[0].clientCompNum,
                clientCompNum1 : response.data[0].clientCompNum.substr(0,3),
                clientCompNum2 : response.data[0].clientCompNum.substr(3,2),
                clientCompNum3 : response.data[0].clientCompNum.substr(5),
                clientDetail : response.data[0].clientDetail,
                clientEmail : response.data[0].clientEmail,
                clientName : response.data[0].clientName,
                clientPhone : response.data[0].clientPhone,
                clientevent : response.data[0].clientevent,
                clientstate : response.data[0].clientstate,
                clientAddress : response.data[0].clientAddress,
            })
        }).catch(function(err){

        })
        setModify(true);
    }



    //-----------------------거래 명세서를 받는 내용들

    const [taxData, setTaxData] = useState();
    const [tax, setTax] = useState(false);
    const taxShow = () => setTax(true);
    const taxClose = () => {
        checkedItems.clear();
        setTaxData();
        setTax(false);
    }

    const [taxDate , setTaxDate] = useState({
        startYear : '',
        startMonth : '',
        startDay : '',
        endYear : '',
        endMonth : '',
        endDay : ''
    })

    const onChangeTaxDate = (e) =>{
        const { value , name } = e.target;
        setTaxDate({
            ...taxDate,
            [name] : value
        })
    }




    const pushTaxData = ()=>{
        axios.post('http://192.168.2.91:5000/clientdetail',{
            compCode : sessionStorage.getItem('uid'), 
            clientCompNum : modifyData.clientCompNum,
            startDate : String(taxDate.startYear) + String(taxDate.startMonth) + String(taxDate.startDay),
            endDate : String(taxDate.endYear) + String(taxDate.endMonth) + String(taxDate.endDay),
        }).then(function(response){
            console.log(response.data);
            setTaxData(response.data);
        }).catch(function(err){
            console.log(" clientdetail error : " , err);
        })
    }



    //체크박스 , 출력
     //체크박스 관련 ---------------------------------------
     const [isChecked, setIsChecked] = useState(false); //체크여부
     const [checkedItems, setCheckedItems] = useState(new Set());
 
     const checkHandler = ({ target }) => {
         setIsChecked(!isChecked);
         checkedItemHandle(target.value, target.checked);
     }
 
     const checkedItemHandle = (id, isChecked) => {
         if (isChecked) {
             checkedItems.add(id);
             setCheckedItems(checkedItems);
         } else if (!isChecked && checkedItems.has(id)) {
             checkedItems.delete(id);
             setCheckedItems(checkedItems);
         }
         return checkedItems;
     }
 
 
 
     //체크박스 전체 선택
     const [isAllChecked, setIsAllChecked] = useState(false);
 
     const allHandler = ({ target }) => {
         setIsAllChecked(!isAllChecked);
         allCheckedHandler(target.checked);
     }
 
     const allCheckedHandler = (isChecked) => {
         if (isChecked) {
             for (let i = 0; i < taxData.length; i++) {
                 checkedItems.add(taxData[i].purchaseId);
             }
             for (let i = 0; i < taxData.length; i++) {
                 let checkedall = document.getElementById(taxData[i].purchaseId);
                 checkedall.checked = isChecked;
             }
         } else {
             checkedItems.clear();
             setCheckedItems(checkedItems);
             setIsAllChecked(!isAllChecked);
             for (let i = 0; i < taxData.length; i++) {
                 let checkedall = document.getElementById(taxData[i].purchaseId);
                 checkedall.checked = isChecked;
             }
         }
         return checkedItems;
     }

    const printCheck = () =>{
        let key = "";
        for ( let i of checkedItems){
          key+="&id="+i;
        }
        console.log(key);

        window.open('http://localhost:3000/Tax?id=1'+key);
    }




    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong>거래처 관리 </strong></h2>
            <Box >
                    
                    <button   style={{position:'absolute' ,right:"180px",}} onClick={addShow} className="Atmp1">  <strong>추가</strong></button>
                        
                    </Box>
            <br />
            <br />
            <br />
            


            <Table >
                <thead style={{ height: '60px' }}>
                    <tr style={{backgroundColor:'#f7f7f7' , textAlign:'center', border: "1px solid #d8d8d8" }}>
                        {/* <td style={{border:"1px solid #d8d8d8", color: '#d8d8d8', fontSize: '22px'}}>
                        <Checkbox {...label} defaultChecked />
                        </td> */}
                        <td style={{border:"1px solid #d8d8d8", color: '#777777', fontSize: '22px'}}>
                            <strong>거래처명</strong>
                        </td>
                        <td style={{border:"1px solid #d8d8d8", color: '#777777', fontSize: '22px'}}>
                            <strong>대표자명</strong>
                        </td>
                        <td style={{border:"1px solid #d8d8d8", color: '#777777', fontSize: '22px'}}>
                            <strong>사업자 등록번호</strong>
                        </td>
                        <td style={{border:"1px solid #d8d8d8", color: '#777777', fontSize: '22px'}}>
                            <strong>연락처</strong>
                        </td>
                        <td style={{border:"1px solid #d8d8d8", color: '#777777', fontSize: '22px'}}>
                            <strong>Email</strong>
                        </td>
                       

                    </tr>                 
                 </thead>
                <tbody>

                {
                        data && data.map((e, idx) =>
                        <tr  style={{border:"1px solid gray"}} >
                            {/* <td style={{border:"1px solid #d8d8d8", color: '#d8d8d8', fontSize: '22px'}}><Checkbox {...label} defaultChecked /></td> */}
                            <td style={{border:"1px solid #d8d8d8", color: '#000', fontSize: '22px'}}><Button  variant="link" onClick={()=>modifyShow(e)}><strong>{e.clientName}</strong></Button></td>
                            <td style={{border:"1px solid #d8d8d8", color: '#000', fontSize: '22px'}}><strong>{e.clientCEO}</strong></td>
                            <td style={{border:"1px solid #d8d8d8", color: '#000', fontSize: '22px'}}><strong>{e.clientCompNum}</strong></td>
                            <td style={{border:"1px solid #d8d8d8", color: '#000', fontSize: '22px'}}><strong>{e.clientPhone}</strong></td>
                            <td style={{border:"1px solid #d8d8d8", color: '#000', fontSize: '22px'}}><strong>{e.clientEmail}</strong></td>
                         
                        </tr>
                        )   
                    }
                </tbody>
            </Table>
 

            {/* 추가 */}  
            <Modal 
             centered
             size="xl"    
             show={add} onHide={addClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#005b9e',}}>
                <Modal.Title style={{color:'#ffffff'}}><strong>거래처 등록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'',}}>
            
                <Container>
                    <Table style={{
                        textAlign: "center",
                        width: "100%", border: "1px solid #d8d8d8",
                    }} >
                    <tr>
                        <td style={{ height:'40px' ,width:'150px'  , backgroundColor: '#f7f7f7',color:'#777777'}}>사업자등록번호</td>
                        <td style={{ border: "1px solid #d8d8d8",height:'40px'  ,width:'320px'}}>
                        <Grid container>
                            <Grid item ml={1} > <Form.Control style={{ height: '40px', width: '70px', fontSize: '12px', textAlign: 'left' }} aria-describedby="btnGroupAddon" name='clientCompNum1' onChange={onChangeAdd}/></Grid>
                            <Grid item ml={1.5} mt={1}><strong>ㅡ</strong></Grid>
                            <Grid item ml={1}>  <Form.Control style={{ height: '40px', width: '70px', fontSize: '12px', textAlign: 'left' }} aria-describedby="btnGroupAddon" name='clientCompNum2' onChange={onChangeAdd}/></Grid>
                            <Grid item ml={1.5} mt={1}><strong>ㅡ</strong></Grid>
                            <Grid item ml={1}>  <Form.Control style={{ height: '40px', width: '70px', fontSize: '12px', textAlign: 'left' }} aria-describedby="btnGroupAddon" name='clientCompNum3' onChange={onChangeAdd}/></Grid>
                        </Grid>

                       


                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'  ,width:'150px', backgroundColor: '#f7f7f7',color:'#777777'}}>사업자명</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '100%', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientCEO' onChange={onChangeAdd}/>
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px' ,width:'150px', backgroundColor: '#f7f7f7',color:'#777777'}}>연락처</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '100%', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientPhone' onChange={onChangeAdd}/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>상호</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientName'  onChange={onChangeAdd}/>
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>종목</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon"  name='clientevent' onChange={onChangeAdd}/>
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>업태</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientstate' onChange={onChangeAdd}/>
                        </td>
                    </tr>

                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>이메일</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientEmail' onChange={onChangeAdd}/>
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>주소</td>
                        <td colSpan='3' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientAddress' onChange={onChangeAdd}/>
                        </td>
                    </tr>
                    <tr>
                    <td rowSpan='3' style={{borderLeft:'1px solid #d8d8d8 ', height:'40px',borderBottom:'1px solid #d8d8d8 ', height:'40px' , backgroundColor: '#f7f7f7',color:'#777777'}}>통장</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>은행</td>
                        <td colSpan='4' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientBankName' onChange={onChangeAdd}/>
                        </td>
                    </tr>
                    <tr>
                      
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>계좌번호</td>
                        <td colSpan='4' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientBankNum' onChange={onChangeAdd}/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>예금주</td>
                        <td colSpan='4' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientBankOwner' onChange={onChangeAdd}/>
                        </td>
                    </tr>
                    </Table>


                </Container>
            </Modal.Body>
                <Modal.Footer style={{ backgroundColor:'#ffffff'}}>
                <Button variant="secondary" onClick={addClose}>
                    <strong>취소</strong>
                </Button>
                <button className="addButton"  onClick={pushAddData}>
                    <strong>추가</strong>
                </button>
                </Modal.Footer>
            </Modal>
            


            {/* 수정  */}
            <Modal
                centered
                size="xl"
                show={modify} onHide={modifyClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>거래처 상세</strong> </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <Container>
                    <Table style={{
                        textAlign: "center",
                        width: "100%", border: "1px solid #d8d8d8",
                    }} >
                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px' ,width:'150px'  , backgroundColor: '#f7f7f7',color:'#777777'}}>사업자등록번호</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'  ,width:'320px'}}>
                        <Grid container>
                            <Grid>
                            <Form.Control style={{ height: '40px', width: '75px', fontSize: '12px', textAlign: 'left' }} aria-describedby="btnGroupAddon" name='clientCompNum1' onChange={onChangeModify} value={modifyData.clientCompNum1}/>
                         </Grid>
                            <Grid item ml={1.5} mt={1}><strong>ㅡ</strong></Grid>
                            <Grid item ml={1}>  
                            <Form.Control style={{ height: '40px', width: '75px', fontSize: '12px', textAlign: 'left' }} aria-describedby="btnGroupAddon" name='clientCompNum2' onChange={onChangeModify} value={modifyData.clientCompNum2}/>
                            </Grid>
                            <Grid item ml={1.5} mt={1}><strong>ㅡ</strong></Grid>
                            <Grid item ml={1}> 
                            <Form.Control style={{ height: '40px', width: '75px', fontSize: '12px', textAlign: 'left' }} aria-describedby="btnGroupAddon" name='clientCompNum3' onChange={onChangeModify} value={modifyData.clientCompNum3}/>
                            </Grid>
                         </Grid>



                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'  ,width:'150px', backgroundColor: '#f7f7f7',color:'#777777'}}>사업자명</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientCEO' onChange={onChangeModify} value={ modifyData.clientCEO } />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px' ,width:'150px', backgroundColor: '#f7f7f7',color:'#777777'}}>연락처</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientPhone' onChange={onChangeModify} value={ modifyData.clientPhone } />
                        </td>
                    </tr>
                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>상호</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientName'  onChange={onChangeModify} value={ modifyData.clientName } />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>종목</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientevent' onChange={onChangeModify} value={ modifyData.clientevent } />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>업태</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientstate' onChange={onChangeModify} value={ modifyData.clientstate } />
                        </td>
                    </tr>

                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>이메일</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientEmail' onChange={onChangeModify} value={ modifyData.clientEmail } />
                        </td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>주소</td>
                        <td colSpan='3' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientAddress' onChange={onChangeModify} value={ modifyData.clientAddress } />
                        </td>
                    </tr>
                    <tr>
                    <td rowSpan='3' style={{borderLeft:'1px solid #d8d8d8 ', height:'40px',borderBottom:'1px solid #d8d8d8 ', height:'40px' , backgroundColor: '#f7f7f7',color:'#777777'}}>통장</td>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>은행</td>
                        <td colSpan='4' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientBankName' onChange={onChangeModify} value={ modifyData.clientBankName } />
                        </td>
                    </tr>
                    <tr>
                      
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>계좌번호</td>
                        <td colSpan='4' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientBankNum' onChange={onChangeModify} value={ modifyData.clientBankNum } />
                        </td>
                    </tr>
                    <tr>
                        <td style={{border:'1px solid #d8d8d8 ', height:'40px', backgroundColor: '#f7f7f7',color:'#777777'}}>예금주</td>
                        <td colSpan='4' style={{border:'1px solid #d8d8d8 ', height:'40px'}}>
                        <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='clientBankOwner' onChange={onChangeModify} value={ modifyData.clientBankOwner } />
                        </td>
                    </tr>
                    </Table>


                </Container>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={modifyClose}>
                        닫기
                    </Button>
                    <button className='addButton' onClick={delShow}>
                        삭제
                    </button>
                    <button  className='addButton' onClick={pushModifyData}>
                        수정
                    </button>
                    <button  className='addButton' onClick={taxShow} style={{width:'100px'}}>
                       명세버튼
                    </button>
                </Modal.Footer>

            </Modal>




            {/* 삭제 */}

            <Modal
                centered
                size="xsm"
                show={del} onHide={delClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', width: '500px' }}>
                    <Modal.Title style={{ color: '#ffffff', width: '500px' }}><strong>거래처삭제</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6', width: '500px', }}>
                    <strong> { modifyData.clientName} 거래처를 삭제하시겠습니까?</strong></Modal.Body>
                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={delClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={pushDeleteData}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>

            {/* 명세서 모달 */}

            <Modal
                centered
                size="xl"
                show={tax} onHide={taxClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', }}>
                    <Modal.Title style={{ color: '#ffffff', width: '500px' }}><strong>거래목록 검색</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '', }}>
                    <div>
                        <Grid container mb={5}>
                            <Grid item mt={1}>
                                <strong>검색일</strong>
                            </Grid>
                            <Grid ml={1}>
                                <Form.Control style={{ height: '40px', width: '75px', fontSize: '12px', textAlign: 'left' }} aria-describedby="btnGroupAddon" onChange={onChangeTaxDate} name='startYear' />
                            </Grid>
                            <Grid item ml={1.5} mt={1}><strong>-</strong></Grid>
                            <Grid item ml={1}>
                                <Form.Control style={{ height: '40px', width: '75px', fontSize: '12px', textAlign: 'left' }} aria-describedby="btnGroupAddon" onChange={onChangeTaxDate} name='startMonth' />
                            </Grid>
                            <Grid item ml={1.5} mt={1}><strong>-</strong></Grid>
                            <Grid item ml={1}>
                                <Form.Control style={{ height: '40px', width: '75px', fontSize: '12px', textAlign: 'left' }} aria-describedby="btnGroupAddon" onChange={onChangeTaxDate} name='startDay' />
                            </Grid>

                            <Grid item ml={1.5} mt={1} ><strong >~</strong></Grid>

                            <Grid ml={1}>
                                <Form.Control style={{ height: '40px', width: '75px', fontSize: '12px', textAlign: 'left' }} aria-describedby="btnGroupAddon" onChange={onChangeTaxDate} name='endYear' />
                            </Grid>
                            <Grid item ml={1.5} mt={1}><strong>-</strong></Grid>
                            <Grid item ml={1}>
                                <Form.Control style={{ height: '40px', width: '75px', fontSize: '12px', textAlign: 'left' }} aria-describedby="btnGroupAddon" onChange={onChangeTaxDate} name='endMonth' />
                            </Grid>
                            <Grid item ml={1.5} mt={1}><strong>-</strong></Grid>
                            <Grid item ml={1}>
                                <Form.Control style={{ height: '40px', width: '75px', fontSize: '12px', textAlign: 'left' }} aria-describedby="btnGroupAddon" onChange={onChangeTaxDate} name='endDay' />
                            </Grid>

                            <Grid item ml={1.5} mt={0}> <button className='addButton'onClick={pushTaxData}><SearchIcon /></button></Grid>
                        </Grid>

                    </div>


                    <Table style={{ textAlign: 'center' }}>
                        <tr style={{ border: '1px solid #d8d8d8 ', height: '40px' }}>
                            <td style={{ border: '1px solid #d8d8d8 ', height: '40px', backgroundColor: '#f7f7f7', color: '#777777' }}>
                                <input type="checkbox" name='allcheck' id="allCheck" value="allCheck" onChange={(e)=>allHandler(e)}></input>
                            </td>
                            <td style={{ border: '1px solid #d8d8d8 ', height: '40px', backgroundColor: '#f7f7f7', color: '#777777' }}>날짜</td>
                            <td style={{ border: '1px solid #d8d8d8 ', height: '40px', backgroundColor: '#f7f7f7', color: '#777777' }}>거래처명</td>
                            <td style={{ border: '1px solid #d8d8d8 ', height: '40px', backgroundColor: '#f7f7f7', color: '#777777' }}>품목</td>
                            <td style={{ border: '1px solid #d8d8d8 ', height: '40px', backgroundColor: '#f7f7f7', color: '#777777' }}>수량</td>
                            <td style={{ border: '1px solid #d8d8d8 ', height: '40px', backgroundColor: '#f7f7f7', color: '#777777' }}>단가</td>
                            <td style={{ border: '1px solid #d8d8d8 ', height: '40px', backgroundColor: '#f7f7f7', color: '#777777' }}>공급가액</td>
                            <td style={{ border: '1px solid #d8d8d8 ', height: '40px', backgroundColor: '#f7f7f7', color: '#777777' }}>부가세</td>
                            <td style={{ border: '1px solid #d8d8d8 ', height: '40px', backgroundColor: '#f7f7f7', color: '#777777' }}>합계</td>
                        </tr>

                        {
                            taxData && taxData.map((e,idx)=>
                            
                            <tr style={{ border: '1px solid #d8d8d8 ', height: '40px' }}>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px' }}>
                                    <input type="checkbox" id={e.purchaseId} value={e.purchaseId} onChange={(e) => checkHandler(e)}></input>
                                </td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px' }}>
                                    {e.p_date}
                                </td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px' }}>
                                    {e.p_clientName}
                                </td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px' }}>
                                    {e.p_item}
                                </td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px' }}>
                                    {e.p_iCount } 
                                </td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px' }}>
                                    {e.p_unitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px' }}>
                                    {e.p_supplyValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px' }}>
                                    {e.p_surTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px' }}>
                                    {e.p_totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </td>
                            </tr>

                            )

                    }
                        
                    </Table>

                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={taxClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={printCheck} >
                        세금계산서 발행
                    </button>
                </Modal.Footer>
            </Modal>


        </div>
    );
};

export default BAPAcom;