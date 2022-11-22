import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';


const OWBcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
    const [OKdata, setOKData] = useState();
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);
    const [addData, setAddData] = useState({    //추가 관련 변수
        saveId: '',
        savePw: '',
        saveUser: '',
        saveAdvice: ''
    });

    //초기 저장된 데이터베이스 값 가져오기
    useEffect(() => {
        axios.post('http://192.168.2.82:5000/readUser', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (error) {
            console.log("readUser error", error);
        });
    }, []);


    //입력값 onChange 함수
    const { saveId, savePw, saveUser, saveAdvice } = addData;
    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        setAddData({
            ...addData,
            [name]: value
        });
        console.log(addData);
    }

    //추가 모델에서 추가 눌렀을경우 함수
    const pushAddData = () => {
        
        if (addData.saveId == '' || addData.savePw == '' || addData.saveUser == '' || addData.saveAdvice == '') {
            window.alert("공란은 입력할 수 없습니다.");
        } else {
            axios.post('http://192.168.2.82:5000/createUser', {
                userId: addData.saveId,
                userPw: addData.savePw,
                userName: addData.saveUser,
                userGrant: addData.saveAdvice,
                compCode: sessionStorage.getItem("uid")
            }).then(function (response) {
                if (!response.data) {
                    window.alert("중복 아이디는 추가할 수 없습니다.");
                } else {
                    window.alert("추가 완료");
                    handleClose();
                    setAddData({
                        "saveId": '',
                        "savePw": '',
                        "saveUser": '',
                        "saveAdvice": '',
                    })
                }
            }).catch(function (error) {
                console.log("createUser error :", error);
            });

        }

    }


//추가 모델에서 닫기 눌렀을 경우
const closeAddData = () => {
    handleClose();
    if(show) {
        console.log("if문 실행");
        setAddData({
            "saveId": '',
            "savePw": '',
            "saveUser": '',
            "saveAdvice": '',
        });
    }
}

//저장
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
//수정
const DelClose = () => setMDelShow(false);
const DeShow = () => setMDelShow(true);
//삭제
const MdClose = () => setModifyShow(false);
const MdShow = () => setModifyShow(true);
//권한




//체크박스 관련 ---------------------------------------
const [isChecked, setIsChecked] = useState(false); //체크여부
const [checkedItems, setCheckedItems] = useState(new Set());

const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    checkedItemHandle(target.value, target.checked);
}

const checkedItemHandle = (id, isChecked) => {
    if (isChecked) {
        checkedItems.add(id);
        setCheckedItems(checkedItems);
        console.log("if문 checked ", checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
        checkedItems.delete(id);
        setCheckedItems(checkedItems);
        console.log("else문 checked", checkedItems);
    }
    return checkedItems;
}





    return (
        <div style={{width:'1000px' ,position:'relative'}}>
             <h2  style={{color:' #2F58B8' ,position:'absolute' ,left:'0' ,top:'0px'}}><strong>사용자 관리 </strong></h2>
            <br/>
            <br/>
            <br/>
            <table style={{
                width:"1000px",
                // border:"1px",
                // solid:"#fffff",
                // backgroundColor:'#bdc3c7'
                position:'absolute',
                left:'100px'
            }}>
                <tr style={{backgroundColor:'#bdc3c7' , textAlign:'center', }}>
                    <td style={{border:"1px solid gray"}}>
                    <Checkbox {...label} defaultChecked />
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>수당코드</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>수당 명</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>비과세</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>지급유형</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>계산식</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>상세 확인</strong>
                    </td>

                </tr>  
       
                    

                  {
                        data && data.map((e, idx) =>
                        <tr  style={{border:"1px solid gray"}} >
                            <td style={{border:"1px solid gray"}}><Checkbox {...label} defaultChecked /></td>
                            <td style={{border:"1px solid gray"}}>부서명 넣을거</td>
                            <td style={{border:"1px solid gray"}}>사원명 넣을거</td>
                            <td style={{border:"1px solid gray"}}>총 휴가 머시기 받아올거</td>
                            <td style={{border:"1px solid gray"}}>사용 휴가 머시기</td>
                           
                            <td style={{border:"1px solid gray"}}><Button  variant="link" onClick={DeShow}><strong>유저입력</strong></Button></td>
                        </tr>
                        )   
                    }
                    <tr>
                      <td style={{border:"1px solid gray"}}>
                    <Checkbox {...label} defaultChecked />
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>01</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>기본급</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>전액과세</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>고정 </strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>고정 </strong>
                    </td>
                   
                    <td style={{border:"1px solid gray"}}>
                 
                        <Button  variant="link" onClick={DeShow}><strong>유저입력</strong></Button>
                   
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
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/><br/><br/><br/>
            <hr></hr>
          
            {/* <Grid componenter style={{position:'absolute', }}>
                <Grid item  sx={{md:3}}><button  onClick={handleShow} className="Atmp1">  추가</button> </Grid>
                <Grid   sx={{md:-50}}><button  onClick={MdShow} className="Atmp1">  수정</button></Grid>
                <Grid   sx={{md:30}} > <button onClick={DeShow} className="Atmp1">  삭제</button></Grid>
            </Grid> */}
                <div>
      
                <button style={{position:'absolute' ,left:"110px"}} onClick={handleShow} className="Atmp1">  <strong>수정</strong></button>
              
              
                </div>
              <br/>  
              <br/>  
              <br/>  
            <hr></hr>


            {/* 수정 */}
            <Modal 
             centered
             size="xl"
            show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#2F58B8',}}>
                <Modal.Title style={{color:'#ffffff'}}><strong> 사원 등록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'#f1f2f6'}}>
             

                <br/>
              
                    <Container>
                    <Grid container spacing={4}>
                    <Grid item xs={6} md={2}  style={{fontSize:'25px'}}>
                        <strong>사원명</strong>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <input style={{width:'250px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>
                    <Grid item xs={6} md={2} style={{fontSize:'25px'}}>
                        <strong>사원 번호</strong>
                    </Grid>
                    <Grid item xs={6} md={4} ml={-5}>
                    <input style={{width:'290px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>
                    
                    <Grid item xs={6} md={3} style={{fontSize:'25px'}}>
                       <strong>주민등록번호</strong>
                    </Grid>
                    <Grid item xs={6} md={3} ml={-11}>
                    <input style={{width:'250px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>
                    <Grid item xs={6} md={2} ml={11} style={{fontSize:'25px'}}>
                        <strong>전화 번호</strong>
                    </Grid>
                    <Grid item xs={6} md={4} ml={-5} >
                    <input style={{width:'290px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>

                    <Grid item xs={6} md={2} style={{fontSize:'25px'}}>
                       <strong>부서코드</strong>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <input style={{width:'250px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>
                    <Grid item xs={6} md={2} ml={0} style={{fontSize:'25px'}}>
                        <strong>직위/직급</strong>
                    </Grid>
                    <Grid item xs={6} md={4}  ml={-5}  >
                    <input style={{width:'290px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>
                    
                    <Grid item xs={6} md={2} style={{fontSize:'25px'}}>
                       <strong>입사일</strong>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <input style={{width:'250px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>

                    <Grid item xs={6} md={2} style={{fontSize:'25px'}}>
                        <strong>휴가</strong>
                    </Grid>

                    <Grid item xs={6} md={2} ml={-14} >
                    <input style={{width:'110px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>
                    <Grid item xs={6} md={2} ml={-7}  style={{fontSize:'25px'}}>
                        <strong>잔여 휴가</strong>
                    </Grid>

                    <Grid item xs={6} md={2} ml={-7} >
                    <input style={{width:'110px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>

                    <Grid item xs={6} md={6} ml={23} mt={5} style={{fontSize:'25px'}}>
                      <strong> 은행</strong>
                    </Grid>

                    <Grid item xs={6} md={6} ml={-48}mt={5} >
                    <input style={{width:'250px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>


                    
                    <Grid item xs={6} md={4}  style={{fontSize:'25px'}}>
                       <strong> 급여 통장</strong>
                    </Grid>

                
                    <Grid item xs={6} md={4} ml={-23}  style={{fontSize:'25px'}}>
                       <strong> 계좌 번호</strong>
                    </Grid>

                    <Grid item xs={6} md={4} ml={-25} >
                    <input style={{width:'250px',height:'40px'}} name='compNum' type="text"></input>
                    </Grid>


                    <Grid item xs={6} md={6} ml={23} style={{fontSize:'25px'}} >
                       <strong>예금주</strong>
                    </Grid>

                    <Grid item xs={6} md={6} ml={-48} >
                    <input style={{width:'250px' ,height:'40px'}} name='compNum' type="text"></input>
                    </Grid>


                 
                    
                    <Grid item xs={6} md={3} style={{fontSize:'25px'}} >
                      <strong>주소</strong>
                    </Grid>

                    <Grid item xs={6} md={10}  >
                    <input style={{width:'1000px' ,height:'70px'}} name='compNum' type="text"></input>
                    </Grid>
                    
        
                    </Grid>
                </Container>


                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button variant="primary" onClick={handleClose}>
                   추가
                </Button>
                </Modal.Footer>
            </Modal>
            

            {/* 확인  */}
            <Modal 
             centered
             size="xl"
            show={DelShow} onHide={DelClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#2F58B8',}}>
                <Modal.Title style={{color:'#ffffff'}}><strong> 상세 확인</strong> </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <br></br>
                    <Grid container>
                        <Grid item xs style={{fontSize:'25px'}}>
                            <strong> 이름 : 이름 넣을거</strong>
                        </Grid>
                        <Grid item xs style={{fontSize:'25px'}}>
                            <strong> 부서 : 부서 넣을거</strong>
                        </Grid>
                    </Grid>
                    <br></br>
                    <div style={{fontSize:'25px'}}><strong>휴가 내역</strong></div>
                

                    <table style={{
                            width:"100%",textAlign:'center' }}>
                        <tr style={{border:"1px solid gray",backgroundColor:'#f1f2f6'}}>
                            <td style={{border:"1px solid gray", fontSize:'20px'}}><strong>날짜</strong></td>
                            <td style={{border:"1px solid gray",fontSize:'20px'}}><strong>휴가 기간</strong></td>
                            <td style={{border:"1px solid gray",fontSize:'20px'}}><strong>휴가 항목</strong></td>
                            <td style={{border:"1px solid gray",fontSize:'20px'}}><strong>상세</strong></td>
                        </tr>
                        {
                            OKdata && OKdata.map((e,idx )=>
                            <tr style={{border:"1px solid gray",fontSize:'20px'}}>                          
                            <td style={{border:"1px solid gray",fontSize:'20px'}}>부서명 넣을거</td>
                            <td style={{border:"1px solid gray",fontSize:'20px'}}>사원명 넣을거</td>
                            <td style={{border:"1px solid gray",fontSize:'20px'}}>총 휴가 머시기 받아올거</td>
                            <td style={{border:"1px solid gray",fontSize:'20px'}}>사용 휴가 머시기</td>
                            </tr>
                            )

                        }
                           <tr style={{border:"1px solid gray"}}>
                            <td style={{border:"1px solid gray"}}>더미Data</td>
                            <td style={{border:"1px solid gray"}}>휴가 기간</td>
                            <td style={{border:"1px solid gray"}}>휴가 항목</td>
                            <td style={{border:"1px solid gray"}}>상세</td>
                        </tr>

               
                    </table>
                    <br></br>
                </Modal.Body>
                <Modal.Footer>
                
                <Button variant="primary" onClick={DelClose}>
                    추가
                </Button>
                <Button variant="primary" onClick={DelClose}>
                    저장
                </Button>
                <Button variant="secondary" onClick={DelClose}>
                   닫기
                </Button>
                </Modal.Footer>
                
            </Modal>
  




        </div>
    );
};

export default OWBcom;