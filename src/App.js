import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ChatApp from './components/ChatApp';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Login_signUp from './components/login_signup/Login_signUp';
import PopupMsg from './components/PopupMsg';

function App() {
  

  return (
    <>
      <BrowserRouter>
      <PopupMsg/>
        <Routes>
          <Route exact path='/' element={<ProtectedRoute Comp={ChatApp} />} />
          <Route exact path='/login_signUp' element={<Login_signUp/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
