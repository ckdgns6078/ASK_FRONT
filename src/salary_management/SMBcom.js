import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";
import { message, Space } from 'antd';
import { textAlign } from '@mui/system';



const SMBcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
    const [addData, setAddData] = useState();
    const [modifyData, setModifyData] = useState();
    const [temp , setTemp] = useState();
    //모달 함수
    const [del, setDel] = useState(false);
    const [modify, setModify] = useState(false);
    const [add, setAdd] = useState(false);


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
        axios.post('http://192.168.2.82:5000/readMainSalary', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            console.log("@@@@@@@@@@@" , response.data);
            setData(response.data);
        }).catch(function (err) {
            console.log("read_inOutInfo error", err);
        });
    }
    //모델창 띄우는 버튼 클릭
    const modifyClick = (e) => {
        axios.post('http://192.168.2.82:5000/readModalSalary', {
            payStatementId: e.payStatementId
        }).then(function (response) {
            console.log(" @@@@@@@ response value :" , response.data[0]);
            setModifyData(response.data[0]);
            let getStart = response.data[0].startDate.split('-');
            let getEnd = response.data[0].endDate.split('-');
            let getPayDay = response.data[0].payDay.split('-');
            const wallet = {
                StartYear: getStart[0],
                StartMonth: getStart[1],
                StartDay: getStart[2],
                EndYear: getEnd[0],
                EndMonth: getEnd[1],
                EndDay: getEnd[2],
                payDayYear: getPayDay[0],
                payDayMonth: getPayDay[1],
                payDayDay: getPayDay[2]
            }
            setModifyData(Object.assign(response.data[0], wallet));
           
        }).catch(function (err) {
            console.log("readModalSalary error :", err);
        })
        modifyShow();
        console.log("modifydata " , modifyData);
    
    }

    //입력값 onChange 함수
    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        if (name == 'payTitle' || name == 'empName' || name == 'depName') {
            setAddData({
                ...addData,
                [name]: value
            });
        } else {
            const onlyNumber = value.replace(/[^0-9]/g, "")
            setAddData({
                ...addData,
                [name]: onlyNumber
            })
        }
        console.log(addData);
    }


    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        if (name == 'payTitle' || name == 'empName' || name == 'depName') {
            setModifyData({
                ...modifyData,
                [name]: value
            });
        } else {
            const onlyNumber = value.replace(/[^0-9]/g, "")
            setModifyData({
                ...modifyData,
                [name]: onlyNumber
            })
        }
    }


    const pushAddData =()=>{
        axios.post('http://192.168.2.82:5000/createSalary' ,{
            compCode :sessionStorage.getItem("uid") ,
            payStatementId : addData.payStatementId,
            payTitle :addData.payTitle ,
            //   @@@@@@@@@@@@@@@@ 시작일만 있음 종료일이 존재하지않음
            startDate : String(addData.addStartYear) + String(addData.addStartMonth) + String(addData.addStartDay) ,
            endDate : String(addData.addEndYear) + String(addData.addEndMonth) + String(addData.addEndDay) ,
            payDay : String(addData.payDayYear) + String(addData.payDayMonth) + String(addData.payDayDay)  ,
            empNum :addData.empNum  ,
            empName :addData.empName  ,
            depName :addData.depName  , 
            empPay :addData.empPay  , 
            weeklyPay :addData.weeklyPay  ,
            nightTimePay :addData.nightTimePay ,
            overtimePay :addData.overtimePay ,
            weekendPay :addData.weekendPay  ,
            annualAllowance :addData.annualAllowance ,
            dpndnAlwnc :addData.dpndnAlwnc  ,
            incomeTax :addData.incomeTax  ,
            localTaxes :addData.localTaxes  ,
            ntnlPnsn :addData.ntnlPnsn  ,
            hlthInsrn :addData.hlthInsrn  ,
            empIns :addData.empIns  ,
            lngTrmCrIns :addData.lngTrmCrIns  ,
            chldbChalw :addData.chldbChalw  ,
            foodPay :addData.foodPay  ,
            carStatePay:addData.carStatePay  , 
            expense :addData.expense  ,
            totalPay :addData.totalPay  ,
            ddctn :addData.ddctn  ,
            actlPymnt :addData.actlPymnt  ,
            totalAddPay :addData.totalAddPay  ,
            totalAddTax :addData.totalAddTax  ,
            sumTotalAdd : addData.sumTotalAdd
        }).then(function(response){
            if(response.data){
                let text = "명세표 저장완료";
                success(text);
                getData();
                addClose();
            }else{
                let text = "명세표 저장에 실패했습니다";
                warning(text);
            }
        }).catch(function(err){
            console.log("createSalary error :" , err);
            let text = "명세표 저장에서 오류가 발생했습니다.";
            error(text);
        });
    }


    //계산 눌렀을때 발생하는 함수
    const pushCalculator = ()=>{
        console.log()
        axios.post('http://192.168.2.82:5000/setSalary',{
            payTitle : addData.payTitle,
            payDay : String(addData.payDayYear) + String(addData.payDayMonth) + String(addData.payDayDay),
            compCode : sessionStorage.getItem("uid"), 
            startDate: String(addData.addStartYear) + String(addData.addStartMonth) + String(addData.addStartDay), //시작일
            endDate: String(addData.addEndYear) + String(addData.addEndMonth) + String(addData.addEndDay), //종료일
            empNum: addData.empNum,
            empName: addData.empName,
            depName: addData.depName
        }).then(function (response) {
            setAddData(Object.assign(response.data , addData));
        }).catch(function (err) {
            console.log("setSalary error : ", err);
        })
        setTemp("");
    }
    const pushDeleteData =()=>{
        axios.post('http://192.168.2.82:5000/deleteSalary',{
            payStatementId : modifyData.payStatementId
        }).then(function(response){
            if(response.data){
                let text = "명세서를 삭제했습니다.";
                success(text);
                getData();
                delClose();
                modifyClose();
            }else{
                let text = "명세서 삭제에 실패했습니다.";
                warning(text);
                delClose();
            }
        }).catch(function(err){
            console.log("deleteSalary error :" ,err);
            let text = "명세서 삭제에서 오류가 발생하였습니다.";
            error(text);
        })
    }

    // const [mag, setMag] = useState(false);
    // const [magData, setMagData] = useState();
    //추가
    const addClose = () => {
        setAdd(false);
        setAddData('');
    }
    const addShow = () => setAdd(true);
    //수정
    const modifyClose = () => {
        setModify(false);
        setModifyData('');
    }
    
    const modifyShow = () => setModify(true);
    //삭제
    const delClose = () => setDel(false);
    const delShow = () => setDel(true);





    //돋보기 
    const [mag , setMag] = useState(false);
    const [ magData , setMagData] = useState();
    const magClose = () => setMag(false);
    const magShow = () => {
        axios.post('http://192.168.2.82:5000/readEmp', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            console.log("magData" , response.data);
            setMagData(response.data);
        }).catch(function (err) {
            console.log("searchDailyEmp error", error);
        });
        setMag(true);
    }
    const magSelect = (e) => {
        const select = { ...addData };
        select.empName = e.empName;
        select.empNum = e.empNum;
        select.depName = e.depName;
        setAddData(select);
        magClose(false);
    }
    

    const printBtn = () =>{
        window.open('http://www.naver.com')
    }



    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: ' #005b9e', position: 'absolute', left: '0', top: '0px' }}><strong>임직원급여 관리</strong></h2>
            <br />
            <br />
            <br />

            <Table >
                <thead style={{ height: '60px' }}>
                    {/* #769FCD */}
                    {/* ecf0f1 */}
                    <tr style={{ backgroundColor: '#ecf0f1', }}>


                        <td style={{ border: "3px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <input name='allcheck' type="checkbox" ></input>

                        </td>
                        <td style={{ border: "3px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>급여명</strong>
                        </td>
                        <td style={{ border: "3px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>사원코드</strong>
                        </td>
                        <td style={{ border: "3px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>성명</strong>
                        </td>
                        <td style={{ border: "3px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>기본급</strong>
                        </td>

                        <td style={{ border: "3px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>총 수당</strong>
                        </td>
                        <td style={{ border: "3px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>총 경비</strong>
                        </td>
                        <td style={{ border: "3px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>총 세액</strong>
                        </td>
                        <td style={{ border: "3px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>총액</strong>
                        </td>
                        


                    </tr>
                </thead>
                <tbody>

                    {
                        data && data.map((e, idx) =>
                            <tr >
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}>
                                    <input type='checkbox'></input>
                                </td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.payTitle}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.empNum}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}>
                                    <Button style={{ fontSize: '22px' }} name={e.inOutListId} onClick={() => modifyClick(e)} variant="link">
                                        <strong>
                                            {e.empName}
                                        </strong>
                                    </Button>
                                </td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {data && e.empPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {data && e.totalAddPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {data && e.totalAddTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {data && e.totalAddTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {data && e.totalPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></td>
                                {/* <td>이메일 데이터 넣을곳</td> */}
                            </tr>
                        )
                    }

                </tbody>
            </Table>
            <button style={{ position: 'absolute', Right: "10px", top: '0px' }} onClick={addShow} className="Atmp1">  <strong>추가</strong></button>
            <button style={{ position: 'absolute', Right: "200px", top: '300px' }} onClick={printBtn} className="Atmp1">  <strong>출력</strong></button>




            {/* 추가 */}
            <Modal
                centered
                size="xl"
                show={add} onHide={addClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>급여명세등록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>
                    <Container>
                        <Table style={{ textAlign: 'center' }}>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>급여대장명</td>
                                <td colSpan='6' style={{ border: "1px solid #d8d8d8", width: '50px', fontSize: '12px', }}>
                                    <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'left' }} aria-describedby="btnGroupAddon" name ='payTitle' onChange={onChangeAddData}/>

                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '110px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>대상기간</td>
                                <td colSpan='3'>
                                    <Grid container>
                                        <Grid item ml={1} ><Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center', }} type="text" name='addStartYear' aria-describedby="btnGroupAddon" value={ add && addData && addData.addStartYear} onChange={onChangeAddData} /></Grid>
                                        <Grid item ml={1} mt={1} style={{ color: '#777777' }}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='addStartMonth' aria-describedby="btnGroupAddon" value={ add && addData && addData.addStartMonth} onChange={onChangeAddData} /></Grid>
                                        <Grid item ml={1} mt={1} style={{ color: '#777777' }}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='addStartDay' aria-describedby="btnGroupAddon" value={ add && addData && addData.addStartDay} onChange={onChangeAddData} /></Grid>

                                        <Grid item mt={0} ml={1} style={{ color: '#777777', fontSize: '25px' }}><strong>~</strong>  </Grid>

                                        <Grid item ml={2}  ><Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='addEndYear' aria-describedby="btnGroupAddon" value={ add && addData && addData.addEndYear} onChange={onChangeAddData} /></Grid>
                                        <Grid item ml={1} mt={1}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='addEndMonth' aria-describedby="btnGroupAddon" value={ add && addData && addData.addEndMonth} onChange={onChangeAddData} /></Grid>
                                        <Grid item ml={1} mt={1}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='addEndDay' aria-describedby="btnGroupAddon" value={ add && addData && addData.addEndDay} onChange={onChangeAddData} /></Grid>
                                    </Grid>


                                </td>

                                <td style={{ border: "1px solid #d8d8d8", width: '80px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}> 지급일 </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', }}>

                                    <Grid container>
                                        <Grid item ml={1} ><Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='payDayYear' aria-describedby="btnGroupAddon" value={ add && addData && addData.payDayYear} onChange={onChangeAddData}/></Grid>
                                        <Grid item ml={1} mt={1}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='payDayMonth' aria-describedby="btnGroupAddon" value={ add && addData && addData.payDayMonth} onChange={onChangeAddData}/></Grid>
                                        <Grid item ml={1} mt={1}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='payDayDay' aria-describedby="btnGroupAddon" value={ add && addData && addData.payDayDay} onChange={onChangeAddData}/></Grid>
                                    </Grid>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>사원명</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', width: '250px' }}>
                                    <InputGroup style={{ width: '100%' ,  }}>
                                        <Form.Control
                                            type="text"
                                            name='empName'
                                            value={ add && addData && addData.empName}
                                            aria-describedby="btnGroupAddon"
                                            style={{ height: '40px' }}
                                            onChange={onChangeAddData}
                                        />
                                        <InputGroup.Text id="btnGroupAddon" style={{ width: '40px', height: '40px', color: '#777777' }} ><SearchIcon style={{ color: '#777777' }} onClick={magShow}/></InputGroup.Text>
                                    </InputGroup>
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", width: '80px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>사원번호</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', }}>
                                    <Form.Control style={{ height: '57px', width: '100%', fontSize: '12px', textAlign: 'center' }} name ='empNum' value={ add && addData && addData.empNum }aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>부서명</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', }}>
                                    <Form.Control style={{ height: '57px', width: '100%', fontSize: '12px', textAlign: 'center' }} name='depName' value={ add && addData && addData.depName }aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                </td>
                            </tr>
                        </Table>
                    </Container>

                    <Container>
                        <Table style={{ textAlign: 'center', width: '100%' }}>


                        </Table>
                    </Container>

                    <Box >
                        <Container>
                            <Table hover style={{ textAlign: 'center', width: '100%', border: "1px solid #d8d8d8" }}>
                                <tr style={{ backgroundColor: '#f7f7f7', }}>
                                    {/* <td  style={{border:"3px solid #f1f2f6", width:'100px' ,fontSize:'10px'}}rowspan='2'><strong>사원번호</strong></td>
                                <td rowspan='2' style={{border:"3px solid #f1f2f6",color:'#777777',width:'70px',fontSize:'10px'}}>사원명</td> */}
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}> 기본급 </td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>야근수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>주말근무수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>연차수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>출산보육수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>부양사족수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>식대</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>차량유지비</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px' }}>지급총액</td>
                                    <td rowspan='2' style={{ width: '150px', fontSize: '12px' }}> 실지급액</td>
                                </tr>
                                <tr style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>

                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>소득세</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>지방소득세</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>국민연금</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>건강보험</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>고용보험</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>장기요양</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>경비</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}></td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>공제총액</td>
                                </tr>
                                <tr style={{ border: "1px solid #d8d8d8" }}>
                                    {/* <td rowspan='2' style={{border:"3px solid #f1f2f6", width:'100px',fontSize:'12px'}}>사원번호</td>
                                <td rowspan='2' style={{border:"3px solid #f1f2f6", width:'100px',fontSize:'12px'}}>사원명</td> */}
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px' , textAlign:'right'}} name='empPay'aria-describedby="btnGroupAddon" value={ add && addData &&addData.empPay} onChange={onChangeAddData}/></td>
                                    {/* <td> <input type='text' style={{height:'40px',width:'100px',fontSize:'12px'}}></input></td> */}
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='nightTimePay' value={ add && addData &&addData.nightTimePay} aria-describedby="btnGroupAddon" onChange={onChangeAddData} /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='weekendPay' aria-describedby="btnGroupAddon" value={ add && addData && addData.weekendPay} onChange={onChangeAddData} /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='annualAllowance' aria-describedby="btnGroupAddon" value={ add && addData && addData.annualAllowance} onChange={onChangeAddData} /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='chldbChalw' aria-describedby="btnGroupAddon" value={ add && addData && addData.chldbChalw} onChange={onChangeAddData} /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='dpndnAlwnc' aria-describedby="btnGroupAddon" value={ add && addData && addData.dpndnAlwnc} onChange={onChangeAddData} /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='foodPay' aria-describedby="btnGroupAddon" value={ add && addData && addData.foodPay} onChange={onChangeAddData} /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='carStatePay' aria-describedby="btnGroupAddon" value={ add && addData && addData.carStatePay} onChange={onChangeAddData} /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='totalPay' aria-describedby="btnGroupAddon" value={ add && addData && addData.totalPay} onChange={onChangeAddData} /></td>
                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '12px' }} rowspan='2'>{add && addData && addData.actlPymnt}</td>
                                </tr>
                                <tr>

                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='incomeTax' aria-describedby="btnGroupAddon" value={ add && addData &&addData.incomeTax} onChange = {onChangeAddData} /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='localTaxes' aria-describedby="btnGroupAddon" value={ add && addData &&addData.localTaxes} onChange = {onChangeAddData} /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='ntnlPnsn' aria-describedby="btnGroupAddon" value={ add && addData &&addData.ntnlPnsn} onChange = {onChangeAddData} /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='hlthInsrn' aria-describedby="btnGroupAddon" value={ add && addData &&addData.hlthInsrn} onChange = {onChangeAddData} /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='empIns' aria-describedby="btnGroupAddon" value={ add && addData &&addData.empIns} onChange = {onChangeAddData} /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='lngTrmCrIns' aria-describedby="btnGroupAddon" value={ add && addData &&addData.lngTrmCrIns} onChange = {onChangeAddData} /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='expense' aria-describedby="btnGroupAddon" value={ add && addData &&addData.expense} onChange = {onChangeAddData} /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" disabled/></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} name='ddctn' aria-describedby="btnGroupAddon" value={ add && addData &&addData.ddctn} onChange = {onChangeAddData} /></td>
                                </tr>
                            </Table>
                        </Container>
                    </Box>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={addClose}>
                        취소
                    </Button>
                    <button className='addButton' variant="primary" onClick={pushCalculator}>
                        계산
                    </button>
                    <button className='addButton' variant="primary" onClick={pushAddData}>
                        저장
                    </button>
                </Modal.Footer>
            </Modal>




            {/* 수정 */}
            <Modal
                centered
                size="xl"
                show={modify} onHide={modifyClose} animation={false}>
               <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>상세급여</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Container>

                        <Table style={{ textAlign: 'center' }}>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>급여대장명칭</td>
                                <td colSpan='6' style={{ border: "1px solid #d8d8d8", width: '50px', fontSize: '12px', textAlign:'left' }}>
                                 &nbsp;{ modify && modifyData && modifyData.payTitle}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '110px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777', textAlign: 'center' }}>대상기간</td>
                                <td colSpan='3'>
                                    <Grid container>
                                        <Grid item ml={1} > { modify && modifyData && modifyData.StartYear}</Grid>
                                        <Grid item ml={1} style={{ color: '#777777' }}>/</Grid>
                                        <Grid item ml={1}> { modify && modifyData && modifyData.StartMonth}</Grid>
                                        <Grid item ml={1} style={{ color: '#777777' }}>/</Grid>
                                        <Grid item ml={1}> { modify && modifyData && modifyData.StartDay}</Grid>

                                        <Grid item mt={0} ml={1} style={{ color: '#777777' }}><strong>~</strong>  </Grid>

                                        <Grid item ml={2}  >{ modify && modifyData && modifyData.EndYear} </Grid>
                                        <Grid item ml={1}>/</Grid>
                                        <Grid item ml={1}> { modify && modifyData && modifyData.EndMonth}</Grid>
                                        <Grid item ml={1} >/</Grid>
                                        <Grid item ml={1}> { modify && modifyData && modifyData.EndDay}</Grid>
                                    </Grid>


                                </td>

                                <td style={{ border: "1px solid #d8d8d8", width: '80px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}> 지급일 </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', textAlign: 'center' , width :'310px'}}>

                                    <Grid container >
                                        <Grid item ml={1} >{ modifyShow && modifyData && modifyData.payDayYear}</Grid>
                                        <Grid item ml={1} >/</Grid>
                                        <Grid item ml={1}>{ modifyShow && modifyData && modifyData.payDayMonth}</Grid>
                                        <Grid item ml={1} >/</Grid>
                                        <Grid item ml={1}> { modifyShow && modifyData && modifyData.payDayDay}</Grid>
                                    </Grid>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>사원명</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', width: '250px' }}>
                                { modifyShow && modifyData && modifyData.empName}
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", width: '80px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>사원번호</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', }}>
                                { modifyShow && modifyData && modifyData.empNum}
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>부서</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', }}>
                                { modifyShow && modifyData && modifyData.depName}
                                </td>
                            </tr>
                        </Table>




                    </Container>
                    <Container>
                        <Table style={{ textAlign: 'center', width: '100%' }}>


                        </Table>
                    </Container>

                    <Box >
                        <Container>
                            <Table hover style={{ textAlign: 'center', width: '100%', border: "1px solid #d8d8d8" }}>
                                <tr style={{ backgroundColor: '#f7f7f7', }}>
                                    {/* <td  style={{border:"3px solid #f1f2f6", width:'100px' ,fontSize:'10px'}}rowspan='2'><strong>사원번호</strong></td>
<td rowspan='2' style={{border:"3px solid #f1f2f6",color:'#777777',width:'70px',fontSize:'10px'}}>사원명</td> */}
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}> 기본급 </td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>야근수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>주말근무수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>연차수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>출산보육수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>부양가족수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>식대</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>차량유지비</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px' }}>지급총액</td>
                                    <td rowspan='2' style={{ width: '150px', fontSize: '12px' }}> 실지급액</td>
                                </tr>
                                <tr style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>

                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>소득세</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>지방소득세</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>국민연금</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>건강보험</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>고용보험</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>장기요양</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>경비</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}></td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px' }}>공제총액</td>
                                </tr>
                                <tr style={{ border: "1px solid #d8d8d8" }}>
                                    {/* <td rowspan='2' style={{border:"3px solid #f1f2f6", width:'100px',fontSize:'12px'}}>사원번호</td>
<td rowspan='2' style={{border:"3px solid #f1f2f6", width:'100px',fontSize:'12px'}}>사원명</td> */}
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' , width: '100px', height: '40px', fontSize: '12px' }}>{ modify && modifyData && modifyData.empPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } </td>
                                    {/* <td> <input type='text' style={{height:'40px',width:'100px',fontSize:'12px'}}></input></td> */}
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.nightTimePay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp;</td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.weekendPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp;</td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.annualAllowance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp;</td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.chldbChalw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp;</td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.dpndnAlwnc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp;</td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.foodPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp;</td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.carStatePay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp;</td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.totalPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp;</td>
                                    <td rowSpan='2' style={{ border: "1px solid #d8d8d8", fontSize: '12px' }}>{ modify && modifyData && modifyData.actlPymnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } 원</td>
                                </tr>
                                <tr>

                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.incomeTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp; </td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.localTaxes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp; </td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.ntnlPnsn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} &nbsp; </td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.hlthInsrn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp; </td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.empIns.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp; </td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.lngTrmCrIns.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp; </td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp; </td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.ddctn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }&nbsp;&nbsp;</td>
                                </tr>
                            </Table>
                        </Container>
                    </Box>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modifyClose}>
                        닫기
                    </Button>

                    <Button variant="primary" onClick={delShow}>
                        삭제
                    </Button>
                    {/* <Button variant="primary" onClick={modifyClose}>
                        수정
                    </Button> */}
                </Modal.Footer>
            </Modal>




            {/* 삭제 */}

            <Modal
                centered
                size="xsm"
                show={del} onHide={delClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', width: '500px' }}>
                    <Modal.Title style={{ color: '#ffffff', width: '500px' }}><strong>명세서삭제</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6', width: '500px', }}>
                    <strong> { modify && modifyData && modifyData.empName}의 명세서를 삭제하시겠습니까?</strong></Modal.Body>
                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={delClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={pushDeleteData}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>




            {/*추가 돋보기 모델 사원목록 */}
             <Modal
                size="lg"
                centered
                show={mag} onHide={magClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}> <strong>사원목록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6' }}>
                    <table style={{
                        textAlign: "center",
                        width: "100%", border: "1px solid gray",
                    }} >
                        <tr style={{ border: "1px solid gray", backgroundColor: '#a4b0be' }}>
                            <td style={{ border: "1px solid gray", fontSize: '30px', color: '#ffffff' }}><strong></strong></td>
                            <td style={{ border: "1px solid gray", fontSize: '30px', color: '#ffffff' }}><strong>사원목록</strong></td>
                            <td style={{ border: "1px solid gray", fontSize: '30px', color: '#ffffff' }}><strong>성명</strong></td>
                            <td style={{ fontSize: '30px', color: '#ffffff' }}> <strong>직급</strong></td>

                        </tr>
                        {
                            magData && magData.map((e, idx) =>
                                <tr style={{ border: "1px solid gray" }}>
                                    <td style={{ border: "1px solid gray", fontSize: '30px' }}>{idx + 1}</td>
                                    <td style={{ border: "1px solid gray", fontSize: '30px' }}>{e.empNum}</td>
                                    <td style={{ border: "1px solid gray", fontSize: '30px' }}>
                                        <Button name={e.dailyId} onClick={() => magSelect(e)} variant="link"><strong>{e.empName}</strong></Button>
                                    </td>
                                    <td style={{ border: "1px solid gray", fontSize: '30px' }}>{e.empRank}</td>

                                </tr>

                            )
                        }

                    </table>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default SMBcom;