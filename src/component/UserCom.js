import { useState, useEffect } from "react";
import axios from "axios";
import { height } from "@mui/system";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { inputAdornmentClasses } from "@mui/material";

const UserCom = () =>{
    const [show ,setShow] = useState(false);


    // useEffect(() => {
    //     if (sessionStorage.getItem("id") == null || sessionStorage.getItem("uid") == null) {
    //         window.alert("먼저 로그인을 해야합니다.");
    //         window.location.href = "http://localhost:3000/Login";
    //     }

    //     axios.post('http://192.168.2.82:5000/readUser',{
    //         compNum : sessionStorage.getItem("uid")
    //     }).then(function(response){
    //         console.log(response.data);

    //     }).catch(function(error){
    //         console.log("readUser error" , error);
    //     });
    // },[]);


    
    const handleAdd =() => setShow(true);

    const hadleModify =() => setShow(false);

    const hadleDelete =() => setShow(false);

    const handleClose = () => setShow(false);

    
    return(


        <div>

            <table style={{
                width:"60%",
                border:"1px",
                solid:"#fffff",
            }}>
                <tr>
                    <td>
                            
                    </td>
                    <td>
                        <strong>아이디</strong>
                    </td>
                    <td>
                        <strong>비밀번호</strong>
                    </td>
                    <td>
                        <strong>사용자명</strong>
                    </td>
                    <td>
                        <strong>권한</strong>
                    </td>
                </tr>

            </table>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Button onClick={handleAdd}>추가</Button>&nbsp;&nbsp;&nbsp;
            <Button>수정</Button>&nbsp;&nbsp;&nbsp;
            <Button>삭제</Button>

            <Modal show={show} onHide={handleClose}>



            </Modal>


        </div>
    );
}
export default UserCom;