import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
const Ccom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
    const [arr, setArr] = useState([]);
    //모달 함수
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);

    //추가
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
        let check = null;
        for(let i of checkedItems.values()){
            check = document.getElementById(i);
            check.checked = false;
        }
        setModifyShow(false);
        checkedItems.clear();
    }
    const MdShow = () => setModifyShow(true);


    //초기 값 받아오는 useEffect
    useEffect(() => {
        getData();
    }, []);

    //useEffect에서 실행되는 함수 ( axios )
    const getData = () => {
        axios.post('http://192.168.2.82:5000/readMobile', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            setData(response.data);
        }).catch(function (error) {
            console.log("readMobile error", error);
        });
    }
    //-----------------------------------
    

    //추가
    //추가 입력한 데이터 추가
    const [ addData , setAddData ] = useState({     //추가한 데이터 저장하는 useState
        addId : null,
        addPw : null,
        addCode : null,
        addName : null
    })

    //입력한 데이터 저장하는 함수
    const { addId , addPw , addCode , addName } = addData;
    const onChangeAddData = (e) => {
        const { value, name } = e.target;
        setAddData({
            ...addData,
            [name]: value
        });
    }

    //추가 모델에서 저장버튼
    const addDataBtn= () =>{
        if(addData.addId ==null && addData.addPw ==null , addData.addCode ==null, addData.addName ==null){
            window.alert("공란은 저장할 수 없습니다.");
        }else{
            axios.post('http://192.168.2.82:5000/createMobile', {
                compCode : sessionStorage.getItem("uid"),
                mb_id : addData.addId,
                mb_pw : addData.addPw,
                mb_code : addData.addCode,
                mb_name : addData.addName
        }).then(function (response) {
            if(response.data){
                window.alert("추가 성공");
                setAddData({
                    "addId": null,
                    "addPw": null,
                    "addCode": null,
                    "addName": null,
                });
                handleClose();
                getData();
            }
        }).catch(function (error) {
            console.log("createMobile error", error);
        });
        }
        
    }

    //---------------------------------------------------------------
    //-----------------------수정 관련 함수 --------------------------
    //---------------------------------------------------------------

    //수정 useState
    const [modifyData , setModifyData] = useState({
        preMobileId : null,
        modifyId : null,
        modifyPw : null,
        modifyCode : null,
        modifyName : null
    })

    //수정 입력값 가져오는 함수
    const {modifyId , modifyPw , modifyCode , modifyName } = modifyData;
    const onChangeModifyData =(e) =>{
        const { value , name } = e.target;
        setModifyData({
            ...modifyData,
            [name] : value
        });
    }

    //수정 데이터 가져오기
    const modifyShow =()=>{
        let modiId = null;
        if(checkedItems.size<1){
            window.alert("체크된 항목이 없습니다.");
        }else if (checkedItems.size<1){
            window.alert("한번에 한가지 항목만 수정 가능합니다");
        }else{
            for( let i of checkedItems.values()){
                modiId = i;
            }
            axios.post('http://192.168.2.82:5000/updateMobileModal',{
                mb_id : modiId
            }).then(function(response){
                if(response.data){
                    setModifyData({
                        "preMobileId" : response.data[0].mb_id,
                        "modifyId": response.data[0].mb_id,
                        "modifyPw": response.data[0].mb_pw,
                        "modifyCode": response.data[0].mb_code,
                        "modifyName": response.data[0].mb_name,
                    });
                    MdShow();
                    getData();
                }
            }).catch(function(error){
                console.log("updateMobileModal error :" , error);
            });
        }
       
    }

    //수정 모델에서 저장버튼 누르면 호출 함수
    const updateBtn = () =>{
        axios.post('http://192.168.2.82:5000/updateMobile',{
            preMobileId : modifyData.preMobileId,
            mb_id : modifyData.modifyId,
            mb_pw : modifyData.modifyPw,
            mb_code : modifyData.modifyCode,
            mb_name :modifyData.modifyName,
        }).then(function(response){
            console.log("response.data" , response.data);
            if(response.data){
                window.alert("수정 완료!");
                getData();
                MdClose();
            }else{
                window.alert("해당 아이디가 이미 존재합니다.다른 아이디로 변경해주세요.");
            }
        }).catch(function(error){
            console.log("updateMobile error :",error);
        });
    }


    //삭제
    const checkDelete = (check) =>{
        for(let i=0;i<check.length;i++){
            let checkChange = document.getElementById(check[i]);
            checkChange.checked = !isChecked;
        }
    }
    
    const deleteBtn = () =>{
        console.log("arr값 :" ,arr);
        axios.post('http://192.168.2.82:5000/deleteMobile',{
            deleteList : arr
        }).then(function(response){
            if(response.data){
                window.alert("삭제되었습니다.");
                checkDelete(arr);
                DelClose();
                checkedItems.clear();
                getData();
            }
            console.log(response.data);
        }).catch(function(error){
            console.log("deleteMobile error :" , error);
        });
    }
    //삭제 관련 함수
    const pushDeleteDate = () =>{
        let checksize = checkedItems.size;
        if(checkedItems.size == 0){
            window.alert("선택한 항목이 없습니다.");
        }else{
            DeShow();
            for(let i of checkedItems.values()){
                arr.push(i);
            }
        }
    }

  

    //체크박스
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
        console.log(checkedItems);
        return checkedItems;
    }
   
    //체크박스 전체선택
    const [ isAllChecked , setIsAllChecked] = useState(false);

    const allHandler = ({target}) =>{
        setIsAllChecked(!isAllChecked);
        allCheckedHandler(target.checked);
    }

    const allCheckedHandler = (isChecked) =>{
        if(isChecked){
            for(let i=0;i<data.length;i++){
                checkedItems.add(data[i].mb_id);
            }
            for(let i=0 ; i<data.length;i++){
                let checkedAll = document.getElementById(data[i].mb_id);
                checkedAll.checked = isChecked;
            }
        }else{
            checkedItems.clear();
            setCheckedItems(checkedItems);
            setIsAllChecked(!isAllChecked);
            for(let i=0 ; i <data.length;i++){
                let checkedAll = document.getElementById(data[i].mb_id);
                checkedAll.checked = isChecked;
            }
        }
    }


    return (
        <div style={{ width: '1400px', position: 'relative' ,height:'600px'}}>
            <h2 style={{ color: ' #005b9e', position: 'absolute', left: '0', top: '0px' }}><strong>사용자 관리 </strong></h2>
            <br />
            <br />
            <br />
            <Table >
                    <thead style={{height:'60px'}}>
                        <tr  style={{backgroundColor:'#ecf0f1' ,  }}>
                        <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                            <input type="checkbox" id="allCheck" value="allCheck" onChange={(e) => allHandler(e)}></input>
                            </td>
                            <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                                <strong>아이디</strong>
                            </td>
                            <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                                <strong>비밀번호</strong>
                            </td>
                            <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                                <strong>사원코드</strong>
                            </td>
                            <td style={{border:"1px solid #f1f2f6",color:'#777777',fontSize:'22px'}}>
                                <strong>사용자명</strong>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data && data.map((e, idx) =>
                        <tr style={{height:'60px'}} >
                           <td style={{border:"2px solid #f1f2f6", fontSize:'20px',color:'#777777'}}><input type="checkbox" id={e.mb_id} value={e.mb_id} onChange={(e) => checkHandler(e)}/></td>
                            <td style={{border:"2px solid #f1f2f6", fontSize:'20px',color:'#777777'}}><strong> {e.mb_id}</strong> </td>
                            <td style={{border:"2px solid #f1f2f6",fontSize:'20px',color:'#777777'}}><strong> {e.mb_pw}</strong></td>
                            <td style={{border:"2px solid #f1f2f6",fontSize:'20px',color:'#777777'}}><strong>{e.mb_code} </strong></td>
                            <td style={{border:"2px solid #f1f2f6",fontSize:'20px',color:'#777777'}}><strong>{e.mb_name}</strong></td>
                            
                        </tr>
                        )
                    }

                   
                    </tbody>
                    </Table>

           

        
           
            <Box style={{position:'absolute',bottom:'0' }} >
              
                <button style={{ position: 'absolute', left: "0px" }} onClick={handleShow} className="Atmp1">  <strong>추가</strong></button>
                <button style={{ position: 'absolute', left: "110px" }} onClick={modifyShow} className="Atmp1">  <strong>수정</strong></button>
                <button style={{ position: 'absolute', left: "220px" }} onClick={pushDeleteDate} className="Atmp1"> <strong>삭제</strong> </button>

            </Box>
      
          




            {/* 추가 */}
            <Modal
                centered
                size="xsm"
                show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#005b9e', width:'500px',height:'70px'}}>
                    <Modal.Title style={{color:'#ffffff'}}><strong>모바일 추가</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'#f1f2f6',  width:'500px' ,}}>
                  
                    <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={6} md={6} ml={3} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>아이디</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12}>
                        {/* <input style={{width:'250px',height:'40px'}} name="saveId" type="text" onChange={onChangeAddData}></input> */}
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon" 
                         type ='text' name ="addId" onChange={onChangeAddData}/>
                        
                        </Grid>
                        <Grid item xs={6} md={6} ml={3} mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>비밀번호</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        {/* <input style={{width:'250px',height:'40px'}} name="savePw" type="password" onChange={onChangeAddData}></input> */}
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                        type ='password' name="addPw" onChange={onChangeAddData}/>
                        </Grid>
                        <Grid item xs={6} md={6} ml={3} mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>사원코드</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        {/* <input style={{width:'250px',height:'40px'}}name="saveUser" type="text" onChange={onChangeAddData}></input> */}
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon" 
                            type ='text' name="addCode" onChange={onChangeAddData}/>
                        </Grid>

                        <Grid item xs={6} md={6} ml={3} mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>사용자명</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        {/* <input style={{width:'250px',height:'40px'}}name="saveUser" type="text" onChange={onChangeAddData}></input> */}
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon" 
                             type ='text' name="addName" onChange={onChangeAddData}/>
                        </Grid>



{/* 
                        <Grid item xs={6} md={6} ml={3} mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>권한</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                     
                        <InputGroup   style={{width:'250px' ,height:'40px'}}>
                      
                        <Form.Control
                            type="text"
                            name='compNum'
                            aria-describedby="btnGroupAddon"
                            style={{height:'40px'}}
                            
                        />
                  
                            <InputGroup.Text id="btnGroupAddon" onClick={Shshow}  style={{width:'50px' ,height:'40px'}}> <SearchIcon/></InputGroup.Text>
                        </InputGroup>
                        </Grid>    */}

                        
                    </Grid>
                </Container>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <button className='addButton' variant="primary" onClick={addDataBtn}>
                        저장
                    </button>
                </Modal.Footer>
            </Modal>



            {/* 수정 */}
            <Modal
                centered
                size="xsm"
                show={ModifyShow} onHide={MdClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#005b9e', width:'500px',height:'70px'}}>
                    <Modal.Title style={{color:'#ffffff'}}><strong>모바일 수정</strong></Modal.Title>
                </Modal.Header >
                <Modal.Body style={{backgroundColor:'#f1f2f6',  width:'500px' ,}}>

                    {/* <strong>아이디</strong>
                    <input name = "modifyId" type ='text' onChange={onChangeModifyData} value={modifyData.modifyId}></input>
                    <br/>
                    <strong>비밀번호</strong>
                    <input name = "modifyPw" type ='password' onChange={onChangeModifyData} value={modifyData.modifyPw}></input>
                    <br/>
                    <strong>사원코드</strong>
                    <input name = "modifyCode"type ='text' onChange={onChangeModifyData} value={modifyData.modifyCode}></input>
                    <br/>
                    <strong>사용자명</strong>
                    <input name = "modifyName" type ='text' onChange={onChangeModifyData} value={modifyData.modifyName}></input>
                 */}
                
                    <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={6} md={6} ml={3} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>아이디</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12}>
                        {/* <input style={{width:'250px',height:'40px'}} name="saveId" type="text" onChange={onChangeAddData}></input> */}
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon" 
                         name = "modifyId" type ='text' onChange={onChangeModifyData} value={modifyData.modifyId}/>
                        
                        </Grid>
                        <Grid item xs={6} md={6} ml={3} mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>비밀번호</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        {/* <input style={{width:'250px',height:'40px'}} name="savePw" type="password" onChange={onChangeAddData}></input> */}
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon"
                        name = "modifyPw" type ='password' onChange={onChangeModifyData} value={modifyData.modifyPw}/>
                        </Grid>
                        <Grid item xs={6} md={6} ml={3} mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>사원코드</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        {/* <input style={{width:'250px',height:'40px'}}name="saveUser" type="text" onChange={onChangeAddData}></input> */}
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon" 
                            name = "modifyCode"type ='text' onChange={onChangeModifyData} value={modifyData.modifyCode}/>
                        </Grid>

                        <Grid item xs={6} md={6} ml={3} mt={-2} style={{fontSize:'20px',color:'#777777'}}>
                            <strong>사용자명</strong>
                        </Grid>
                        <Grid item xs={6} md={6} ml={-12} mt={-2}>
                        {/* <input style={{width:'250px',height:'40px'}}name="saveUser" type="text" onChange={onChangeAddData}></input> */}
                        <Form.Control style={{width:'250px',height:'40px'}}  aria-describedby="btnGroupAddon" 
                            name = "modifyName" type ='text' onChange={onChangeModifyData} value={modifyData.modifyName}/>
                        </Grid>
                
                        </Grid>
                </Container>
                
                
                
                
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={MdClose}>
                        닫기
                    </Button>
                    <button className='addButton' variant="primary" onClick={updateBtn}>
                        저장
                    </button>
                </Modal.Footer>
            </Modal>

            {/* 삭제 */}
            <Modal
                centered
                size="xsm"
                show={DelShow} onHide={DelClose} animation={false}>
                <Modal.Header closeButton style={{backgroundColor:'#2F58B8',width:'500px'}}>
                    <Modal.Title style={{color:'#ffffff',width:'500px'}}><strong>모바일 삭제</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'#f1f2f6', width:'500px',}}>
                    <strong>{checkedItems.size}개 항목을 삭제하시겠습니까?</strong>
                </Modal.Body>
                <Modal.Footer style={{width:'500px',backgroundColor:'#ffffff'}}>
                    <Button variant="secondary" onClick={DelClose}>
                        닫기
                    </Button>
                    <button className='addButton' variant="primary" onClick={deleteBtn}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>






        </div>
    );
};

export default Ccom;