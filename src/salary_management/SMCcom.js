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
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { message, Space } from 'antd';
import axios from "axios";

const SMCcom = () => {
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
    const [data, setData] = useState();
    const [addData , setAddData] = useState();
    const [ modifyData , setModifyData ] = useState();
    const [ temp , setTemp] = useState();

    useEffect(() => {
        getData();
    }, []);

    //data에 넣는 초기 데이터
    const getData = () => {
        axios.post('http://192.168.2.82:5000/readDailyMainSalary', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (err) {
            console.log("read_inOutInfo error", err);
        });
    }

    //모델창 띄우는 버튼 클릭
    const modifyClick = (e) => {
        axios.post('http://192.168.2.82:5000/readDailyModalSalary', {
            statementId: e.statementId
        }).then(function (response) {
            console.log(" @@@@@@@ response value :" , response.data[0]);
            setModifyData(response.data[0]);
            let getStart = response.data[0].dailyStartDate.split('-');
            let getEnd = response.data[0].dailyEndDate.split('-');
            let getPayDay = response.data[0].dailyPayDay.split('-');
            const wallet = {
                dailyStartYear: getStart[0],
                dailyStartMonth: getStart[1],
                dailyStartDay: getStart[2],
                dailyEndYear: getEnd[0],
                dailyEndMonth: getEnd[1],
                dailyEndDay: getEnd[2],
                dailypayDayYear: getPayDay[0],
                dailypayDayMonth: getPayDay[1],
                dailypayDayDay: getPayDay[2]
            }
            setModifyData(Object.assign(response.data[0], wallet));
           
        }).catch(function (err) {
            console.log("readModalSalary error :", err);
        })
        modifyShow();
        console.log("modifydata " , modifyData);
    
    }



    //-------onChange----------
    //추가 모델 onChange
    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        if (name == 'dailyPayTitle' || name == 'dailyName' || name == 'dailyRank') {
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
        console.log( name , value);
        console.log(addData);
    }

    //수정 모델 onChnage
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

    //데이터 등록 버튼 함수
    const pushAddData =()=>{
        axios.post('http://192.168.2.82:5000/createDailySalary' ,{
            compCode :sessionStorage.getItem("uid") ,
            dailyPayTitle  :addData.dailyPayTitle ,
            //   @@@@@@@@@@@@@@@@ 시작일만 있음 종료일이 존재하지않음
            dailyStartDate: String(addData.dailyStartYear) + String(addData.dailyStartMonth) + String(addData.dailyStartDay),
            dailyEndDate: String(addData.dailyEndYear) + String(addData.dailyEndMonth) + String(addData.dailyEndDay),
            dailyPayDay: String(addData.dailyPayDayYear) + String(addData.dailyPayDayMonth) + String(addData.dailyPayDayDay),
            dailyCode: addData.dailyCode,
            dailyName: addData.dailyName,
            dailyRank: addData.dailyRank,    //(부서 -> 직급)
            dailyPay : addData.dailyPay,
            dailyWeeklyPay : addData.dailyWeeklyPay,
            dailyNightTimePay : addData.dailyNightTimePay,
            dailyOvertimePay : addData.dailyOvertimePay,
            dailyWeekendPay : addData.dailyWeekendPay,
            dailyAnnual : addData.dailyAnnual,
            dpndnAlwnc : addData.dpndnAlwnc,   //(부양가족수 필요없음)
            dailyIncomeTax : addData.dailyIncomeTax,
            dailyLocalTaxes : addData.dailyLocalTaxes,
            dailyNtnlPnsn : addData.dailyNtnlPnsn,
            dailyHlthInsrn : addData.dailyHlthInsrn,
            dailyEmpIns : addData.dailyEmpIns,
            dailyLngTrmCrIns : addData.dailyLngTrmCrIns,
            chldbChalw : addData.chldbChalw,   //(출산보육수당 필요없음)
            dailyFoodPay : addData.dailyFoodPay,
            dailyCarStatePay: addData.dailyCarStatePay,
            dailyExpense : addData.dailyExpense,
            dailyTotalPay : addData.dailyTotalPay,
            dailyDdctn : addData.dailyDdctn,
            dailyActlPymnt : addData.dailyActlPymnt,
            dailyTotalAddPay : addData.dailyTotalAddPay,
            dailyTotalAddTax : addData.dailyTotalAddTax,
            dailySumTotalAdd : addData.dailySumTotalAdd
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

    //계산 눌렀을때 발생하는 함수 ( 일용직으로 변경해야함)
    const pushCalculator = () => {
        axios.post('http://192.168.2.82:5000/setDailySalary', {
            dailyPayTitle: addData.dailyPayTitle,
            dailyPayDay: String(addData.dailyPayDayYear) + String(addData.dailyPayDayMonth) + String(addData.dailyPayDayDay),
            compCode: sessionStorage.getItem("uid"),
            dailyStartDate: String(addData.dailyStartYear) + String(addData.dailyStartMonth) + String(addData.dailyStartDay), //시작일
            dailyEndDate: String(addData.dailyEndYear) + String(addData.dailyEndMonth) + String(addData.dailyEndDay), //종료일
            dailyCode: addData.dailyCode,
            dailyName: addData.dailyName,
            dailyRank: addData.dailyRank
        }).then(function (response) {
            setAddData(Object.assign(response.data, addData));
        }).catch(function (err) {
            console.log("setSalary error : ", err);
        })
        setTemp("");
    }


    const pushDeleteData =()=>{
        axios.post('http://192.168.2.82:5000/deleteDailySalary',{
            statementId : modifyData.statementId
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











    //추가
    const [add, setAdd] = useState(false);
    const addShow = () => setAdd(true);
    const addClose = () => {
        setAdd(false);
        setAddData('');
    }

    //수정
    const [modify, setModify] = useState(false);
    const modifyShow = () => setModify(true);
    const modifyClose = () => {
        setModify(false);
        setModifyData('');
    }
    //삭제
    const [del, setDel] = useState(false);
    const delClose = () => setDel(false);
    const delShow = () => setDel(true);

    //돋보기
    const [ mag , setMag ] = useState(false);
    const [ magData , setMagData] = useState();
    const magClose = () => setMag(false);
    const magShow = () => {
        axios.post('http://192.168.2.82:5000/readDailyEmp', {
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
        select.dailyName = e.dailyName;
        select.dailyCode = e.dailyCode;
        select.dailyRank = e.dailyRank;
        setAddData(select);
        magClose(false);
    }


    //출력 관련 함수
    const printBtn = () => {
        window.open('http://localhost:3000/OW?id=' + modifyData.payStatementId);
    }
    //여러명 출력용
    const printCheck = () => {
        let key = "";
        for (let i of checkedItems) {
            key += "&id=" + i;
        }
        console.log(key);

        window.open('http://localhost:3000/OW?id=1' + key);
    }

    //체크 박스
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

    const [isAllChecked, setIsAllChecked] = useState(false);

    const allHandler = ({ target }) => {
        setIsAllChecked(!isAllChecked);
        allCheckedHandler(target.checked);
    }

    const allCheckedHandler = (isChecked) => {
        if (isChecked) {
            for (let i = 0; i < data.length; i++) {
                checkedItems.add(data[i].statementId);
            }
            for (let i = 0; i < data.length; i++) {
                let checkedall = document.getElementById(data[i].statementId);
                checkedall.checked = isChecked;
            }
        } else {
            checkedItems.clear();
            setCheckedItems(checkedItems);
            setIsAllChecked(!isAllChecked);
            for (let i = 0; i < data.length; i++) {
                let checkedall = document.getElementById(data[i].statementId);
                checkedall.checked = isChecked;
            }
        }
        return checkedItems;
    }


    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            <h2 style={{ color: ' #005b9e', position: 'absolute', left: '0', top: '0px' }}><strong>일용직급여 관리</strong></h2>
            <div>
                <button style={{ position: 'absolute', right: "0" }} onClick={addShow} className="Atmp1">  <strong>추가</strong></button>
                <button style={{ position: 'absolute', right: "100px" }} onClick={printCheck} className="Atmp1">  <strong>출력</strong></button>

            </div>
            <br />
            <br />
            <br />

            <Table >
                <thead style={{ height: '60px' }}>

                    <tr style={{ backgroundColor: '#ecf0f1', }}>
                    <input type="checkbox" name='allcheck' id="allCheck" onChange={(e)=>allHandler(e)}  ></input>

                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>명세서명</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>일용직코드</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>성명</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>일급</strong>
                        </td>

                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>총 수당</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>총 경비</strong>



                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>총 세액</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>총액</strong>
                        </td>



                    </tr>
                </thead>
                <tbody>

                    {
                        data && data.map((e, idx) =>
                            <tr >
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}>
                                <input type="checkbox" id={e.statementId} value={e.statementId} onChange={(e) => checkHandler(e)}></input>
                                </td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.dailyPayTitle}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.dailyCode}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}>
                                    <Button style={{ fontSize: '22px' }} name={e.inOutListId} onClick={() => modifyClick(e)} variant="link">
                                        <strong>
                                            {e.dailyName}
                                        </strong>
                                    </Button>
                                </td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.dailyPay}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.dailyTotalAddPay}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.userId}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.dailyTotalAddTax}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.dailySumTotalAdd}</strong></td>
                                {/* <td>이메일 데이터 넣을곳</td> */}
                            </tr>
                        )
                    }
                    {/* <tr style={{ backgroundColor: '#f1f2f6', }}>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong>합계</strong></td>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}></td>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}></td>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}> <strong>기본급123</strong></td>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong>추가수당123</strong></td>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong>세금 경비123</strong></td>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong>합계123</strong></td>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong>세금 경비123</strong></td>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong>합계123</strong></td>
                    </tr> */}



                </tbody>
            </Table>



            {/* 추가 */}
            <Modal
                centered
                size="xl"
                show={add} onHide={addClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong> 급여명세서</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>


                    <Container>

                        <Table style={{ textAlign: 'center' }}>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>급여대장명칭</td>
                                <td colSpan='6' style={{ border: "1px solid #d8d8d8", width: '50px', fontSize: '12px', }}>
                                    <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name = 'dailyPayTitle' onChange={onChangeAddData} />

                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '110px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>대상기간</td>
                                <td colSpan='3'>
                                    <Grid container>
                                        <Grid item ml={1} ><Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center', }} type="text" name='dailyStartYear' value ={add && addData && addData.dailyStartYear} onChange = { onChangeAddData } aria-describedby="btnGroupAddon" /></Grid>
                                        <Grid item ml={1} mt={1} style={{ color: '#777777' }}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyStartMonth' value ={add && addData && addData.dailyStartMonth} onChange = { onChangeAddData } aria-describedby="btnGroupAddon" /></Grid>
                                        <Grid item ml={1} mt={1} style={{ color: '#777777' }}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyStartDay' value ={add &&addData &&  addData.dailyStartDay} onChange = { onChangeAddData } aria-describedby="btnGroupAddon" /></Grid>

                                        <Grid item mt={0} ml={1} style={{ color: '#777777', fontSize: '25px' }}><strong>~</strong>  </Grid>

                                        <Grid item ml={2}  ><Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyEndYear' value ={add && addData && addData.dailyEndYear} onChange = { onChangeAddData } aria-describedby="btnGroupAddon" /></Grid>
                                        <Grid item ml={1} mt={1}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyEndMonth' value ={add && addData &&  addData.dailyEndMonth} onChange = { onChangeAddData } aria-describedby="btnGroupAddon" /></Grid>
                                        <Grid item ml={1} mt={1}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyEndDay' value ={add && addData && addData.dailyEndDay} onChange = { onChangeAddData } aria-describedby="btnGroupAddon" /></Grid>
                                    </Grid>


                                </td>

                                <td style={{ border: "1px solid #d8d8d8", width: '80px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}> 지급일 </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', }}>

                                    <Grid container>
                                        <Grid item ml={1} ><Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyPayDayYear' value = {add && addData && addData.payDayYear} onChange = { onChangeAddData } aria-describedby="btnGroupAddon" /></Grid>
                                        <Grid item ml={1} mt={1}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyPayDayMonth' value = {add && addData && addData.payDayMonth} onChange = { onChangeAddData } aria-describedby="btnGroupAddon" /></Grid>
                                        <Grid item ml={1} mt={1}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyPayDayDay' value = {add && addData && addData.payDayDay} onChange = { onChangeAddData } aria-describedby="btnGroupAddon" /></Grid>
                                    </Grid>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>성명</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', width: '250px' }}>
                                    <InputGroup style={{ width: '100%' }}>
                                        <Form.Control
                                            type="text"
                                            name='dailyName'
                                            onChage={onChangeAddData}
                                            value = {add && addData && addData.dailyName}
                                            aria-describedby="btnGroupAddon"
                                            style={{ height: '40px' }}

                                        />
                                        <InputGroup.Text id="btnGroupAddon" style={{ width: '40px', height: '40px', color: '#777777' }}> <SearchIcon style={{ color: '#777777' }} onClick={magShow} /></InputGroup.Text>
                                    </InputGroup>
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", width: '80px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>일용직코드</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', }}>
                                    <Form.Control style={{ height: '57px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" value = {add && addData && addData.dailyCode} onChange = {onChangeAddData} name ='dailyCode'/>
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>직책</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', }}>
                                    <Form.Control style={{ height: '57px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" value = {add && addData && addData.dailyRank} onChange = {onChangeAddData} name='dailyRank'/>
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
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}> 지출총액 </td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>일급</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>야근수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>주말근무수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>연차수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>출산보육수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>부양사족수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>식대</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px', color: '#777777' }}>차량유지비</td>
                                    <td rowspan='2' style={{ width: '150px', fontSize: '12px', color: '#777777' }}> 실지급액</td>
                                </tr>
                                <tr style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>

                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>공제총액</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>소득세</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>지방소득세</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>국민연금</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>건강보험</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>고용보험</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>장기요양</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>추가경비</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}></td>
                                </tr>
                                <tr style={{ border: "1px solid #d8d8d8" }}>

                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px' }} aria-describedby="btnGroupAddon" name = 'dailyTotalPay'  onChange={onChangeAddData} value={ add && addData && addData.dailyTotalPay }/></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon"  name='dailyPay' onChange={onChangeAddData} value={ add && addData && addData.dailyPay }/></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='dailyOvertimePay' onChange={onChangeAddData} value={ add && addData && addData.dailyOvertimePay }/> </td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='dailydailyWeekendPay'  onChange={onChangeAddData} value={ add && addData && addData.dailydailyWeekendPay }/></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name = 'dailyAnnual' onChange={onChangeAddData} value={add && addData && addData.dailyAnnual} /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name = 'dailyFoodPay' onChange={onChangeAddData} value={add && addData && addData.dailyFoodPay} /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name = 'dailyCarStatePay' onChange={onChangeAddData} value={add && addData && addData.dailyCarStatePay} /></td>
                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '12px' }} rowspan='2'>{add && addData && addData.dailyActlPymnt}</td>
                                </tr>
                                <tr>

                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='dailydailyDdctn' onChange={onChangeAddData} value={ add && addData && addData.dailyDdctn } /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='dailyIncomeTax' onChange={onChangeAddData} value={ add && addData && addData.dailyIncomeTax } /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='dailyLocalTaxes' onChange={onChangeAddData} value={ add && addData && addData.dailyLocalTaxes } /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='dailyNtnlPnsn' onChange={onChangeAddData} value={ add && addData && addData.dailyNtnlPnsn } /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='dailyHlthInsrn' onChange={onChangeAddData} value={ add && addData && addData.dailyHlthInsrn } /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='dailyEmpIns' onChange={onChangeAddData} value={ add && addData && addData.dailyEmpIns } /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" name='dailyIngTrmCrIns' onChange={onChangeAddData} value={ add && addData && addData.dailyIngTrmCrIns } /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon"  /></td>
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
                                 &nbsp;{ modify && modifyData && modifyData.dailyPayTitle}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '110px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777', textAlign: 'center' }}>대상기간</td>
                                <td colSpan='3'>
                                    <Grid container>
                                        <Grid item ml={1} > { modify && modifyData && modifyData.dailyStartYear}</Grid>
                                        <Grid item ml={1} style={{ color: '#777777' }}>/</Grid>
                                        <Grid item ml={1}> { modify && modifyData && modifyData.dailyStartMonth}</Grid>
                                        <Grid item ml={1} style={{ color: '#777777' }}>/</Grid>
                                        <Grid item ml={1}> { modify && modifyData && modifyData.dailyStartDay}</Grid>

                                        <Grid item mt={0} ml={1} style={{ color: '#777777' }}><strong>~</strong>  </Grid>

                                        <Grid item ml={2}  >{ modify && modifyData && modifyData.dailyEndYear} </Grid>
                                        <Grid item ml={1}>/</Grid>
                                        <Grid item ml={1}> { modify && modifyData && modifyData.dailyEndMonth}</Grid>
                                        <Grid item ml={1} >/</Grid>
                                        <Grid item ml={1}> { modify && modifyData && modifyData.dailyEndDay}</Grid>
                                    </Grid>


                                </td>

                                <td style={{ border: "1px solid #d8d8d8", width: '80px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}> 지급일 </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', textAlign: 'center' , width :'310px'}}>

                                    <Grid container >
                                        <Grid item ml={1} >{ modifyShow && modifyData && modifyData.dailypayDayYear}</Grid>
                                        <Grid item ml={1} >/</Grid>
                                        <Grid item ml={1}>{ modifyShow && modifyData && modifyData.dailypayDayMonth}</Grid>
                                        <Grid item ml={1} >/</Grid>
                                        <Grid item ml={1}> { modifyShow && modifyData && modifyData.dailypayDayDay}</Grid>
                                    </Grid>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>사원명</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', width: '250px' }}>
                                { modifyShow && modifyData && modifyData.dailyName}
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", width: '80px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>사원번호</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', }}>
                                { modifyShow && modifyData && modifyData.dailyCode}
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>직급</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', }}>
                                { modifyShow && modifyData && modifyData.dailyRank}
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
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' , width: '100px', height: '40px', fontSize: '12px' }}>{ modify && modifyData && modifyData.dailyPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } </td>
                                    {/* <td> <input type='text' style={{height:'40px',width:'100px',fontSize:'12px'}}></input></td> */}
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.dailyNightTimePay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp;</td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.dailyWeekendPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp;</td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.dailyAnnual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp;</td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}> &nbsp;</td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}> &nbsp;</td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.dailyFoodPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp;</td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.dailyCarStatePay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp;</td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.dailyTotalPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp;</td>
                                    <td rowSpan='2' style={{ border: "1px solid #d8d8d8", fontSize: '12px' }}>{ modify && modifyData && modifyData.dailyActlPymnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } 원</td>
                                </tr>
                                <tr>

                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.dailyIncomeTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp; </td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.dailyLocalTaxes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp; </td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.dailyNtnlPnsn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} &nbsp; </td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.dailyHlthInsrn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp; </td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.dailyEmpIns.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp; </td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.dailyIngTrmCrIns.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp; </td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.dailyExpense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } &nbsp; </td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right', height:'40px', fontSize:'12px' }}>{ modify && modifyData && modifyData.dailyDdctn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }&nbsp;&nbsp;</td>
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
                    <Button variant="primary" onClick={printBtn}>
                        출력/저장
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
                    <strong> { modify && modifyData && modifyData.dailyName}의 명세서를 삭제하시겠습니까?</strong></Modal.Body>
                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={delClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={pushDeleteData}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>

\
             {/*추가 돋보기 모델 사원목록 */}
             <Modal
                size="lg"
                centered
                show={mag} onHide={magClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}> <strong>일용직목록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6' }}>
                    <table style={{
                        textAlign: "center",
                        width: "100%", border: "1px solid gray",
                    }} >
                        <tr style={{ border: "1px solid gray", backgroundColor: '#a4b0be' }}>
                            <td style={{ border: "1px solid gray", fontSize: '30px', color: '#ffffff' }}><strong></strong></td>
                            <td style={{ border: "1px solid gray", fontSize: '30px', color: '#ffffff' }}><strong>일용직코드</strong></td>
                            <td style={{ border: "1px solid gray", fontSize: '30px', color: '#ffffff' }}><strong>성명</strong></td>
                            <td style={{ fontSize: '30px', color: '#ffffff' }}> <strong>직급</strong></td>

                        </tr>
                        {
                            magData && magData.map((e, idx) =>
                                <tr style={{ border: "1px solid gray" }}>
                                    <td style={{ border: "1px solid gray", fontSize: '30px' }}>{idx + 1}</td>
                                    <td style={{ border: "1px solid gray", fontSize: '30px' }}>{e.dailyCode}</td>
                                    <td style={{ border: "1px solid gray", fontSize: '30px' }}>
                                        <Button name={e.dailyId} onClick={() => magSelect(e)} variant="link"><strong>{e.dailyName}</strong></Button>
                                    </td>
                                    <td style={{ border: "1px solid gray", fontSize: '30px' }}>{e.dailyRank}</td>

                                </tr>

                            )
                        }

                    </table>
                </Modal.Body>
            </Modal>














        </div>
    );
};

export default SMCcom;