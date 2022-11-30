import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';


const SMCcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();


    //모달 함수
    const [del, setDel] = useState(false);
    const [modify, setModify] = useState(false);
    const [add, setAdd] = useState(false);



    //추가
    const addClose = () => setAdd(false);
    const addShow = () => setAdd(true);
    //수정
    const modifyClose = () => setModify(false);
    const modifyShow = () => setModify(true);
    //삭제
    const delClose = () => setDel(false);
    const delShow = () => setDel(true);








    return (
        <div style={{ width: '1400px', position: 'relative' }}>
            <h2 style={{ color: ' #005b9e', position: 'absolute', left: '0', top: '0px' }}><strong>임직원급여 관리</strong></h2>
            <div>
                <button style={{ position: 'absolute', right: "0" }} onClick={addShow} className="Atmp1">  <strong>추가</strong></button>
                <button style={{ position: 'absolute', right: "100px" }} onClick={modifyShow} className="Atmp1">  <strong>수정</strong></button>

            </div>
            <br />
            <br />
            <br />



            <Table >
                <thead style={{ height: '60px' }}>

                    <tr style={{ backgroundColor: '#ecf0f1', }}>


                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>사원코드</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>성명</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>부서</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>기본급</strong>
                        </td>

                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>추가수당</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>세금</strong>
                        </td>
                        <td style={{ border: "1px solid #f1f2f6", color: '#777777', fontSize: '22px' }}>
                            <strong>합계</strong>
                        </td>



                    </tr>
                </thead>
                <tbody>

                    {
                        data && data.map((e, idx) =>
                            <tr >
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.userId}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.userId}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.userId}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.userId}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.userId}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.userId}</strong></td>
                                <td style={{ border: "2px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong> {e.userId}</strong></td>
                                {/* <td>이메일 데이터 넣을곳</td> */}
                            </tr>
                        )
                    }

                    <tr style={{ backgroundColor: '#f1f2f6', }}>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong>합계</strong></td>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}></td>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}></td>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}> <strong>기본급123</strong></td>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong>추가수당123</strong></td>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong>세금 경비123</strong></td>
                        <td style={{ border: "1px solid #f1f2f6", fontSize: '20px', color: '#777777' }}><strong>합계123</strong></td>
                    </tr>



                </tbody>
            </Table>






            {/* 추가 */}
            <Modal
                centered
                size="xl"
                show={add} onHide={addClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#005b9e', }}>
                    <Modal.Title style={{ color: '#ffffff' }}><strong> 급여명세서</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '' }}>


                    <Container>

                        <Table style={{ textAlign: 'center' }}>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>급여대장명칭</td>
                                <td colSpan='6' style={{ border: "1px solid #d8d8d8", width: '50px', fontSize: '12px', }}>
                                    <Form.Control style={{ height: '50px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />

                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '110px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>대상기간</td>
                                <td colSpan='3'>
                                    <Grid container>
                                        <Grid item ml={1} ><Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center', }} type="text" name='dailyYear' aria-describedby="btnGroupAddon" /></Grid>
                                        <Grid item ml={1} mt={1} style={{ color: '#777777' }}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyMonth' aria-describedby="btnGroupAddon" /></Grid>
                                        <Grid item ml={1} mt={1} style={{ color: '#777777' }}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyDay' aria-describedby="btnGroupAddon" /></Grid>

                                        <Grid item mt={0} ml={1} style={{ color: '#777777', fontSize: '25px' }}><strong>~</strong>  </Grid>

                                        <Grid item ml={2}  ><Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyYear' aria-describedby="btnGroupAddon" /></Grid>
                                        <Grid item ml={1} mt={1}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyMonth' aria-describedby="btnGroupAddon" /></Grid>
                                        <Grid item ml={1} mt={1}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyDay' aria-describedby="btnGroupAddon" /></Grid>
                                    </Grid>


                                </td>

                                <td style={{ border: "1px solid #d8d8d8", width: '80px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}> 지급일 </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', }}>

                                    <Grid container>
                                        <Grid item ml={1} ><Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyYear' aria-describedby="btnGroupAddon" /></Grid>
                                        <Grid item ml={1} mt={1}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyMonth' aria-describedby="btnGroupAddon" /></Grid>
                                        <Grid item ml={1} mt={1}>/</Grid>
                                        <Grid item ml={1}> <Form.Control style={{ width: '70px', height: '40px', fontSize: '13px', textAlign: 'center' }} type="text" name='dailyDay' aria-describedby="btnGroupAddon" /></Grid>
                                    </Grid>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>사원명</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', width: '250px' }}>
                                    <InputGroup style={{ width: '100%' }}>
                                        <Form.Control
                                            type="text"
                                            name='dailyName'

                                            aria-describedby="btnGroupAddon"
                                            style={{ height: '40px' }}

                                        />
                                        <InputGroup.Text id="btnGroupAddon" style={{ width: '40px', height: '40px', color: '#777777' }}> <SearchIcon style={{ color: '#777777' }} /></InputGroup.Text>
                                    </InputGroup>
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", width: '80px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>사원번호</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', }}>
                                    <Form.Control style={{ height: '57px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>부서</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', }}>
                                    <Form.Control style={{ height: '57px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" />
                                </td>
                            </tr>
                        </Table>




                    </Container>
                    <Container>
                        <Table style={{ textAlign: 'center', width: '100%' }}>


                        </Table>
                    </Container>

                    <Box >
                        <Container>
                            <Table hover style={{ textAlign: 'center', width: '100%', border: "1px solid #d8d8d8" }}>
                                <tr style={{ backgroundColor: '#f7f7f7', }}>
                                    {/* <td  style={{border:"3px solid #f1f2f6", width:'100px' ,fontSize:'10px'}}rowspan='2'><strong>사원번호</strong></td>
                                    <td rowspan='2' style={{border:"3px solid #f1f2f6",color:'#777777',width:'70px',fontSize:'10px'}}>사원명</td> */}
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}> 지출총액 </td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>기본급</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>야근수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>주말근무수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>연차수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>출산보육수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>부양사족수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>식대</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px', color: '#777777' }}>차량유지비</td>
                                    <td rowspan='2' style={{ width: '150px', fontSize: '12px', color: '#777777' }}> 실지급액</td>
                                </tr>
                                <tr style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>

                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>공제총액</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>소득세</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>주민세</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>국민연금</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>건강보험</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>고용보험</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>장기요양</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>추가경비</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}></td>
                                </tr>
                                <tr style={{ border: "1px solid #d8d8d8" }}>
                                    {/* <td rowspan='2' style={{border:"3px solid #f1f2f6", width:'100px',fontSize:'12px'}}>사원번호</td>
                                    <td rowspan='2' style={{border:"3px solid #f1f2f6", width:'100px',fontSize:'12px'}}>사원명</td> */}
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px' }} aria-describedby="btnGroupAddon" /></td>
                                    {/* <td> <input type='text' style={{height:'40px',width:'100px',fontSize:'12px'}}></input></td> */}
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '12px' }} rowspan='2'>실지급액</td>
                                </tr>
                                <tr>

                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                </tr>
                            </Table>
                        </Container>
                    </Box>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={addClose}>
                        취소
                    </Button>
                    <button className='addButton' variant="primary" onClick={addClose}>
                        수정
                    </button>
                    <button className='addButton' variant="primary" onClick={delShow}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>




            {/* 수정 */}
            <Modal
                centered
                size="xl"
                show={modify} onHide={modifyClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>




                    <Container>

                        <Table style={{ textAlign: 'center' }}>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>급여대장명칭</td>
                                <td colSpan='6' style={{ border: "1px solid #d8d8d8", width: '50px', fontSize: '12px', }}>
                                    000000000

                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '110px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777',textAlign:'center' }}>대상기간</td>
                                <td colSpan='3'>
                                    <Grid container>
                                        <Grid item ml={1} > 1998</Grid>
                                        <Grid item ml={1} style={{ color: '#777777' }}>/</Grid>
                                        <Grid item ml={1}> 06</Grid>
                                        <Grid item ml={1} style={{ color: '#777777' }}>/</Grid>
                                        <Grid item ml={1}> 30</Grid>

                                        <Grid item mt={0} ml={1} style={{ color: '#777777' }}><strong>~</strong>  </Grid>

                                        <Grid item ml={2}  >2020 </Grid>
                                        <Grid item ml={1}>/</Grid>
                                        <Grid item ml={1}> 11</Grid>
                                        <Grid item ml={1} >/</Grid>
                                        <Grid item ml={1}> 29</Grid>
                                    </Grid>


                                </td>

                                <td style={{ border: "1px solid #d8d8d8", width: '80px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}> 지급일 </td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px',textAlign:'center' }}>

                                    <Grid container >
                                        <Grid item ml={1} >2022</Grid>
                                        <Grid item ml={1} >/</Grid>
                                        <Grid item ml={1}>06</Grid>
                                        <Grid item ml={1} >/</Grid>
                                        <Grid item ml={1}> 30</Grid>
                                    </Grid>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>사원명</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', width: '250px' }}>
                                    신종락
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", width: '80px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>사원번호</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', }}>
                                    123
                                </td>
                                <td style={{ border: "1px solid #d8d8d8", width: '50px', fontSize: '12px', backgroundColor: '#f7f7f7', color: '#777777' }}>부서</td>
                                <td style={{ border: "1px solid #d8d8d8", fontSize: '12px', }}>
                                    종락 노예
                                </td>
                            </tr>
                        </Table>




                    </Container>
                    <Container>
                        <Table style={{ textAlign: 'center', width: '100%' }}>


                        </Table>
                    </Container>

                    <Box >
                        <Container>
                            <Table hover style={{ textAlign: 'center', width: '100%', border: "1px solid #d8d8d8" }}>
                                <tr style={{ backgroundColor: '#f7f7f7', }}>
                                    {/* <td  style={{border:"3px solid #f1f2f6", width:'100px' ,fontSize:'10px'}}rowspan='2'><strong>사원번호</strong></td>
            <td rowspan='2' style={{border:"3px solid #f1f2f6",color:'#777777',width:'70px',fontSize:'10px'}}>사원명</td> */}
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}> 지출총액 </td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>기본급</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>야근수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>주말근무수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>연차수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>출산보육수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>부양사족수당</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>식대</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '50px', height: '50px', fontSize: '12px', color: '#777777' }}>차량유지비</td>
                                    <td rowspan='2' style={{ width: '150px', fontSize: '12px', color: '#777777' }}> 실지급액</td>
                                </tr>
                                <tr style={{ backgroundColor: '#f7f7f7', border: "1px solid #d8d8d8" }}>

                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>공제총액</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>소득세</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>주민세</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>국민연금</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>건강보험</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>고용보험</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>장기요양</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}>추가경비</td>
                                    <td style={{ border: "1px solid #d8d8d8", width: '100px', height: '50px', fontSize: '12px', color: '#777777' }}></td>
                                </tr>
                                <tr style={{ border: "1px solid #d8d8d8" }}>
                                    {/* <td rowspan='2' style={{border:"3px solid #f1f2f6", width:'100px',fontSize:'12px'}}>사원번호</td>
            <td rowspan='2' style={{border:"3px solid #f1f2f6", width:'100px',fontSize:'12px'}}>사원명</td> */}
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px' }} aria-describedby="btnGroupAddon" /></td>
                                    {/* <td> <input type='text' style={{height:'40px',width:'100px',fontSize:'12px'}}></input></td> */}
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", textAlign: 'right' }}><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td style={{ border: "1px solid #d8d8d8", fontSize: '12px' }} rowspan='2'>실지급액</td>
                                </tr>
                                <tr>

                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                    <td><Form.Control style={{ height: '40px', width: '100%', fontSize: '12px', textAlign: 'right' }} aria-describedby="btnGroupAddon" /></td>
                                </tr>
                            </Table>
                        </Container>
                    </Box>





                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modifyClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={modifyClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>



            {/* 삭제 */}

            <Modal
                centered
                size="xsm"
                show={del} onHide={delClose} animation={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#2F58B8', width: '500px' }}>
                    <Modal.Title style={{ color: '#ffffff', width: '500px' }}>사용자관리 삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f1f2f6', width: '500px', }}>
                    <strong>개 항목을 삭제하시겠습니까?</strong></Modal.Body>
                <Modal.Footer style={{ width: '500px', backgroundColor: '#ffffff' }}>
                    <Button variant="secondary" onClick={delClose}>
                        닫기
                    </Button>
                    <button variant="primary" className='addButton' onClick={delClose}>
                        삭제
                    </button>
                </Modal.Footer>
            </Modal>

















        </div>
    );
};

export default SMCcom;