import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import axios from "axios";


const Salary = () => {

    //링크 가져오는 변수
    const link = document.location.href;
    const urlParams = new URLSearchParams(link);
    const arr = [];
    const [data, setData] = useState();


    useEffect( () => {
        const value = urlParams.values();
        for (let i of value) {
            arr.push(i);
        }
        if(arr.length >1){
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
        axios.post('http://192.168.2.82:5000/printSalary', {
            printButton: arr
        }).then(function (response) {
            console.log("@@@@@@@@@@@", response.data);
            setData(response.data);
        }).catch(function (err) {
            console.log("read_inOutInfo error", err);
        });
    }

    return (
        <div>


 
        {
            data && data.map((e , idx)=>
            <Box>

            <Container style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                <br/>
                <h2 style={{display:'inline-block'}}>급여명세서</h2>

                <Grid item ml={-80} >
                <p style={{}}>*사원정보</p>
                </Grid>
{/* 
                <Table style={{width:"700px",height:'100px',}}>
                    <tr style={{border: "1px solid #000"}}>
                        <td  style={{border: "1px solid #000",backgroundColor: '#ecf0f1' ,width:'100px'}}>명세서명</td>
                        <td  style={{border: "1px solid #000"}}>{e.payTitle}&nbsp;</td>
                        <td  style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>기간</td>
                        <td  style={{border: "1px solid #000"}}>{e.startDate} ~{e.endDate}</td>
                        <td  style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>지급일</td>
                        <td style={{border: "1px solid #000"}}>{e.payDay}&nbsp;</td>

                    </tr>
                    <tr style={{border: "1px solid #000"}}>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>성명</td>
                        <td style={{border: "1px solid #000"}}>{e.empName}&nbsp;</td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>사원코드</td>
                        <td style={{border: "1px solid #000"}}>{e.empNum}&nbsp;</td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>부서</td>
                        <td style={{border: "1px solid #000"}}>{e.depName}&nbsp;</td>

                    </tr>
                </Table> */}

                <Table style={{width:"700px",height:'100px',}}>
                <tr style={{border: "1px solid #000"}}>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>성명</td>
                        <td style={{border: "1px solid #000"}}>{e.empName}&nbsp;</td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>사원코드</td>
                        <td style={{border: "1px solid #000"}}>{e.empNum}&nbsp;</td>
                    </tr>
                    <tr style={{border: "1px solid #000"}}>
                        <td  style={{border: "1px solid #000",backgroundColor: '#ecf0f1' ,width:'100px'}}>명세서명</td>
                        <td  style={{border: "1px solid #000"}}>{e.payTitle}&nbsp;</td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>부서</td>
                        <td style={{border: "1px solid #000"}}>{e.depName}&nbsp;</td>
                
                    </tr>
                    <tr style={{border: "1px solid #000"}}>
                    <td  style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>기간</td>
                        <td  style={{border: "1px solid #000"}}>{e.startDate} ~{e.endDate}</td>
                        <td  style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>지급일</td>
                        <td style={{border: "1px solid #000"}}>{e.payDay}&nbsp;</td>
                    </tr>
                </Table>





                <Grid item ml={-80}>
                <p style={{ float:'left'}}>*세부내용</p>
                </Grid>
         
                <Table style={{width:"700px",height:'700px',border: "1px solid #000"}}>
                    
             
                    
                    <tr>
                        <td style={{border: "1px solid #000",width:'150px',backgroundColor: '#ecf0f1' ,height:'60px'}}>지급항목</td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'300px' }}>지급액</td>
                        <td style={{border: "1px solid #000",width:'150px',backgroundColor: '#ecf0f1'}}>공제항목</td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'300px'}}>공제액</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>기본급</td>
                        <td style={{border: "1px solid #000" ,textAlign:'right'}}>{e.empPay ? e.empPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") :""}&nbsp;</td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>소득세</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.incomeTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>야간수당</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.nightTimePay ? e.nightTimePay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):"" }&nbsp;</td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>지방소득세</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.localTaxes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>주말근무수당</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.weekendPay ? e.weekendPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):""}&nbsp;</td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>국민연금</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.ntnlPnsn ? e.ntnlPnsn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>연차수당</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.annualAllowance ? e.annualAllowance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}&nbsp;</td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>건강보험</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.hlthInsrn ? e.hlthInsrn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>출산보육수당</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.chldbChalw ? e.chldbChalw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}&nbsp;</td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>고용보험</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.empIns ? e.empIns.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>부양가족수당</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.dpndnAlwnc ? e.dpndnAlwnc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}&nbsp;</td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>장기요양</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.lngTrmCrIns ? e.lngTrmCrIns.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>식대</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.foodPay ? e.foodPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}&nbsp;</td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>추가경비</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.expense ? e.foodPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>차량유지비</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.carStatePay ? e.carStatePay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}&nbsp;</td>
                        <td style={{border: "1px solid #000"}}></td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",height:'60px'}}></td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                        <td style={{border: "1px solid #000"}}></td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",height:'60px'}}></td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>공제총액</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.ddctn ? e.ddctn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>급여총액</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.totalPay ? e.totalPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}&nbsp;</td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>실수령액</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}>{e.actlPymnt ? e.actlPymnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}&nbsp;</td>
                    </tr>

                </Table>
                    

            </Container>
                <div style={{ height: '50px'}}/>

                    


        </Box>
            )

        }
        </div> 
    );
};

export default Salary;