
import React from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { width } from '@mui/system';
import axios from "axios";
import { useEffect, useState } from 'react'



const Tax = () => {

    //링크 가져오는 변수
    const link = document.location.href;
    const urlParams = new URLSearchParams(link);
    const arr = [];
    const [data, setData] = useState();
    var now = new Date();

    useEffect(() => {
        const value = urlParams.values();
        for (let i of value) {
            arr.push(i);
        }
        if (arr.length > 1) {
            arr.shift();
        }
        getData();

    }, []);

    window.onload = function () {
        setTimeout(function () {
            window.print();
        }, 1000);
    }

    const getData = () => {
        console.log("session" , sessionStorage.getItem('uid'))
        console.log('arr : ', arr);
        axios.post('http://192.168.2.82:5000/taxPaper', {
            compCode: sessionStorage.getItem('uid'),
            purchaseList: arr
        }).then(function (response) {
            console.log("@@@@@@@@@@@", response.data);
            setData(response.data);
        }).catch(function (err) {
            console.log("read_inOutInfo error", err);
        });
    }









    return (
        <div>
            <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Table style={{ width: "700px", border: "1px solid blue" }}>
                    <tr style={{ border: "1px solid blue", color: 'blue' }}>
                        <td colspan='15' rowspan='2' style={{ height: '30px', width: '50px', fontSize: '25px', }}> 세 금 계 산 서 </td>
                        <td colSpan='7' rowspan='2' style={{ width: '10px', height: '30px' }}>공급자 보관용</td>
                        <td colSpan='4' style={{ border: "1px solid blue", color: 'blue', width: '100px', height: '10px' }}>책 번 호</td>
                        <td colSpan='3' style={{ border: "1px solid blue", color: 'blue', textAlign: 'right' }}>권</td>
                        <td colSpan='3' style={{ border: "1px solid blue", color: 'blue', textAlign: 'right' }}>호</td>
                    </tr>
                    <tr>
                        <td colSpan='4' style={{ border: "1px solid blue", color: 'blue', height: '10px' }}>일 현 번 호</td>
                        <td colSpan='6' style={{ border: "1px solid blue", color: 'blue' }}></td>
                    </tr>
                    <tr>
                        <td rowspan='5' style={{ border: "1px solid blue", color: 'blue', width: "5px", height: "70px" }}>공급자</td>
                        <td colSpan='3' style={{ border: "1px solid blue", color: 'blue', width: "500px", height: '35px', fontSize: '12px' }}>등록번호</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '5px' }}>{data && data[0].compNum.substr(0, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '5px' }}>{data && data[0].compNum.substr(1, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '5px' }}>{data && data[0].compNum.substr(2, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '5px' }}>-</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '5px' }}>{data && data[0].compNum.substr(3, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '5px' }}>{data && data[0].compNum.substr(4, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '5px' }}>-</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '5px' }}>{data && data[0].compNum.substr(5, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '5px' }}>{data && data[0].compNum.substr(6, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '5px' }}>{data && data[0].compNum.substr(7, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '5px' }}>{data && data[0].compNum.substr(8, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '5px' }}>{data && data[0].compNum.substr(9, 1)}</td>
                        <td rowspan='4' style={{ border: "1px solid blue", color: 'blue', width: "20px" }}>공급받는자</td>
                        <td colSpan='3' style={{ border: "1px solid blue", color: 'blue', width: "15px", height: '12px' }}>등록번호</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '20px' }}>{data && data[0].clientCompNum.substr(0, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '20px' }}>{data && data[0].clientCompNum.substr(1, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '20px' }}>{data && data[0].clientCompNum.substr(2, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '20px' }}>-</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '20px' }}>{data && data[0].clientCompNum.substr(3, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '20px' }}>{data && data[0].clientCompNum.substr(4, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '20px' }}>-</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>{data && data[0].clientCompNum.substr(5, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>{data && data[0].clientCompNum.substr(6, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>{data && data[0].clientCompNum.substr(7, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>{data && data[0].clientCompNum.substr(8, 1)}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '20px' }}>{data && data[0].clientCompNum.substr(9, 1)}</td>

                    </tr>
                    <tr>
                        <td colSpan='3' style={{ color: 'blue', width: "200px", height: '5px', fontSize: '12px' }}>상호</td>
                        <td colSpan='6' rowSpan='2' style={{ border: "1px solid blue", color: 'blue' }}>{data && data[0].compName}</td>
                        <td rowSpan='2' style={{ border: "1px solid blue", color: 'blue', width: '5px', fontSize: '11px' }}>성명</td>
                        <td rowSpan='2' colSpan='4' style={{ border: "1px solid blue", color: 'blue' }}> {data && data[0].compCEO} </td>
                        <td rowSpan='2' style={{ border: "1px solid blue", color: 'blue', width: '5px', fontSize: '12px' }}>인</td>
                        <td colSpan='3' style={{ color: 'blue', width: "10px", height: '5px', fontSize: '12px' }}>상호</td>
                        <td rowSpan='2' colSpan='6' style={{ border: "1px solid blue", color: 'blue' }}> {data && data[0].clientName} </td>
                        <td rowSpan='2' style={{ border: "1px solid blue", color: 'blue', width: '5px', fontSize: '11px' }}>성명</td>
                        <td rowSpan='2' colSpan='4' style={{ border: "1px solid blue", color: 'blue' }}> {data && data[0].clientCEO} </td>
                        <td rowSpan='2' style={{ border: "1px solid blue", color: 'blue', width: '5px', fontSize: '12px' }}>인</td>
                    </tr>


                    <tr>
                        <td colSpan='3' style={{ fontSize: '10px', height: '4px', color: 'blue' }}>(법인명)</td>

                        <td colSpan='3' style={{ fontSize: '10px', height: '4px', color: 'blue' }}>(법인명)</td>

                    </tr>




                    <tr>
                        <td colSpan='3' style={{ border: "1px solid blue", color: 'blue', width: "200px", height: '40px', fontSize: '12px' }}>사업주소</td>
                        <td colSpan='12' style={{ border: "1px solid blue", color: 'blue' }}> {data && data[0].compAddress} </td>
                        <td colSpan='3' style={{ border: "1px solid blue", color: 'blue', width: "25px", height: '20px', fontSize: '12px' }}>사업장 주소</td>
                        <td colSpan='12' style={{ border: "1px solid blue", color: 'blue' }}> {data && data[0].clientAddress} </td>
                    </tr>

                    <tr>
                        <td colSpan='3' style={{ border: "1px solid blue", color: 'blue', width: "200", height: '10px', fontSize: '12px' }}>업 태</td>
                        <td colSpan='6' style={{ border: "1px solid blue", color: 'blue' }}>{data && data[0].compType}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', fontSize: '12px' }}>종목</td>
                        <td colSpan='5' style={{ border: "1px solid blue", color: 'blue' }}> {data && data[0].compItems} </td>
                        <td colSpan='3' style={{ border: "1px solid blue", color: 'blue', width: "10px", height: '10px', fontSize: '12px' }}>업 태</td>
                        <td colSpan='6' style={{ border: "1px solid blue", color: 'blue' }}> {data && data[0].clientstate}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', fontSize: '12px' }}>종목</td>
                        <td colSpan='6' style={{ border: "1px solid blue", color: 'blue', width: '100px' }}> {data && data[0].clientevent}</td>
                    </tr>
                    <tr>
                        <td colSpan='4' style={{ border: "1px solid blue", color: 'blue' }}>작 성</td>
                        <td colSpan='13' style={{ border: "1px solid blue", color: 'blue' }}>공 급 가 액</td>
                        <td colSpan='10' style={{ border: "1px solid blue", color: 'blue' }}>세 액</td>
                        <td colSpan='5' style={{ border: "1px solid blue", color: 'blue' }}>비 고</td>
                    </tr>
                    <tr>
                        <td colSpan='2' style={{ border: "1px solid blue", color: 'blue' }}>년</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>월</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>일</td>
                        <td colSpan='2' style={{ border: "1px solid blue", color: 'blue', width: '80px', fontSize: '12px' }}>공란수</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>백</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>십</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>억</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>천</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>백</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>십</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>만</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>천</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>백</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>십</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>일</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>십</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>억</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>천</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>백</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>십</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>민</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>천</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>백</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>십</td>
                        <td style={{ border: "1px solid blue", color: 'blue', width: '30px' }}>일</td>
                        <td colSpan='5' rowspan='2' style={{ border: "1px solid blue", color: 'blue' }}></td>

                    </tr>
                    <tr>
                        <td colSpan='2' style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{now.getFullYear()}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{now.getMonth()+1}</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{now.getDate()}</td>
                        <td colSpan='2' style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}></td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=11 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 11,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=10 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 10,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=9 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 9,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=8 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 8,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=7 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 7,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=6 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 6,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=5 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 5,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=4 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 4,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=3 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 3,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=2 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 2,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=1 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 1,1) }</td>

                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=10 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 10,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=9 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 9,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=8 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 8,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=7 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 7,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=6 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 6,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=5 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 5,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=4 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 4,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=3 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 3,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=2 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 2,1) }</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=1 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 1,1) }</td>

                    </tr>

                    <tr>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '20px' }}>월</td>
                        <td style={{ border: "1px solid blue", color: 'blue', height: '20px' }}>일</td>
                        <td colSpan='6' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}>품 목</td>
                        <td colSpan='3' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}>규격</td>
                        <td colSpan='3' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}>수량</td>
                        <td colSpan='5' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}>단 가</td>
                        <td colSpan='6' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}>공 급 가 액</td>
                        <td colSpan='5' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}>세 액</td>
                        <td colSpan='2' style={{ border: "1px solid blue", color: 'blue', height: '20px', width: '80px' }}>비고</td>
                    </tr>

                    {data && data.map((e, idx) =>


                        <tr>
                            <td style={{ border: "1px solid blue", color: 'blue' }}>{e.p_date.substr(5,2)}</td>
                            <td style={{ border: "1px solid blue", color: 'blue' }}>{e.p_date.substr(8)}</td>
                            <td colSpan='6' style={{ border: "1px solid blue", color: 'blue' }}>{e.p_item}</td>
                            <td colSpan='3' style={{ border: "1px solid blue", color: 'blue' }}></td>
                            <td colSpan='3' style={{ border: "1px solid blue", color: 'blue' }}>{e.p_iCount}</td>
                            <td colSpan='5' style={{ border: "1px solid blue", color: 'blue' }}>{e.p_unitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td colSpan='6' style={{ border: "1px solid blue", color: 'blue' }}>{e.p_supplyValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td colSpan='5' style={{ border: "1px solid blue", color: 'blue' }}>{e.p_surTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td colSpan='2' style={{ border: "1px solid blue", color: 'blue' }}></td>
                        </tr>
                    )
                    }



                    <tr>
                        <td colSpan='5' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}>합계금액</td>
                        <td colSpan='5' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}>현 금</td>
                        <td colSpan='5' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}>수표</td>
                        <td colSpan='5' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}>어음</td>
                        <td colSpan='5' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}>외상미수금</td>
                        <td colSpan='7' rowspan='2' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}>이금액을 영수함</td>


                    </tr>
                    <tr>
                        <td colSpan='5' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}>{data && data[0].totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td colSpan='5' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}></td>
                        <td colSpan='5' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}></td>
                        <td colSpan='5' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}></td>
                        <td colSpan='5' style={{ border: "1px solid blue", color: 'blue', height: '20px' }}></td>

                    </tr>



                </Table>
                <p style={{ fontSize: '7px' }}>--------------------------------------------------------------------------절 취 선--------------------------------------------------------------------------------</p>

                <Table style={{ width: "700px", border: "1px solid red" }}>
                    <tr style={{ border: "1px solid red", color: 'red' }}>
                        <td colspan='15' rowspan='2' style={{ height: '30px', width: '50px', fontSize: '25px', }}> 세 금 계 산 서 </td>
                        <td colSpan='7' rowspan='2' style={{ width: '10px', height: '30px' }}>공급받는자 보관용</td>
                        <td colSpan='4' style={{ border: "1px solid red", color: 'red', width: '100px', height: '10px' }}>책 번 호</td>
                        <td colSpan='3' style={{ border: "1px solid red", color: 'red', textAlign: 'right' }}>권</td>
                        <td colSpan='3' style={{ border: "1px solid red", color: 'red', textAlign: 'right' }}>호</td>
                    </tr>
                    <tr>
                        <td colSpan='4' style={{ border: "1px solid red", color: 'red', height: '10px' }}>일 현 번 호</td>
                        <td colSpan='6' style={{ border: "1px solid red", color: 'red' }}></td>
                    </tr>
                    <tr>
                        <td rowspan='5' style={{ border: "1px solid red", color: 'red', width: "5px", height: "70px" }}>공급자</td>
                        <td colSpan='3' style={{ border: "1px solid red", color: 'red', width: "500px", height: '35px', fontSize: '12px' }}>등록번호</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '5px' }}>{data && data[0].compNum.substr(0, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '5px' }}>{data && data[0].compNum.substr(1, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '5px' }}>{data && data[0].compNum.substr(2, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '5px' }}>-</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '5px' }}>{data && data[0].compNum.substr(3, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '5px' }}>{data && data[0].compNum.substr(4, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '5px' }}>-</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '5px' }}>{data && data[0].compNum.substr(5, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '5px' }}>{data && data[0].compNum.substr(6, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '5px' }}>{data && data[0].compNum.substr(7, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '5px' }}>{data && data[0].compNum.substr(8, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '5px' }}>{data && data[0].compNum.substr(9, 1)}</td>
                        <td rowspan='4' style={{ border: "1px solid red", color: 'red', width: "20px" }}>공급받는자</td>
                        <td colSpan='3' style={{ border: "1px solid red", color: 'red', width: "15px", height: '12px' }}>등록번호</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '20px' }}>{data && data[0].clientCompNum.substr(0, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '20px' }}>{data && data[0].clientCompNum.substr(1, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '20px' }}>{data && data[0].clientCompNum.substr(2, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '20px' }}>-</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '20px' }}>{data && data[0].clientCompNum.substr(3, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '20px' }}>{data && data[0].clientCompNum.substr(4, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '20px' }}>-</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>{data && data[0].clientCompNum.substr(5, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>{data && data[0].clientCompNum.substr(6, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>{data && data[0].clientCompNum.substr(7, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>{data && data[0].clientCompNum.substr(8, 1)}</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '20px' }}>{data && data[0].clientCompNum.substr(9, 1)}</td>

                    </tr>
                    <tr>
                        <td colSpan='3' style={{ color: 'red', width: "200px", height: '5px', fontSize: '12px' }}>상호</td>
                        <td colSpan='6' rowSpan='2' style={{ border: "1px solid red", color: 'red' }}>{data && data[0].compName}</td>
                        <td rowSpan='2' style={{ border: "1px solid red", color: 'red', width: '5px', fontSize: '11px' }}>성명</td>
                        <td rowSpan='2' colSpan='4' style={{ border: "1px solid red", color: 'red' }}> {data && data[0].compCEO} </td>
                        <td rowSpan='2' style={{ border: "1px solid red", color: 'red', width: '5px', fontSize: '12px' }}>인</td>
                        <td colSpan='3' style={{ color: 'red', width: "10px", height: '5px', fontSize: '12px' }}>상호</td>
                        <td rowSpan='2' colSpan='6' style={{ border: "1px solid red", color: 'red' }}> {data && data[0].clientName} </td>
                        <td rowSpan='2' style={{ border: "1px solid red", color: 'red', width: '5px', fontSize: '11px' }}>성명</td>
                        <td rowSpan='2' colSpan='4' style={{ border: "1px solid red", color: 'red' }}> {data && data[0].clientCEO} </td>
                        <td rowSpan='2' style={{ border: "1px solid red", color: 'red', width: '5px', fontSize: '12px' }}>인</td>
                    </tr>


                    <tr>
                        <td colSpan='3' style={{ fontSize: '10px', height: '4px', color: 'red' }}>(법인명)</td>

                        <td colSpan='3' style={{ fontSize: '10px', height: '4px', color: 'red' }}>(법인명)</td>

                    </tr>




                    <tr>
                        <td colSpan='3' style={{ border: "1px solid red", color: 'red', width: "200px", height: '40px', fontSize: '12px' }}>사업주소</td>
                        <td colSpan='12' style={{ border: "1px solid red", color: 'red' }}> {data && data[0].compAddress} </td>
                        <td colSpan='3' style={{ border: "1px solid red", color: 'red', width: "25px", height: '20px', fontSize: '12px' }}>사업장 주소</td>
                        <td colSpan='12' style={{ border: "1px solid red", color: 'red' }}> {data && data[0].clientAddress} </td>
                    </tr>

                    <tr>
                        <td colSpan='3' style={{ border: "1px solid red", color: 'red', width: "200", height: '10px', fontSize: '12px' }}>업 태</td>
                        <td colSpan='6' style={{ border: "1px solid red", color: 'red' }}>{data && data[0].compType}</td>
                        <td style={{ border: "1px solid red", color: 'red', fontSize: '12px' }}>종목</td>
                        <td colSpan='5' style={{ border: "1px solid red", color: 'red' }}> {data && data[0].compItems} </td>
                        <td colSpan='3' style={{ border: "1px solid red", color: 'red', width: "10px", height: '10px', fontSize: '12px' }}>업 태</td>
                        <td colSpan='6' style={{ border: "1px solid red", color: 'red' }}> {data && data[0].clientstate}</td>
                        <td style={{ border: "1px solid red", color: 'red', fontSize: '12px' }}>종목</td>
                        <td colSpan='6' style={{ border: "1px solid red", color: 'red', width: '100px' }}> {data && data[0].clientevent}</td>
                    </tr>
                    <tr>
                        <td colSpan='4' style={{ border: "1px solid red", color: 'red' }}>작 성</td>
                        <td colSpan='13' style={{ border: "1px solid red", color: 'red' }}>공 급 가 액</td>
                        <td colSpan='10' style={{ border: "1px solid red", color: 'red' }}>세 액</td>
                        <td colSpan='5' style={{ border: "1px solid red", color: 'red' }}>비 고</td>
                    </tr>
                    <tr>
                        <td colSpan='2' style={{ border: "1px solid red", color: 'red' }}>년</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>월</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>일</td>
                        <td colSpan='2' style={{ border: "1px solid red", color: 'red', width: '80px', fontSize: '12px' }}>공란수</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>백</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>십</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>억</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>천</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>백</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>십</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>만</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>천</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>백</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>십</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>일</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>십</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>억</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>천</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>백</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>십</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>민</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>천</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>백</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>십</td>
                        <td style={{ border: "1px solid red", color: 'red', width: '30px' }}>일</td>
                        <td colSpan='5' rowspan='2' style={{ border: "1px solid red", color: 'red' }}></td>

                    </tr>
                    <tr>
                        <td colSpan='2' style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{now.getFullYear()}</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{now.getMonth()+1}</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{now.getDate()}</td>
                        <td colSpan='2' style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}></td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=11 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 11,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=10 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 10,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=9 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 9,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=8 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 8,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=7 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 7,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=6 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 6,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=5 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 5,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=4 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 4,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=3 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 3,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=2 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 2,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsupplyValue).length)>=1 && String(data[0].totalsupplyValue).substr(Number(String(data[0].totalsupplyValue).length) - 1,1) }</td>

                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=10 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 10,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=9 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 9,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=8 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 8,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=7 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 7,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=6 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 6,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=5 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 5,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=4 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 4,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=3 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 3,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=2 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 2,1) }</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '35px', fontSize: '12px' }}>{data && Number(String(data[0].totalsurTax).length)>=1 && String(data[0].totalsurTax).substr(Number(String(data[0].totalsurTax).length) - 1,1) }</td>

                    </tr>

                    <tr>
                        <td style={{ border: "1px solid red", color: 'red', height: '20px' }}>월</td>
                        <td style={{ border: "1px solid red", color: 'red', height: '20px' }}>일</td>
                        <td colSpan='6' style={{ border: "1px solid red", color: 'red', height: '20px' }}>품 목</td>
                        <td colSpan='3' style={{ border: "1px solid red", color: 'red', height: '20px' }}>규격</td>
                        <td colSpan='3' style={{ border: "1px solid red", color: 'red', height: '20px' }}>수량</td>
                        <td colSpan='5' style={{ border: "1px solid red", color: 'red', height: '20px' }}>단 가</td>
                        <td colSpan='6' style={{ border: "1px solid red", color: 'red', height: '20px' }}>공 급 가 액</td>
                        <td colSpan='5' style={{ border: "1px solid red", color: 'red', height: '20px' }}>세 액</td>
                        <td colSpan='2' style={{ border: "1px solid red", color: 'red', height: '20px', width: '80px' }}>비고</td>
                    </tr>

                    {data && data.map((e, idx) =>


                        <tr>
                            <td style={{ border: "1px solid red", color: 'red' }}>{e.p_date.substr(5,2)}</td>
                            <td style={{ border: "1px solid red", color: 'red' }}>{e.p_date.substr(8)}</td>
                            <td colSpan='6' style={{ border: "1px solid red", color: 'red' }}>{e.p_item}</td>
                            <td colSpan='3' style={{ border: "1px solid red", color: 'red' }}></td>
                            <td colSpan='3' style={{ border: "1px solid red", color: 'red' }}>{e.p_iCount}</td>
                            <td colSpan='5' style={{ border: "1px solid red", color: 'red' }}>{e.p_unitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td colSpan='6' style={{ border: "1px solid red", color: 'red' }}>{e.p_supplyValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td colSpan='5' style={{ border: "1px solid red", color: 'red' }}>{e.p_surTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td colSpan='2' style={{ border: "1px solid red", color: 'red' }}></td>
                        </tr>
                    )
                    }



                    <tr>
                        <td colSpan='5' style={{ border: "1px solid red", color: 'red', height: '20px' }}>합계금액</td>
                        <td colSpan='5' style={{ border: "1px solid red", color: 'red', height: '20px' }}>현 금</td>
                        <td colSpan='5' style={{ border: "1px solid red", color: 'red', height: '20px' }}>수표</td>
                        <td colSpan='5' style={{ border: "1px solid red", color: 'red', height: '20px' }}>어음</td>
                        <td colSpan='5' style={{ border: "1px solid red", color: 'red', height: '20px' }}>외상미수금</td>
                        <td colSpan='7' rowspan='2' style={{ border: "1px solid red", color: 'red', height: '20px' }}>이금액을 영수함</td>


                    </tr>
                    <tr>
                        <td colSpan='5' style={{ border: "1px solid red", color: 'red', height: '20px' }}>{data && data[0].totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td colSpan='5' style={{ border: "1px solid red", color: 'red', height: '20px' }}></td>
                        <td colSpan='5' style={{ border: "1px solid red", color: 'red', height: '20px' }}></td>
                        <td colSpan='5' style={{ border: "1px solid red", color: 'red', height: '20px' }}></td>
                        <td colSpan='5' style={{ border: "1px solid red", color: 'red', height: '20px' }}></td>

                    </tr>



                </Table>



                {/* <Table  style={{width:"700px",border: "1px solid red"  }}>
                <tr  style={{border: "1px solid red" ,  color:'red'}}>
                    <td colspan='15' rowspan='2' style={{height:'50px',width:'50px',fontSize:'30px'}}> 세 금 계 산 서 </td>
                    <td colSpan='7'  rowspan='2'style={{width:'10px'}}>공급받는자 보관용</td>
                    <td colSpan='4' style={{border: "1px solid red" ,  color:'red',width:'100px'}}>책 번 호</td>
                    <td colSpan='3' style={{border: "1px solid red" ,  color:'red' ,textAlign:'right'}}>권</td>
                    <td colSpan='3' style={{border: "1px solid red" ,  color:'red' ,textAlign:'right'}}>호</td>
                </tr>
                <tr>
                    <td colSpan='4'style={{border: "1px solid red" ,  color:'red'}}>일 현 번 호</td>
                    <td colSpan='6'style={{border: "1px solid red" ,  color:'red'}}></td>
                </tr>
                <tr>
                    <td  rowspan='4' style={{border: "1px solid red" ,  color:'red' ,width:"5px" }}>공급자</td>
                    <td colSpan='3' style={{border: "1px solid red" ,  color:'red' ,width:"10px",height:'30px'}}>등록 번호</td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px' }}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}>-</td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}>-</td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  rowspan='4' style={{border: "1px solid red" ,  color:'red' , width:"20px"}}>공급받는자</td>
                    <td colSpan='3' style={{border: "1px solid red" ,  color:'red' , width:"10px",height:'20px'}}>등록번호</td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}>-</td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}>-</td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    
                </tr>
                <tr>
                <td colSpan='3' style={{border: "1px solid red" ,  color:'red' ,width:"10px",height:'10px',fontSize:'17px'}}>상 호 (법인명)</td>
                <td colSpan='6' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td style={{border: "1px solid red" ,  color:'red'  , width:'5px'}}>성명</td>
                <td  colSpan='4' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td style={{border: "1px solid red" ,  color:'red'  , width:'5px'}}>인</td>
                <td colSpan='3' style={{border: "1px solid red" ,  color:'red' ,width:"10px",height:'10px',fontSize:'18px'}}>상 호 (법인명)</td>
                <td colSpan='6' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td style={{border: "1px solid red" ,  color:'red' , width:'5px'}}>성명</td>
                <td  colSpan='4' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td style={{border: "1px solid red" ,  color:'red' , width:'5px'}}>인</td>
                </tr>

                <tr>
                <td colSpan='3' style={{border: "1px solid red" ,  color:'red'  ,width:"10px",height:'20px',fontSize:'17px'}}>사업장 주소</td>
                <td colSpan='12' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td colSpan='3' style={{border: "1px solid red" ,  color:'red' ,width:"25px",height:'20px',fontSize:'17px'}}>사업장 주소</td>
                <td colSpan='12' style={{border: "1px solid red" ,  color:'red'}}></td>
                </tr>

                <tr>
                <td colSpan='3' style={{border: "1px solid red" ,  color:'red'  ,width:"10px",height:'20px'}}>업 태</td>
                <td colSpan='6' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td style={{border: "1px solid red" ,  color:'red'}}>종목</td>
                <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td colSpan='3' style={{border: "1px solid red" ,  color:'red' ,width:"10px",height:'20px'}}>업 태</td>
                <td colSpan='6' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td style={{border: "1px solid red" ,  color:'red'}}>종목</td>
                <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}></td>
                </tr>
                <tr>
                    <td colSpan='4' style={{border: "1px solid red" ,  color:'red'}}>작 성</td>
                    <td colSpan='13' style={{border: "1px solid red" ,  color:'red'}}>공 급 가 액</td>
                    <td colSpan='10' style={{border: "1px solid red" ,  color:'red'}}>세 엑</td>
                    <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}>비 고</td>
                </tr>
                <tr>
                    <td colSpan='2' style={{border: "1px solid red" ,  color:'red'}}>년</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>월</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>일</td>
                    <td colSpan='2' style={{border: "1px solid red" ,  color:'red' , width:'90px' ,fontSize:'12px'}}>공란수</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>백</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>십</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>억</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>천</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>백</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>십</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>만</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>천</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>백</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>십</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>일</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>십</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>억</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>천</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>백</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>십</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>민</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>천</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>백</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>십</td>
                    <td style={{border: "1px solid red" ,  color:'red' , width:'30px'}}>일</td>
                    <td colSpan='5' rowspan='2' style={{border: "1px solid red" ,  color:'red'  }}></td>
                
                </tr>
                <tr>
                    <td colSpan='2' style={{border: "1px solid red" ,  color:'red',height:'40px' }}>2020</td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td colSpan='2' style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'40px'}}></td>
    
                    </tr>

                    <tr>
                        <td style={{border: "1px solid red" ,  color:'red' ,height:'20px'}}>일</td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'20px'}}>월</td>
                        <td colSpan='6' style={{border: "1px solid red" ,  color:'red' ,height:'20px' ,width:'100px'}}>품 목</td>
                        <td colSpan='3' style={{border: "1px solid red" ,  color:'red' ,height:'20px'}}>규격</td>
                        <td colSpan='3' style={{border: "1px solid red" ,  color:'red',height:'20px'}}>수량</td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red',height:'20px'}}>단 가</td>
                        <td colSpan='6' style={{border: "1px solid red" ,  color:'red',height:'20px'}}>공 급 가 액</td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red',height:'20px'}}>세 액</td>
                        <td colSpan='2' style={{border: "1px solid red" ,  color:'red',height:'20px' ,width:'80px'}}>비고</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid red" ,  color:'red' }}>1</td>
                        <td style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='6' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='3' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='3' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='6' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='2' style={{border: "1px solid red" ,  color:'red'}}></td>
                    </tr>
       
                    <tr>
                        <td style={{border: "1px solid red" ,  color:'red' }}>1</td>
                        <td style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='6' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='3' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='3' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='6' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='2' style={{border: "1px solid red" ,  color:'red'}}></td>
                    </tr>
    
                    <tr>
                        <td style={{border: "1px solid red" ,  color:'red' }}>1</td>
                        <td style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='6' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='3' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='3' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='6' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='2' style={{border: "1px solid red" ,  color:'red'}}></td>
                    </tr>

                    <tr>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}>합계금액</td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}>현 금</td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}>수표</td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}>어음</td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}>외상미수금</td>
                        <td colSpan='7'  rowspan='2' style={{border: "1px solid red" ,  color:'red'}}>이금액을 영수함</td>


                    </tr>
                    <tr>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}>1</td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}></td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}></td>

                    </tr>
    

       
            </Table> */}

            </Container>

        </div>
    );
};

export default Tax;