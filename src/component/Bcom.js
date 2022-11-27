import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Rsearch from './Rsearch';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import Error from '../alert/Error';
import Success from '../alert/Success';
import { AssuredWorkloadTwoTone } from '@mui/icons-material';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
const Bcom = (props) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);
    const [SH, setSh] = useState(false);


    const ShClose = () => setSh(false);
    const Shshow = () => setSh(true);




    //권한 부여 맵핑 함수
    const [Right, setRight] = useState();

    const [addData, setAddData] = useState({    //추가 관련 변수
        saveId: '',
        savePw: '',
        saveUser: '',
        saveAdvice: ''
    });
    const [modifyData, setModifyData] = useState({
        preUserId: null,
        compCode: null,
        userId: null,
        userPw: null,
        userName: null,
        userGrant: null,
    });
    const [arr, setArr] = useState([]);
    const [allcheckarr, setAllcheckarr] = useState([]);
    //초기 저장된 데이터베이스 값 가져오기
    useEffect(() => {
        getData();
    }, []);
    
    //useEffect에서 실행되는 함수 ( axios )
    const getData = () => {
        axios.post('http://192.168.2.82:5000/readUser', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (error) {
            console.log("readUser error", error);
        });
    }

    //추가 입력값 onChange 함수
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
        console.log("addData값 ",addData);
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
                    window.alert("이미 사용중인 아이디입니다. 다른 아이디를 선택해주세요.");
                } else {
                    window.alert("추가 완료");
                    handleClose();
                    setAddData({
                        "saveId": '',
                        "savePw": '',
                        "saveUser": '',
                        "saveAdvice": '',
                    })
                    getData();
                }
            }).catch(function (error) {
                console.log("createUser error :", error);
            });

        }

    }
    //추가 모델에서 닫기 눌렀을 경우
    const closeAddData = () => {
        handleClose();
        console.log("props 값 : " , props.advice);
        if (show) {
            setAddData({
                "saveId": '',
                "savePw": '',
                "saveUser": '',
                "saveAdvice": '',
            });
        }
    }


    //수정 관련 함수

    // 수정버튼 눌렀을 경우 함수
    //MdShow
    const modifyShow = () => {
        let userId2 = null;
        if (checkedItems.size < 1) {
            window.alert("체크된 항목이 없습니다.");
        } else if (checkedItems.size > 1) {
            window.alert("한번에 한가지 항목만 수정 가능합니다.");
        } else {
            for (let i of checkedItems.values()) {
                userId2 = i;
            }
            axios.post('http://192.168.2.82:5000/updateUserModal', {
                compCode: sessionStorage.getItem("uid"),
                userId: userId2
            }).then(function (response) {
                setModifyData({
                    "preUserId": response.data[0].userId,
                    "compCode": response.data[0].compCode,
                    "userId": response.data[0].userId,
                    "userPw": response.data[0].userPw,
                    "userName": response.data[0].userName,
                    "userGrant": response.data[0].userGrant,
                });
            }).catch(function (error) {
                console.log("updateUserModal error :", error);
            });
            MdShow();
        }

    }
    //수정 textbox 데이터 변환값
    const { userId, userPw, userName, userGrant } = modifyData;
    const onChangeModifyData = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
        });
    }


    //수정 버튼 
    const pushModifyData = () => {
        axios.post('http://192.168.2.82:5000/updateUser', {
            compCode: modifyData.compCode,
            userId: modifyData.userId,
            userPw: modifyData.userPw,
            userName: modifyData.userName,
            userGrant: modifyData.userGrant,
            preUserId: modifyData.preUserId
        }).then(function (response) {
            if (response.data) {
                asd();
                MdClose();
                getData();
            }
            if (!response.data) {
                window.alert("해당 아이디가 이미 존재합니다.다른 아이디로 변경해주세요.");
            }
        }).catch(function (error) {
            console.log("updateUser error :", error);
        });
    }

    const asd = () => {
        return (
            <Success name = "hello"></Success>
        )
    }

    //--------------------------------------------------------------------------

    //삭제 관련함수 -------------------------------------------------------------
    const pushDeleteData = () => {
        let checksize = checkedItems.size;
        if (checkedItems.size == 0) {
            window.alert("선택된 항목이 없습니다.");
        } else {
            DeShow();
            for (let i of checkedItems.values()) {
                arr.push(i);
            }
        }
    }


    //------------------------------------------------------------
    // 내일부터해야됨 배열에 들어있는값들 전부 삭제해야함
    //------------------------------------------------------------
    //삭제후 체크되있는 내용들 제거하는 코드
    const checkDelete = (check) => {
        for (let i = 0; i < check.length; i++) {
            let checkChange = document.getElementById(check[i]);
            checkChange.checked = !isChecked;
        }
    }

    const pushDeleteData2 = () => {
        axios.post('http://192.168.2.82:5000/deleteUser', {
            deleteList: arr
        }).then(function (response) {
            if (response.data) {
                window.alert("삭제되었습니다.");
                checkDelete(arr);
                DelClose();
                checkedItems.clear();
                getData();
            }
        }).catch(function (error) {
            console.log("deleteUser error:", error);
        });
    }


    //저장
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //삭제
    const DelClose = () => {
        setMDelShow(false);
        setArr([]);
    }
    const DeShow = () => setMDelShow(true);

    //수정
    const MdClose = () => {
        setModifyShow(false);
        checkedItems.clear();
    }


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
        } else if (!isChecked && checkedItems.has(id)) {
            checkedItems.delete(id);
            setCheckedItems(checkedItems);
        }
        return checkedItems;
    }



    //체크박스 전체 선택
    const [isAllChecked, setIsAllChecked] = useState(false);

    const allHandler = ({ target }) => {
        setIsAllChecked(!isAllChecked);
        allCheckedHandler(target.checked);
    }

    const allCheckedHandler = (isChecked) => {
        if (isChecked) {
            for (let i = 0; i < data.length; i++) {
                checkedItems.add(data[i].userId);
            }
            for (let i = 0; i < data.length; i++) {
                let checkedall = document.getElementById(data[i].userId);
                checkedall.checked = isChecked;
            }
        } else {
            checkedItems.clear();
            setCheckedItems(checkedItems);
            setIsAllChecked(!isAllChecked);
            for (let i = 0; i < data.length; i++) {
                let checkedall = document.getElementById(data[i].userId);
                checkedall.checked = isChecked;
            }
        }
        return checkedItems;
    }

//Alert 창 보이는 부분 함수
const [open, setOpen] = React.useState(
    false);

  const AlClick = () => {
    setOpen(true);
  };

  const AlClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

    return (
        <div style={{width:'1400px' ,position:'relative',}}>
             <h2  style={{color:'#005b9e' ,position:'absolute' ,left:'0' ,top:'0px'}}><strong>사용자 관리 </strong></h2>
            <br/>
            <br/>
            <br/>


            <Table >
                    <thead style={{height:'60px'}}>
                    {/* #769FCD */}
                    {/* ecf0f1 */}
                        <tr  style={{backgroundColor:'#ecf0f1' ,  }}>
                        <td style={{border:"1px solid #f1f2f6",fontSize:'22px'}}>
                            <input type="checkbox" id="allCheck" value="allCheck" onChange={(e) => allHandler(e)}></input>
                            </td>
                            <td style={{border:"3px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                                <strong>아이디</strong>
                            </td>
                            <td style={{border:"3px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                                <strong>비밀번호</strong>
                            </td>
                            <td style={{border:"3px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                                <strong>사용자명</strong>
                            </td>
                            <td style={{border:"3px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                                <strong>권한</strong>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data && data.map((e, idx) =>
                        <tr style={{height:'60px'}} >
                           <td style={{border:"2px solid #f1f2f6", fontSize:'20px',color:'#777777'}}><input type="checkbox" id={e.userId} value={e.userId} onChange={(e) => checkHandler(e)}></input></td>
                            <td style={{border:"2px solid #f1f2f6", fontSize:'20px',color:'#777777'}}><strong> {e.userId}</strong> </td>
                            <td style={{border:"2px solid #f1f2f6",fontSize:'20px',color:'#777777'}}><strong>  {e.userPw}</strong></td>
                            <td style={{border:"2px solid #f1f2f6",fontSize:'20px',color:'#777777'}}><strong>{e.userName} </strong></td>
                            <td style={{border:"2px solid #f1f2f6", fontSize:'20px',color:'#777777'}}><strong> {e.userGrant}</strong></td>
                        </tr>
                        )
                    }

                   
                    </tbody>
                    </Table>
        
                    <Grid item xs={12} ml={-3} mt={40}>
                    <hr style={{width:'1440px'}}/>
                    </Grid>
                    
                   
                <Box >
              
                <button   style={{position:'absolute' ,left:"0px",top:'600px' }} onClick={handleShow} className="Atmp1">  <strong>추가</strong></button> 
                <button style={{position:'absolute' ,left:"110px",top:'600px'}}onClick={modifyShow} className="Atmp1">  <strong>수정</strong></button>
                <button style={{position:'absolute' ,left:"220px",top:'600px'}} onClick={pushDeleteData} className="Atmp1"> <strong>삭제</strong> </button>
                  
                </Box>
              





            {/* 추가 */}
            <Modal
                
            centered
            size="xsm"
         
            show={show} onHide={handleClose} animation={false} id="AddModal">
            <Modal.Header closeButton  style={{backgroundColor:'#005b9e', width:'500px',height:'70px'}}>
                <Modal.Title style={{color:'#ffffff'}}><strong> 사용자관리 추가</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:'#f1f2f6',  width:'500px' ,}} >

            <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={6} md={6} ml={3} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>아이디</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12}>
                        {/* <input style={{width:'250px',height:'40px'}} name="saveId" type="text" onChange={onChangeAddData}></input> */}
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon" name="saveId" type="text" onChange={onChangeAddData}/>
                        
                        </Grid>
                        <Grid item xs={6} md={6} ml={3} mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>비밀번호</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        {/* <input style={{width:'250px',height:'40px'}} name="savePw" type="password" onChange={onChangeAddData}></input> */}
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon" name="savePw" type="password" onChange={onChangeAddData}/>
                        </Grid>
                        <Grid item xs={6} md={6} ml={3} mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>사용자명</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        {/* <input style={{width:'250px',height:'40px'}}name="saveUser" type="text" onChange={onChangeAddData}></input> */}
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon" name="saveUser" type="text" onChange={onChangeAddData}/>
                        </Grid>
                        <Grid item xs={6} md={6} ml={3} mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>권한</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        {/* <input style={{width:'250px',height:'40px'}}name="saveAdvice" type="text" onChange={onChangeAddData}></input> */}
                        <InputGroup   style={{width:'250px' ,height:'40px'}}>
                      
                        <Form.Control
                            type="text"
                            name='saveAdvice'
                            onChange ={onChangeAddData}
                            aria-describedby="btnGroupAddon"
                            style={{height:'40px'}}
                            
                        />
                            <InputGroup.Text id="btnGroupAddon"   onClick={Shshow} style={{width:'50px' ,height:'40px'}}> <SearchIcon/></InputGroup.Text>
                        </InputGroup>
                        </Grid>
                     
                    </Grid>



                </Container>



                
            </Modal.Body>
            <Modal.Footer style={{ width:'500px' ,backgroundColor:'#ffffff'}}>
                <Button variant="secondary" onClick={closeAddData}>
                    Close
                </Button>
                <button className='addButton' variant="primary" onClick={pushAddData}>
                    추가
                </button>
            </Modal.Footer>
        </Modal>

            {/* 수정 */}
            <Modal
                centered
                size="xsm"
                // style={{width:'500px'}}
                show={ModifyShow} onHide={MdClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#005b9e', width:'500px',height:'70px'}}>
                    <Modal.Title  style={{color:'#ffffff'}}><strong>사용자관리 수정</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'#f3f3f3', width:'500px'}}>
                    <Container>
                    <Grid container spacing={4}>
                  

                        <Grid item xs={6} md={6} ml={3} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>아이디</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12}>
                        {/* <input style={{width:'250px',height:'40px'}} name="saveId" type="text" onChange={onChangeAddData}></input> */}
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                        name="userId" type="text" onChange={onChangeModifyData} value={modifyData.userId}/>
                        </Grid>
                        <Grid item xs={6} md={6} ml={3} mt={-2}style={{fontSize:'20px',color:'#777777'}}>
                            <strong>비밀번호</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                         name="userPw" type="password" onChange={onChangeModifyData} value={modifyData.userPw}/>
                        </Grid>


                        <Grid item xs={6} md={6} ml={3}mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>사용자명</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                         name="userName" type="text" onChange={onChangeModifyData} value={modifyData.userName}/>
                        </Grid>

                   
                        <Grid item xs={6} md={6} ml={3} mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>권한</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        {/* <input style={{width:'250px',height:'40px'}}name="saveAdvice" type="text" onChange={onChangeAddData}></input> */}
                        <InputGroup   style={{width:'250px' ,height:'40px'}}>
                      
                        <Form.Control
                            type="text"
                            name='userGrant'
                            aria-describedby="btnGroupAddon"
                            style={{height:'40px'}}
                            onChange={onChangeModifyData} 
                            value={modifyData.userGrant}       
                        />
                            <InputGroup.Text id="btnGroupAddon"   onClick={Shshow} style={{width:'50px' ,height:'40px'}}> <SearchIcon/></InputGroup.Text>
                        </InputGroup>
                        </Grid>


                        
                       
                     </Grid>
                </Container>
                </Modal.Body>
                <Modal.Footer style={{width:'500px',backgroundColor:'#ffffff' }}>
                    <Button variant="secondary" onClick={MdClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={pushModifyData}>
                        저장
                    </button>
                </Modal.Footer>
            </Modal>

       



            {/* 삭제 */}
            <Modal
                centered
                size="sm"
                show={DelShow} onHide={DelClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#2F58B8',width:'500px'}}>
                    <Modal.Title  style={{color:'#ffffff',width:'500px'}}>사용자관리 삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'#f1f2f6', width:'500px',}}>
                    <strong>{checkedItems.size}개 항목을 삭제하시겠습니까?</strong></Modal.Body>
                <Modal.Footer style={{width:'500px',backgroundColor:'#ffffff'}}>
                    <Button variant="secondary" onClick={DelClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={pushDeleteData2}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>



            {/* 검색  */}
            
            {/* 부서 코드 둗보기 모달 */}
            <Modal 
                size="lg"
                centered
                show={SH} onHide={ShClose}>
                <Modal.Header closeButton  style={{backgroundColor:'#005b9e',}}>
                <Modal.Title  style={{color:'#ffffff'}}> <strong> 권한 부여</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'#f1f2f6'}}> 

         
                <table style={{
                        textAlign:"center",
                        width:"100%", border:"1px solid gray" ,}} >
                    <tr style={{border:"1px solid gray",backgroundColor:'#a4b0be'}}>
                    <td style={{border:"1px solid gray",fontSize:'30px',color:'#ffffff'}}><strong> 비고</strong></td>
                    <td style={{fontSize:'30px',color:'#ffffff'}}> <strong> 권한명</strong></td>
                    </tr>
                    {
                        Right && Right.map((e, idx) =>
                        <tr style={{border:"1px solid gray"}}>
                        <td style={{border:"1px solid gray",fontSize:'30px'}}>1</td>
                        <td style={{border:"1px solid gray",fontSize:'30px'}}>Master</td>
                        </tr>
                        
                        )
                    }
          
                </table>
              
                </Modal.Body>

                </Modal>
  




        </div>
    );
};

export default Bcom;