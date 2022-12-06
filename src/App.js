import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TopBar from './pages/TopBar';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Abar from './bar/Abar';
import Fbar from './bar/Fbar';
import Ebar from './bar/Ebar';
import Dbar from './bar/Dbar';
import Cbar from './bar/Cbar';
import Bbar from './bar/Bbar';
import Advertisement_1 from './pages/Advertisement_1';
import Member from './pages/Member';
import Login1 from './pages/Login1';
import Acom from './component/Acom';
import UserCom from './component/UserCom';
import Salary from './statement/Salary';
import Tax from './statement/Tax';
import OW from './statement/OW';
import TestPage from './component/TestPage';
import Bbut from './aaTaps/Bbut';
import Abut from './aaTaps/Abut';
import Cbut from './aaTaps/Cbut';
import PMAbut from './abTaps/PMAbut';
import PMBbut from './abTaps/PMBbut';
import PMCbut from './abTaps/PMCbut';
import PMDbut from './abTaps/PMDbut';

import ATGAbut from './acTaps/ATGAbut';
import ATGBbut from './acTaps/ATGBbut';
import ATGCbut from './acTaps/ATGCbut';
import ATGDbut from './acTaps/ATGDbut';
import ATGEbut from './acTaps/ATGEbut';

import OWAbut from './adTaps/OWAbut';
import OWBbut from './adTaps/OWBbut';
import OWCbut from './adTaps/OWCbut';

import SMAbut from './aeTaps/SMAbut';
import SMBbut from './aeTaps/SMBbut';
import SMCbut from './aeTaps/SMCbut';

import BAAbut from './afTaps/BAAbut';
import BABbut from './afTaps/BABbut';
import BACbut from './afTaps/BACbut';

function App() {
  return (
    <div className="App">
 {/* <div style={{width:'100%', maxWidth:'1920px'}}> */}
 <BrowserRouter>
 
  <Routes>
    <Route path="/" element={<Advertisement_1/>}></Route>
    <Route path="Apage" element={<Abar/>}></Route>
    <Route path="Bpage" element={<Bbar/>}></Route>
    <Route path="Cpage" element={<Cbar/>}></Route>
    <Route path="Dpage" element={<Dbar/>}></Route>
    <Route path="Epage" element={<Ebar/>}></Route>
    <Route path="Fpage" element={<Fbar/>}></Route>
    <Route path="Member" element={<Member/>}></Route>
    <Route path="Login" element={<Login1/>}></Route>
    <Route path="Acom" element={<Acom/>}></Route>
    <Route path="TopBar" element={<TopBar/>}></Route>
    <Route path="UserCom" element={<UserCom/>}></Route>
    <Route path="Salary" element={<Salary/>}></Route>
    <Route path="Tax" element={<Tax/>}></Route>
    <Route path="OW" element={<OW/>}></Route>
    <Route path="TestPage" element={<TestPage/>}></Route>
    <Route path="/Bbut" element={<Bbut/>}></Route>
    <Route path="/Abut" element={<Abut/>}></Route>
    <Route path="/Cbut" element={<Cbut/>}></Route>

    <Route path="/PMAbut" element={<PMAbut/>}></Route>
    <Route path="/PMBbut" element={<PMBbut/>}></Route>
    <Route path="/PMCbut" element={<PMCbut/>}></Route>
    <Route path="/PMDbut" element={<PMDbut/>}></Route>
   

    <Route path="/ATGAbut" element={<ATGAbut/>}></Route>
    <Route path="/ATGBbut" element={<ATGBbut/>}></Route>
    <Route path="/ATGCbut" element={<ATGCbut/>}></Route>
    <Route path="/ATGDbut" element={<ATGDbut/>}></Route>
    <Route path="/ATGEbut" element={<ATGEbut/>}></Route>

    <Route path="/OWAbut" element={<OWAbut/>}></Route>
    <Route path="/OWBbut" element={<OWBbut/>}></Route>
    <Route path="/OWCbut" element={<OWCbut/>}></Route>

    <Route path="/SMAbut" element={<SMAbut/>}></Route>
    <Route path="/SMBbut" element={<SMBbut/>}></Route>
    <Route path="/SMCbut" element={<SMCbut/>}></Route>

    <Route path="/BAAbut" element={<BAAbut/>}></Route>
    <Route path="/BABbut" element={<BABbut/>}></Route>
    <Route path="/BACbut" element={<BACbut/>}></Route>
    
    

    
  </Routes>
</BrowserRouter>
{/* </div> */}
    </div>
  );
}

export default App;
