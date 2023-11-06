import React, { createContext, useState } from 'react'


const appContext = createContext()
const Context = ({children}) => {
    // state to show popup
    const [showAddMembPopup, setShowAddMembPopup] = useState(false);
    const [allRooms, setAllRooms] = useState([]);
    const [popupMsgData, setPopupMsgData] = useState({
        open: false,
        msg: "",
        type: ""
    });
    const [pregressBarStatus, setPregressBarStatus] = useState("0");

    const contextData = {
        showAddMembPopup, setShowAddMembPopup,
        allRooms, setAllRooms,
        popupMsgData, setPopupMsgData,
        pregressBarStatus, setPregressBarStatus
    }


    return (
        <appContext.Provider value={contextData}>
            {children}
        </appContext.Provider>
    )
}

export default appContext
export { Context }
