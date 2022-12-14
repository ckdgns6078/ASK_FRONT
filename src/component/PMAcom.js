import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { message, Space } from 'antd';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  






const PMAcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [addCheck , setAddCheck] = useState(false);
    const [modifyCheck , setModifyCheck] = useState(false);
    const [data, setData] = useState(); //초기 데이터 들어있는 함수
    const [addData, setAddData] = useState({
            addempCode: null,//sessionStrage값
            addempName: null,//사원명
            addempNum: null,//사원번호
            addempFirstSSN : null,  //주민등록번호 앞자리
            addempSecondSSN : null, //주민등록번호 뒷자리
            addempPhone: null,//전화번호
            addempEmail : null,//이메일
            addempFamilyNum: null,//부양가족수
            addempAddress : null,//주소
            adddepCode: null,//부서코드
            adddepName : null,//부서명
            addempRank: null,//직위/직급
            addempStartYear : null,//입사일 년
            addempStartMonth : null,//입사일 년 월
            addempStartDay : null,//입사일 일
            addtotalVacation: null,//휴가
            addempEndYear: null,//퇴사년
            addempEndMonth: null,//퇴사월
            addempEndDay: null,//퇴사일
            addempEndReason : null,//퇴사사유
            addbankName: null,//은행
            addbankNum : null,//계좌번호
            addbankOwner: null,//예금주
            addempPay : null,//연봉
            addmealPay : null,  // 식대
            addcarPay : null,   //차량 유지비
            addchildPay : null, // 출산보육수당
            adddpndnAlwnc : null   // 부양가족수당
    });
    const [modifyData, setModifyData] = useState({
            modifyempId : null, //PRIMARY KEY
            modifyempName: null,//사원명
            modifyempNum: null,//사원번호
            modifyempFirstSSN : null,  //주민등록번호 앞자리
            modifyempSecondSSN : null, //주민등록번호 뒷자리
            modifyempPhone: null,//전화번호
            modifyempEmail : null,//이메일
            modifyempFamilyNum: null,//부양가족수
            modifyempAddress : null,//주소
            modifydepCode: null,//부서코드
            modifydepName : null,//부서명
            modifyempRank: null,//직위/직급
            modifyempStartYear : null,//입사일 년
            modifyempStartMonth : null,//입사일 년 월
            modifyempStartDay : null,//입사일 일
            modifytotalVacation: null,//휴가
            modifyempEndYear: null,//퇴사년
            modifyempEndMonth: null,//퇴사월
            modifyempEndDay: null,//퇴사일
            modifyempEndReason : null,//퇴사사유
            modifybankName: null,//은행
            modifybankNum : null,//계좌번호
            modifybankOwner: null,//예금주
            modifyempPay : null,//연봉
            modifyremindVacation : null,
            modifymealPay : null,  // 식대
            modifycarPay : null,   //차량 유지비
            modifychildPay : null, // 출산보육수당
            modifydpndnAlwnc : null   // 부양가족수당
    });

   
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

    //초기 데이터 불러오는 useEffect
    useEffect(() => {
        getData();
    }, []);

    //useEffect에서 실행되는 함수 ( axios )
    const getData = () => {
        axios.post('http://192.168.2.82:5000/readEmp', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response){
            setData(response.data); 
        }).catch(function (er) {
            console.log("readUser error", er);
            let contentText = "데이터를 가져오는데 에러가 발생했어요 새로고침해주세요";
            error(contentText);
        });
    }

    //추가

    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        setAddData({
            ...addData,
            [name]: value
        })
        console.log(addData);
    }

    const pushAddData = () => {
            axios.post('http://192.168.2.82:5000/createEmp', {
                compCode:sessionStorage.getItem("uid"),//sessionStrage값
                empName:addData.addempName,//사원명
                empNum:addData.addempNum,//사원번호
                empFirstSSN :addData.addempFirstSSN,//주민등록번호 앞자리
                empSecondSSN : addData.addempSecondSSN,
                empPhone:addData.addempPhone,//전화번호
                empEmail : addData.addempEmail,//이메일
                empFamilyNum: addData.addempFamilyNum,//부양가족수
                empAddress : addData.addempAddress,//주소
                depCode: addData.adddepCode,//부서코드
                depName : addData.adddepName,//부서명
                empRank: addData.addempRank,//직위/직급
                empStart :addData.addempStart,//입사일 
                empStartYear : addData.addempStartYear,//입사년 
                empStartMonth : addData.addempStartMonth,//입사월 
                empStartDay : addData.addempStartDay,//입사일
                totalVacation:addData.addtotalVacation,//휴가
                empEndYear:addData.addempEndYear,//퇴사년
                empEndMonth : addData.addempEndMonth,//퇴사월
                empEndDay : addData.addempEndDay,//퇴사일
                empEndReason :addData.addempEndReason,//퇴사사유
                bankName:addData.addbankName,//은행
                bankNum :addData.addbankNum,//계좌번호
                bankOwner: addData.addbankOwner,//예금주
                empPay : addData.addempPay,//연봉
                carPay : addData.addcarPay,   //차량 유지비
                childPay : addData.addchildPay, // 출산보육수당
                dpndnAlwnc : addData.adddpndnAlwnc,   // 부양가족수당
                mealPay : addData.addmealPay
            }).then(function (response) {
                if (response.data) {
                    let contentText = "        사원 추가 완료        ";
                    getData();
                    success(contentText);
                    handleClose();
                }
                if(!response.data){
                    let contentText = " 사원 추가 실패 다시 시도해주세요";
                    warning(contentText);
                    
                }
            }).catch(function (er) {
                console.log("createEmp error", er);
                let contentText = "서버 연동 에러 발생";
                error(contentText);
            });
            
        }


    //수정
    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
        })
    }

    //모달 함수
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);
    const [SH, setSh] = useState(false);

    const [TA, setTA] =useState(false);


    const TAbClose = ()=> setTA(false);
    const TAbShow = () => setTA(true);


    // 탭 모달 함수
    const [Tabes, setTabs] = useState(false);

    const TabClose = ()=> setTabs(false);
    const TabShow = () => setTabs(true);



    const handleClose = () => {
        setShow(false);
        setAddData({
            "addempCode": null,//sessionStrage값
            "addempName": null,//사원명
            "addempNum": null,//사원번호
            "addempFirstSSN": null,  //주민등록번호 앞자리
            "addempSecondSSN": null, //주민등록번호 뒷자리
            "addempPhone": null,//전화번호
            "addempEmail": null,//이메일
            "addempFamilyNum": null,//부양가족수
            "addempAddress": null,//주소
            "adddepCode": null,//부서코드
            "adddepName": null,//부서명
            "addempRank": null,//직위/직급
            "addempStartYear": null,//입사일 년
            "addempStartMonth": null,//입사일 년 월
            "addempStartDay": null,//입사일 일
            "addtotalVacation": null,//휴가
            "addempEndYear": null,//퇴사년
            "addempEndMonth": null,//퇴사월
            "addempEndDay": null,//퇴사일
            "addempEndReason": null,//퇴사사유
            "addbankName": null,//은행
            "addbankNum": null,//계좌번호
            "addbankOwner": null,//예금주
            "addempPay": null,//연봉
            "addmealPay" : null,  // 식대
            "addcarPay" : null,   //차량 유지비
            "addchildPay" : null, // 출산보육수당
            "adddpndnAlwnc" : null   ,// 부양가족수당
        })
        setAddCheck(false);
    }
    const handleShow = () => {
        setShow(true);
        setAddCheck(true);
    }

    const DelClose = () => setMDelShow(false);
    const DeShow = () => setMDelShow(true);

    const MdClose = () => {
        setModifyShow(false);
        setModifyData({
            "modifyempId" : null,
            "modifyempName": null,//사원명
            "modifyempNum": null,//사원번호
            "modifyempFirstSSN": null,  //주민등록번호 앞자리
            "modifyempSecondSSN": null, //주민등록번호 뒷자리
            "modifyempPhone": null,//전화번호
            "modifyempEmail": null,//이메일
            "modifyempFamilyNum": null,//부양가족수
            "modifyempAddress": null,//주소
            "modifydepCode": null,//부서코드
            "modifydepName": null,//부서명
            "modifyempRank": null,//직위/직급
            "modifyempStartYear": null,//입사일 년
            "modifyempStartMonth": null,//입사일 년 월
            "modifyempStartDay": null,//입사일 일
            "modifytotalVacation": null,//휴가
            "modifyempEndYear": null,//퇴사년
            "modifyempEndMonth": null,//퇴사월
            "modifyempEndDay": null,//퇴사일
            "modifyempEndReason": null,//퇴사사유
            "modifybankName": null,//은행
            "modifybankNum": null,//계좌번호
            "modifybankOwner": null,//예금주
            "modifyempPay": null,//연봉
            "modifyremindVacation" : null,
            "modifycarPay" : null,   //차량 유지비
            "modifychildPay" : null, // 출산보육수당
            "modifydpndnAlwnc" : null,   // 부양가족수당
            "modifymealPay" : null    //식비
        });
        setModifyCheck(false);
    }

    //-----------------------------------------------------
    const MdShow = (e) => {
        axios.post('http://192.168.2.82:5000/updateEmpModal',{
            empId : e.empId
        }).then(function (response){
            console.log("response.data modify" , response.data);
            let empFirstSSN=null;
            let empSecondSSN =null;
            let empStartYear =null;
            let empStartMonth =null;
            let empStartDay =null;
            let empEndYear=null;
            let empEndMonth=null;
            let empEndDay=null;
            if(response.data[0].empSSN != null){
                empFirstSSN = response.data[0].empSSN.substr(0,6);
                empSecondSSN = response.data[0].empSSN.substr(7);
            }
            if(response.data[0].empStart != null){
                empStartYear = response.data[0].empStart.substr(0,4);
                empStartMonth = response.data[0].empStart.substr(5,2);
                empStartDay = response.data[0].empStart.substr(8);
            }
            if(response.data[0].empEnd !=null){
                empEndYear = response.data[0].empEnd.substr(0,4);
                empEndMonth = response.data[0].empEnd.substr(5,2);
                empEndDay = response.data[0].empEnd.substr(8);
            }
            setModifyData({
                "modifyempId" : response.data[0].empId,
                "modifyempName": response.data[0].empName,//사원명
                "modifyempNum": response.data[0].empNum,//사원번호
                "modifyempFirstSSN": empFirstSSN,  //주민등록번호 앞자리
                "modifyempSecondSSN": empSecondSSN, //주민등록번호 뒷자리
                "modifyempPhone": response.data[0].empPhone,//전화번호
                "modifyempEmail": response.data[0].empEmail,//이메일
                "modifyempFamilyNum": response.data[0].empFamilyNum,//부양가족수
                "modifyempAddress": response.data[0].empAddress,//주소
                "modifydepCode": response.data[0].depCode,//부서코드
                "modifydepName": response.data[0].depName,//부서명
                "modifyempRank": response.data[0].empRank,//직위/직급
                "modifyempStartYear": empStartYear,//입사일 년
                "modifyempStartMonth": empStartMonth,//입사일 년 월
                "modifyempStartDay": empStartDay,//입사일 일
                "modifytotalVacation": response.data[0].totalVacation,//휴가
                "modifyempEndYear": empEndYear,//퇴사년
                "modifyempEndMonth": empEndMonth,//퇴사월
                "modifyempEndDay": empEndDay,//퇴사일
                "modifyempEndReason": response.data[0].empEndReason,//퇴사사유
                "modifybankName": response.data[0].bankName,//은행
                "modifybankNum": response.data[0].bankNum,//계좌번호
                "modifybankOwner": response.data[0].bankOwner,//예금주
                "modifyempPay": response.data[0].empPay,//연봉
                "modifyremindVacation" : response.data[0].remindVacation,
                "modifycarPay" : response.data[0].carPay,   //차량 유지비
                "modifychildPay" : response.data[0].childPay, // 출산보육수당
                "modifydpndnAlwnc" : response.data[0].dpndnAlwnc,   // 부양가족수당
                "modifymealPay" : response.data[0].mealPay    //식비
            });
        }).catch(function (er){
            console.log("updataEmpModal error" , er);
            let contentText = "데이터를 가져오는데 실패했어요 다시 시도해주세요";
            error(contentText);
        });
        setModifyShow(true);
        setModifyCheck(true);
    }

    //-----------------------------------------------------
    const [Right, setRight] = useState();

    const ShBtn = (e) => {
        if (modifyCheck) {
            const temp = {...modifyData};
            temp.modifydepCode = e.depCode;
            temp.modifydepName = e.depName;
            setModifyData(temp);
        }
        if (addCheck) {
            const temp = {...addData};
            temp.adddepCode = e.depCode;
            temp.adddepName = e.depName;
            setAddData(temp);
        }
        ShClose();
    }
    const ShClose = () => setSh(false);
    const Shshow = () => {
        axios.post('http://192.168.2.82:5000/readDep',{
            compCode : sessionStorage.getItem("uid")
        }).then(function(response){
            setRight(response.data);
        }).catch(function(er){
            console.log("updateEmpPayModal error :", er);
            let contentText = "부서 목록을 가져오는데 에러가 발생했습니다";
            error(contentText);
        });
        
        setSh(true);
    };

    const pushModifyData = ()=>{

        axios.post('http://192.168.2.82:5000/updateEmp', {
            empId : modifyData.modifyempId,
            empName: modifyData.modifyempName,//사원명
            empNum: modifyData.modifyempNum,//사원번호
            empFirstSSN: modifyData.modifyempFirstSSN,  //주민등록번호 앞자리
            empSecondSSN: modifyData.modifyempSecondSSN, //주민등록번호 뒷자리
            empPhone: modifyData.modifyempPhone,//전화번호
            empEmail: modifyData.modifyempEmail,//이메일
            empFamilyNum: modifyData.modifyempFamilyNum,//부양가족수
            empAddress: modifyData.modifyempAddress,//주소
            depCode: modifyData.modifydepCode,//부서코드
            depName: modifyData.modifydepName,//부서명
            empRank: modifyData.modifyempRank,//직위/직급
            empStartYear: modifyData.modifyempStartYear,//입사일 년
            empStartMonth: modifyData.modifyempStartMonth,//입사일 년 월
            empStartDay: modifyData.modifyempStartDay,//입사일 일
            totalVacation: modifyData.modifytotalVacation,//휴가
            empEndYear: modifyData.modifyempEndYear,//퇴사년
            empEndMonth: modifyData.modifyempEndMonth,//퇴사월
            empEndDay: modifyData.modifyempEndDay,//퇴사일
            empEndReason: modifyData.modifyempEndReason,//퇴사사유
            bankName: modifyData.modifybankName,//은행
            bankNum: modifyData.modifybankNum,//계좌번호
            bankOwner: modifyData.modifybankOwner,//예금주
            empPay: modifyData.modifyempPay,//연봉
            carPay : modifyData.modifycarPay,   //차량 유지비
            childPay : modifyData.modifychildPay, // 출산보육수당
            dpndnAlwnc : modifyData.modifydpndnAlwnc,   // 부양가족수당
            mealPay : modifyData.modifymealPay
        }).then(function (response) {
            if(response.data){
                getData();
                MdClose();
                let contentText = "        수정 성공        ";
                success(contentText);
            }
            if(!response.data){
                let contentText = "        수정 오류        ";
                warning(contentText);

            }
        }).catch(function(er){
            let contentText = "        에러 발생        ";
            error(contentText);
            console.log("updataEmp error" , er);
        });
    }

   
    const pushDeleteData = () =>{
        
        axios.post('http://192.168.2.82:5000/deleteEmp',{
            empId : modifyData.modifyempId
        }).then(function(response){
            if(response.data){
                getData();
                MdClose();
                DelClose();
                let contentText = "삭제 성공";
                success(contentText);

            }
        }).catch(function(er){
            console.log("deleteEmp error" , er);
            let contentText = " 에러 발생 ";
            error(contentText);
        })
    }

    
    const [value, setValue] = React.useState(0);

    const HC = (event, newValue) => {
      setValue(newValue);
    };

    //권한 부여 맵핑 함수

    return (
        
        <div style={{ width: '1400px', position: 'relative' }}>
        {contextHolder}
        <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' , color:'#005b9e' }}><strong>사원 관리 </strong></h2>
        <div>
            <button  style={{position:'absolute' ,right:"0px", }}onClick={handleShow} className="Atmp1">  <strong>등록</strong></button>
          


        </div>
            
        <br />
        <br />
        <br />

            
        <Table  hover>
                <thead style={{height:'60px'}}>
                <tr  style={{backgroundColor:'#f7f7f7' ,  }}>
                <td style={{ border: "1px solid #d8d8d8" ,color:'#777777',fontSize:'22px'}}>
                    입사일자
                </td>
                <td style={{ border: "1px solid #d8d8d8" ,color:'#777777',fontSize:'22px'}}>
                    사원번호
                </td>
                <td style={{ border: "1px solid #d8d8d8",color:'#777777',fontSize:'22px' }}>
                    사원명
                </td>
                <td style={{ border: "1px solid #d8d8d8" ,color:'#777777',fontSize:'22px'}}>
                    부서명
                </td>
                <td style={{ border: "1px solid #d8d8d8" ,color:'#777777',fontSize:'22px'}}>
                    직위/직급
                </td>
                <td style={{ border: "1px solid #d8d8d8" ,color:'#777777',fontSize:'22px'}}>
                    은행
                </td>
                <td style={{ border: "1px solid #d8d8d8",color:'#777777',fontSize:'22px' }}>
                    계좌번호
                </td>
                <td style={{ border: "1px solid #d8d8d8" ,color:'#777777',fontSize:'22px'}}>
                    Email
                </td>
            </tr>
                </thead>
                <tbody>
         
                {
                data && data.map((e, idx) =>
                    <tr >
                        <td style={{border:"1px solid #d8d8d8", color:'#000',fontSize:'22px'}}>{e.empStart}</td>
                        <td style={{border:"1px solid #d8d8d8", color:'#000',fontSize:'22px'}}>{e.empNum}</td>
                        <td style={{border:"1px solid #d8d8d8", color:'#000',fontSize:'22px'}}><strong><Button  name={e.empId} style={{fontSize:'22px'}}onClick={()=>MdShow(e)} variant="link">{e.empName}</Button></strong></td>
                        <td style={{border:"1px solid #d8d8d8", color:'#000',fontSize:'22px'}}>{e.depName}</td>
                        <td style={{border:"1px solid #d8d8d8", color:'#000',fontSize:'22px'}}>{e.empRank}</td>
                        <td style={{border:"1px solid #d8d8d8", color:'#000',fontSize:'22px'}}>{e.bankName}</td>
                        <td style={{border:"1px solid #d8d8d8", color:'#000',fontSize:'22px'}}>{e.bankNum}</td>
                        <td style={{border:"1px solid #d8d8d8", color:'#000',fontSize:'22px'}}>{e.empEmail}</td>
                    </tr>
                )
            }

               
                </tbody>
                </Table>


  




            {/* 등록 */}
            <Modal
                centered
                size="lg"


                show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong> 사원등록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '', }}>



                    


                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={HC} aria-label="basic tabs example">
                        <Tab label="사원정보" {...a11yProps(0)} />
                        <Tab label="급여지급사항" {...a11yProps(1)} />
                    
                        </Tabs>
                    </Box>

                       {/* 사원정보 탭 */}
                    <TabPanel value={value} index={0}  style={{backgroundColor:'' ,  }}>

                    
                     <Container >
                     <Table style={{ border: "1px solid #d8d8d8",textAlign:'center'}}>
                                <tr>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7',fontSize:'15px' }}>사원명</td>
                                    <td colSpan='3'  style={{width:'50px'}}>
                                    <Form.Control style={{ width: '100%', height: '100%',fontSize:'15px' }} type="text" name='addempName' value = {addData.addempName} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                    </td>
                                    <td  style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7',width:'140px' ,fontSize:'15px'}}>사원번호</td>
                                    <td style={{width:'200px'}}>
                                    <Form.Control style={{ width: '100%', height: '100%',fontSize:'15px' }} type="text" name='addempNum' value={addData.addempNum} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7',width:'140px',fontSize:'15px' }}>주민등록번호</td>
                                    <td>
                                    <Form.Control style={{ width: '100%', height: '100%',fontSize:'15px' }} type="text" name='addempFirstSSN' value ={addData.addempFirstSSN} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                    </td>
                                    <td>
                                        -
                                    </td>
                                    <td>
                                    <Form.Control style={{ width: '100%', height: '100%' ,fontSize:'15px'}} type="password" name='addempSecondSSN' value = {addData.addempSecondSSN} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                    </td>

                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7' ,fontSize:'15px'}}>전화번호</td>
                                    <td>
                                    <Form.Control style={{ width: '100%', height: '100%' ,fontSize:'15px'}} type="text" name='addempPhone' value = {addData.addempPhone} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7',fontSize:'15px' }}>이메일</td>
                                    <td  colSpan='3' style={{ border: "1px solid #d8d8d8"}}>
                                    <Form.Control style={{ width: '100%', height: '100%',fontSize:'15px' }} type="text" name='addempEmail' value={addData.addempEmail} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                    </td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7',fontSize:'15px' }}>부양 가족수</td>
                                    <td style={{ border: "1px solid #d8d8d8"}}>
                                    <Form.Control style={{ width: '100%', height: '100%' ,fontSize:'15px'}} type="text" name='addempFamilyNum' value={addData.addempFamilyNum} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7' ,fontSize:'15px'}}> 주소</td>
                                    <td colSpan='5'style={{ border: "1px solid #d8d8d8"}}>
                                    

                                        <Form.Control  
                                            type="text"
                                            name='addempAddress'
                                            aria-describedby="btnGroupAddon"
                                            style={{ width: '100%', height: '100%' ,fontSize:'15px'}}
                                            onChange={onChangeAddData}
                                            value = { addData.addempAddress}
                                        />

                                    </td>
                                  
                                    
                                </tr>
                            </Table>

                     
                     
                            



                          



                        <Table  style={{ border: "1px solid #d8d8d8" ,textAlign:'center'}}>
                            <tr style={{ border: "1px solid #d8d8d8"}}>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7' ,fontSize:'15px' ,width:'90px'}}>부서코드</td>
                                <td colSpan='5'>
                                <InputGroup style={{ width: '100%' }}>

                                    <Form.Control
                                        type="text"
                                        name='adddepCode'
                                        aria-describedby="btnGroupAddon"
                                        value={addData.adddepCode}
                                        style={{ height: '30px' }}
                                        onChange={onChangeAddData}
                                    />
                                    <InputGroup.Text id="btnGroupAddon" onClick={Shshow} style={{ width: '40px', height: '30px' }}> <SearchIcon /></InputGroup.Text>
                                    </InputGroup>
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7' ,fontSize:'15px',width:'90px'}}> 부서명</td>
                                <td colSpan='5'>
                                <Form.Control style={{ width: '100%', height: '45px' }} type="text" name='adddepName' value={addData.adddepName} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                </td>

                            </tr>
                            {/* 더미 삭제 퇴사일 일 입사일 수정 */}
                            <tr style={{ border: "1px solid #d8d8d8"}}>
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7' ,fontSize:'15px',height:'40px'}}>입사일</td>
                            
                                <td>  <Form.Control style={{ width: '60px', height: '100%' }} type="text" name='addempStartYear' value={addData.addempStartYear} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/></td>
                                <td>/</td>
                                <td><Form.Control style={{ width: '60px', height: '100%' }} type="text" name='addempStartMonth' value={addData.addempStartMonth} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/></td>
                                <td>/</td>
                                <td> <Form.Control style={{ width: '60px', height: '100%' }} type="text" name='addempStartDay'  value={addData.addempStartDay} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/></td>
                               
                      
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7' ,fontSize:'15px'}}>직위/직급</td>
                                <td colSpan='5'>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='addempRank' value={addData.addempRank} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                </td>

                            </tr>
                            <tr style={{ border: "1px solid #d8d8d8"}}>
                            <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7' ,fontSize:'15px',height:'40px'}}>퇴사일</td>

                                <td> <Form.Control style={{ width: '60px', height: '100%' }} type="text" name='addempEndYear' value={addData.addempEndYear} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/></td>
                                <td>/</td>
                                <td>  <Form.Control style={{ width: '60px', height: '100%' }} type="text" name='addempEndMonth' value={addData.addempEndMonth} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/></td>
                                <td>/</td>
                                <td> <Form.Control style={{ width: '60px', height: '100%' }} type="text" name='addempEndDay' value={addData.addempEndDay} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/></td>
                                
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7' ,fontSize:'15px'}}>휴가</td>
                                <td>
                                <Form.Control style={{ width: '100px', height: '30px',height:'100%' }} type="text" name='addtotalVacation' value={addData.addtotalVacation} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                </td>
                                <td  style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7' ,fontSize:'15px',width:'100px'}}>잔여휴가</td>
                                <td>
                                <Form.Control style={{ width: '100px', height: '30px',height:'100%' }} type="text" name='add' aria-describedby="btnGroupAddon" onChange={onChangeAddData} disabled/>
                                </td>
                            </tr>
                            <tr style={{ border: "1px solid #d8d8d8"}}>
                           
                           
                                <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7' ,fontSize:'15px'}}>퇴사사유</td>
                                <td colSpan='9'>
                                <Form.Control style={{ width: '100%', height: '30px',height:'100%' }} type="text" name='addempEndReason' value={addData.addempEndReason} aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                </td>
                            </tr>

                        </Table>


                       
                     </Container>
               
                    </TabPanel>



                         {/* 급여지급 사항 탭 */}
                    <TabPanel value={value} index={1} >
                       <Table style={{border:"1px solid #d8d8d8",textAlign:'center'}}>

                                <tr>                                                         

                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>출산보육수당</td>
                                    <td colSpan='3'>
                                        <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='addchildPay' aria-describedby="btnGroupAddon" value={ addData.addchildPay }onChange={onChangeAddData} />
                                    </td>
                                </tr>
                                <tr style={{ borderBottom: "1px solid #d8d8d8"}}>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>식대</td>
                                    <td>
                                        <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='addmealPay' aria-describedby="btnGroupAddon" value={ addData.addmealPay }onChange={onChangeAddData} />
                                    </td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>부양가족수당</td>
                                    <td>
                                        <Form.Control style={{ width: '100%', height: '100%', borderBottom: "1px solid #d8d8d8" }} type="text" name='adddpndnAlwnc' aria-describedby="btnGroupAddon" value={ addData.adddpndnAlwnc }onChange={onChangeAddData} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>차량유지비</td>
                                    <td >
                                        <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='addcarPay' aria-describedby="btnGroupAddon" value={ addData.addcarPay }onChange={onChangeAddData} />
                                    </td>
                                    <td style={{  border: "1px solid #d8d8d8",color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}></td>
                                    <td style={{  border: "1px solid #d8d8d8",color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}></td>
                                    

                                </tr>
                       </Table>


            

                       <Table style={{border:"1px solid #d8d8d8",textAlign:'center'}} >
                            <tr>
                                <td rowSpan='4' style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor:'#f7f7f7'}}>급여통장</td>
                                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor:'#f7f7f7'}}>은행</td>
                                <td> 
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='addbankName' aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                </td>
                            </tr>
                            <tr>
                                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor:'#f7f7f7'}}>계좌번호</td>
                                <td>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='addbankNum' aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                </td>
                            </tr>
                            <tr>
                                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor:'#f7f7f7'}}>예금주</td>
                                <td>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='addbankOwner' aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                </td>
                            </tr>
                            <tr>
                                <td style={{border:"1px solid #d8d8d8",color:'#777777',fontSize:'15px',backgroundColor:'#f7f7f7'}}>연봉</td>
                                <td>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='addempPay' aria-describedby="btnGroupAddon" onChange={onChangeAddData}/>
                                </td>
                            </tr>
                       </Table>

                    </TabPanel>
                    
                    </Box>



                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={handleClose}>
                        <strong>취소</strong>
                    </Button>
                    <button className="addButton" onClick={pushAddData}>
                        <strong>추가</strong>
                    </button>
                </Modal.Footer>
            </Modal>

            {/* 수정 */}
            <Modal
                centered
                size="lg"
                show={ModifyShow} onHide={MdClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>사원정보</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '', }}>






                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={HC} aria-label="basic tabs example">
                                <Tab label="사원정보" {...a11yProps(0)} />
                                <Tab label="급여지급사항" {...a11yProps(1)} />

                            </Tabs>
                        </Box>

                        {/* 사원정보 탭 */}
                        <TabPanel value={value} index={0} style={{ backgroundColor: '', }}>


                            <Container >
                                <Table style={{ border: "1px solid #d8d8d8", textAlign: 'center' }}>
                                    <tr>
                                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7', fontSize: '15px' }}>사원명</td>
                                        <td colSpan='3' style={{ width: '50px' }}>
                                            <Form.Control style={{ width: '100%', height: '100%', fontSize: '15px' }} type="text" name='modifyempName' value={modifyData.modifyempName} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} />
                                        </td>
                                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7', width: '140px', fontSize: '15px' }}>사원번호</td>
                                        <td style={{ width: '200px' }}>
                                            <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='modifyempNum'  value={modifyData.modifyempNum} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7', width: '140px', fontSize: '15px' }}>주민등록번호</td>
                                        <td>
                                            <Form.Control style={{ width: '100%', height: '100%', fontSize: '15px' }} type="text" name='modifyempFirstSSN' value={modifyData.modifyempFirstSSN} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} />
                                        </td>
                                        <td>
                                            -
                                        </td>
                                        <td>
                                            <Form.Control style={{ width: '100%', height: '100%', fontSize: '15px' }} type="password" name='modifyempSecondSSN' value={modifyData.modifyempSecondSSN} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} />
                                        </td>

                                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7', fontSize: '15px' }}>전화번호</td>
                                        <td>
                                            <Form.Control style={{ width: '100%', height: '100%', fontSize: '15px' }} type="text" name='modifyempPhone' value={modifyData.modifyempPhone} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} />
                                        </td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7', fontSize: '15px' }}>이메일</td>
                                        <td colSpan='3' style={{ border: "1px solid #d8d8d8" }}>
                                            <Form.Control style={{ width: '100%', height: '100%', fontSize: '15px' }} type="text" name='modifyempEmail' value={modifyData.modifyempEmail} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} />
                                        </td>
                                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7', fontSize: '15px' }}>부양 가족수</td>
                                        <td style={{ border: "1px solid #d8d8d8" }}>
                                            <Form.Control style={{ width: '100%', height: '100%', fontSize: '15px' }} type="text" name='modifyempFamilyNum'value={modifyData.modifyempFamilyNum} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} />
                                        </td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7', fontSize: '15px' }}> 주소</td>
                                        <td colSpan='5' style={{ border: "1px solid #d8d8d8" }}>
                                            

                                                <Form.Control
                                                    type="text"
                                                    name='modifyempAddress'
                                                    value={modifyData.modifyempAddress}
                                                    aria-describedby="btnGroupAddon"
                                                    style={{ width: '100%', height: '100%', fontSize: '15px' }}
                                                    onChange={onChangeModifyData}
                                                />
                                        </td>


                                    </tr>
                                </Table>











                                <Table style={{ border: "1px solid #d8d8d8", textAlign: 'center' }}>
                                    <tr style={{ border: "1px solid #d8d8d8" }}>
                                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7', fontSize: '15px', width: '90px' }}>부서코드</td>
                                        <td colSpan='5'>
                                            <InputGroup style={{ width: '100%' }}>

                                                <Form.Control
                                                    type="text"
                                                    name='modifydepCode'
                                                    value={modifyData.modifydepCode}
                                                    aria-describedby="btnGroupAddon"
                                                    style={{ height: '30px' }}
                                                    onChange={onChangeModifyData}
                                                />
                                                <InputGroup.Text id="btnGroupAddon" onClick={Shshow} style={{ width: '40px', height: '30px' }}> <SearchIcon /></InputGroup.Text>
                                            </InputGroup>
                                        </td>
                                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7', fontSize: '15px', width: '90px' }}> 부서명</td>
                                        <td colSpan='5'>
                                            <Form.Control style={{ width: '100%', height: '45px' }} type="text" name='modifydepName' value={modifyData.modifydepName} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} />
                                        </td>

                                    </tr>
                                    <tr style={{ border: "1px solid #d8d8d8" }}>
                                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7', fontSize: '15px', height: '40px' }}>입사일</td>
                                     
                                        <td>  <Form.Control style={{ width: '60px', height: '100%' }} type="text" name='modifyempStartYear' value={modifyData.modifyempStartYear} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} /></td>
                                        <td>/</td>
                                        <td><Form.Control style={{ width: '60px', height: '100%' }} type="text" name='modifyempStartMonth' value={modifyData.modifyempStartMonth} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/></td>
                                        <td>/</td>
                                        <td> <Form.Control style={{ width: '60px', height: '100%' }} type="text" name='modifyempStartDay' value={modifyData.modifyempStartDay} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} /></td>
                                        

                                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7', fontSize: '15px' }}>직위/직급</td>
                                        <td colSpan='5'>
                                            <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='modifyempRank' value={modifyData.modifyempRank} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} />
                                        </td>

                                    </tr>
                                    <tr style={{ border: "1px solid #d8d8d8" }}>
                                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7', fontSize: '15px', height: '40px' }}>퇴사일</td>
                                  
                                        <td> <Form.Control style={{ width: '60px', height: '100%' }} type="text" name='modifyempEndYear' value={modifyData.modifyempEndYear} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} /></td>
                                        <td>/</td>
                                        <td>  <Form.Control style={{ width: '60px', height: '100%' }} type="text" name='modifyempEndMonth' value={modifyData.modifyempEndMonth} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} /></td>
                                        <td>/</td>
                                        <td> <Form.Control style={{ width: '60px', height: '100%' }} type="text" name='modifyempEndDay' value={modifyData.modifyempEndDay} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} /></td>

                                        
                                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7', fontSize: '15px' }}>휴가</td>          
                                        <td>
                                            <Form.Control style={{ width: '100px', height: '30px', height: '100%' }} type="text" name='modifytotalVacation' value={modifyData.modifytotalVacation} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} />
                                        </td>
                                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7', fontSize: '15px', width: '100px' }}>잔여휴가</td>
                                        <td>
                                            <Form.Control style={{ width: '100px', height: '30px', height: '100%' }} type="text" name='modifyremindVacation' value={modifyData.modifyremindVacation}aria-describedby="btnGroupAddon" />
                                        </td>
                                    </tr>

                                    <tr style={{ border: "1px solid #d8d8d8" }}>
                                      
                                 
                                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px', backgroundColor: '#f7f7f7', fontSize: '15px' }}>퇴사사유</td>
                                        <td colSpan='9'>
                                            <Form.Control style={{ width: '100%', height: '30px', height: '100%' }} type="text" name='modifyempEndReason' value={modifyData.modifyempEndReason} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} />
                                        </td>
                                    </tr>

                                </Table>



                            </Container>

                        </TabPanel>



                        {/* 급여지급 사항 탭 */}
                        <TabPanel value={value} index={1} >
                            <Table style={{ border: "1px solid #d8d8d8", textAlign: 'center' }}>

                                <tr>                                                                           
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>출산보육수당</td>
                                    <td colSpan='3'>
                                        <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='modifychildPay' aria-describedby="btnGroupAddon" onChange={onChangeModifyData} value = { modifyData.modifychildPay }/>
                                    </td>
                                </tr>
                                <tr style={{ borderBottom: "1px solid #d8d8d8" }}>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>식대</td>
                                    <td>
                                        <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='modifymealPay' aria-describedby="btnGroupAddon" onChange={onChangeModifyData} value = { modifyData.modifymealPay }/>
                                    </td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>부양가족수당</td>
                                    <td>
                                        <Form.Control style={{ width: '100%', height: '100%', borderBottom: "1px solid #d8d8d8" }} type="text" name='modifydpndnAlwnc' aria-describedby="btnGroupAddon" onChange={onChangeModifyData} value = { modifyData.modifydpndnAlwnc }/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>차량유지비</td>
                                    <td >
                                        <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='modifycarPay' aria-describedby="btnGroupAddon" onChange={onChangeModifyData} value = { modifyData.modifycarPay }/>
                                    </td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}></td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}></td>


                                </tr>
                            </Table>




                            <Table style={{ border: "1px solid #d8d8d8", textAlign: 'center' }} >
                                <tr>
                                    <td rowSpan='4' style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>금여통장,</td>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>은행</td>
                                    <td>
                                        <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='modifybankName' value={modifyData.modifybankName} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>계좌번호</td>
                                    <td>
                                        <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='modifybankNum' value={modifyData.modifybankNum} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>예금주</td>
                                    <td>
                                        <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='modifybankOwner' value={modifyData.modifybankOwner} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '15px', backgroundColor: '#f7f7f7' }}>연봉</td>
                                    <td>
                                        <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='modifyempPay' value={modifyData.modifyempPay} aria-describedby="btnGroupAddon" onChange={onChangeModifyData} />
                                    </td>
                                </tr>
                            </Table>

                        </TabPanel>

                    </Box>



                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={MdClose}>
                        <strong>취소</strong>
                    </Button>
                    <button className="addButton" onClick={DeShow}>
                        <strong>삭제</strong>
                    </button>
                    <button className="addButton" onClick={pushModifyData}>
                        <strong>수정</strong>
                    </button>
                </Modal.Footer>
            </Modal>

            {/* 부서 코드 둗보기 모달 */}
            <Modal 
                size="lg"
                centered
                show={SH} onHide={ShClose}>
                <Modal.Header closeButton  style={{backgroundColor:'#005b9e',}}>
                <Modal.Title  style={{color:'#ffffff'}}> <strong>부서선택</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body > 

         
                <Table 
                         hover
                        style={{
                        textAlign:"center",
                        width:"100%", border:"1px solid #d8d8d8" ,}} >
                    <tr style={{border:"1px solid #d8d8d8",backgroundColor:'#f7f7f7' ,fontSize:'15px'}}>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'15px',color:'#777777'}}><strong></strong></td>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'15px',color:'#777777'}}><strong>부서코드</strong></td>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'15px',color:'#777777'}}><strong>부서명</strong></td>
                    <td style={{fontSize:'15px',color:'#777777'}}> <strong> 부서상세</strong></td>
                    </tr>



                    {
                        Right && Right.map((e, idx) =>
                        <tr style={{border:"1px solid #d8d8d8"}}>
                        <td style={{border:"1px solid #d8d8d8",fontSize:'15px'}}>{idx+1}</td>
                        <td style={{border:"1px solid #d8d8d8",fontSize:'15px'}}>{e.depCode}</td>
                        <Button  name={e.depCode} style={{fontSize:'15px'}} onClick={()=>ShBtn(e)}variant="link"><strong>{e.depName}</strong></Button>
                        <td style={{border:"1px solid #d8d8d8",fontSize:'15px'}}>{e.depDetail}</td>
                        </tr>
                        
                        )
                    }
          
                </Table>
                </Modal.Body>
                </Modal>
  

            {/* 삭제 확인창 */}
            <Modal
                centered
                size="xsm"
                show={DelShow} onHide={DelClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', width: '500px' }}>
                    <Modal.Title style={{ color: '#ffffff', width: '500px' }}><strong>삭제확인</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#d8d8d8', width: '500px', }}>
                    <strong>{modifyData.modifyempName}의 정보를 삭제하시겠습니까?</strong></Modal.Body>
                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={DelClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={pushDeleteData}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>



            {/* 탭 모달 */}
            <Modal
                centered
                size="lg"
                show={Tabes} onHide={TabClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e' }}>
                    <Modal.Title style={{ color: '#ffffff',}}><strong>삭제확인</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#d8d8d8' }}>
                    <div>



                    <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={HC} aria-label="basic tabs example">
                        <Tab label="Item One" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                    
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                            <Grid container>
                                <Grid>asd</Grid>
                                <Grid>asd</Grid>
                            </Grid>
                    
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    
                    </Box>






                   
                     </div>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={TabClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={pushDeleteData}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default PMAcom;