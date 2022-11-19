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
import Login1 from './pages/Login1';
function App() {
  return (
    <div className="App">
 
 <BrowserRouter>
 <TopBar/>
  <Routes>
    <Route path="/" element={<TopBar />}></Route>
    <Route path="Apage" element={<Abar/>}></Route>
    <Route path="Bpage" element={<Bbar/>}></Route>
    <Route path="Cpage" element={<Cbar/>}></Route>
    <Route path="Dpage" element={<Dbar/>}></Route>
    <Route path="Epage" element={<Ebar/>}></Route>
    <Route path="Fpage" element={<Fbar/>}></Route>
    <Route path="Login1" element={<Login1/>}></Route>
  </Routes>
</BrowserRouter>

    </div>
  );
}

export default App;
