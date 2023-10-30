import React, { createContext, useState } from 'react'


const appContext = createContext()
const Context = ({children}) => {
    // state to show popup
    const [showAddMembPopup, setShowAddMembPopup] = useState(false);
    const [allRooms, setAllRooms] = useState([]);

    const contextData = {
        showAddMembPopup, setShowAddMembPopup,
        allRooms, setAllRooms
    }


    return (
        <appContext.Provider value={contextData}>
            {children}
        </appContext.Provider>
    )
}

export default appContext
export { Context }
