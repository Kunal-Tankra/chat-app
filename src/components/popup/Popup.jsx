import React, { useContext } from 'react'
import styles from "./Popup.module.css"
import appContext from '../../appContext/Context'

const Popup = () => {
    // context
    const {showAddMembPopup, setShowAddMembPopup} = useContext(appContext)

    return (
        <div className={styles.container}>
            <form className='bg-dark text-white container px-4 py-4'>
                <span onClick={()=>setShowAddMembPopup(false)} className={`material-symbols-outlined ${styles.close}`}>
                    close
                </span>
                <h3 className='text-center mb-5' >Join Group</h3>
                <div class="form-group mb-4">
                    <label for="exampleFormControlInput1" className='mb-2' >Create Room</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Room Name" />
                </div>
                <div class="form-group mb-4">
                    <label for="exampleFormControlSelect1" className='mb-2' >Rooms</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                        <option>--</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary">Join</button>

            </form>
        </div>
    )
}

export default Popup
