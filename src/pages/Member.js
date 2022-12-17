import { useState } from "react";
import axios from "axios";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ask from '../img/ask.png';
import { positions } from '@mui/system';
import { WindowRounded } from "@mui/icons-material";
const Member = () => {


  //아이디
  const [id, SetId] = useState();
  const [idCheck, SetIdCheck] = useState(true);
  //이름 , 회사명
  const [com, SetCom] = useState();
  const [comCheck, SetComCheck] = useState(true);
  //비밀번호
  const [pw, SetPw] = useState();
  const [pwCheck, SetPwCheck] = useState(true);
  // 비밀번호 확인
  const [pwC, SetPwC] = useState();
  const [pwCCheck, SetPwCCheck] = useState(true);
  // 이메일
  const [email, SetEmail] = useState();
  const [emailCheck, SetEmailCheck] = useState(true);

  //정규표현식 사용할 변수값
  const idTest = /^[a-zA-Z0-9]{6,20}$/; // 아이디 정규표현식
  const comTest = /^[가-힣a-zA-Z0-9]+$/;//이름 또는 기업명 정규표현식
  const pwTest = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/; // 비밀번호 정규표현식
  const emailTest = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.][@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.][.]{1}[A-Za-z]{1,5}$/; // email 정규표현식


  //id 검사 
  const handleChangeId = (e) => {
    SetIdCheck(false);
    if (idTest.test(e.target.value)) {
      SetId(e.target.value);
      SetIdCheck(true);
    }
  };
  //이름 또는 기업 검사
  const handleChangeCom = (e) => {
    SetComCheck(false);
    if (comTest.test(e.target.value)) {
      SetCom(e.target.value);
      SetComCheck(true);
    }
  };
  // 비밀번호 정규식 검사
  const handleChangePw = (e) => {
    SetPwCheck(false);
    console.log("비밀번호값", e.target.value);
    console.log("비밀번호 정규식", pwTest.test(e.target.value));
    if (pwTest.test(e.target.value)) {
      SetPw(e.target.value);
      SetPwCheck(true);
      console.log("최종 pw값", pw);
    }
  };
  // 비밀번호 확인 검사
  const handleChangePwC = (e) => {
    SetPwCCheck(false);
    console.log("pw값", pw);
    console.log(e.target.value);
    if (pw === e.target.value) {
      console.log()
      SetPwC(e.target.value);
      SetPwCCheck(true);
    }
  };
  // 이메일 확인 검사
  const handleChangeEmail = (e) => {
    SetEmailCheck(false);
    if (emailTest.test(e.target.value)) {
      SetEmail(e.target.value);
      SetEmailCheck(true);
    }
  };

  // 아이디 중복 검사 버튼 눌렀을때 함수
  const checkId = () => {
    if (id != undefined && idCheck == true) {
      axios.post('http://192.168.2.82:5000/checkId', {
        id: id
      }).then(function (response) {
        console.log("response 값 : ", response);
        if (response.data) {
          window.alert("사용가능한 아이디입니다.");
        } else {
          window.alert("이미 존재하는 아이디입니다.");
        }


      }).catch(function (error) {
        console.log("error :", error);
      });
    } else {
      window.alert("입력한 아이디 비밀번호 형식 바르지 않습니다.");
    }
  }

  // 회원가입
  const signUp = () => {
    if (idCheck == true && comCheck == true && pwCheck == true && pwCCheck == true && emailCheck == true) {
      axios.post('http://192.168.2.82:5000/joinProcess', {
        id: id,
        name: com,
        pw: pw,
        email: email
      }).then(function (response) {
        console.log("response값", response);
        if (response.data) {
          window.alert("회원가입 완료");
          window.location.replace("http://localhost:3000/Login");
        } else {
          window.alert("회원가입 실패");
        }
      }).catch(function (error) {
        console.log("error :", error);
      });
    } else {
      window.alert("형식에 맞게 입력해주세요!");
    }
  }

  const home =() =>{
    window.location.href="/"
  }




  return (
    <div >

      <CssBaseline />
      <Box 
        
        style={{ position: 'relative' }}
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

        }}
      >

        <img onClick={home} src={ask} style={{ width: '200px' }} />
        <br />


        {/* <Typography component="h1" variant="h5">
           회원가입
          </Typography> */}
        <h3> <strong>회원가입</strong></h3>

        <br />
        <br />


      






        <Box component="form" noValidate sx={{ mt: 1 }}>


          <Box ml={0}>
            <h5 style={{ position: 'absolute', top: '165px' }}><strong>아이디</strong> </h5>
          </Box>

          <Box ml={36}>
            <Button onClick={checkId} size="sm"  style={{ position: 'absolute', height: '40px', top: '150px', backgroundColor: '#2F58B8', color: '#fff', width: '100px' }}>
              중복 확인
            </Button>
          </Box>
        
            
           


          <Box > 
          <TextField
            margin="normal"
            required
            fullWidth
            id="id"
            name="id"
            autoComplete="id"
            autoFocus
            onChange={handleChangeId}
            style={{width:'500px'}}

          />
          {idCheck ? <div> </div> : <div style={{ color: "red" }} > 영문 , 숫자 6~20자 이내로 작성하세요. </div>}
     
          </Box>


          <Box mt={0} ml={-44}>
            <h5 ><strong>이름 또는 기업명</strong> </h5>
          </Box>
         <Box mt={-2}>
          <TextField
            onChange={handleChangeCom}
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          {comCheck ? <div> </div> : <div style={{ color: "red" }}> 영문 , 한글만 사용 가능합니다. </div>}
         </Box>

          <Box mt={0} ml={-53} >
            <h5 ><strong>비밀번호</strong></h5>
          </Box>  

          
          <Box mt={-2}>
          <TextField
            onChange={handleChangePw}
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {pwCheck ? <div> </div> : <div style={{ color: "red" }}> 영문 , 숫자 , 특수문자를 조합하여 8자~20자 이내로 작성하세요.</div>}
          </Box>
     
          <Box mt={0} ml={-47}>
            <h5 ><strong>비밀번호 확인</strong>  </h5>
          </Box>
          <Box mt={-1}>
            <TextField
              onChange={handleChangePwC}
              margin="normal"
              required
              fullWidth
              name="repassword"

              type="password"
              id="repassword"
              autoComplete="current-password"
            />
            {pwCCheck ? <div> </div> : <div style={{ color: "red" }} > 비밀번호와 값이 다릅니다. </div>}
          
          </Box>

          <Box  ml={-50}  >
            <h5 ><strong>이메일 주소</strong>  </h5>
          </Box>
          <Box mt={-2}>
          <TextField
            onChange={handleChangeEmail}
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          {emailCheck ? <div></div> : <div style={{ color: "red" }}> 이메일 형식이 아닙니다 </div>}
          </Box>


          <Button
            onClick={signUp}
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ backgroundColor: '#2F58B8', height: '55px', fontSize: '20px' }}
          >
            <strong>ASK 회원 가입</strong>
          </Button>
          <Grid container>
            <Grid item xs>

            </Grid>
            <Grid item xs>

            </Grid>
          </Grid>
        </Box>
      </Box>


    </div>
  );
};

export default Member;