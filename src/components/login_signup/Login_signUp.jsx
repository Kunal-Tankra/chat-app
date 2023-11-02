import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login_signUp = () => {
  // curr user
  const currUser = JSON.parse(localStorage.getItem("user_data"))

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // navigate
  const navigate = useNavigate()

  // submit the login form
  const handleSubmitLogin = (e) => {
    e.preventDefault()

    const data = {
      email,
      password
    }

    axios.post(`${process.env.REACT_APP_API_KEY}/login`, data)
      .then(res => {
        localStorage.setItem("user_data", JSON.stringify(res.data.user_data))
        if (res.status === 200) {
          navigate("/")
        }

      })
      .catch(err => console.log(err))

  }

  // redirect to home if user is already loged in
  useEffect(() => {
    if (currUser) {
      navigate("/")
    }
  }, []);

  return (
    <>
      <h1 className='text-center mt-2' ><strong>Chat APP</strong></h1>

      <div className='container col-4 mt-5 pt-3'>

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
                <input type="text" id="loginName" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                <label className="form-label" for="loginName">Email</label>
              </div>


              <div className="mb-4">
                <input type="text" id="loginPassword" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                <label className="form-label" for="loginPassword">Password</label>
              </div>
              <button type="submit" className="btn btn-primary btn-block mb-4">Log in</button>



            </form>
          </div>

          {/* sign up */}
          <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
            <form>

              <div className="mb-4">
                <input type="text" id="registerName" className="form-control" />
                <label className="form-label" for="registerName">Name</label>
              </div>


              <div className="mb-4">
                <input type="text" id="registerUsername" className="form-control" />
                <label className="form-label" for="registerUsername">Username</label>
              </div>


              <div className="mb-4">
                <input type="email" id="registerEmail" className="form-control" />
                <label className="form-label" for="registerEmail">Email</label>
              </div>


              <div className="mb-4">
                <input type="password" id="registerPassword" className="form-control" />
                <label className="form-label" for="registerPassword">Password</label>
              </div>


              <div className="mb-4">
                <input type="password" id="registerRepeatPassword" className="form-control" />
                <label className="form-label" for="registerRepeatPassword">Repeat password</label>
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
