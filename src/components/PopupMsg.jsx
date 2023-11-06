import { Alert, Snackbar } from '@mui/material';
import React, { useContext } from 'react'
import appContext from '../appContext/Context';

const PopupMsg = () => {

    // context
    const { popupMsgData, setPopupMsgData } = useContext(appContext)

    

    return (
        <>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={popupMsgData.open} autoHideDuration={4000} onClose={()=>setPopupMsgData({...popupMsgData, open: false})}>
                <Alert onClose={()=>setPopupMsgData({...popupMsgData, open: false})} severity={popupMsgData.type} sx={{ width: '100%' }}>
                    {popupMsgData.msg}
                </Alert>
            </Snackbar>
        </>
    )
}

export default PopupMsg
