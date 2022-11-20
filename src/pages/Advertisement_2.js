import React from 'react';
import asl_pon from '../img/asl_pon.png';
import ap from '../img/ap.png';
import gp from '../img/gp.png';
import app from '../img/app.png';

import Member from './Member';
const Advertisement_2 = () => {
    return (
        <div  >
            <div  className='Ad2'>
             <img src={asl_pon} className='asl_pon' />
             <img src={ap} className='ap' />
             <img src={gp} className='gp' />
             <img src={app} className='app' />
       

            </div>
           
        </div>
    );
};

export default Advertisement_2;