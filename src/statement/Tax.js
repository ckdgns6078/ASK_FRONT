
import React from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { width } from '@mui/system';

const Tax = () => {
    return (
        <div>
             <Container style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <Table  style={{width:"700px",  border: "1px solid blue"}}>
                <tr  style={{border: "1px solid blue" ,  color:'blue'}}>
                    <td colspan='15' rowspan='2' style={{height:'30px',width:'50px',fontSize:'25px',}}> 세 금 계 산 서 </td>
                    <td colSpan='7'  rowspan='2'style={{width:'10px' ,height:'30px'}}>공급받는자 보관용</td>
                    <td colSpan='4' style={{border: "1px solid blue" ,  color:'blue',width:'100px',height:'10px'}}>책 번 호</td>
                    <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue' ,textAlign:'right'}}>권</td>
                    <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue' ,textAlign:'right'}}>호</td>
                </tr>
                <tr>
                    <td colSpan='4'style={{border: "1px solid blue" ,  color:'blue',height:'10px'}}>일 현 번 호</td>
                    <td colSpan='6'style={{border: "1px solid blue" ,  color:'blue'}}></td>
                </tr>
                <tr>
                    <td  rowspan='5' style={{border: "1px solid blue" ,  color:'blue' ,width:"5px" ,height:"70px"}}>공급자</td>
                    <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue' ,width:"500px",height:'35px',fontSize:'12px'}}>등록번호</td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'5px' }}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'5px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'5px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'5px'}}>-</td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'5px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'5px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'5px'}}>-</td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'5px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'5px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'5px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'5px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'5px'}}></td>
                    <td  rowspan='4' style={{border: "1px solid blue" ,  color:'blue' , width:"20px" }}>공급받는자</td>
                    <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue' , width:"15px",height:'12px'}}>등록번호</td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'20px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'20px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'20px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'20px'}}>-</td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'20px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'20px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'20px'}}>-</td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}></td>
                    <td  style={{border: "1px solid blue" ,  color:'blue' , width:'20px'}}></td>
                    
                </tr>
                <tr>
                <td colSpan='3' style={{  color:'blue' ,width:"200px",height:'5px',fontSize:'12px' }}>상호</td>
                <td colSpan='6' rowSpan='2' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                <td rowSpan='2' style={{border: "1px solid blue" ,  color:'blue'  , width:'5px',fontSize:'11px'}}>성명</td>
                <td rowSpan='2' colSpan='4' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                <td rowSpan='2' style={{border: "1px solid blue" ,  color:'blue'  , width:'5px',fontSize:'12px'}}>인</td>
                <td  colSpan='3' style={{   color:'blue' ,width:"10px",height:'5px',fontSize:'12px'}}>상호</td>
                <td rowSpan='2'colSpan='6' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                <td rowSpan='2'style={{border: "1px solid blue" ,  color:'blue' , width:'5px' ,fontSize:'11px'}}>성명</td>
                <td  rowSpan='2'colSpan='4' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                <td rowSpan='2'style={{border: "1px solid blue" ,  color:'blue' , width:'5px',fontSize:'12px'}}>인</td>
                </tr>
                

                <tr>
                    <td  colSpan='3' style={{fontSize:'10px',height:'4px', color:'blue' }}>(법인명)</td>
                    
                    <td  colSpan='3'style={{fontSize:'10px',height:'4px',  color:'blue'}}>(법인명)</td>
                    
                </tr>




                <tr>
                <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue'  ,width:"200px",height:'40px',fontSize:'12px'}}>사업주소</td>
                <td colSpan='12' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue' ,width:"25px",height:'20px',fontSize:'12px'}}>사업장 주소</td>
                <td colSpan='12' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                </tr>

                <tr>
                <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue'  ,width:"200",height:'10px' ,fontSize:'12px'}}>업 태</td>
                <td colSpan='6' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                <td style={{border: "1px solid blue" ,  color:'blue',fontSize:'12px'}}>종목</td>
                <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue' ,width:"10px",height:'10px',fontSize:'12px'}}>업 태</td>
                <td colSpan='6' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                <td style={{border: "1px solid blue" ,  color:'blue',fontSize:'12px'}}>종목</td>
                <td colSpan='6' style={{border: "1px solid blue" ,  color:'blue',width:'100px'}}></td>
                </tr>
                <tr>
                    <td colSpan='4' style={{border: "1px solid blue" ,  color:'blue'}}>작 성</td>
                    <td colSpan='13' style={{border: "1px solid blue" ,  color:'blue'}}>공 급 가 액</td>
                    <td colSpan='10' style={{border: "1px solid blue" ,  color:'blue'}}>세 엑</td>
                    <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue'}}>비 고</td>
                </tr>
                <tr>
                    <td colSpan='2' style={{border: "1px solid blue" ,  color:'blue'}}>년</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>월</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>일</td>
                    <td colSpan='2' style={{border: "1px solid blue" ,  color:'blue' , width:'80px' ,fontSize:'12px'}}>공란수</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>백</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>십</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>억</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>천</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>백</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>십</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>만</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>천</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>백</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>십</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>일</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>십</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>억</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>천</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>백</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>십</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>민</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>천</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>백</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>십</td>
                    <td style={{border: "1px solid blue" ,  color:'blue' , width:'30px'}}>일</td>
                    <td colSpan='5' rowspan='2' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                
                </tr>
                <tr>
                    <td colSpan='2' style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px' }}>2020</td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td colSpan='2' style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'35px',fontSize:'12px'}}></td>
    
                    </tr>

                    <tr>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}>일</td>
                        <td style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}>월</td>
                        <td colSpan='6' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}>품 목</td>
                        <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}>규격</td>
                        <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}>수량</td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}>단 가</td>
                        <td colSpan='6' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}>공 급 가 액</td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}>세 액</td>
                        <td colSpan='2' style={{border: "1px solid blue" ,  color:'blue',height:'20px' ,width:'80px'}}>비고</td>
                    </tr>
              
                    <tr>
                        <td style={{border: "1px solid blue" ,  color:'blue' }}>1</td>
                        <td style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='6' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='6' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='2' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                    </tr>
    
                    <tr>
                        <td style={{border: "1px solid blue" ,  color:'blue' }}>1</td>
                        <td style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='6' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='6' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='2' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                    </tr>
    
                    <tr>
                        <td style={{border: "1px solid blue" ,  color:'blue' }}>1</td>
                        <td style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='6' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='3' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='6' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                        <td colSpan='2' style={{border: "1px solid blue" ,  color:'blue'}}></td>
                    </tr>

                    <tr>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}>합계금액</td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}>현 금</td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}>수표</td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}>어음</td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}>외상미수금</td>
                        <td colSpan='7'  rowspan='2' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}>이금액을 영수함</td>


                    </tr>
                    <tr>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}>1</td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}></td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}></td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}></td>
                        <td colSpan='5' style={{border: "1px solid blue" ,  color:'blue',height:'20px'}}></td>

                    </tr>
    

       
            </Table>
            <p style={{fontSize:'7px'}}>--------------------------------------------------------------------------절 취 선--------------------------------------------------------------------------------</p>
            
            <Table  style={{width:"700px",  border: "1px solid red"}}>
                <tr  style={{border: "1px solid red" ,  color:'red'}}>
                    <td colspan='15' rowspan='2' style={{height:'30px',width:'50px',fontSize:'25px',}}> 세 금 계 산 서 </td>
                    <td colSpan='7'  rowspan='2'style={{width:'10px' ,height:'30px'}}>공급받는자 보관용</td>
                    <td colSpan='4' style={{border: "1px solid red" ,  color:'red',width:'100px',height:'10px'}}>책 번 호</td>
                    <td colSpan='3' style={{border: "1px solid red" ,  color:'red' ,textAlign:'right'}}>권</td>
                    <td colSpan='3' style={{border: "1px solid red" ,  color:'red' ,textAlign:'right'}}>호</td>
                </tr>
                <tr>
                    <td colSpan='4'style={{border: "1px solid red" ,  color:'red',height:'10px'}}>일 현 번 호</td>
                    <td colSpan='6'style={{border: "1px solid red" ,  color:'red'}}></td>
                </tr>
                <tr>
                    <td  rowspan='5' style={{border: "1px solid red" ,  color:'red' ,width:"5px" ,height:"70px"}}>공급자</td>
                    <td colSpan='3' style={{border: "1px solid red" ,  color:'red' ,width:"500px",height:'35px',fontSize:'12px'}}>등록번호</td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'5px' }}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'5px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'5px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'5px'}}>-</td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'5px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'5px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'5px'}}>-</td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'5px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'5px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'5px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'5px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'5px'}}></td>
                    <td  rowspan='4' style={{border: "1px solid red" ,  color:'red' , width:"20px" }}>공급받는자</td>
                    <td colSpan='3' style={{border: "1px solid red" ,  color:'red' , width:"15px",height:'12px'}}>등록번호</td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}>-</td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}>-</td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'30px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'30px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'30px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'30px'}}></td>
                    <td  style={{border: "1px solid red" ,  color:'red' , width:'20px'}}></td>
                    
                </tr>
                <tr>
                <td colSpan='3' style={{  color:'red' ,width:"200px",height:'5px',fontSize:'12px' }}>상호</td>
                <td colSpan='6' rowSpan='2' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td rowSpan='2' style={{border: "1px solid red" ,  color:'red'  , width:'5px',fontSize:'11px'}}>성명</td>
                <td rowSpan='2' colSpan='4' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td rowSpan='2' style={{border: "1px solid red" ,  color:'red'  , width:'5px',fontSize:'12px'}}>인</td>
                <td  colSpan='3' style={{   color:'red' ,width:"10px",height:'5px',fontSize:'12px'}}>상호</td>
                <td rowSpan='2'colSpan='6' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td rowSpan='2'style={{border: "1px solid red" ,  color:'red' , width:'5px' ,fontSize:'11px'}}>성명</td>
                <td  rowSpan='2'colSpan='4' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td rowSpan='2'style={{border: "1px solid red" ,  color:'red' , width:'5px',fontSize:'12px'}}>인</td>
                </tr>
                

                <tr>
                    <td  colSpan='3' style={{fontSize:'10px',height:'4px', color:'red' }}>(법인명)</td>
                    
                    <td  colSpan='3'style={{fontSize:'10px',height:'4px',  color:'red'}}>(법인명)</td>
                    
                </tr>




                <tr>
                <td colSpan='3' style={{border: "1px solid red" ,  color:'red'  ,width:"200px",height:'40px',fontSize:'12px'}}>사업주소</td>
                <td colSpan='12' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td colSpan='3' style={{border: "1px solid red" ,  color:'red' ,width:"25px",height:'20px',fontSize:'12px'}}>사업장 주소</td>
                <td colSpan='12' style={{border: "1px solid red" ,  color:'red'}}></td>
                </tr>

                <tr>
                <td colSpan='3' style={{border: "1px solid red" ,  color:'red'  ,width:"200",height:'10px' ,fontSize:'12px'}}>업 태</td>
                <td colSpan='6' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td style={{border: "1px solid red" ,  color:'red',fontSize:'12px'}}>종목</td>
                <td colSpan='5' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td colSpan='3' style={{border: "1px solid red" ,  color:'red' ,width:"10px",height:'10px',fontSize:'12px'}}>업 태</td>
                <td colSpan='6' style={{border: "1px solid red" ,  color:'red'}}></td>
                <td style={{border: "1px solid red" ,  color:'red',fontSize:'12px'}}>종목</td>
                <td colSpan='6' style={{border: "1px solid red" ,  color:'red',width:'100px'}}></td>
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
                    <td colSpan='2' style={{border: "1px solid red" ,  color:'red' , width:'80px' ,fontSize:'12px'}}>공란수</td>
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
                    <td colSpan='5' rowspan='2' style={{border: "1px solid red" ,  color:'red'}}></td>
                
                </tr>
                <tr>
                    <td colSpan='2' style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px' }}>2020</td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td colSpan='2' style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'35px',fontSize:'12px'}}></td>
    
                    </tr>

                    <tr>
                        <td style={{border: "1px solid red" ,  color:'red',height:'20px'}}>일</td>
                        <td style={{border: "1px solid red" ,  color:'red',height:'20px'}}>월</td>
                        <td colSpan='6' style={{border: "1px solid red" ,  color:'red',height:'20px'}}>품 목</td>
                        <td colSpan='3' style={{border: "1px solid red" ,  color:'red',height:'20px'}}>규격</td>
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
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red',height:'20px'}}>합계금액</td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red',height:'20px'}}>현 금</td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red',height:'20px'}}>수표</td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red',height:'20px'}}>어음</td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red',height:'20px'}}>외상미수금</td>
                        <td colSpan='7'  rowspan='2' style={{border: "1px solid red" ,  color:'red',height:'20px'}}>이금액을 영수함</td>


                    </tr>
                    <tr>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red',height:'20px'}}>1</td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red',height:'20px'}}></td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red',height:'20px'}}></td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red',height:'20px'}}></td>
                        <td colSpan='5' style={{border: "1px solid red" ,  color:'red',height:'20px'}}></td>

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