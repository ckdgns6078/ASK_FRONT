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
const Login1 = () => {
    //아이디
    const [id, SetId] = useState();
    //비밀번호
    const [pw, SetPw] = useState();

    //id 검사 
    const handleChangeId = (e) => {
        SetId(e.target.value);
  
    };

    //비밀번호 검사
    const handleChangePw = (e) => {
        SetPw(e.target.value);
    };


    //엔터키
    const enterEvent = (e) =>{
        if(e.key == 'Enter'){
            signUp();
        }
    }


    // 로그인
    const  signUp = () => {
            axios.post('http://192.168.2.82:5000/login', {
                userId: id,
                userPw: pw,
            }).then(function (response) {
                if(response.data){
                    axios.post('http://192.168.2.82:5000/getMaster', {
                        userId : id
                    }).then(function(response){
                        sessionStorage.setItem("uid" , response.data);
                    }).catch(function(error){
                        console.log("getMaster error" , error);
                    });
                    sessionStorage.setItem("id",id);
                    // window.location.href = "http://localhost:3000/Apage?id="+sessionStorage.getItem("id")+"?uId="+sessionStorage.getItem("uId");
                    window.location.href = "http://localhost:3000/Abut";
                    window.location.href = "http://localhost:3000/Bbut";
                    window.location.href = "http://localhost:3000/Ccut";

                    window.location.href = "http://localhost:3000/PMAbut";
                    window.location.href = "http://localhost:3000/PMBbut";
                    window.location.href = "http://localhost:3000/PMCbut";
                    window.location.href = "http://localhost:3000/PMDbut";

                    window.location.href = "http://localhost:3000/ATGAbut";
                    window.location.href = "http://localhost:3000/ATGBbut";
                    window.location.href = "http://localhost:3000/ATGCbut";
                    window.location.href = "http://localhost:3000/ATGDbut";
                    window.location.href = "http://localhost:3000/ATGEbut";

                    window.location.href = "http://localhost:3000/SMAbut";
                    window.location.href = "http://localhost:3000/SMBbut";
                    window.location.href = "http://localhost:3000/SMCbut";

                    window.location.href = "http://localhost:3000/BAAbut";
                    window.location.href = "http://localhost:3000/BABbut";
                    window.location.href = "http://localhost:3000/BACbut";
                    
                    window.location.href = "http://localhost:3000/Abut";

                }else{
                    window.alert("로그인 정보가 없습니다.");
                }
            }).catch(function (error) {
                console.log("error :", error);
            });
 
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
                    marginTop: 8,
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
                <h3> <strong>로그인</strong></h3>

         




                <Box component="form" noValidate sx={{ mt: 8 }}>



                    <h5 style={{ position: 'absolute', top: '165px' }}><strong>아이디</strong>  </h5>



                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="id"
                        name="id"
                        autoComplete="id"
                        autoFocus
                        onChange={handleChangeId}
                       style={{width:'400px'}}
                    />
                   



                    <Box mt={7}>
                    <h5 style={{ position: 'absolute', top: '300px' }}><strong>비밀번호</strong></h5>
                    </Box>

                    <TextField
                        onChange={handleChangePw}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onKeyPress= {enterEvent}
                    />
                    <br />






                    <Button
                        onClick={signUp}
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 3 }}
                        style={{ backgroundColor: '#', height: '55px', fontSize: '20px' }}
                    >
                        <strong>로그인</strong>
                    </Button>
                    <Grid container>
                        {/* <Grid item xs>
                            <Link href="#005b9e" variant="body2">
                                아이디 찾기
                            </Link>
                        </Grid>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                {"비밀번호 찾기"}
                            </Link>
                        </Grid> */}
                    </Grid>
                </Box>
            </Box>


        </div>
    );
};


export default Login1;