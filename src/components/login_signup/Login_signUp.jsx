import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from '../../appContext/Context';

const Login_signUp = () => {
  // context
  const {popupMsgData, setPopupMsgData, setProgressBarStatus} = useContext(appContext)
  
  // curr user
  const currUser = JSON.parse(localStorage.getItem("user_data"))

  // states
  // login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // signup
  const [signUpData, setSignUpData] = useState({});

  // navigate
  const navigate = useNavigate()

  // submit the login form
  const handleSubmitLogin = (e) => {
    e.preventDefault()
    setProgressBarStatus("10")

    const payload = {
      email,
      password
    }

    axios.post(`${process.env.REACT_APP_API_KEY}/login`, payload)
      .then(res => {
        localStorage.setItem("user_data", JSON.stringify(res.data.user_data))
        if (res.status === 200) {
          navigate("/")
          setPopupMsgData({
            open: true,
            msg: "Log In Successfully.",
            type: "success"
        })
        }

      })
      .catch(err =>{
        if(err.response.status === 401){
        setPopupMsgData({
          open: true,
         msg: err.response.data.error,
         type: "warning"
        })
        }
      })
      .finally(()=>{
        setProgressBarStatus("100")
        
        setTimeout(() => {
          
          setProgressBarStatus("0")
        }, 700);

      })

  }

  // submit the sign up form
  const handleSignUpForm = (e) => {
    e.preventDefault()
    setProgressBarStatus("10")


    axios.post(`${process.env.REACT_APP_API_KEY}/register`, signUpData)
      .then(res => {
        const data = res.data
        const userData = {
          name: data.user_name,
          email: data.user_email,
          id: data.user_id
        }
        localStorage.setItem("user_data", JSON.stringify(userData))
        setPopupMsgData({
          open: true,
          msg: "Sign Up Successfully.",
          type: "success"
      })
        navigate("/")
      })
      .catch(err => console.log(err))
      .finally(()=>{
        setProgressBarStatus("100")
        
        setTimeout(() => {
          
          setProgressBarStatus("0")
        }, 700);
      })


  }

  // redirect to home if user is already loged in
  useEffect(() => {
    if (currUser) {
      navigate("/")
    }
  }, []);

  return (
    <>
      <h1  className='text-center mt-2' ><strong>Chat APP</strong></h1>
    

      <div className='container col-xl-4 col-sm-8 mt-5 pt-3'>

        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
              aria-controls="pills-login" aria-selected="true">Login</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
              aria-controls="pills-register" aria-selected="false">Register</a>
          </li>
        </ul>


        {/* login */}
        <div className="tab-content">
          <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            <form onSubmit={handleSubmitLogin}>

              <div className=" mb-4">
                <input type="text" id="loginName" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
                <label className="form-label" htmlFor="loginName">Email</label>
              </div>


              <div className="mb-4">
                <input type="password" id="loginPassword" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
                <label className="form-label" htmlFor="loginPassword">Password</label>
              </div>
              <button type="submit" className="btn btn-primary btn-block mb-4">Log in</button>



            </form>
          </div>

          {/* sign up */}
          <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
            <form onSubmit={handleSignUpForm} >

              <div className="mb-4">
                <input type="text" onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })} id="registerName" className="form-control" required />
                <label className="form-label" htmlFor="registerName">Name</label>
              </div>



              <div className="mb-4">
                <input type="email" id="registerEmail" onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} className="form-control" required />
                <label className="form-label" htmlFor="registerEmail">Email</label>
              </div>


              <div className="mb-4">
                <input type="password" id="registerPassword" onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} className="form-control" required />
                <label className="form-label" htmlFor="registerPassword">Password</label>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-3">Sign up</button>
            </form>
          </div>
        </div>


      </div>
    </>
  );
};

export default Login_signUp;
