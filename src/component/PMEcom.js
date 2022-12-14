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
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PMTabs from './PMTabs';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';









const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

  

export default function PMEcom(props) {

    const [TA, setTA] = useState(false);


    const TaClose = () => setTA(false);
    const Tashow = () => setTA(true);
   

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [addCheck , setAddCheck] = useState(false);
    const [modifyCheck , setModifyCheck] = useState(false);
    const [data, setData] = useState(); //?????? ????????? ???????????? ??????
    const [addData, setAddData] = useState({
            addempCode: null,//sessionStrage???
            addempName: null,//?????????
            addempNum: null,//????????????
            addempFirstSSN : null,  //?????????????????? ?????????
            addempSecondSSN : null, //?????????????????? ?????????
            addempPhone: null,//????????????
            addempEmail : null,//?????????
            addempFamilyNum: null,//???????????????
            addempAddress : null,//??????
            adddepCode: null,//????????????
            adddepName : null,//?????????
            addempRank: null,//??????/??????
            addempStartYear : null,//????????? ???
            addempStartMonth : null,//????????? ??? ???
            addempStartDay : null,//????????? ???
            addtotalVacation: null,//??????
            addempEndYear: null,//?????????
            addempEndMonth: null,//?????????
            addempEndDay: null,//?????????
            addempEndReason : null,//????????????
            addbankName: null,//??????
            addbankNum : null,//????????????
            addbankOwner: null,//?????????
            addempPay : null,//??????
    });
    const [modifyData, setModifyData] = useState({
            modifyempId : null, //PRIMARY KEY
            modifyempName: null,//?????????
            modifyempNum: null,//????????????
            modifyempFirstSSN : null,  //?????????????????? ?????????
            modifyempSecondSSN : null, //?????????????????? ?????????
            modifyempPhone: null,//????????????
            modifyempEmail : null,//?????????
            modifyempFamilyNum: null,//???????????????
            modifyempAddress : null,//??????
            modifydepCode: null,//????????????
            modifydepName : null,//?????????
            modifyempRank: null,//??????/??????
            modifyempStartYear : null,//????????? ???
            modifyempStartMonth : null,//????????? ??? ???
            modifyempStartDay : null,//????????? ???
            modifytotalVacation: null,//??????
            modifyempEndYear: null,//?????????
            modifyempEndMonth: null,//?????????
            modifyempEndDay: null,//?????????
            modifyempEndReason : null,//????????????
            modifybankName: null,//??????
            modifybankNum : null,//????????????
            modifybankOwner: null,//?????????
            modifyempPay : null,//??????
            modifyremindVacation : null
    });

   
    //alert ???
    const [messageApi, contextHolder] = message.useMessage();
    
    //?????? alert
    const success = (contentText) => {  
        messageApi.open({
            type: 'success',
            content: contentText,
        });
    };
    //?????? alert
    const error = (contentText) => {    
        messageApi.open({
            type: 'error',
            content: contentText,
        });
    };
    //?????? alert
    const warning = (contentText) => {
        messageApi.open({
            type: 'warning',
            content: contentText,
        });
    };

    //?????? ????????? ???????????? useEffect
    useEffect(() => {
        getData();
    }, []);

    //useEffect?????? ???????????? ?????? ( axios )
    const getData = () => {
        axios.post('http://192.168.2.82:5000/readEmp', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response){
            setData(response.data); 
        }).catch(function (er) {
            console.log("readUser error", er);
            let contentText = "???????????? ??????????????? ????????? ??????????????? ????????????????????????";
            error(contentText);
        });
    }

    //??????

    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        setAddData({
            ...addData,
            [name]: value
        })
    }

    const pushAddData = () => {
            axios.post('http://192.168.2.82:5000/createEmp', {
                compCode:sessionStorage.getItem("uid"),//sessionStrage???
                empName:addData.addempName,//?????????
                empNum:addData.addempNum,//????????????
                empFirstSSN :addData.addempFirstSSN,//?????????????????? ?????????
                empSecondSSN : addData.addempSecondSSN,
                empPhone:addData.addempPhone,//????????????
                empEmail : addData.addempEmail,//?????????
                empFamilyNum: addData.addempFamilyNum,//???????????????
                empAddress : addData.addempAddress,//??????
                depCode: addData.adddepCode,//????????????
                depName : addData.adddepName,//?????????
                empRank: addData.addempRank,//??????/??????
                empStart :addData.addempStart,//????????? 
                empStartYear : addData.addempStartYear,//????????? 
                empStartMonth : addData.addempStartMonth,//????????? 
                empStartDay : addData.addempStartDay,//?????????
                totalVacation:addData.addtotalVacation,//??????
                empEndYear:addData.addempEndYear,//?????????
                empEndMonth : addData.addempEndMonth,//?????????
                empEndDay : addData.addempEndDay,//?????????
                empEndReason :addData.addempEndReason,//????????????
                bankName:addData.addbankName,//??????
                bankNum :addData.addbankNum,//????????????
                bankOwner: addData.addbankOwner,//?????????
                empPay : addData.addempPay//??????
            }).then(function (response) {
                if (response.data) {
                    let contentText = "        ?????? ?????? ??????        ";
                    getData();
                    success(contentText);
                    handleClose();
                }
                if(!response.data){
                    let contentText = " ?????? ?????? ?????? ?????? ??????????????????";
                    warning(contentText);
                    
                }
            }).catch(function (er) {
                console.log("createEmp error", er);
                let contentText = "?????? ?????? ?????? ??????";
                error(contentText);
            });
            
        }


    //??????
    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
        })
    }

    //?????? ??????
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);
    const [SH, setSh] = useState(false);


    // ??? ?????? ??????
    const [Tabs, setTabs] = useState(false);

    const TabClose = ()=> setTabs(false);
    const TabShow = () => setTabs(true);



    const handleClose = () => {
        setShow(false);
        setAddData({
            "addempCode": null,//sessionStrage???
            "addempName": null,//?????????
            "addempNum": null,//????????????
            "addempFirstSSN": null,  //?????????????????? ?????????
            "addempSecondSSN": null, //?????????????????? ?????????
            "addempPhone": null,//????????????
            "addempEmail": null,//?????????
            "addempFamilyNum": null,//???????????????
            "addempAddress": null,//??????
            "adddepCode": null,//????????????
            "adddepName": null,//?????????
            "addempRank": null,//??????/??????
            "addempStartYear": null,//????????? ???
            "addempStartMonth": null,//????????? ??? ???
            "addempStartDay": null,//????????? ???
            "addtotalVacation": null,//??????
            "addempEndYear": null,//?????????
            "addempEndMonth": null,//?????????
            "addempEndDay": null,//?????????
            "addempEndReason": null,//????????????
            "addbankName": null,//??????
            "addbankNum": null,//????????????
            "addbankOwner": null,//?????????
            "addempPay": null,//??????
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
            "modifyempName": null,//?????????
            "modifyempNum": null,//????????????
            "modifyempFirstSSN": null,  //?????????????????? ?????????
            "modifyempSecondSSN": null, //?????????????????? ?????????
            "modifyempPhone": null,//????????????
            "modifyempEmail": null,//?????????
            "modifyempFamilyNum": null,//???????????????
            "modifyempAddress": null,//??????
            "modifydepCode": null,//????????????
            "modifydepName": null,//?????????
            "modifyempRank": null,//??????/??????
            "modifyempStartYear": null,//????????? ???
            "modifyempStartMonth": null,//????????? ??? ???
            "modifyempStartDay": null,//????????? ???
            "modifytotalVacation": null,//??????
            "modifyempEndYear": null,//?????????
            "modifyempEndMonth": null,//?????????
            "modifyempEndDay": null,//?????????
            "modifyempEndReason": null,//????????????
            "modifybankName": null,//??????
            "modifybankNum": null,//????????????
            "modifybankOwner": null,//?????????
            "modifyempPay": null,//??????
            "modifyremindVacation" : null
        });
        setModifyCheck(false);
    }

    //-----------------------------------------------------
    const MdShow = (e) => {
        axios.post('http://192.168.2.82:5000/updateEmpModal',{
            empId : e.empId
        }).then(function (response){
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
                "modifyempName": response.data[0].empName,//?????????
                "modifyempNum": response.data[0].empNum,//????????????
                "modifyempFirstSSN": empFirstSSN,  //?????????????????? ?????????
                "modifyempSecondSSN": empSecondSSN, //?????????????????? ?????????
                "modifyempPhone": response.data[0].empPhone,//????????????
                "modifyempEmail": response.data[0].empEmail,//?????????
                "modifyempFamilyNum": response.data[0].empFamilyNum,//???????????????
                "modifyempAddress": response.data[0].empAddress,//??????
                "modifydepCode": response.data[0].depCode,//????????????
                "modifydepName": response.data[0].depName,//?????????
                "modifyempRank": response.data[0].empRank,//??????/??????
                "modifyempStartYear": empStartYear,//????????? ???
                "modifyempStartMonth": empStartMonth,//????????? ??? ???
                "modifyempStartDay": empStartDay,//????????? ???
                "modifytotalVacation": response.data[0].totalVacation,//??????
                "modifyempEndYear": empEndYear,//?????????
                "modifyempEndMonth": empEndMonth,//?????????
                "modifyempEndDay": empEndDay,//?????????
                "modifyempEndReason": response.data[0].empEndReason,//????????????
                "modifybankName": response.data[0].bankName,//??????
                "modifybankNum": response.data[0].bankNum,//????????????
                "modifybankOwner": response.data[0].bankOwner,//?????????
                "modifyempPay": response.data[0].empPay,//??????
                "modifyremindVacation" : response.data[0].remindVacation
            });
        }).catch(function (er){
            console.log("updataEmpModal error" , er);
            let contentText = "???????????? ??????????????? ??????????????? ?????? ??????????????????";
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
            let contentText = "?????? ????????? ??????????????? ????????? ??????????????????";
            error(contentText);
        });
        
        setSh(true);
    };

    const pushModifyData = ()=>{
        axios.post('http://192.168.2.82:5000/updateEmp', {
            empId : modifyData.modifyempId,
            empName: modifyData.modifyempName,//?????????
            empNum: modifyData.modifyempNum,//????????????
            empFirstSSN: modifyData.modifyempFirstSSN,  //?????????????????? ?????????
            empSecondSSN: modifyData.modifyempSecondSSN, //?????????????????? ?????????
            empPhone: modifyData.modifyempPhone,//????????????
            empEmail: modifyData.modifyempEmail,//?????????
            empFamilyNum: modifyData.modifyempFamilyNum,//???????????????
            empAddress: modifyData.modifyempAddress,//??????
            depCode: modifyData.modifydepCode,//????????????
            depName: modifyData.modifydepName,//?????????
            empRank: modifyData.modifyempRank,//??????/??????
            empStartYear: modifyData.modifyempStartYear,//????????? ???
            empStartMonth: modifyData.modifyempStartMonth,//????????? ??? ???
            empStartDay: modifyData.modifyempStartDay,//????????? ???
            totalVacation: modifyData.modifytotalVacation,//??????
            empEndYear: modifyData.modifyempEndYear,//?????????
            empEndMonth: modifyData.modifyempEndMonth,//?????????
            empEndDay: modifyData.modifyempEndDay,//?????????
            empEndReason: modifyData.modifyempEndReason,//????????????
            bankName: modifyData.modifybankName,//??????
            bankNum: modifyData.modifybankNum,//????????????
            bankOwner: modifyData.modifybankOwner,//?????????
            empPay: modifyData.modifyempPay//??????
        }).then(function (response) {
            if(response.data){
                getData();
                MdClose();
                let contentText = "        ?????? ??????        ";
                success(contentText);
            }
            if(!response.data){
                let contentText = "        ?????? ??????        ";
                warning(contentText);

            }
        }).catch(function(er){
            let contentText = "        ?????? ??????        ";
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
                let contentText = "?????? ??????";
                success(contentText);

            }
        }).catch(function(er){
            console.log("deleteEmp error" , er);
            let contentText = " ?????? ?????? ";
            error(contentText);
        })
    }

    

    //?????? ?????? ?????? ??????
  









    return (
        <div style={{ width: '1400px', position: 'relative' }}>
               {contextHolder}
        <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong>?????? ?????? </strong></h2>
        <div>
            <button  style={{position:'absolute' ,right:"0px", }}onClick={handleShow} className="Atmp1">  <strong>??????</strong></button>
            {/* <button  style={{position:'absolute' ,left:"500px", }}onClick={TabShow} className="Atmp1">  <strong>??????</strong></button> */}


        </div>
            
        <br />
        <br />
        <br />

            
        <Table  hover>
                <thead style={{height:'60px'}}>
                <tr  style={{backgroundColor:'#f7f7f7' ,  }}>
                <td style={{ border: "1px solid #d8d8d8" ,color:'#777777',fontSize:'22px'}}>
                    <strong>????????????</strong>
                </td>
                <td style={{ border: "1px solid #d8d8d8" ,color:'#777777',fontSize:'22px'}}>
                    <strong>????????????</strong>
                </td>
                <td style={{ border: "1px solid #d8d8d8",color:'#777777',fontSize:'22px' }}>
                    <strong>?????????</strong>
                </td>
                <td style={{ border: "1px solid #d8d8d8" ,color:'#777777',fontSize:'22px'}}>
                    <strong>?????????</strong>
                </td>
                <td style={{ border: "1px solid #d8d8d8" ,color:'#777777',fontSize:'22px'}}>
                    <strong>??????/??????</strong>
                </td>
                <td style={{ border: "1px solid #d8d8d8" ,color:'#777777',fontSize:'22px'}}>
                    <strong>??????</strong>
                </td>
                <td style={{ border: "1px solid #d8d8d8",color:'#777777',fontSize:'22px' }}>
                    <strong>????????????</strong>
                </td>
                <td style={{ border: "1px solid #d8d8d8" ,color:'#777777',fontSize:'22px'}}>
                    <strong>Email</strong>
                </td>
            </tr>
                </thead>
                <tbody>
         
                {
                data && data.map((e, idx) =>
                    <tr >
                        <td style={{border:"1px solid #d8d8d8", color:'#000',fontSize:'22px'}}>{e.empStart}</td>
                        <td style={{border:"1px solid #d8d8d8", color:'#000',fontSize:'22px'}}>{e.empNum}</td>
                        <td style={{border:"1px solid #d8d8d8", color:'#000',fontSize:'22px'}}><Button  name={e.empId} onClick={()=>MdShow(e)}variant="link"><strong>{e.empName}</strong></Button></td>
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


  




            {/* ?????? */}
            <Modal
                centered
                size="lg"


                show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong> ?????? ??????</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f3f3f3', }}>


      

                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={handleClose}>
                        <strong>??????</strong>
                    </Button>
                    <button className="addButton" onClick={pushAddData}>
                        <strong>??????</strong>
                    </button>
                </Modal.Footer>
            </Modal>

            {/* ?????? */}
            <Modal
                centered
                size="lg"
                show={ModifyShow} onHide={MdClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>????????????</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f3f3f3', }}>

      


               

                    <Container>
                        <Grid container spacing={4}>
                            <Grid item xs={6} md={2} ml={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>?????????</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={2} >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='modifyempName' value={modifyData.modifyempName} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>

                            <Grid item xs={6} md={2} ml={-1} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>?????? ??????</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={0}>
                                {/* outline:'1px solid #777777'/ */}
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='modifyempNum'  value={modifyData.modifyempNum} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>

                            <Grid item xs={6} md={3} ml={-2} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>??????????????????</strong>
                            </Grid>
                            <Grid item xs={6} md={3} ml={-5.5} mt={-2} >
                                <Form.Control style={{ width: '100px', height: '30px' }} type="text" name='modifyempFirstSSN' value={modifyData.modifyempFirstSSN} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>

                            <Grid item xs={6} md={3} ml={-10} mt={-1.8} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>???</strong>
                            </Grid>
                            <Grid item xs={6} md={3} ml={-20.5} mt={-2} >
                                <Form.Control style={{ width: '100px', height: '30px' }} type="password" name='modifyempSecondSSN' value={modifyData.modifyempSecondSSN} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>



                            <Grid item xs={6} md={2} ml={-10} mt={-1.5} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>?????? ??????</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={0} mt={-2} >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='modifyempPhone' value={modifyData.modifyempPhone} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>




                            <Grid item xs={6} md={3} ml={-2} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>?????????</strong>
                            </Grid>
                            <Grid item xs={6} md={3} ml={-5.5} mt={-2} >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='modifyempEmail' value={modifyData.modifyempEmail} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>

                            <Grid item xs={6} md={2} ml={6.5} mt={-1.5} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>?????? ?????? ???</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={0} mt={-2} >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='modifyempFamilyNum'value={modifyData.modifyempFamilyNum} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>

                            <Grid item xs={10} md={5} mt={-1.5} ml={-2} style={{ fontSize: '15px', color: '#777777' }} >
                                <strong>??????</strong>
                            </Grid>

                            <Grid item xs={6} md={7} ml={-21} mt={-2}  >



                                <InputGroup style={{ width: '600px', height: '30px' }}>

                                    <Form.Control
                                        type="text"
                                        name='modifyempAddress'
                                        value={modifyData.modifyempAddress}
                                        aria-describedby="btnGroupAddon"
                                        style={{ height: '30px' }}
                                        onChange={onChangeModifyData}
                                    />
                                    <InputGroup.Text id="btnGroupAddon" onClick={Shshow} style={{ width: '40px', height: '30px' }}> <SearchIcon /></InputGroup.Text>
                                </InputGroup>
                            </Grid>


                            <Grid item xs={12} ml={-5} mt={-2}>
                                <hr style={{ width: '800px' }} />
                            </Grid>


                            <Grid item xs={6} md={4} mt={-1} ml={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>????????????</strong>
                            </Grid>
                            <Grid item xs={6} md={4} mt={-2} ml={-13.5} >


                                <InputGroup style={{ width: '230px', height: '30px' }}>

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


                            </Grid>
                            <Grid item xs={6} md={2} ml={-1} mt={-1} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>?????????</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={0} mt={-2}  >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='modifydepName' value={modifyData.modifydepName} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>


                            <Grid item xs={6} md={4} mt={-1} ml={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>????????????</strong>
                            </Grid>
                            <Grid item xs={6} md={4} mt={-2} ml={-13.5} >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='sdasdsa' aria-describedby="btnGroupAddon" />
                            </Grid>

                            <Grid item xs={6} md={2} ml={-1} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>??????/??????</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={0} mt={-2}  >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='modifyempRank' value={modifyData.modifyempRank} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>



                            <Grid item xs={2} md={2} ml={-2} mt={-1.5} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>?????????</strong>
                            </Grid>
                            <Grid item xs={2} md={1} mt={-2} ml={2}>
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='modifyempStartYear' value={modifyData.modifyempStartYear} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>

                            <Grid item xs={2} md={1} ml={1} mt={-1.8} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>/</strong>
                            </Grid>

                            <Grid item xs={2} md={1} ml={-6} mt={-2} >
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='modifyempStartMonth' value={modifyData.modifyempStartMonth} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>
                            <Grid item xs={2} md={1} ml={1} mt={-1.8} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>/</strong>
                            </Grid>
                            <Grid item xs={2} md={1} ml={-6} mt={-2} >
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='modifyempStartDay' value={modifyData.modifyempStartDay} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>





                            <Grid item xs={6} md={2} ml={1} mt={-1.5} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>??????</strong>
                            </Grid>
                            <Grid item xs={6} md={2} ml={-10} mt={-2}  >
                                <Form.Control style={{ width: '100px', height: '30px' }} type="text" name='modifytotalVacation' value={modifyData.modifytotalVacation} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>

                            <Grid item xs={6} md={2} ml={-1} mt={-1.5} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>?????? ??????</strong>
                            </Grid>
                            <Grid item xs={6} md={1} ml={-4} mt={-2} >
                                <Form.Control style={{ width: '100px', height: '30px' }} type="text" name='modifyremindVacation' value={modifyData.modifyremindVacation}aria-describedby="btnGroupAddon" />
                            </Grid >


                            <Grid item xs={2} md={2} ml={-2} mt={-1.5} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>?????????</strong>
                            </Grid>
                            <Grid item xs={2} md={1} mt={-2} ml={2}>
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='modifyempEndYear' value={modifyData.modifyempEndYear} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>

                            <Grid item xs={2} md={1} ml={1} mt={-1.8} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>/</strong>
                            </Grid>

                            <Grid item xs={2} md={1} ml={-6} mt={-2} >
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='modifyempEndMonth' value={modifyData.modifyempEndMonth} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>
                            <Grid item xs={2} md={1} ml={1} mt={-1.8} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>/</strong>
                            </Grid>
                            <Grid item xs={2} md={1} ml={-6} mt={-2} >
                                <Form.Control style={{ width: '60px', height: '30px' }} type="text" name='modifyempEndDay' value={modifyData.modifyempEndDay} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>

                            <Grid item xs={6} md={2} ml={1} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong>?????? ??????</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={0} mt={-2}  >
                                <Form.Control style={{ width: '230px', height: '30px' }} type="text" name='modifyempEndReason' value={modifyData.modifyempEndReason} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>

                            <Grid item xs={12} ml={-5} mt={-4}>
                                <hr style={{ width: '800px' }} />
                            </Grid>

                            <Grid item xs={6} md={6} ml={16} mt={-3} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong> ??????</strong>
                            </Grid>

                            <Grid item xs={6} md={6} ml={-32} mt={-4}  >

                                <Form.Control style={{ width: '280px', height: '30px' }} type="text" name='modifybankName' value={modifyData.modifybankName} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>



                            <Grid item xs={6} md={4} ml={-2} mt={2} style={{ fontSize: '15px', color: '#777777' }}>
                                <div ><strong> ?????? ??????</strong></div>
                            </Grid>


                            <Grid item xs={6} md={4} ml={-13.5} mt={-2} style={{ fontSize: '15px', color: '#777777' }}>
                                <strong> ?????? ??????</strong>
                            </Grid>
                            <Grid item xs={6} md={4} ml={-16} mt={-2} >
                                <Form.Control style={{ width: '280px', height: '30px' }} type="text" name='modifybankNum' value={modifyData.modifybankNum} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>


                            <Grid item xs={6} md={6} ml={16} mt={-5} style={{ fontSize: '15px', color: '#777777' }} >
                                <strong>?????????</strong>
                            </Grid>
                            <Grid item xs={6} md={6} ml={-31.5} mt={-5}  >
                                <Form.Control style={{ width: '280px', height: '30px' }} type="text" name='modifybankOwner' value={modifyData.modifybankOwner} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>

                            <Grid item xs={6} md={6} ml={16} mt={-2} style={{ fontSize: '15px', color: '#777777' }} >
                                <strong>??????</strong>
                            </Grid>

                            <Grid item xs={6} md={6} ml={-31.5} mt={-2}  >
                                <Form.Control style={{ width: '280px', height: '30px' }} type="text" name='modifyempPay' value={modifyData.modifyempPay} aria-describedby="btnGroupAddon" onChange={onChangeModifyData}/>
                            </Grid>

                        </Grid>
                    </Container>


                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={MdClose}>
                        <strong>??????</strong>
                    </Button>
                    <button className="addButton" onClick={DeShow}>
                        <strong>??????</strong>
                    </button>
                    <button className="addButton" onClick={pushModifyData}>
                        <strong>??????</strong>
                    </button>
                </Modal.Footer>
            </Modal>

            {/* ?????? ?????? ????????? ?????? */}
            <Modal 
                size="lg"
                centered
                show={SH} onHide={ShClose}>
                <Modal.Header closeButton  style={{backgroundColor:'#005b9e',}}>
                <Modal.Title  style={{color:'#ffffff'}}> <strong>????????????</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body > 

         
                <Table 
                         hover
                        style={{
                        textAlign:"center",
                        width:"100%", border:"1px solid #d8d8d8" ,}} >
                    <tr style={{border:"1px solid #d8d8d8",backgroundColor:'#f7f7f7' ,fontSize:'15px'}}>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'15px',color:'#777777'}}><strong></strong></td>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'15px',color:'#777777'}}><strong>????????????</strong></td>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'15px',color:'#777777'}}><strong>?????????</strong></td>
                    <td style={{fontSize:'15px',color:'#777777'}}> <strong> ????????????</strong></td>
                    </tr>



                    {
                        Right && Right.map((e, idx) =>
                        <tr style={{border:"1px solid #d8d8d8"}}>
                        <td style={{border:"1px solid #d8d8d8",fontSize:'15px'}}>{idx+1}</td>
                        <td style={{border:"1px solid #d8d8d8",fontSize:'15px'}}>{e.depCode}</td>
                        <Button  name={e.depCode} onClick={()=>ShBtn(e)}variant="link"><strong>{e.depName}</strong></Button>
                        <td style={{border:"1px solid #d8d8d8",fontSize:'15px'}}>{e.depDetail}</td>
                        </tr>
                        
                        )
                    }
          
                </Table>
                </Modal.Body>
                </Modal>
  

            {/* ?????? ????????? */}
            <Modal
                centered
                size="xsm"
                show={DelShow} onHide={DelClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', width: '500px' }}>
                    <Modal.Title style={{ color: '#ffffff', width: '500px' }}><strong>????????????</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#d8d8d8', width: '500px', }}>
                    <strong>{modifyData.modifyempName}??? ????????? ?????????????????????????</strong></Modal.Body>
                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={DelClose}>
                        ??????
                    </Button>
                    <button variant="primary" className='addButton' onClick={pushDeleteData}>
                        ??????
                    </button>
                </Modal.Footer>
            </Modal>



            {/* ??? ?????? */}
            <Modal
                centered
                size="lg"
                show={Tabs} onHide={TabClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', width: '500px' }}>
                    <Modal.Title style={{ color: '#ffffff', width: '500px' }}><strong>????????????</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#d8d8d8', width: '500px', }}>
                    <div>
                        <PMTabs/>
                     </div>
                </Modal.Body>
                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={TabClose}>
                        ??????
                    </Button>
                    <button variant="primary" className='addButton' onClick={pushDeleteData}>
                        ??????
                    </button>
                </Modal.Footer>
            </Modal>
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            <button onClick={TA}>asd</button>


            <Modal
                centered
                size="sm"
                show={Tashow} onHide={TaClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#2F58B8',width:'500px'}}>
                    <Modal.Title  style={{color:'#ffffff',width:'500px'}}>??????????????? ??????</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'#f1f2f6', width:'500px',}}>
                <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
     
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
                   </Modal.Body>
                <Modal.Footer style={{width:'500px',backgroundColor:'#ffffff'}}>
                    <Button variant="secondary" onClick={TaClose}>
                        ??????
                    </Button>
                    <button variant="primary" className='addButton' onClick={TaClose}>
                        ??????
                    </button>
                </Modal.Footer>
            </Modal>

     
            
        </div>
    );
}
