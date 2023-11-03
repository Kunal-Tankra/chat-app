import React, { useEffect, useRef, useState } from 'react'
import styles from "./ChatSection.module.css"
import axios from "axios"
import io, { Socket } from 'socket.io-client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleGetRooms } from './Rooms';
import roomsStyles from "./Rooms.module.css"


export let handleGetChats

const ChatSection = () => {
    // navigate
    const navigate = useNavigate()

    // refs
    const msgContainer = useRef(null)
    const audioRef = useRef(null)
    const socketRef = useRef();

    // params
    const [searchParams, setSearchParams] = useSearchParams();


    // states
    const [messages, setMessages] = useState([]);
    const [roomInfo, setRoomInfo] = useState({});
    const [newMessage, setNewMessage] = useState('');
    const [scrollBarPosition, setScrollBarPosition] = useState(0);
    const [isUserInGroup, setIsUserInGroup] = useState(false);

    // roomid
    const roomId = searchParams.get("id")

    // curruser
    const currUser = JSON.parse(localStorage.getItem("user_data"))


    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            // setMessages([...messages, newMessage]);
            setNewMessage('');


            socketRef.current.emit('message', {
                user_id: currUser.id,
                message: newMessage,
                room_id: searchParams.get("id"),
                name: currUser.name
            });



        }



    };

    // handle enter button click to send
    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleSendMessage()
        }
    }

    // func for slide to bottom
    const handleSlideBottom = () => {
        if (msgContainer.current) {

            msgContainer.current.scrollTop = msgContainer.current.scrollHeight
        }
    }

    useEffect(() => {
        handleSlideBottom()
    }, [roomId]);







    useEffect(() => {


        if (currUser) {
            // call the get chats function initially with id
            handleGetChats(roomId)



            // socket.............................
            socketRef.current = io.connect(`${process.env.REACT_APP_API_KEY}`,
                {
                    query: { name: currUser.name } // Pass user's name as a query parameter
                });

            // Set up Socket.io event handlers
            socketRef.current.on('connect', () => {
                console.log('Socket.io connected.');
            });

            // recieve
            socketRef.current.on('message', (receivedMessage) => {

                setMessages(prev => [...prev, receivedMessage])
                setTimeout(() => {
                    handleSlideBottom()

                    if (currUser.id !== receivedMessage.user_id) {

                        // call notification
                        console.log(audioRef)
                        audioRef.current?.play().catch(err => {
                            console.log(err, "err in play audio")
                        })
                    }
                }, 0);
            });
        }


    }, []);

    // get all chats
    handleGetChats = (id) => {
        if (id) {

            console.log("in handle get chats,")
            // set id in params
            setSearchParams({ id });

            axios.get(`${process.env.REACT_APP_API_KEY}/get_room_info/${id}`)
                .then(res => {
                    setMessages(res.data.room_info.messages)
                    setRoomInfo(res.data.room_info)

                    const users = res.data.room_info.user_info
                    // check the curr user is in the group or not
                    let userInGrp = false
                    for (const user of users) {
                        if (user.user_id === currUser.id) {
                            console.log("mil gya")
                            userInGrp = true
                            break;
                        }
                    }

                    setIsUserInGroup(userInGrp)

                    setTimeout(() => {

                        handleSlideBottom()
                    }, 0);
                })
        }
    }

    // handle delete group
    const handleDeleteGroup = () => {

        axios.delete(`${process.env.REACT_APP_API_KEY}/delete_room/${roomId}`)
            .then((res) => {
                navigate("/")
                handleGetRooms()
            })
            .catch((error) => {
                console.log(error);
            })

    }

    // handle leave the group
    const handleLeaveGroup = () => {
        axios.delete(`${process.env.REACT_APP_API_KEY}/leave_room/${currUser.id}/${roomId}`)
            .then((res) => {
                navigate("/")
                handleGetChats(roomId)
            })
            .catch((error) => {
                console.log(error);
            })


    }

    // hanlde join group
    const handleJoinGrp = () => {
        const url = `${process.env.REACT_APP_API_KEY}/create_user_and_room`
        const payload = {
            name: currUser.name,
            room_name: roomInfo.room_name
        }

        axios.post(url, payload)
            .then((res) => {
                handleGetChats(roomId)
            })
            .catch((err) => console.log(err))
    }

    // useEffect(() => {
    //     console.log(scrollBarPosition)
    // }, [scrollBarPosition]);



    return (
        <>
            {/* audio message */}
            <audio ref={audioRef} controls style={{ display: "none" }}>
                <source src="notification/marimba.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>

            <div className={`${styles.chat_app}`} >
                <h1 className={styles.bgHeading}>ChatAPP</h1>

                {roomId &&
                    <>
                        {/* chat group name and info */}
                        <nav className={`navbar  pe-5 navbar-expand-lg navbar-dark ${styles.bg_nav} ${styles.navbar}` } >
                            <div className="container-fluid">
                                <span className="navbar-brand text-uppercase ms-5" style={{ letterSpacing: "1px" }}>{roomInfo.room_name}</span>
                                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button> */}
                                <div id="navbarSupportedContent" style={{width: "100%"}} className="d-flex align-items-center justify-content-between">
                                    {isUserInGroup ?
                                        <>
                                            <ul className="navbar-nav   ms-5 mb-lg-0 me-5">

                                                <li className="nav-item dropdown ">
                                                    <a className="nav-link dropdown-toggle " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Members
                                                    </a>
                                                    <ul className={`dropdown-menu ${styles.dropDown} bg-dark`} aria-labelledby="navbarDropdown">
                                                        {roomInfo.user_info?.map(user => <li key={user.user_id} className="dropdown-item bg-dark text-light" >{user.user_name}</li>)}


                                                    </ul>
                                                </li>



                                            </ul>

                                            <div className='d-flex gap-3 '>

                                                <span onClick={handleLeaveGroup} className={styles.navBtns}>
                                                    Leave
                                                </span>
                                                <span onClick={handleDeleteGroup} className={styles.navBtns}>
                                                    Delete
                                                </span>
                                            </div>
                                        </>
                                        :


                                        <button onClick={handleJoinGrp} className={`${styles.navBtns} btn  bg-secondary bg-gradient`}>
                                            Join
                                        </button>
                                    }

                                </div>
                            </div>
                        </nav>

                        <div  ref={msgContainer} onScroll={(e) => { setScrollBarPosition(e.target.scrollTop) }} className={`${styles.chat_messages} `}>
                            {messages.map((msg) => (
                                // msgRight -> for right message
                                <div key={msg.id} className={`${styles.message} ${currUser.id === msg.user_id ? styles.msgRight : ""}`}>
                                    <strong>{msg.user_name}</strong>
                                    <p>
                                        {msg.message}
                                    </p>
                                </div>
                            ))}



                            {/* go to top butotn */}
                            {/* {msgContainer.current && console.log(scrollBarPosition > msgContainer.current.scrollHeight - msgContainer.current.offsetHeight - 150)} */}

                            {(msgContainer.current && (scrollBarPosition < msgContainer.current.scrollHeight - msgContainer.current.offsetHeight - 150)) &&

                                <div onClick={handleSlideBottom} className={styles.downArrow}>

                                    <span className="material-symbols-outlined">
                                        arrow_downward
                                    </span>
                                </div>
                            }
                        </div>

                        {isUserInGroup ?
                            <div className={styles.msgSend_container}>
                                <input type="text" value={newMessage}
                                    onKeyDown={(e) => handleEnter(e)}
                                    onChange={(e) => setNewMessage(e.target.value)} placeholder='Send a message' />
                                <button onClick={handleSendMessage} style={{
                                    backgroundColor: newMessage.length === 0 ? "transparent" : "#19C37D",
                                    color: newMessage.length === 0 ? "#6B6C7B" : "whitesmoke",

                                }}>
                                    <span className="material-symbols-outlined">
                                        send
                                    </span>

                                </button>
                            </div>
                            :
                            <p className={roomsStyles.heading} style={{ textAlign: "center" }} >you are no longer to send message in this group</p>
                        }

                    </>
                }
            </div >


        </>
    )
}

export default ChatSection







