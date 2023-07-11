import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Forgotpsw from './pages/Forgetpsw.jsx'
import Email from './pages/Email';
import Resetpsw from './pages/Resetpsw.jsx'
import Home from './pages/Home.jsx'
import Calc from './pages/Calc';
import Tracker from './pages/Tracker';
function App() {

  return (
 
    <BrowserRouter>
      <Routes>
          <Route path = '/' element={<Login/>}/>
          <Route path = '/signup' element={<Signup/>}/>
          <Route path = '/forgotpsw' element={<Email/>}/>
          <Route path = '/forgotpsw/:id' element={<Forgotpsw/>}/>
          <Route path = '/resetpsw/:id' element={<Resetpsw/>}/>
          <Route path = '/:id' element={<Home/>}/>
          <Route path = '/:id/calc' element={<Calc/>}/>
          <Route path = '/:id/tracker' element={<Tracker/>}/>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
