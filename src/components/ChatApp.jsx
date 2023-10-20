import React, { useContext, useEffect } from 'react'
import Rooms from './Rooms'
import ChatSection, { handleSlideBottom } from './ChatSection'
import Popup from './popup/Popup'
import appContext from '../appContext/Context'

const ChatApp = () => {
    // context api
    const {showAddMembPopup} = useContext(appContext)


    return (
        <>
            <div className="chatApp">
                <Rooms />
                <ChatSection />

                {showAddMembPopup &&  <Popup/>}
               
            </div>
        </>
    )
}

export default ChatApp
