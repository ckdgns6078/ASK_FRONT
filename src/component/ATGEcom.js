import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Rsearch from './Rsearch';
import { Calendar } from 'antd';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';

const ATGEcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
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
const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const renderTitle = (title) => (
    <span>
      {title}
      <a
        style={{
          float: 'right',
        }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );
  const renderItem = (title, count) => ({
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
        <span>
          <UserOutlined /> {count}
        </span>
      </div>
    ),
  });

    return (
        <div style={{width:'1200px' ,position:'relative'}}>
             <h2  style={{color:' #2F58B8' ,position:'absolute' ,left:'0' ,top:'0px'}}><strong>출퇴근 현황 </strong></h2>
            <br/>
            <br/>
            <br/>


            <Grid container style={{width:'1200px'}}>
                <Grid item sx ml={10}>
                    <DropdownButton variant="Secondary" id="dropdown-basic-button" title="시간 날짜">
                        <Dropdown.Item href="#/action-1">  <Calendar onPanelChange={onPanelChange} /></Dropdown.Item>

                    </DropdownButton>
                  
                </Grid>
                <Grid item sx>
                <DropdownButton variant="Secondary" id="dropdown-basic-button" title="종료 날짜">
                        <Dropdown.Item href="#/action-1">  <Calendar onPanelChange={onPanelChange} /></Dropdown.Item>

                    </DropdownButton>
                </Grid>

                <Grid item sx>
                <DropdownButton variant="Secondary" id="dropdown-basic-button" title="이름">
                        <Dropdown.Item href="#/action-1">  <Calendar onPanelChange={onPanelChange} /></Dropdown.Item>

                    </DropdownButton>
                </Grid>
                

                <Grid item sx ml={60} >
                <AutoComplete
                    popupClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={500}
                    style={{
                    width: 250,
                    }}
                   
                >
                    <Input.Search size="large" placeholder="검색" />
                </AutoComplete>
                </Grid>
            </Grid>
            <br/>
            <table style={{
                width:"1000px",
                // border:"1px",
                // solid:"#fffff",
                // backgroundColor:'#bdc3c7'
                position:'absolute',
                left:'100px'
            }}>
                <tr style={{backgroundColor:'#bdc3c7' , }}>
                    <td style={{border:"1px solid gray"}}>
                    <Checkbox {...label} defaultChecked />
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>날짜</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>성명</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>부서</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>직급</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>출근시간</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>퇴근시간</strong>
                    </td>
                    <td style={{border:"1px solid gray"}}>
                        <strong>초가 근무 시간</strong>
                    </td>
                </tr>  
       
                    

                  {
                        data && data.map((e, idx) =>
                        <tr >
                            <td style={{border:"1px solid gray"}}><Checkbox {...label} defaultChecked /></td>
                            <td style={{border:"1px solid gray"}}>날짜 넣을거</td>
                            <td style={{border:"1px solid gray"}}>휴가기간</td>
                            <td style={{border:"1px solid gray"}}>항목 머시기 받아올거</td>
                            <td style={{border:"1px solid gray"}}>싱세 머시기</td>
                            <td style={{border:"1px solid gray"}}>상태 머시기 받아올거</td>
                            <td style={{border:"1px solid gray"}}>비고 머시기</td>
                            <td style={{border:"1px solid gray"}}>상태 머시기 받아올거</td>
                 
                        </tr>
                        )
                    }

                    
             

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
     
          
            {/* <Grid componenter style={{position:'absolute', }}>
                <Grid item  sx={{md:3}}><button  onClick={handleShow} className="Atmp1">  추가</button> </Grid>
                <Grid   sx={{md:-50}}><button  onClick={MdShow} className="Atmp1">  수정</button></Grid>
                <Grid   sx={{md:30}} > <button onClick={DeShow} className="Atmp1">  삭제</button></Grid>
            </Grid> */}
                <div>
                {/* <button   style={{position:'absolute' ,left:"0px"}} onClick={handleShow} className="Atmp1">  <strong>추가</strong></button>  */}
                {/* <button style={{position:'absolute' ,left:"110px"}} onClick={MdShow} className="Atmp1">  <strong>추가</strong></button>
                <button style={{position:'absolute' ,left:"0px"}} onClick={DeShow} className="Atmp1"> <strong>저장</strong> </button>
                 */}
              
                </div>
              <br/>  
              <br/>  
              <br/>  
            <hr></hr>




            {/* 추가 */}
            <Modal
            centered
            size="lg"
            show={show} onHide={handleClose} animation={false} id="AddModal">
            <Modal.Header closeButton  style={{backgroundColor:'#2F58B8',}}>
                <Modal.Title style={{color:'#ffffff'}}><strong> 사용자관리 추가</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:'#f1f2f6'}}>

            <br/>
             <Container>
                <Grid container spacing={4}>
                    <Grid item xs={6} md={5} ml={20} style={{fontSize:'25px'}}>
                        <strong>아이디</strong>
                    </Grid>
                    <Grid item xs={6} md={5} ml={-20}>
                    <input style={{width:'250px',height:'50px'}}  name="saveId" type="text" onChange={onChangeAddData}></input>
                    </Grid>
                    <Grid item xs={6} md={6} ml={20} style={{fontSize:'25px'}}>
                        <strong>비밀번호</strong>
                    </Grid>
                    <Grid item xs={6} md={6} ml={-28}>
                    <input style={{width:'250px',height:'50px'}}name="savePw" type="password" onChange={onChangeAddData}></input>
                    </Grid>
                    <Grid item xs={6} md={6} ml={20} style={{fontSize:'25px'}}>
                        <strong>사용자명</strong>
                    </Grid>
                    <Grid item xs={6} md={6} ml={-28}>
                    <input style={{width:'250px',height:'50px'}}name="saveUser" type="text" onChange={onChangeAddData}></input>
                    </Grid>
                    <Grid item xs={6} md={6} ml={20} style={{fontSize:'25px'}}>
                        <strong>권한</strong>
                    </Grid>
                    <Grid item xs={6} md={6} ml={-28}>
                    <input style={{width:'250px',height:'50px'}}name="saveAdvice" type="text" onChange={onChangeAddData}></input>
           

                    </Grid>
                    <Grid item xs={6} md={6} ml={63}  mt={-10}>
                    <Rsearch />

                    </Grid>
                </Grid>

             </Container>
             <br/>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeAddData}>
                    Close
                </Button>
                <Button variant="primary" onClick={pushAddData}>
                    추가
                </Button>
            </Modal.Footer>
        </Modal>
            {/* 수정 */}
            <Modal 
             centered
             size="xl"
            show={ModifyShow} onHide={MdClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>수정</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={MdClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={MdClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

            {/* 삭제 */}
            <Modal 
             centered
             size="xl"
            show={DelShow} onHide={DelClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>삭제 내용</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={DelClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={DelClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>



            {/* 검색  */}
  




        </div>
    );
};

export default ATGEcom;