import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ChatApp from './components/ChatApp';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Login_signUp from './components/login_signup/Login_signUp';
import PopupMsg from './components/PopupMsg';
import { LinearProgress } from '@mui/material';
import { useContext } from 'react';
import appContext from './appContext/Context';
import NotFound from './components/404_NotFound/NotFound';

function App() {
// context
const {progressBarStatus} = useContext(appContext)


  return (
    <>
    
      <BrowserRouter>
      
      {progressBarStatus !== "0" && 
        <LinearProgress variant="determinate" value={progressBarStatus} style={{ backgroundColor: 'transparent', position: "fixed", top: "0", width: "100%", zIndex: "100" }}
        />
      }
        <PopupMsg />
        <Routes>
          <Route exact path='/' element={<ProtectedRoute Comp={ChatApp} />} />
          <Route exact path='/login_signUp' element={<Login_signUp />} />

          {/* show not found page if user hits other routs */}
          <Route exact path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
