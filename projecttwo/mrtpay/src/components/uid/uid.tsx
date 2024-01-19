import { useState } from 'react';
import './uid.css'
import { BsCardHeading, BsSearch } from "react-icons/bs";
import { card } from '../../db/cards';


const count = 121;

const UID = () => {
    //// add-user-modal
    const [addUser, setAddUser] = useState(false);
    const toggleAddUser = () => {
        setAddUser(!addUser)
    };

    // const createCard = async () => {
    //     try {
    //         // Make a fetch request to your backend API to create a new card
    //         const response = await fetch('http://localhost:8080/cards', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ uid, bal}),
    //         });

    //         if (response.ok) {
    //             console.log('Card created successfully!');
    //         } else {
    //             console.error('Failed to create card');
    //         }
    //     } catch (error) {
    //         console.error('Error creating card:', error);
    //     }
    // };
    // const handleAddUser = () => {
    //     createCard();
    // };

    return (
        <div>
            <div className='modal-container'>
            {addUser && (
                <div className='add-user'>
                    <div className='overlay'>
                    <div className='modal-content'>
                        <div className='title'>HAKDOG</div>
                        <input className='uid'
                                placeholder='UID'
                                ></input>
                        <input className='bal'
                                placeholder='Balance'
                                ></input>                  
                        <div className='close-modal' onClick={toggleAddUser}>Close</div>
                        </div>
                    </div>
                </div>
                 )}
            </div>
            <div className="main-row">              
                <div className="btn-add-user" onClick={toggleAddUser} >
                    + Add new user
                </div>
                
                <div className="search">
                    <div className="search-bar">
                        
                        <input type='text' 
                                className='search-input'
                                placeholder='Enter your search'>
                        </input>
                        <button className='search-submit'>
                            <BsSearch />
                        </button>
                    </div>
                </div>
                <div className="tab-logo">                   
                    <BsCardHeading size={45} />
                    <div className='count'>{count}</div>
                </div>
            </div>
            
            <div className="list">
                <div>           
                    List of UIDs       
                </div>
            </div>
        </div>
    )
}

export default UID;