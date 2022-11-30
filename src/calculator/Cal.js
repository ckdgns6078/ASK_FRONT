import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Grid, TextField } from '@mui/material';

import Form from 'react-bootstrap/Form';
const Cal = () => {


    let arr = [];

    const [input, setInput] = useState();

    const calculator = (e) => {
        const { value } = e.target;
        if (input == undefined) {
            setInput(value);
        }
        else {
            setInput(input + value);
        }

        if (value == '취소') {
            setInput("");
        }
        console.log("input value ", input);



    }

    return (
        <div>
            <Grid container>

                <Grid item xs={3} mt={7} ml={2}>
                    <h2><strong>*계산식</strong></h2>
                </Grid>
                <Grid item xs={3} mt={13} ml={-24}>


                    <Form.Control style={{ width: '300px', height: '60px', fontSize: '20px', outline: '#005b9e' }}
                        type="text" value={input} />
                </Grid>

                <Grid item xs={6} ml={20} mt={3}>
                    <Table >
                        <tr>
                            <td colspan='2'><button className='addButton2' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='시급'>시급</button></td>
                            <td colspan='2'><button className='addButton2' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='일급'>일급</button></td>

                        </tr>

                        <tr>
                            <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='7'>7</button></td>
                            <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='8'>8</button></td>
                            <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='9'>9</button></td>
                            <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='/'>/</button></td>
                        </tr>

                        <tr>
                            <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='4' >4</button></td>
                            <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='5'>5</button></td>
                            <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='6'>6</button></td>
                            <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='x'>x</button></td>
                        </tr>


                        <tr>
                            <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='1'> 1</button></td>
                            <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='2'>2</button></td>
                            <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='3'>3</button></td>
                            <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='-'>-</button></td>
                        </tr>


                        <tr>
                            <td colspan='2'><button className='addButton2' style={{ backgroundColor: '#005b9e', }} onClick={calculator} value='0'>0</button></td>
                            <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='취소'>취소</button></td>

                            <td><button className='Atmp1' style={{ backgroundColor: '#005b9e' }} onClick={calculator} value='+'>+</button></td>

                        </tr>
                      

                    </Table >

                </Grid>

            </Grid>

        </div>
    );
};

export default Cal;