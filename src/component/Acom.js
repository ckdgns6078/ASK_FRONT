import { useState, useEffect } from "react";
import axios from "axios";
import { height } from "@mui/system";
import { Button } from "react-bootstrap";
import { UnpublishedTwoTone } from "@mui/icons-material";

import Nav from 'react-bootstrap/Nav';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { TextField } from "@mui/material";


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
    });

    const [test1 , SetTest1] = useState();

    

    // 로그인했는지 검사
    useEffect(() => {
        if (sessionStorage.getItem("id") == null || sessionStorage.getItem("uid") == null) {
            window.alert("먼저 로그인을 해야합니다.");
            window.location.href = "http://localhost:3000/Login";
        }
        axios.post('http://192.168.2.82:5000/readCompany', {
            id: sessionStorage.getItem("id")

        }).then(function (response) {
            SetInput({
                "compNum": response.data[0].compNum,    //사업자등록번호
                "compName": response.data[0].compName,   //상호
                "compCEO": response.data[0].compCEO,    //대표자명
                "compAddress": response.data[0].compAddress,//주소
                "compType": response.data[0].compType,   //업태
                "compItems": response.data[0].compItems,  //종목
                "compEmail": response.data[0].compEmail  //이메일
            })

        }).catch(function (error) {
            console("readCompany error :", error);
        });

    }, []);

    //입력값 onChange 함수
    const { compNum, compName, compCEO, compAddress, compType, compItems, compEmail } = input;
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
            compNum: input.compNum,
            compName: input.compName,
            compCEO: input.compCEO,
            compAddress: input.compAddress,
            compType: input.compType,
            compItems: input.compItems,
            compEmail: input.compEmail,
            id: sessionStorage.getItem("id")

        }).then(function (response) {
            if (!response.data) {
                window.alert("저장된 데이터가 있습니다. 데이터를 바꿔주세요 \n수정을 원하시면 수정버튼을 눌러주세요");
            }
        }).catch(function (error) {
            console.log("error", error);
        });
    }

    //수정 버튼 눌렀을때 실행되는 함수
    const requestModify = () => {
        axios.post('http://192.168.2.82:5000/updateCompany', {
            compNum: input.compNum,
            compName: input.compName,
            compCEO: input.compCEO,
            compAddress: input.compAddress,
            compType: input.compType,
            compItems: input.compItems,
            compEmail: input.compEmail

        }).then(function (response) {
            console.log("updateCompany response 값 :", response);
        }).catch(function (error) {
            console.log("updateCompany error :", error);
        });

    }



    return (
        
        <div style={{width:'1300px', position:'relative' ,height:'650px', top:'50px'}}>
           <h2  style={{color:' #2F58B8' ,position:'absolute' ,left:'0' ,top:'-50px'}}><strong>회사 설정</strong></h2>
           <hr/>
           <br/>

            <table style={{ width: '1080px', height: '200px', position:'absolute' ,left:'150px',}} >
            
              

                <tr>
                <td style={{textAlign:'left'}}>
                        <h6 style={{fontSize:'25px'}} ><strong>사업자등록번호</strong></h6>
                    </td>

                    <td style={{textAlign:'left'}}>
                        <input style={{width:'300px'}} name='compNum' type="text" onChange={onChangeInput} value={input.compNum}></input>

                    <td>
                        <input name='compNum' type="text" onChange={onChangeInput} value={input.compNum} ></input>
                        

                    </td>

                    <td style={{textAlign:'left'}}>
                        <h6 style={{fontSize:'25px'}}><strong>대표자명</strong></h6>
                    </td>

                   
                    <td >
                        <input style={{width:'300px'}} name='compCEO' type="text" onChange={onChangeInput} value={input.compCEO}></input>


                    <td>
                        <input name='compCEO' type="text" onChange={onChangeInput} value={input.compCEO}></input>

                    </td>
                </tr>

                <tr>
                <td style={{textAlign:'left'}}>
                        <h6 style={{fontSize:'25px'}}><strong>상호</strong></h6>
                    </td>
                    <td style={{textAlign:'left'}}>
                        <input style={{width:'300px'}} name='compName' type="text" onChange={onChangeInput} value={input.compName}></input>
                    </td>

                    <td style={{textAlign:'left'}}>
                        <h6 style={{fontSize:'25px'}}><strong>업태</strong></h6>
                    </td>
                    <td >
                        <input style={{width:'300px'}} name='compType' type="text" onChange={onChangeInput} value={input.compType}></input>
                    </td>
                </tr>

                <tr>
                    <td style={{textAlign:'left'}}>
                        <h6 style={{fontSize:'25px'}}><strong>종목</strong></h6>
                    </td>
                    <td style={{textAlign:'left'}}>
                        <input style={{width:'300px'}} name='compItems' type="text" onChange={onChangeInput} value={input.compItems}></input>
                    </td>

                    <td style={{textAlign:'left'}}>
                        <h6 style={{fontSize:'25px'}}><strong>이메일</strong></h6>
                    </td>
                    <td>
                        <input style={{width:'300px'}} name='compEmail' type="text" onChange={onChangeInput} value={input.compEmail}></input>
                    </td>
                </tr>

                <tr>
                <td style={{textAlign:'left', }}>
                    
                        <h6 style={{fontSize:'25px'}} ><strong>주소</strong></h6>
                    </td>
                    <td style={{textAlign:'left'}}>
              
                 
                        <input style={{width:'300px' ,}} name='compAddress' type="text" onChange={onChangeInput} value={input.compAddress}></input>
                       
                    </td>
                </tr>
            </table>
      
        

            <div>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/><br/>
            <hr></hr>
            <br/><br/> <br/>
            <hr></hr>

            <Grid container style={{position:'absolute', bottom:'75px'}}>
                
                <Grid item >  <button sx={{md:30}} onClick={requestSave} className="Atmp1">저장</button> </Grid>
                <Grid  sx={{ml:-73}}item xs>  <button onClick={requestModify} className="AMo1">수정</button> </Grid>

            </Grid>
          


            </div>
            
        </div>
    )


}

export default Acom;