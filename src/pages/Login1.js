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

    // 로그인
    const signUp = () => {
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
                    window.location.href = "http://localhost:3000/Apage?id="+sessionStorage.getItem("id")+"?uId="+sessionStorage.getItem("uId");
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
                    />
                    <br />






                    <Button
                        onClick={signUp}
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 3 }}
                        style={{ backgroundColor: '#2F58B8', height: '55px', fontSize: '20px' }}
                    >
                        <strong>로그인</strong>
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                아이디 찾기
                            </Link>
                        </Grid>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                {"비밀번호 찾기"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>


        </div>
    );
};


export default Login1;