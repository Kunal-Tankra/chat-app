import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ChatApp from './components/ChatApp';
import Login from './components/login/Login';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import SignUp from './components/signup/SignUp';


function App() {
  

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route exact path='/' element={<ProtectedRoute Comp={ChatApp} />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
