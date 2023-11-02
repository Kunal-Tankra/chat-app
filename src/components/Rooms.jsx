import React, { useContext, useEffect, useImperativeHandle, useState } from 'react'
import styles from "./Rooms.module.css"
import appContext from "../appContext/Context"
import axios from "axios"
import { handleGetChats } from './ChatSection'
import { useNavigate, useSearchParams } from 'react-router-dom'

export let handleGetRooms;
const Rooms = () => {
  // params
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = parseInt(searchParams.get("id"))

  // state
  const [isNavClosed, setIsNavClosed] = useState(false);

  // curr user from local storage
  const currUser = JSON.parse(localStorage.getItem("user_data"))

  // location
  const navigate = useNavigate()

  // context
  const { setShowAddMembPopup, allRooms, setAllRooms } = useContext(appContext)

  // handle get rooms
  handleGetRooms = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/get_rooms`)
    setAllRooms(res.data.rooms)
  }

  useEffect(() => {
    handleGetRooms()
  }, []);



  // handle log out 
  const handleLogOut = () => {


    const payload = {
      user_id: currUser.id
    }
    axios.post(`${process.env.REACT_APP_API_KEY}/logout`)
      .then(res => {
        if (res.status === 200) {
          localStorage.removeItem("user_data")
          navigate("/login")
        }
      })
      .catch(err => console.log(err))
  }



  return (
    <div className={`${styles.roomsContainer}  ${isNavClosed ? styles.openNav: ""}`}>
        <span onClick={()=>{isNavClosed? setIsNavClosed(false): setIsNavClosed(true)}} className={`material-symbols-outlined ${styles.toggleBtn}`}>
          {isNavClosed? "chevron_left": "chevron_right"}
         
        </span>

      <div className={styles.rooms}>

        {/* <div onClick={() => setShowAddMembPopup("join-group")} className={styles.newGroup}>
          Join Group
        </div> */}
        <div onClick={() => setShowAddMembPopup("create-group")} className={styles.newGroup}>
          + Create Group
        </div>

        <span className={styles.heading}>Rooms</span>

        <ul>
          {allRooms?.map((room) => (
            <li onClick={() => handleGetChats(room.id)} style={{ background: roomId === room.id ? "#00000040" : "#343540" }} key={room.id}>
              {room.room_name}
            </li>
          ))}
        </ul>

        <div className={styles.currUser}>
          <span className="material-symbols-outlined">
            account_circle
          </span>

          <h5>{currUser?.name}</h5>
        </div>

        <div onClick={() => handleLogOut()} className={styles.logOutBtn}>
          Log Out
        </div>
      </div>
    </div>
  );
}

export default Rooms
