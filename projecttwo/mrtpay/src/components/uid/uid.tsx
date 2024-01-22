import { SetStateAction, useEffect, useState } from 'react';
import './uid.css'
import { BsCardHeading, BsSearch } from "react-icons/bs";
import { BsXSquareFill, BsCardText, BsCash } from "react-icons/bs";
//<BsCash />
//<BsCardText />

const UID = () => {
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

    const [selectedCard, setSelectedCard] = useState({ uid: 0, bal: 0 });
    const handleSelect = (card: SetStateAction<{ uid: number; bal: number; }>) => {
        setSelectedCard(card);
    };

    const [cards, setCards] = useState<Cards[]>([]);
    interface Cards {
        uid: number;
        bal: number;
    }
    const [newBalance, setNewBalance] = useState('');

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

            if (response.status === 201) {
                const newCard = await response.json();
                console.log('Card created successfully:', newCard);
            } else if (response.status === 400) {
                console.error('Invalid request data');
            } else if (response.status === 409) {
                console.error('Card with the same UID already exists');
            } else {
                console.error('Failed to create card');
            }
        } catch (error) {
            console.error('Error creating card:', error);
        }
    };

    const handleGenerate = async () => {
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
            } else {
                console.error('Failed to update balance');
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
            } else {
                console.error('Failed to delete card');
            }
        } catch (error) {
            console.error('Error deleting card', error);
        }
    };

    return (
        <div>
            <div className='modal-container'>
                {addUser && (
                    <div className='add-user'>
                        <div className='overlay'>
                            <div className='modal-content'>
                                <button className='close' onClick={toggleAddUser}>
                                    <BsXSquareFill size={20} />
                                </button>
                                <div className='title'>Create new card</div>
                                <input className='uid'
                                    onChange={(e) => { setUid(e.target.value) }}
                                    placeholder='UID'
                                ></input>
                                <input className='bal'
                                    onChange={(e) => { setBal(e.target.value) }}
                                    placeholder='Balance'
                                ></input>
                                <button className="btn-generate"
                                    onClick={handleGenerate}>
                                    Generate card</button>
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
                            placeholder="Enter your search"
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
                <div className="bg-style"></div>
                {filteredCards.map((card, index) => (
                    <div className="mrt-card"
                        key={index}
                        onClick={() => handleSelect(card)}>
                        <div className="uid-card">uid: {card.uid}</div>
                        <div className="bal-card">bal: {card.bal}</div>
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
                                    <label>UID: {selectedCard.uid}</label>
                                    <label>BALANCE: {selectedCard.bal}</label>
                                    <div className="add-bal-container">
                                        <label className="amt-label">Amount:</label>
                                        <input className="add-bal"
                                            type="number"
                                            value={newBalance}
                                            onChange={(e) => setNewBalance(e.target.value)}
                                            placeholder='Input amount'></input>
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
                                <label>UID: {selectedCard.uid}</label>
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
        </div>
    )
}

export default UID;