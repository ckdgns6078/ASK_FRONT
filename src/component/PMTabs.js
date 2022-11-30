import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { message, Space } from 'antd';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const PMTabs = () => {
    
    return (
        <div>
            <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
            <Tab eventKey="home" title="기본">
{/* 
            <table>
                <tr>
                    <td>사원명</td>
                    <td><input type="text"/></td>
                    <td>사원번호</td>
                    <td><input type="text"/></td>
                   
                </tr>
                <tr>
                    <td>주민등록버호</td>
                    <td><input type="text"/></td>
                    <td>-</td>
                    <td><input type="text"/></td>
                    <td>전화번호</td>
                    <td><input type="text"/></td>
                    
                </tr>
            </table> */}
              








              
            </Tab>
            <Tab eventKey="profile" title="사원정보">
              456789
            </Tab>
          
            </Tabs>
        </div>
    );
};

export default PMTabs;