import React, { useEffect, useState } from 'react'
import styles from "./Login.module.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // curr user
  const currUser = JSON.parse(localStorage.getItem("user_data"))

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // navigate
  const navigate = useNavigate()

  // submit the form
  const handleSubmitForm = (e) => {
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

  useEffect(() => {
    if (currUser) {
      navigate("/")
    }
  }, []);

  
  return (
    <div className={styles.container}>

      <form onSubmit={handleSubmitForm} className="container">
        <h1 >LogIn</h1>

        <div className="form-outline mb-4">
          <input type="email" id="form2Example1" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
          <label className="form-label" htmlFor="form2Example1">Email address</label>
        </div>


        <div className="form-outline mb-4">
          <input type="text" id="form2Example2" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
          <label className="form-label" htmlFor="form2Example2">Password</label>
        </div>


        <button type="submit" className={`btn btn-primary btn-block mb-4 ${styles.submitBtn}`}>Sign in</button>


      </form>
    </div>
  )
}

export default Login
