import React, { useContext, useEffect, useImperativeHandle, useState } from 'react'
import styles from "./Rooms.module.css"
import appContext from "../appContext/Context"
import axios from "axios"
import { handleGetChats } from './ChatSection'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'


const Rooms = () => {
  // states
  const [rooms, setRooms] = useState([]);

  // params
  const [searchParams, setSearchParams] = useSearchParams();

  // room id
  const roomId = parseInt(searchParams.get("id"))

  // location
  const navigate = useNavigate()


  // context
  const { showAddMembPopup, setShowAddMembPopup } = useContext(appContext)



  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_KEY}/get_rooms`)
      .then(res => setRooms(res.data.rooms))


  }, []);

  // useEffect(() => {
  //   setRoomId()
  // }, [searchParams.get("id")]);

  // handle log out 
  const handleLogOut = ()=>{
    const currUser = JSON.parse( localStorage.getItem("user_data"))

    const payload = {
      user_id: currUser.id
    }
    axios.post(`${process.env.REACT_APP_API_KEY}/logout`)
    .then(res=>{
      if(res.status === 200){
            localStorage.removeItem("user_data")
            navigate("/login")
      }
    })
    .catch(err=>console.log(err))
  }



  return (
    <div className={styles.rooms}>
      <div onClick={() => handleLogOut()} className={styles.logOutBtn}>
        {/* <span>+</span> */}
        Log Out
      </div>

      <span className={styles.heading}>Rooms</span>

      <ul>
        {rooms?.map((room) => (
          <li onClick={() => handleGetChats(room.id)} style={{ background: roomId === room.id ? "#00000040" : "#343540" }}  key={room.id}>
            {room.room_name}
            {/* <div className={styles.greenDot} style={{ display: roomId === room.id ? "block" : "none" }} ></div> */}
          </li>
        ))}
      </ul>

     
    </div>
  );

}

export default Rooms
