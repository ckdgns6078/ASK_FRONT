
import React from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
const Salary = () => {
    return (
        <Box style={{border:'1px solid #000'}}>

            <Container style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                <br/>
                <h2 style={{display:'inline-block'}}>급여 명세서</h2>

                <Grid item ml={-80} >
                <p style={{}}>*사원정보</p>
                </Grid>

                <Table style={{width:"700px",height:'100px',}}>
                    <tr style={{border: "1px solid #000"}}>
                        <td  style={{border: "1px solid #000",backgroundColor: '#ecf0f1' ,width:'100px'}}>사원명</td>
                        <td  style={{border: "1px solid #000"}}></td>
                        <td  style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>사원번호</td>
                        <td  style={{border: "1px solid #000"}}></td>
                        <td  style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>직책</td>
                        <td style={{border: "1px solid #000"}}></td>
                        <td  style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>급여대장명칭</td>
                        <td  style={{border: "1px solid #000"}}></td>
                    </tr>
                    <tr style={{border: "1px solid #000"}}>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>부서명</td>
                        <td style={{border: "1px solid #000"}}></td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>부서코드</td>
                        <td style={{border: "1px solid #000"}}></td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>직책</td>
                        <td style={{border: "1px solid #000"}}></td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',width:'100px'}}>지급일:</td>
                        <td style={{border: "1px solid #000"}}></td>
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
                        <td style={{border: "1px solid #000" ,textAlign:'right'}}> 1,000,000</td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>소득세</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>야간수당</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>주민세</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>주말근무수당</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>국민연금</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>연차수당</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>건강보험</td>
                        <td style={{border: "1px solid #000"}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>출산보육수당</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>고용보험</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>부양사족수당</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>장기요양</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>식대</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>추가경비</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>차량유지비</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
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
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1',height:'60px'}}>급여총액</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                        <td style={{border: "1px solid #000",backgroundColor: '#ecf0f1'}}>실수령액</td>
                        <td style={{border: "1px solid #000",textAlign:'right'}}></td>
                    </tr>
                    
                </Table>
         
            </Container>
                
            
        </Box>
    );
};

export default Salary;