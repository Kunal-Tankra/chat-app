import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({Comp}) => {

    // navigate
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem("user_data")){
            navigate("/login")
        }
    }, [navigate]);

  return (
    <>
      <Comp/>
    </>
  )
}

export default ProtectedRoute
