import React, { useContext, useEffect, useState } from 'react'
import styles from "./Popup.module.css"
import appContext from '../../appContext/Context'
import axios from 'axios'
import { handleGetRooms } from '../Rooms'
import { handleGetChats } from '../ChatSection'
import { useSearchParams } from 'react-router-dom'

const Popup = () => {
    // state
    const [newRoomName, setnewRoomName] = useState("");
    const [joinRoomName, setJoinRoomName] = useState("");

    // context
    const { showAddMembPopup, setShowAddMembPopup, allRooms } = useContext(appContext)

    // curr user from local storage
    const currUser = JSON.parse(localStorage.getItem("user_data"))

    // params
    const [searchParams, setSearchParams] = useSearchParams();
    const roomId = parseInt(searchParams.get("id"))




    // handle create and join in group
    const handleCreate_join = (e) => {
        e.preventDefault()

        let url = ""
        let payload = {}
        if (showAddMembPopup === "join-group") {
            url = `${process.env.REACT_APP_API_KEY}/create_user_and_room`
            payload = {
                name: currUser.name,
                room_name: joinRoomName
            }
        }
        else {
            url = `${process.env.REACT_APP_API_KEY}/create_room`
            payload = {
                room_name: newRoomName
            }
        }

        axios.post(url, payload)
            .then(res => {

                if (showAddMembPopup === "create-group") { //call if only creating the new group

                    handleGetRooms()
                }
                else {                                     // get all chats and room info 
                    handleGetChats(roomId)
                }
                setShowAddMembPopup(null)
            })
            .catch(err => console.log(err, "err"))
    }


    return (
        <div className={styles.container}>
            <form onSubmit={(e) => handleCreate_join(e)} className='bg-dark text-white container px-4 py-4'>
                <span onClick={() => setShowAddMembPopup(null)} className={`material-symbols-outlined ${styles.close}`}>
                    close
                </span>
                <h3 className='text-center mb-5' >{showAddMembPopup === "join-group" ? "Join Group" : "Create New Group"}</h3>


                {showAddMembPopup === "join-group" ?
                    <div className="form-group mb-4">
                        <label htmlFor="exampleFormControlSelect1" className='mb-2' >Select Group</label>
                        <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => setJoinRoomName(e.target.value)} >
                            {allRooms.map(room => <option key={room.id} value={room.room_name} >{room.room_name}</option>)}
                        </select>
                    </div>
                    :

                    <div className="form-group mb-4">
                        <label htmlFor="exampleFormControlInput1" className='mb-2' >Group Name</label>
                        <input type="text" onChange={(e) => setnewRoomName(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="Enter group name" />
                    </div>

                }

                <button type="submit" className="btn btn-primary">{showAddMembPopup === "join-group" ? "Join" : "Create"}</button>

            </form>
        </div>
    )
}

export default Popup
