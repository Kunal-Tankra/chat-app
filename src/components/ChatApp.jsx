import React, { useEffect } from 'react'
import Rooms from './Rooms'
import ChatSection, { handleSlideBottom } from './ChatSection'

const ChatApp = () => {


    
    return (
        <>
            <div className="chatApp">
                <Rooms />
                <ChatSection />
            </div>
        </>
    )
}

export default ChatApp
