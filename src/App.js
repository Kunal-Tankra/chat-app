import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ChatApp from './components/ChatApp';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Login_signUp from './components/login_signup/Login_signUp';
import PopupMsg from './components/PopupMsg';
import { LinearProgress } from '@mui/material';
import { useContext } from 'react';
import appContext from './appContext/Context';

function App() {
// context
const {pregressBarStatus} = useContext(appContext)


  return (
    <>
      <BrowserRouter>
        <LinearProgress variant="determinate" value={pregressBarStatus} style={{ backgroundColor: 'transparent', position: "fixed", top: "0", width: "100%", zIndex: "100" }}
        />
        <PopupMsg />
        <Routes>
          <Route exact path='/' element={<ProtectedRoute Comp={ChatApp} />} />
          <Route exact path='/login_signUp' element={<Login_signUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
