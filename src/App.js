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
function App() {
  return (
    <div className="App">
 
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
  </Routes>
</BrowserRouter>

    </div>
  );
}

export default App;
