import React, { useEffect } from "react";
import { useState } from "react";

const Login1 = () =>{
    const [id , SetId] = useState();
    const [com , SetCom] = useState();
    const [pw , SetPw] = useState();
    const [pwC , SetPwC] = useState();
    const [email , SetEmail] = useState();

    //정규표현식 사용할 변수값
    const idCheck = /^[a-zA-Z0-9]{6,20}$/; // 아이디 정규표현식
    const comCheck = /^[가-힣a-zA-Z]+$/;//이름 또는 기업명 정규표현식
    const pwCheck =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/; // 비밀번호 정규표현식
    const emailCheck = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.][@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.][.]{1}[A-Za-z]{1,5}$/; // email 정규표현식
    
    
    //id 검사 
    const handleChangeId = (e) =>{

        if(idCheck.test(e.target.value)){
            SetId(e.target.value);
        }
    };
    const handleChangeCom = (e) =>{
        if(comCheck.test(e.target.value)){

        }
    };
    
    const handleChangePw = (e) =>{
    };
    const handleChangePwC = (e) =>{
    };
    const handleChangeEmail = (e) =>{
    };

    

    return(
        <div>

            <p>아이디 : <input type = "text" onChange={handleChangeId}/></p>
            <p>이름 또는 기업명 : <input type = "text"onChange ={handleChangeCom}/> </p>
            <p>비밀번호 : <input type = "password" onChange ={handleChangePw}/> </p>
            <p>비밀번호 확인 : <input type = "password" onChange ={handleChangePwC}/> </p>
            <p>이메일 주소 : <input type = "text" onChange ={handleChangeEmail}/> </p>
            
        </div>
    );



};
export default Login1;

