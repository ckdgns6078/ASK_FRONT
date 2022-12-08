import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import axios from "axios";
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS, registerables } from 'chart.js';


ChartJS.register(...registerables);
const BKPDcom = () => {
  
  const [income, setIncom] = useState("");
  const [outcome  ,setOutcome ]= useState("");

  useEffect(() => {
    getIncome();
    getOutcome();
}, []);
 




//매입
const  getIncome = async() => {
    await axios.post('http://192.168.2.82:5000/readIncomeChart', {
        compCode: sessionStorage.getItem("uid")
    }).then(function (response) {
        setIncom(response.data);
        console.log(response.data);
    }).catch(function (err) {
        console.log("read_inOutInfo error", err);

    });
}

//매출
const getOutcome = async() => {
  await axios.post('http://192.168.2.82:5000/readOutcomeChart', {
      compCode: sessionStorage.getItem("uid")
  }).then(function (response) {
      setOutcome(response.data);
      console.log(response.data);
  }).catch(function (err) {
      console.log("read_inOutInfo error", err);
  });
}




   

  let data =  {
      labels: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
      datasets: [
        {
          type: 'line',
          label: '매입',
          backgroundColor: 'rgb(255, 99, 132)',
          data:[income[0],income[1],income[2],income[3],income[4],income[5],income[6],income[7],income[8],income[9],income[10],income[11]],    
          borderColor: 'red',
          borderWidth: 2,
        },
        {
          type: 'line',
          label: '매출',
          borderColor: '#005b9e',
          backgroundColor: '#005b9e',
          data:[outcome[0],outcome[1],outcome[2],outcome[3],outcome[4],outcome[5],outcome[6],outcome[7],outcome[8],outcome[9],outcome[10],outcome[11],],

        },
        {
            type: 'line',
            label: '순이익',
            borderColor: 'gray',
            backgroundColor: 'gray',
            data: [outcome[0]-income[0],outcome[1]-income[1],outcome[2]-income[2],outcome[3]-income[3],outcome[4]-income[4],outcome[5]-income[5],outcome[6]-income[6],outcome[7]-income[7],outcome[8]-income[8],outcome[9]-income[9],outcome[10]-income[10],outcome[11]-income[11],]
          },
      ],
    };
    
   return (
       <div>

           <Line style={{width:'1300px'}} type="line" data={data} />
        </div>
    );
    
}

export default BKPDcom;