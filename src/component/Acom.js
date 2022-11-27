import { useState, useEffect } from "react";
import axios from "axios";

import { height } from "@mui/system";
import { Button } from "react-bootstrap";
import { UnpublishedTwoTone } from "@mui/icons-material";
import Nav from 'react-bootstrap/Nav';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { message, Space } from 'antd';
const Acom = () => {
    const [firstCheck, SetFirstCheck] = useState();    

    const [input, SetInput] = useState({
        compNum: '',    //사업자등록번호
        compName: '',   //상호
        compCEO: '',    //대표자명
        compAddress: '',//주소
        compType: '',   //업태
        compItems: '',  //종목
        compEmail: '',  //이메일
        lunchTime: '',
    });

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
    
    // 로그인했는지 검사
    useEffect(() => {
        if (sessionStorage.getItem("id") == null || sessionStorage.getItem("uid") == null) {
            window.alert("먼저 로그인을 해야합니다.");
            window.location.href = "http://localhost:3000/Login";
        }
        getData();
    }, []);

    const getData = () =>{
        axios.post('http://192.168.2.82:5000/readCompany', {
            id: sessionStorage.getItem("id")

        }).then(function (response) {
            console.log("response.data" ,response.data);
            SetInput({
                "compNum": response.data[0].compNum,    //사업자등록번호
                "compName": response.data[0].compName,   //상호
                "compCEO": response.data[0].compCEO,    //대표자명
                "compAddress": response.data[0].compAddress,//주소
                "compType": response.data[0].compType,   //업태
                "compItems": response.data[0].compItems,  //종목
                "compEmail": response.data[0].compEmail,  //이메일
                "lunchTime": response.data[0].lunchTime   //점심시간
            })
        }).catch(function (error) {
            console("readCompany error :", error);
        });

    }

    //입력값 onChange 함수
    
    const onChangeInput = (e) => {
        const { value, name } = e.target;
        SetInput({
            ...input,
            [name]: value
        });
    }

    //저장 버튼 눌렀을때 실행되는 함수
    const requestSave = () => {
        axios.post('http://192.168.2.82:5000/createCompany', {
            id : sessionStorage.getItem("uid"),
            compNum: input.compNum,
            compName: input.compName,
            compCEO: input.compCEO,
            compAddress: input.compAddress,
            compType: input.compType,
            compItems: input.compItems,
            compEmail: input.compEmail,
            lunchTime: input.lunchTime
        }).then(function (response) {
            console.log("createCompany ", response.data);
            if(response.data){
                window.alert("회사정보 저장했습니다.");
                window.location.reload();
            }else{
                let contentText = "이미 저장된 회사 정보가 있습니다. 수정을 원하시면 수정 버튼을 눌러주세요";
                warning(contentText);
            }
        }).catch(function (error) {
            console.log("updateCompany error :", error);
        });
        getData();
    }

    //수정 버튼 눌렀을때 실행되는 함수
    const requestModify = () => {
        axios.post('http://192.168.2.82:5000/updateCompany', {
            id : sessionStorage.getItem("uid"),
            compNum: input.compNum,
            compName: input.compName,
            compCEO: input.compCEO,
            compAddress: input.compAddress,
            compType: input.compType,
            compItems: input.compItems,
            compEmail: input.compEmail,
            lunchTime: input.lunchTime
        }).then(function (response) {
            if(response){
                window.alert("회사정보 수정 완료");
                window.location.reload();
            }else{
                let contentText = "회사정보 수정 실패";
                warning(contentText);
            }

        }).catch(function (error) {
            console.log("updateCompany error :", error);
        });
    }



    return (
        <div style={{width:'1300px', position:'relative' ,height:'600px', top:'50px'}}>
            {contextHolder}
           <h2  style={{color:' #005b9e' ,position:'absolute' ,left:'0' ,top:'-50px'}}><strong>회사 설정</strong></h2>
          
           <br/>

            <table style={{ width: '1080px', height: '200px', position:'absolute' ,left:'150px',}} >



                <tr>
                <td style={{textAlign:'left'}}>
                        <h6 style={{fontSize:'25px',color:'#777777'}} ><strong>사업자등록번호</strong></h6>
                    </td>
                    <td style={{textAlign:'left'}}>
                        {/* <input style={{width:'300px'}} name='compNum' type="text" onChange={onChangeInput} value={input.compNum}></input> */}
                        <Form.Control style={{width:'300px',height:'40px'}} type="text" name='compNum' aria-describedby="btnGroupAddon" onChange={onChangeInput} value={input.compNum}/>
                    </td>

                    <td style={{textAlign:'left'}}>
                        <h6 style={{fontSize:'25px',color:'#777777'}}><strong>대표자명</strong></h6>
                    </td>

                    <td >
                        <Form.Control style={{width:'300px',height:'40px'}} type="text" name='compCEO' aria-describedby="btnGroupAddon"  onChange={onChangeInput} value={input.compCEO}></Form.Control>
                    </td>
                </tr>

                <tr>
                <td style={{textAlign:'left'}}>
                        <h6 style={{fontSize:'25px',color:'#777777'}}><strong>상호</strong></h6>
                    </td>
                    <td style={{textAlign:'left'}}>
                        {/* <input style={{width:'300px'}} name='compName' type="text" onChange={onChangeInput} value={input.compName}></input> */}
                        <Form.Control style={{width:'300px',height:'40px'}} type="text" name='compName' aria-describedby="btnGroupAddon"  onChange={onChangeInput} value={input.compName}/>
                    </td>

                    <td style={{textAlign:'left'}}>
                        <h6 style={{fontSize:'25px',color:'#777777'}}><strong>업태</strong></h6>
                    </td>
                    <td >
                        {/* <input style={{width:'300px'}} name='compType' type="text" onChange={onChangeInput} value={input.compType}></input> */}
                        <Form.Control style={{width:'300px',height:'40px'}} type="text" name='compType' aria-describedby="btnGroupAddon" onChange={onChangeInput} value={input.compType}/>
                    </td>
                </tr>

                <tr>
                    <td style={{textAlign:'left'}}>
                        <h6 style={{fontSize:'25px',color:'#777777'}}><strong>종목</strong></h6>
                    </td>
                    <td style={{textAlign:'left'}}>
                        {/* <input style={{width:'300px'}} name='compItems' type="text" onChange={onChangeInput} value={input.compItems}></input> */}
                        <Form.Control style={{width:'300px',height:'40px'}} type="text" name='compItems' aria-describedby="btnGroupAddon" onChange={onChangeInput} value={input.compItems}/>
                    </td>

                    <td style={{textAlign:'left'}}>
                        <h6 style={{fontSize:'25px',color:'#777777'}}><strong>이메일</strong></h6>
                    </td>
                    <td>
                        {/* <input style={{width:'300px'}} name='compEmail' type="text" onChange={onChangeInput} value={input.compEmail}></input> */}
                        <Form.Control style={{width:'300px',height:'40px'}} type="text" name='compEmail' aria-describedby="btnGroupAddon" onChange={onChangeInput} value={input.compEmail}/>
                    </td>
                </tr>

                <tr>
                <td style={{textAlign:'left', }}>

                        <h6 style={{fontSize:'25px',color:'#777777'}} ><strong>주소</strong></h6>
                    </td>
                    <td style={{textAlign:'left'}}>
                        {/* <input style={{width:'300px' ,}} name='compAddress' type="text" onChange={onChangeInput} value={input.compAddress}></input> */}
                        <Form.Control style={{width:'300px',height:'40px'}} type="text" name='compAddress' aria-describedby="btnGroupAddon" onChange={onChangeInput} value={input.compAddress}/>

                    </td>

                    <td style={{textAlign:'left', }}>

                        <h6 style={{fontSize:'25px',color:'#777777'}} ><strong>점심시간</strong></h6>
                    </td>
                    <td style={{textAlign:'left'}}>
                        {/* <input style={{width:'300px' ,}} name='compAddress' type="text" onChange={onChangeInput} value={input.compAddress}></input> */}
                        <Form.Control style={{width:'300px',height:'40px'}} type="text" name='lunchTime' aria-describedby="btnGroupAddon" onChange={onChangeInput} value={input.lunchTime}/>

                    </td>
                </tr>
            </table>



            <div>
                <Grid item xs={12} ml={-3} mt={60}>
                    <hr style={{width:'1390px'}}/>
                    </Grid>
           

            <Grid container style={{position:'absolute', bottom:'10px'}}>
    
                <Grid  item  ml={0}>  <button onClick={requestSave} className="AMo1">저장</button> </Grid>
                <Grid  item  ml={2}>  <button onClick={requestModify} className="AMo1">수정</button> </Grid>
                
            </Grid>



            </div>

        </div>
    )


}

export default Acom;
