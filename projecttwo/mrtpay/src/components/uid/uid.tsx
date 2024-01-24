import { SetStateAction, useEffect, useState } from 'react';
import './uid.css'
import { BsCardHeading, BsSearch } from "react-icons/bs";
import { BsXSquareFill, BsCardText, BsCashCoin, BsCash, BsCheckSquareFill } from "react-icons/bs";
//<BsCashCoin />
//<BsCash />
//<BsCardText />

const UID = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const showSuccessPopup = () => {
        setShowSuccessMessage(true);

        // Hide the success message after 2 seconds
        // setTimeout(() => {
        //     setShowSuccessMessage(false);
        // }, 2000);
    };

    //// add-user-modal
    const [addUser, setAddUser] = useState(false);
    const toggleAddUser = () => {
        setAddUser(!addUser)
    };
    const [addLoad, setAddLoad] = useState(false);
    const toggleAddLoad = () => {
        setAddLoad(!addLoad)
    };
    const [isDelete, setIsDelete] = useState(false);
    const toggleIsDelete = () => {
        setIsDelete(!isDelete)
    };

    const [uid, setUid] = useState('')
    const [bal, setBal] = useState('')
    const [newBalance, setNewBalance] = useState('');

    const [selectedCard, setSelectedCard] = useState({ uid: 0, bal: 0 });
    const handleSelect = (card: SetStateAction<{ uid: number; bal: number; }>) => {
        setSelectedCard(card);
    };

    const [cards, setCards] = useState<Cards[]>([]);
    interface Cards {
        uid: number;
        bal: number;
    }

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = () => {
        fetchCards();
    };
    const handleSearchInput = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchQuery(e.target.value);
    };
    const filteredCards = cards.filter((card) =>
        card.uid.toString().includes(searchQuery)
    );

    const handleCreate = async () => {
        try {
            const response = await fetch('http://localhost:8080/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid, bal }),
            });

            if (response.ok) {
                const newCard = await response.json();
                showSuccessPopup();
            } else {
                console.error('Failed to create card');
                alert(`Failed to create card`)
            }
        } catch (error) {
            console.error('Error creating card:', error);
            alert(`Failed to create card`)
        }
    };

    const handleGenerate = async () => {
        if (uid.length !== 16) {
            console.error('UID must be 16 digits long');
            alert(`UID must be 16 digits long`)
            return;
        }
        await handleCreate();
        toggleAddUser();
    };

    const fetchCards = async () => {
        try {
            const response = await fetch(`http://localhost:8080/cards?uid=${uid}&bal=${bal}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const fetchedCards = await response.json();
                setCards(fetchedCards);
            } else {
                console.error('Failed to fetch cards');
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, [addUser, addLoad]);

    const handleAddBalance = async () => {
        const parsedNewBalance = parseFloat(newBalance);
        if (isNaN(parsedNewBalance) || parsedNewBalance <= 0) {
            console.error('Amount must be a positive number');
            alert(`Amount must be above zero`)
            setNewBalance('');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/cards/${selectedCard.uid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bal: selectedCard.bal + parseFloat(newBalance) }),
            });

            if (response.ok) {
                const updatedCard = await response.json();
                setCards((prevCards) =>
                    prevCards.map((card) =>
                        card.uid === selectedCard.uid ? updatedCard : card
                    )
                );
                toggleAddLoad();
                setNewBalance('');
                alert(`Added PHP ${newBalance} to UID ${selectedCard.uid}`)
            } else {
                console.error('Failed to update balance');
                alert(`Failed to update balance`)
            }
        } catch (error) {
            console.error('Error updating balance', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/cards/${selectedCard.uid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setCards((prevCards) =>
                    prevCards.filter((card) => card.uid !== selectedCard.uid)
                );
                toggleIsDelete();
                alert(`Card ${selectedCard.uid} deleted.`)
            } else {
                console.error('Failed to delete card');
                alert(`Failed to delete card`)
            }
        } catch (error) {
            console.error('Error deleting card', error);
        }
    };

    //AUTO GENERATE CARD VALUES
    const generateRandomSixDigits = () => {
        const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
        return randomNumber.toString();
    };

    const autoGenerateUid = () => {
        const notGeneratedDigits = 637805;
        const generatedUid = `${notGeneratedDigits}${generateRandomSixDigits()}`;
        setUid(generatedUid);
    };

    const autoBalance = () => {
        const autoBal = '70';
        setBal(autoBal);
    }

    useEffect(() => {
        autoGenerateUid();
        autoBalance();
    }, [addUser]);

    return (
        <div>
            <div className='modal-container'>
                {addUser && (
                    <div className='add-user'>
                        <div className='overlay'>
                            <div className='modal-content'>
                                {/* <button className='close' onClick={toggleAddUser}>
                                    <BsXSquareFill size={20} />
                                </button> */}
                                <div className='title'>Create new card</div>
                                {/* <button className='btn-generate-uid' onClick={autoGenerateUid}>
                                    Auto-generate UID
                                </button> */}
                                <div className="detail-container">
                                    <label className="label">UID:</label>
                                    <input className='input-container'
                                        value={uid}
                                        onChange={(e) => { setUid(e.target.value) }}
                                        placeholder='UID'
                                    ></input>
                                </div>
                                <div className="detail-container">
                                    <label className="label">BAL:</label>
                                    <input className='input-container'
                                        value={bal}
                                        onChange={(e) => { setBal(e.target.value) }}
                                        placeholder='Balance'
                                    ></input>
                                </div>
                                <div className="card-btns">
                                    <button className='btn-cancel'
                                        onClick={toggleAddUser}>
                                        Close
                                        <BsXSquareFill size={20} /></button>
                                    <button className="btn-generate"
                                        onClick={handleGenerate}>
                                        Generate card</button>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="main-row">
                <div className="btn-add-user" onClick={toggleAddUser} >
                    + Add new card
                </div>

                <div className="search">
                    <div className="search-bar">

                        <input type="text"
                            className="search-input"
                            placeholder="Enter UID"
                            value={searchQuery}
                            onChange={handleSearchInput}>
                        </input>
                        <button className='search-submit'
                            onClick={handleSearch}>
                            <BsSearch />
                        </button>
                    </div>
                </div>
                <div className="tab-logo">
                    <BsCardHeading size={45} />
                    <div className='count'>{cards.length}</div>
                </div>
            </div>

            <div className="list">
                {filteredCards.map((card, index) => (
                    <div className="mrt-card"
                        key={index}
                        onClick={() => handleSelect(card)}>
                        <div className="card-details">
                            <div className="uid-card">{card.uid}</div>
                            <div className="bal-card"><BsCashCoin size={30} /> {card.bal}</div>
                        </div>
                        <div className="card-btns">
                            <button className="btn-load"
                                onClick={toggleAddLoad}>
                                Load</button>
                            <button className="btn-delete"
                                onClick={toggleIsDelete}>
                                Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='modal-container'>
                {addLoad && (
                    <div className='add-load'>
                        <div className='overlay'>
                            <div className='modal-content'>
                                <div className="load-details">
                                    <div className="detail-container">
                                        <label className="label">UID:</label>
                                        <div className="input-container"> {selectedCard.uid}</div>
                                    </div>
                                    <div className="detail-container">
                                        <label className="label">BAL:</label>
                                        <div className="input-container"> {selectedCard.bal}</div>

                                    </div>
                                    <div className="detail-container">
                                        <label className="label">Amount:</label>
                                        <input className="input-container"
                                            type="number"
                                            value={newBalance}
                                            onChange={(e) => setNewBalance(e.target.value)}
                                            placeholder='Add amount'></input>
                                    </div>
                                </div>
                                <div className="load-btns">
                                    <button className='btn-cancel'
                                        onClick={toggleAddLoad}>
                                        Close
                                        <BsXSquareFill size={20} /></button>
                                    <button className="btn-generate"
                                        onClick={handleAddBalance}>
                                        Add Balance</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='modal-container'>
                {isDelete && (
                    <div className='add-user'>
                        <div className='overlay'>
                            <div className='modal-content'>
                                <div className="detail-container">
                                    <label className="label">UID:</label>
                                    <div className="input-container">
                                        {selectedCard.uid}</div>
                                </div>
                                <div className="load-btns">
                                    <button className='btn-cancel'
                                        onClick={toggleIsDelete}>
                                        Cancel
                                        <BsXSquareFill size={20} /></button>
                                    <button className="btn-generate"
                                        onClick={handleDelete}>
                                        Confirm Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showSuccessMessage && (
                <div className="popup">
                    <div className="popup-color"></div>
                    <div className="popup-content">
                        <div className="popup-icon">
                            <BsCheckSquareFill size={30} />
                        </div>
                        <div>
                            <div>header</div>
                            <div>Card created successfully!</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UID;