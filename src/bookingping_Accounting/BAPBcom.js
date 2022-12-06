import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import { Calendar, DatePicker } from 'antd';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { message, Space } from 'antd';


const BAPBcom = () => {


    const [messageApi, contextHolder] = message.useMessage();
    //성공 alert
    const success = (contentText) => {
        messageApi.open({
            type: 'success',
            content: contentText,
            style: {
                marginTop: '20vh',
            },
        });
    };
    //실패 alert
    const error = (contentText) => {
        messageApi.open({
            type: 'error',
            content: contentText,
        });
    };
    //주의 alert
    const warning = (contentText) => {
        messageApi.open({
            type: 'warning',
            content: contentText,
        });
    };

    //기본 데이터
    const [data, setData] = useState();
    const [modifyData, setModifyData] = useState({
        purchaseId: "",
        p_division: "",
        p_date: "",
        p_dateYear: "",
        p_dateMonth: "",
        p_dateDay: "",
        p_taxType: "",
        p_item: "",
        p_iCount: "",
        p_unitPrice: "",
        p_supplyValue: "",
        p_surTax: "",
        p_totalPrice: "",
        p_clientCompNum: "",
        p_clientCompNum1: "",
        p_clientCompNum2: "",
        p_clientCompNum3: "",
        p_clientName: "",
        totalsupplyValue: "",
        totalsurTax: "",
        total: "",
        taxBill : ""
    });
    const [addData, setAddData] = useState({
        purchaseId: "",
        p_division: "",
        p_date: "",
        p_dateYear: "",
        p_dateMonth: "",
        p_dateDay: "",
        p_taxType: "",
        p_item: "",
        p_iCount: "",
        p_unitPrice: "",
        p_supplyValue: "",
        p_surTax: "",
        p_totalPrice: "",
        p_clientCompNum: "",
        p_clientCompNum1: "",
        p_clientCompNum2: "",
        p_clientCompNum3: "",
        p_clientName: "",
        totalsupplyValue: "",
        totalsurTax: "",
        total: "",
    });


    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.post('http://192.168.2.91:5000/income_Read', {
            compCode: sessionStorage.getItem("uid")
        }).then(function (response) {
            console.log("income_Read", response.data);
            setData(response.data);
        }).catch(function (err) {
            console.log("income_Read error", err);
        });
    }



    //추가 모델
    const [add, setAdd] = useState(false);
    const addClose = () => {
        setAddData({
            purchaseId: "",
            p_division: "",
            p_date: "",
            p_dateYear: "",
            p_dateMonth: "",
            p_dateDay: "",
            p_taxType: "",
            p_item: "",
            p_iCount: "",
            p_unitPrice: "",
            p_supplyValue: "",
            p_surTax: "",
            p_totalPrice: "",
            p_clientCompNum: "",
            p_clientCompNum1: "",
            p_clientCompNum2: "",
            p_clientCompNum3: "",
            p_clientName: "",
            totalsupplyValue: "",
            totalsurTax: "",
            total: "",
        })
        setAdd(false);
    }
    const addShow = () => setAdd(true);

    //수정 모델
    const [modify, setModify] = useState(false);
    const modifyClose = () => setModify(false);
    const modifyShow = (e) =>{
        axios.post('http://192.168.2.91:5000/income_Modal',{
            purchaseId : e.purchaseId
        }).then (function ( response ){
            let date = response.data[0].p_date.split('-');
            setModifyData({
                purchaseId: response.data[0].purchaseId ,
                p_division: response.data[0].p_division ,
                p_date: response.data[0].p_date ,
                p_dateYear: date[0] ,
                p_dateMonth: date[1] ,
                p_dateDay: date[2] ,
                p_taxType: response.data[0].p_taxType ,
                p_item: response.data[0].p_item ,
                p_iCount: response.data[0].p_iCount ,
                p_unitPrice: response.data[0].p_unitPrice ,
                p_supplyValue: response.data[0].p_supplyValue ,
                p_surTax: response.data[0].p_surTax ,
                p_totalPrice: response.data[0].p_totalPrice ,
                p_clientCompNum: response.data[0].p_clientCompNum ,
                p_clientCompNum1: response.data[0].p_clientCompNum.substr(0,3) ,
                p_clientCompNum2: response.data[0].p_clientCompNum.substr(3,2) ,
                p_clientCompNum3: response.data[0].p_clientCompNum.substr(5) ,
                p_clientName: response.data[0].p_clientName ,
                totalsupplyValue: response.data[0].totalsupplyValue ,
                totalsurTax: response.data[0].totalsurTax ,
                total: response.data[0].total ,
                taxBill : response.data[0].taxBill
            })
        }).catch ( function ( err ){
            console.log(" income_Modal  error : " , err);
            let text = '데이터를 가져오는데 오류가 발생했습니다. 새로고침 후 다시 시도해주세요.';
            error(text);
        })

        setModify(true);
    } 

    const [del, setDel] = useState(false);
    const delClose = () => setDel(false);
    const delShow = () => setDel(true);

    //구분돋보기 모델
    const [mag, setMag] = useState(false);
    const magClose = (e) => setMag(false);
    const magShow = () => setMag(true);

    //유형돋보기 모델
    const [mago, setMago] = useState(false);
    const magoClose = (e) => setMago(false);
    const magoShow = () => setMago(true);



    const [ test1 , setTest1 ] = useState();







    //입력값 onChange 함수
    const onChangeModify = (e) => {
        const { value, name } = e.target;
        setModifyData({
            ...modifyData,
            [name]: value
        });
        if (name == 'p_unitPrice' || name == 'p_iCount') {
            let temp = { ...modifyData }
            temp = {
                ...temp,
                [name] : value
            }
            temp.p_supplyValue = temp.p_unitPrice * temp.p_iCount;
            temp.p_surTax = temp.p_supplyValue / 10;
            if (temp.p_taxType == '비과세') {
                temp.p_surTax = 0
            }
            temp.p_totalPrice = temp.p_supplyValue + temp.p_surTax;
            setModifyData(temp);
        }
    }


    const onChangeAdd = (e) => {
        const { value, name } = e.target;
        setAddData({
            ...addData,
            [name]: value
        });
        console.log(e.target , name , value);
    }

    const pushAddData = () => {
        axios.post('http://192.168.2.91:5000/income_Create', {
            compCode : sessionStorage.getItem('uid'),
            p_division: addData.p_division,
            p_date: String(addData.p_dateYear) + String(addData.p_dateMonth) + String(addData.p_dateMonth),
            p_taxType: addData.p_taxType,
            p_item: addData.p_item,
            p_iCount: addData.p_iCount,
            p_unitPrice: addData.p_unitPrice,
            p_supplyValue: addData.p_supplyValue,
            p_surTax: addData.p_surTax,
            p_totalPrice: addData.p_totalPrice,
            p_clientCompNum: String(addData.p_clientCompNum1) +  String(addData.p_clientCompNum2) + String(addData.p_clientCompNum3),
            p_clientName: addData.p_clientName
        }).then(function (response) {
            if (response.data) {
                let text = "매입/매출 등록 완료";
                success(text);
                getData();
                addClose();
            } else {
                let text = "매입/매출 등록에 실패했습니다";
                warning(text);
            }
        }).catch(function (err) {
            console.log("clientCreate error :", err);
            let text = "매입/매출 등록에서 오류가 발생했습니다. 새로고침 후 다시 실행해 주세요.";
            error(text);
        });
    }

    const pushA = () =>{
        if( addData.p_division == '매출'){
            pushAddData()
        }
        else{

            
            const formData = new  FormData();
            const fData ={
                compCode : sessionStorage.getItem('uid'),
                p_division: addData.p_division,
                p_date: String(addData.p_dateYear) + String(addData.p_dateMonth) + String(addData.p_dateMonth),
                p_taxType: addData.p_taxType,
                p_item: addData.p_item,
                p_iCount: addData.p_iCount,
                p_unitPrice: addData.p_unitPrice,
                p_supplyValue: addData.p_supplyValue,
                p_surTax: addData.p_surTax,
                p_totalPrice: addData.p_totalPrice,
                p_clientCompNum: String(addData.p_clientCompNum1) +  String(addData.p_clientCompNum2) + String(addData.p_clientCompNum3),
                p_clientName: addData.p_clientName
            };
        let file = document.getElementById('upload');
        formData.append('file' , file.files[0]);
        formData.append('request', new Blob([JSON.stringify(fData)], { type: "application/json" }));
        
        axios.post('http://192.168.2.91:5000/taxfile_create',formData,{
            headers :{
                'Content-Type': 'multipart/form-data'
            }
        }).then(function ( response ){  
            if (response.data) {
                let text = "매입/매출 등록 완료";
                success(text);
                getData();
                addClose();
            } else {
                let text = "매입/매출 등록에 실패했습니다";
                warning(text);
            }
        }).catch ( function ( err ){
            console.log("taxfile_create error : " ,err);
            let text = "저장하는데 오류가 발생했습니다. 새로고침 후 다시 실행해주세요."
            error(text);
        })
            
    }
}
    const pushModifyData = () => {
        axios.post('http://192.168.2.91:5000/income_Update', {
            purchaseId: modifyData.purchaseId ,
            p_division: modifyData.p_division ,
            p_date: String(modifyData.p_dateYear) + String(modifyData.p_dateMonth) + String(modifyData.p_dateDay),
            p_taxType: modifyData.p_taxType ,
            p_item: modifyData.p_item ,
            p_iCount: modifyData.p_iCount ,
            p_unitPrice: modifyData.p_unitPrice ,
            p_supplyValue: modifyData.p_supplyValue ,
            p_surTax: modifyData.p_surTax ,
            p_totalPrice: modifyData.p_totalPrice ,
            p_clientCompNum: String(modifyData.p_clientCompNum1) + String(modifyData.p_clientCompNum2) + String(modifyData.p_clientCompNum3) ,
            p_clientName: modifyData.p_clientName ,
            totalsupplyValue: modifyData.totalsupplyValue ,
            totalsurTax: modifyData.totalsurTax ,
            total: modifyData.total ,
        }).then(function (response) {
            console.log(" response.data" , response.data);
            if (response.data) {
                let text = "거래처 수정 완료";
                success(text);
                getData();
                modifyClose();
            } else {
                let text = "명세표 등록에 실패했습니다";
                warning(text);
            }
        }).catch(function (err) {
            console.log("clientUpdate error :", err);
            let text = "명세표 저장에서 오류가 발생했습니다. 새로고침 후 다시 실행해 주세요.";
            error(text);
        });
    }

    const pushDeleteData = () => {
        axios.post('http://192.168.2.82:5000/clientDelete', {
            clientCompNum: String(modifyData.clientCompNum1) + String(modifyData.clientCompNum2) + String(modifyData.clientCompNum3)
        }).then(function (response) {
            if (response.data) {
                let text = "거래처를 삭제했습니다.";
                success(text);
                getData();
                delClose();
                modifyClose();
            } else {
                let text = "거래처 삭제에 실패했습니다.";
                warning(text);
                delClose();
            }
        }).catch(function (err) {
            console.log("clientDelete error :", err);
            let text = "명세서 삭제에서 오류가 발생하였습니다.";
            error(text);
        })
    }

    //구분 버튼
    const magBtn1 =(e) =>{
        if(add){
            const temp = { ...addData};
            temp.p_division = e.target.innerText;
            setAddData(temp);
            magClose();

        }
        if(modify){
            const temp = {...modifyData};
            temp.p_division = e.target.innerText;
            setModifyData(temp);
            magClose();
        }
    }

    //유형 버튼
    const magBtn2 =(e)=>{
        if(add){
            const temp = { ...addData};
            temp.p_taxType = e.target.innerText;
            setAddData(temp);
            magoClose();

        }
        if(modify){
            const temp = {...modifyData};
            temp.p_taxType = e.target.innerText;
            setModifyData(temp);
            magClose();
        }
    }

    const allBtn = () => {
        axios.post('http://192.168.2.91:5000/income_Read', {
            compCode: sessionStorage.getItem('uid')
        }).then(function (response) {
            console.log("전체 : ",response.data)
            setData(response.data);
        }).catch(function (err) {
            console.log(" income_Read error : ", err);
        });
    }
    const buyBtn = () => {
        axios.post('http://192.168.2.91:5000/income_only', {
            compCode: sessionStorage.getItem('uid')
        }).then(function (response) {
            console.log(" 매입 :" , response.data)
            setData(response.data);
        }).catch(function (err) {
            console.log(" income_only error : ", err);
        });
    }
    const payBtn = () => {
        axios.post('http://192.168.2.91:5000/outcome_only', {
            compCode: sessionStorage.getItem('uid')
        }).then(function (response) {
            console.log(" 매출" , response.data)
            setData(response.data);
        }).catch(function (err) {
            console.log(" outcome_only error : ", err);
        });
    }







    //달력
    const [dateStart, setDateStart] = useState(); // 시작일
    const [dateEnd, setDateEnd] = useState();    // 종료일
    const [search, setSearch] = useState();     //이름

    const searchAddData = () => {
        console.log("daily Name :", search);
        console.log("daily Name :", dateStart);
        console.log("daily Name :", dateEnd);

        axios.post('http://192.168.2.91:5000/income_Search', {
            compCode: sessionStorage.getItem("uid"),
            p_clientName : search,//이름,
            startDate : dateStart,//시작일 ,
            endDate : dateEnd,//종료일자
        }).then(function (response) {
            console.log("search_inOutInfo data : ", response.data);
            setData(response.data);
        }).catch(function (err) {
            console.log("search_inOutInfo error", err);
        });
    }
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());

    //시작일 onChange
    const onChangeStart = (date) => {
        console.log("@@@@@@@@@", date);
        let year = null;
        let month = null;
        let day = null;
        let total = null;
        if (date == null) {
            setDateStart(date);
        } else {
            year = String(date.$y);
            month = String(date.$M + 1);
            day = String(date.$D);
            if (month < 10) {
                month = "0" + String(month);
            }
            if (day < 10) {
                day = "0" + String(day);
            }
            total = year + month + day;
            console.log("year", year);
            console.log("month", month);
            console.log("day ", day);
            setDateStart(total);
        }
    }
    //종료일 onChange
    const onChangeEnd = (date) => {
        console.log("@@@@@@@@@@", date);
        let year = null;
        let month = null;
        let day = null;
        let total = null;
        if (date == null) {
            setDateEnd(date);
        } else {
            year = String(date.$y);
            month = String(date.$M + 1);
            day = String(date.$D);
            if (month < 10) {
                month = "0" + String(month);
            }
            if (day < 10) {
                day = "0" + String(day);
            }
            total = year + month + day;
            setDateEnd(total);
        }
    }
    //이름 입력 onChange
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    //엔터 입력 
    const enterkey = () => {
        if (window.event.keyCode == 13) {
            searchAddData();
        }
    }

    const [checkedItems, setCheckedItems] = useState(new Set());
        //여러명 출력용
        const printCheck = () =>{
            let key = "";
            for ( let i of checkedItems){
              key+="&id="+i;
            }
            console.log(key);
    
            window.open('http://localhost:3000/Tax?id=1'+key);
        }
    

 

    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            {contextHolder}
            <h2 style={{ color: ' #2F58B8', position: 'absolute', left: '0', top: '0px' }}><strong>매입관리 </strong></h2>
            <br />
            <br />
            <br />

            <Grid container style={{ width: '1400px' }}>
                <Grid><div style={{ fontSize: '22px' }}>시작 날짜</div></Grid>
                <Grid>
                    <div >
                        <DatePicker
                            selected={date => setStartDate}
                            onChange={date => onChangeStart(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            style={{ height: '40px' }}
                        />


                    </div>
                </Grid>
                <Grid ml={1}><div style={{ fontSize: '22px' }}>종료 날짜</div></Grid>
                <Grid>
                    <div>
                        <DatePicker
                            selected={endDate => setendDate}
                            onChange={date => onChangeEnd(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            style={{ height: '40px' }}
                        />
                    </div>
                </Grid>




                {/* 검색창 */}
                <Grid item sx ml={1} >
                    <InputGroup style={{ width: '200px', height: '10px' }}>

                        <Form.Control
                            type="text"
                            name='search'
                            aria-describedby="btnGroupAddon"
                            onChange={onChangeSearch}
                            style={{ height: '40px' }}
                            onKeyUp={enterkey}

                        />
                        <InputGroup.Text id="btnGroupAddon" onClick={searchAddData} style={{ width: '50px', height: '40px' }}> <SearchIcon /></InputGroup.Text>
                    </InputGroup>

                </Grid>
            </Grid>

            <br />
            <Table >
                <thead style={{ height: '60px' }}>
                    <tr style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>
                        <td style={{ border: "1px solid #d8d8d8", fontSize: '22px' }}>
                            <input type="checkbox" id="allCheck" value="allCheck"></input>
                        </td>



                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>날짜</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>공급처</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>구분</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>품목</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>수량</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>단가</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>유형</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>공급가액</strong>
                        </td>
                        <td style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>부가세</strong>
                        </td>
                        <td colSpan ='2' style={{ border: "1px solid #d8d8d8", color: '#777777', fontSize: '22px' }}>
                            <strong>합계</strong>
                        </td>


                    </tr>
                </thead>
                <tbody>

                    {
                        data && data.map((e, idx) =>
                            <tr >

                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}> <input type="checkbox" id="allCheck" value="allCheck"></input></td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.p_date}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>
                                    <Button style={{ fontSize: '22px' }} name={e.purchaseId} onClick={() => modifyShow(e)} variant="link">
                                        <strong>
                                            {e.p_clientName}
                                        </strong>
                                    </Button>
                                </td>
                                {e.p_division == '매입' ?
                                    <td style={{ border: "1px solid #d8d8d8", color: '#E05326', fontSize: '22px' }}><strong>{e.p_division}</strong></td>
                                    :
                                    <td style={{ border: "1px solid #d8d8d8", color: '#005B9E', fontSize: '22px' }}><strong>{e.p_division}</strong></td>

                                }
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.p_item}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px'  }}>{e.p_iCount}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' , textAlign: 'right'}}>{e.p_unitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' }}>{e.p_taxType}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' , textAlign: 'right'}}>{e.p_supplyValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' , textAlign: 'right'}}>{e.p_surTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' , textAlign: 'right' ,width:'150px'}}>
                                    {e.p_division == '매입' && e.p_totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px'  , textAlign: 'right',width:'150px'}}>
                                    {e.p_division == '매출' && e.p_totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </td>
                            </tr>
                        )
                    }

                    <tr style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" ,}}>
                        <td colSpan='8' style={{ fontSize: '22px' , textAlign:'right'}}> <strong>합계</strong></td>
                        <td  style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' , textAlign: 'right' }}> <strong>{ data && data[0].totalsupplyValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></td>
                        <td  style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' , textAlign: 'right' }}> <strong>{ data && data[0].totalsurTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></td>
                        <td  style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' , textAlign: 'right' }}> <strong>{ data && data[0].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></td>
                        <td  style={{ border: "1px solid #d8d8d8", color: '#000', fontSize: '22px' , textAlign: 'right' }}> <strong>{ data && data[0].total1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></td>

                    </tr>

                </tbody>
            </Table>
            <div>
                <button style={{ position: 'absolute', right: "550px", top: '65px' ,width:'100px' }} onClick={allBtn} className="Atmp1">  <strong>전체</strong></button>
                <button style={{ position: 'absolute', right: "440px", top: '65px' ,width:'100px' }} onClick={buyBtn} className="Atmp1">  <strong>매입</strong></button>
                <button style={{ position: 'absolute', right: "330px", top: '65px'  ,width:'100px'}} onClick={payBtn} className="Atmp1">  <strong>매출</strong></button>
                <button style={{ position: 'absolute', right: "220px", top: '65px'  ,width:'100px'}} onClick={addShow} className="Atmp1">  <strong>추가</strong></button>
                <button style={{ position: 'absolute', right: "110px", top: '65px'  ,width:'100px'}} onClick={addShow} className="Atmp1">  <strong>삭제</strong></button>
                <button style={{ position: 'absolute', right: "0px", top: '65px' ,width:'100px'}} onClick={printCheck} className="Atmp1">  <strong>인쇄/저장</strong></button>
            </div>






            {/* 추가 */}
            <Modal
                centered
                size="xl"
                show={add} onHide={addClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>매입/매출 등록</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '', }}>

                    <Container>


                        <Table style={{
                            textAlign: "center",
                            width: "100%", border: "1px solid #d8d8d8",
                        }} >
                            <tr>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>구분</td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '300px' }}>
                                <InputGroup >
                                    <Form.Control
                                        type="addpayCalc"
                                        name="p_division"
                                        value={addData.p_division}
                                        aria-describedby="btnGroupAddon"
                                        style={{ height: '40px' ,fontSize:'15px',textAlign:'center'}}
                                        onChage={onChangeAdd}
                                     
                                    />
                                    <InputGroup.Text id="btnGroupAddon" style={{ width: '50px', height: '40px' }}> <SearchIcon onClick= {magShow}/></InputGroup.Text>
                                </InputGroup>
                                </td>
                                    <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>날짜</td>
                                   
                                    <td>  <Form.Control style={{ width: '150px', height: '100%' }} type="text"  aria-describedby="btnGroupAddon" name='p_dateYear' onChange={onChangeAdd}/></td>
                                    <td>/</td>
                                    <td><Form.Control style={{ width: '150px', height: '100%' }} type="text" aria-describedby="btnGroupAddon" name='p_dateMonth' onChange={onChangeAdd}/></td>
                                    <td>/</td>
                                    <td> <Form.Control style={{ width: '150px', height: '100%' }} type="text"  aria-describedby="btnGroupAddon" name='p_dateDay' onChange={onChangeAdd}/></td>

                            
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' ,height:'60px'}}>공급처명</td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text"  aria-describedby="btnGroupAddon" name='p_clientName' onChange={onChangeAdd}/>
                                </td>

                                <td style={{ border: "1px solid #d8d8d8", height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>사업자번호</td>
                                  
                                <td style={{borderTop: "1px solid #d8d8d8"}}>  <Form.Control style={{ width: '150px', height: '100%' }} type="text" name='p_clientCompNum1' aria-describedby="btnGroupAddon" onChange={onChangeAdd}  /></td>
                                <td style={{borderTop: "1px solid #d8d8d8"}}>─</td>
                                <td style={{borderTop: "1px solid #d8d8d8"}}><Form.Control style={{ width: '150px', height: '100%' }} type="text" name='p_clientCompNum2' aria-describedby="btnGroupAddon" onChange={onChangeAdd} /></td>
                                <td style={{borderTop: "1px solid #d8d8d8"}}>─</td>
                                <td style={{borderTop: "1px solid #d8d8d8"}}> <Form.Control style={{ width: '150px', height: '100%' }} type="text" name='p_clientCompNum3' aria-describedby="btnGroupAddon" onChange={onChangeAdd} /></td>

                                   
                            </tr>
                        </Table>

                        
                        <Table style={{
                            textAlign: "center",
                            width: "100%", border: "1px solid #d8d8d8",
                        }} >
                            <tr>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>유형</td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>품목</td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>수량</td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>단가</td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>공급가액</td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>부가세</td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>합계</td>
                            </tr>
                            <tr>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <InputGroup >
                                    <Form.Control
                                        type="addpayCalc"
                                        name="p_taxType"
                                        value={addData.p_taxType}
                                        aria-describedby="btnGroupAddon"
                                        onChange={onChangeAdd}
                                        style={{ height: '40px' ,fontSize:'15px',textAlign:'center'}}
                                     
                                    />
                                    <InputGroup.Text id="btnGroupAddon" style={{ width: '50px', height: '40px' }}> <SearchIcon onClick= {magoShow}/></InputGroup.Text>
                                </InputGroup>
                                </td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='p_item' aria-describedby="btnGroupAddon" onChange={onChangeAdd}/>
                                </td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='p_iCount' aria-describedby="btnGroupAddon" onChange={onChangeAdd} />
                                </td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='p_unitPrice' aria-describedby="btnGroupAddon" onChange={onChangeAdd} />
                                </td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='p_supplyValue' aria-describedby="btnGroupAddon" onChange={onChangeAdd} />
                                </td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='p_surTax' aria-describedby="btnGroupAddon" onChange={onChangeAdd} />
                                </td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='p_totalPrice' aria-describedby="btnGroupAddon" onChange={onChangeAdd} />
                                </td>
                            </tr>
                        </Table>


                    {
                        addData.p_division == '매입' ? <input type='file' id ='upload' accept='image/*' /> : ''

                    }
                    </Container>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <h5><strong> 유형 / 품목 / 수량 / 단가만 입력하면 자동 계산됩니다.</strong></h5>
                    <Button variant="secondary" onClick={addClose}>
                        <strong>취소</strong>
                    </Button>
                    <button className="addButton" onClick={pushA}>
                        <strong>등록</strong>
                    </button>
                </Modal.Footer>
            </Modal>

            {/* 수정 */}
            <Modal
                centered
                size="xl"
                show={modify} onHide={modifyClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong>매입/매출 상세</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '', }}>

                    <Container>


                        <Table style={{
                            textAlign: "center",
                            width: "100%", border: "1px solid #d8d8d8",
                        }} >
                            <tr>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>구분</td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '300px' }}>
                                <InputGroup >
                                    <Form.Control
                                        type="addpayCalc"
                                        name="p_division"
                                        value={modifyData.p_division}
                                        aria-describedby="btnGroupAddon"
                                        style={{ height: '40px' ,fontSize:'15px',textAlign:'center'}}
                                        onChage={onChangeModify}
                                     
                                    />
                                    <InputGroup.Text id="btnGroupAddon" style={{ width: '50px', height: '40px' }}> <SearchIcon onClick= {magShow}/></InputGroup.Text>
                                </InputGroup>
                                </td>
                                    <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>날짜</td>
                                   
                                    <td>  <Form.Control style={{ width: '150px', height: '100%' }} type="text"  aria-describedby="btnGroupAddon" name='p_dateYear' onChange={onChangeModify} value={modify && modifyData && modifyData.p_dateYear}/></td>
                                    <td>/</td>
                                    <td><Form.Control style={{ width: '150px', height: '100%' }} type="text" aria-describedby="btnGroupAddon" name='p_dateMonth' onChange={onChangeModify} value={modify && modifyData && modifyData.p_dateMonth}/></td>
                                    <td>/</td>
                                    <td> <Form.Control style={{ width: '150px', height: '100%' }} type="text"  aria-describedby="btnGroupAddon" name='p_dateDay' onChange={onChangeModify} value={modify && modifyData && modifyData.p_dateDay}/></td>

                            
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' ,height:'60px'}}>공급처명</td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text"  aria-describedby="btnGroupAddon" name='p_clientName' onChange={onChangeModify} value={modify && modifyData && modifyData.p_clientName} />
                                </td>

                                <td style={{ border: "1px solid #d8d8d8", height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>사업자번호</td>
                                  
                                <td style={{borderTop: "1px solid #d8d8d8"}}>  <Form.Control style={{ width: '150px', height: '100%' }} type="text" name='p_clientCompNum1' aria-describedby="btnGroupAddon" onChange={onChangeModify} value={modify && modifyData && modifyData.p_clientCompNum1}  /></td>
                                <td style={{borderTop: "1px solid #d8d8d8"}}>─</td>
                                <td style={{borderTop: "1px solid #d8d8d8"}}><Form.Control style={{ width: '150px', height: '100%' }} type="text" name='p_clientCompNum2' aria-describedby="btnGroupAddon" onChange={onChangeModify} value={modify && modifyData && modifyData.p_clientCompNum2} /></td>
                                <td style={{borderTop: "1px solid #d8d8d8"}}>─</td>
                                <td style={{borderTop: "1px solid #d8d8d8"}}> <Form.Control style={{ width: '150px', height: '100%' }} type="text" name='p_clientCompNum3' aria-describedby="btnGroupAddon" onChange={onChangeModify} value={modify && modifyData && modifyData.p_clientCompNum3} /></td>

                                   
                            </tr>
                        </Table>

                        
                        <Table style={{
                            textAlign: "center",
                            width: "100%", border: "1px solid #d8d8d8",
                        }} >
                            <tr>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>유형</td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>품목</td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>수량</td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>단가</td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>공급가액</td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>부가세</td>
                                <td style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px', backgroundColor: '#f7f7f7', color: '#777777' }}>합계</td>
                            </tr>
                            <tr>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <InputGroup >
                                    <Form.Control
                                        type="addpayCalc"
                                        name="p_taxType"
                                        aria-describedby="btnGroupAddon"
                                        onChange={onChangeModify} 
                                        value={modify && modifyData && modifyData.p_taxType}
                                        style={{ height: '40px' ,fontSize:'15px',textAlign:'center'}}
                                     
                                    />
                                    <InputGroup.Text id="btnGroupAddon" style={{ width: '50px', height: '40px' }}> <SearchIcon onClick= {magoShow}/></InputGroup.Text>
                                </InputGroup>
                                </td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='p_item' aria-describedby="btnGroupAddon" onChange={onChangeModify} value={modify && modifyData && modifyData.p_item} />
                                </td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='p_iCount' aria-describedby="btnGroupAddon" onChange={onChangeModify} value={modify && modifyData && modifyData.p_iCount} />
                                </td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='p_unitPrice' aria-describedby="btnGroupAddon" onChange={onChangeModify} value={modify && modifyData && modifyData.p_unitPrice} />
                                </td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='p_supplyValue' aria-describedby="btnGroupAddon" onChange={onChangeModify} value={modify && modifyData && modifyData.p_supplyValue} />
                                </td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='p_surTax' aria-describedby="btnGroupAddon" onChange={onChangeModify} value={modify && modifyData && modifyData.p_surTax} />
                                </td>
                                <td  style={{ border: '1px solid #d8d8d8 ', height: '40px', width: '150px' }}>
                                <Form.Control style={{ width: '100%', height: '100%' }} type="text" name='p_totalPrice' aria-describedby="btnGroupAddon" onChange={onChangeModify} value={modify && modifyData && modifyData.p_totalPrice} />
                                </td>
                            </tr>
                        </Table>
                        {modifyData && modifyData.taxBill && <a href={modifyData.taxBill} target='_blank'>세금계산서</a> }


                    </Container>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ffffff' }}>
                    <h5><strong> 유형 / 품목 / 수량 / 단가만 입력하면 자동 계산됩니다.</strong></h5>
                    <Button variant="secondary" onClick={modifyClose}>
                        <strong>취소</strong>
                    </Button>
                    <button className="addButton" onClick={pushModifyData}>
                        <strong>수정</strong>
                    </button>
                </Modal.Footer>
            </Modal>



            {/* 구분 돋보기*/}
            <Modal 
                size="sm"
                centered
                show={mag} onHide={magClose} animation={true}>
                <Modal.Header closeButton  style={{backgroundColor:'#005b9e',}}>
                <Modal.Title  style={{color:'#ffffff'}}> <strong>구분</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:''}}> 

        
                <Table 
                        hover
                        style={{
                        textAlign:"center",
                      }} >
                        <thead>
                    <tr style={{border:"1px solid #d8d8d8",backgroundColor:'#f7f7f7'}}>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'22px'}}><strong></strong></td>
                    <td style={{fontSize:'22px'  ,color:'#777777'}}>구분목록</td>
                 
                    </tr>
                    </thead>
                    <tbody>
                    <tr style={{border:"1px solid #d8d8d8"}}>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'22px'}}><strong>1</strong></td>
                    <td style={{fontSize:'22px'  ,color:'#777777'}}><Button variant="link" onClick={magBtn1}>매입</Button></td>
              
                    </tr>
                    <tr style={{border:"1px solid #d8d8d8",}}>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'22px'}}><strong>2</strong></td>
                    <td style={{fontSize:'22px'  ,color:'#777777'}}><Button variant="link" onClick={magBtn1}>매출</Button></td>
              
                    </tr>
                    

                
             


                </tbody>
                </Table>

                </Modal.Body>

                </Modal>


                      
            {/* 유형 돋보기*/}
            <Modal 
                size="sm"
                centered
                show={mago} onHide={magoClose} animation={true}>
                <Modal.Header closeButton  style={{backgroundColor:'#005b9e',}}>
                <Modal.Title  style={{color:'#ffffff'}}> <strong>유형</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:''}}> 

        
                <Table 
                        hover
                        style={{
                        textAlign:"center",
                      }} >
                        <thead>
                    <tr style={{border:"1px solid #d8d8d8",backgroundColor:'#f7f7f7'}}>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'22px'}}><strong></strong></td>
                    <td style={{fontSize:'22px'  ,color:'#777777'}}>유형목록</td>
                 
                    </tr>
                    </thead>
                    <tbody>
                    <tr style={{border:"1px solid #d8d8d8"}}>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'22px'}}><strong>1</strong></td>
                    <td style={{fontSize:'22px'  ,color:'#777777'}}><Button variant="link" onClick={magBtn2}>비과세</Button></td>
              
                    </tr>
                    <tr style={{border:"1px solid #d8d8d8",}}>
                    <td style={{border:"1px solid #d8d8d8",fontSize:'22px'}}><strong>2</strong></td>
                    <td style={{fontSize:'22px'  ,color:'#777777'}}><Button variant="link" onClick={magBtn2}>과세</Button></td>
              
                    </tr>
                    

                
             


                </tbody>
                </Table>

                </Modal.Body>

                </Modal>



















        </div>
    );
};

export default BAPBcom;