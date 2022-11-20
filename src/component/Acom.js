import { useState, useEffect } from "react";
import axios from "axios";
import { height } from "@mui/system";
import { Button } from "react-bootstrap";
import { UnpublishedTwoTone } from "@mui/icons-material";

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

    // 로그인했는지 검사
    useEffect(() => {
        if (sessionStorage.getItem("id") == null) {
            window.alert("먼저 로그인을 해야합니다.");
            window.location.href = "http://localhost:3000/Login";
        }
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
            compEmail: input.compEmail

        }).then(function (response) {
            if(!response.data){
                window.alert("저장된 데이터가 있습니다. 데이터를 바꿔주세요 \n수정을 원하시면 수정버튼을 눌러주세요");
            }
        }).catch(function (error) {
            console.log("error",error);
        });
    }

    //수정 버튼 눌렀을때 실행되는 함수
    const requestModify = () => {
        axios.post('http://192.168.2.82:5000/updateCompany',{
            compNum: input.compNum,
            compName: input.compName,
            compCEO: input.compCEO,
            compAddress: input.compAddress,
            compType: input.compType,
            compItems: input.compItems,
            compEmail: input.compEmail
        }).then(function (response){
            console.log("updateCompany response 값 :" , response);
        }).catch(function (error){
            console.log("updateCompany error :",error);
        });

    }


    return (
        <div>
            <br />
            <br />
            <br />
            <table style={{ width: '900px', height: '700px' }}>
                <tr>
                    <td>
                        <h6><strong>사업자등록번호</strong></h6>
                    </td>
                    <td>
                        <input name='compNum' type="text" onChange={onChangeInput} value={input.compNum}></input>
                    </td>

                    <td>
                        <h6><strong>대표자명</strong></h6>
                    </td>
                   
                    <td>
                        <input name='compCEO' type="text" onChange={onChangeInput} value={input.compCEO}></input>
                    </td>
                </tr>

                <tr>
                    <td>
                        <h6><strong>상호</strong></h6>
                    </td>
                    <td>
                        <input name='compName' type="text" onChange={onChangeInput} value={input.compName}></input>
                    </td>

                    <td>
                        <h6><strong>업태</strong></h6>
                    </td>
                    <td>
                        <input name='compType' type="text" onChange={onChangeInput} value={input.compType}></input>
                    </td>
                </tr>

                <tr>
                    <td>
                        <h6><strong>종목</strong></h6>
                    </td>
                    <td>
                        <input name='compItems' type="text" onChange={onChangeInput} value={input.compItems}></input>
                    </td>

                    <td>
                        <h6><strong>이메일</strong></h6>
                    </td>
                    <td>
                        <input name='compEmail' type="text" onChange={onChangeInput} value={input.compEmail}></input>
                    </td>
                </tr>

                <tr>
                    <td>
                        <h6><strong>주소</strong></h6>
                    </td>
                    <td>
                        <input name='compAddress' type="text" onChange={onChangeInput} value={input.compAddress}></input>
                    </td>
                </tr>
            </table>

            <div>
                <button onClick={requestSave}>저장</button>
                <br/>
                <br/>
                <br/>
                <button onClick={requestModify}>수정</button>

            </div>
        </div>
    )


}

export default Acom;