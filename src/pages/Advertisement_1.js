import React from 'react';
import Adbar from './Adbar';
import Grid from '@mui/material/Grid';
import main_1_img from '../img/main_1_img.jpg';
import main_2_img from '../img/main_2_img.png';
import Advertisement_2 from './Advertisement_2';




const advertisement_1 = () => {

    const back = () => {
        window.location.href="/Apage"
      }

    return (
        <div >
            <div className='main'>
            <Adbar/>
            <Grid container spacing={2} >
                <Grid item xs={6} >
                    <img src={main_2_img} className='main_2_img' />
                    <button className="button1" onClick={back} >ACCOUNTING 시작하기</button>
                </Grid>
                <Grid item xs={6} mt={-2}>
                <img src={main_1_img} style={{width:'900px',height:'600px'}}/>
                </Grid>
            </Grid>
            <Advertisement_2/>
            </div>
        </div>

    );
};

export default advertisement_1;