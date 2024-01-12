import React, {useState} from 'react';
import './addUser.css';


const AddUser = () => {

    const [addUserModal, setAddUserModal] = useState(false);

    const toggleModal = () => {
        setAddUserModal(!addUserModal)
    };

    if(addUserModal) {
        document.body.classList.add('active-modal')
    }else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div>
            
            <button className='button-modal' onClick={toggleModal}>
                Open                
            </button>
            {addUserModal && (
            <div className='modal'>
                <div className='overlay'>
                <div className='modal-content'>
                    <h2>HAKDOG </h2>                    
                    <button className='close-modal' onClick={toggleModal}>Close</button>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default AddUser;