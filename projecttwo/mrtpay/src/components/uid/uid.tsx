import { SetStateAction, useEffect, useState } from 'react';
import './uid.css'
import { BsCardHeading, BsSearch } from "react-icons/bs";
import { BsXSquareFill, BsCardText, BsCheckSquareFill } from "react-icons/bs";
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css';
//<BsCashCoin />
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
            const parsedBal = parseFloat(bal);
            if (isNaN(parsedBal) || parsedBal < 0 || parsedBal > 1000) {
                console.error('Invalid balance value.');
                Store.addNotification({
                    title: "OOPS.",
                    message: "Invalid balance value. Balance must be between 0 and 1000.",
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__bounceIn"],
                    animationOut: ["animate__animated animate__slideOutRight"],
                    dismiss: {
                        duration: 2000,
                    }
                });
                return;
            }
            const response = await fetch('http://localhost:8080/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid, bal }),
            });

            if (response.ok) {
                // const newCard = await response.json();
                Store.addNotification({
                    title: "CREATED!",
                    message: "Card created successfully!",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__bounceIn"],
                    animationOut: ["animate__animated animate__slideOutRight"],
                    dismiss: {
                        duration: 2000,
                    }
                });
            } else {
                console.error('UID is already existing.');
                Store.addNotification({
                    title: "OOPS.",
                    message: "Card is already existing!",
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__bounceIn"],
                    animationOut: ["animate__animated animate__slideOutRight"],
                    dismiss: {
                        duration: 2000,
                    }
                });
            }
        } catch (error) {
            console.error('Error creating card:', error);
            alert(`Failed to create card`)
        }
    };

    const handleGenerate = async () => {
        if (uid.length !== 10) {
            console.error('UID must be 10 digits long');
            Store.addNotification({
                title: "OOPS.",
                message: "UID must be 10 digits long.",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated animate__bounceIn"],
                animationOut: ["animate__animated animate__slideOutRight"],
                dismiss: {
                    duration: 2000,
                }
            });
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
            console.error('Load must be above zero.');
            Store.addNotification({
                title: "OOPS.",
                message: "Load must be above zero.",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated animate__bounceIn"],
                animationOut: ["animate__animated animate__slideOutRight"],
                dismiss: {
                    duration: 2000,
                }
            });
            setNewBalance('');
            return;
        }
        if (parsedNewBalance > 1000) {
            console.error('Maximum load of 1000.');
            Store.addNotification({
                title: "OOPS.",
                message: "Maximum load of 1000.",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated animate__bounceIn"],
                animationOut: ["animate__animated animate__slideOutRight"],
                dismiss: {
                    duration: 2000,
                }
            });
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
                Store.addNotification({
                    title: "NEW BALANCE!",
                    message: "Card loaded succesfuly!",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__bounceIn"],
                    animationOut: ["animate__animated animate__slideOutRight"],
                    dismiss: {
                        duration: 2000,
                    }
                });
            } else {
                console.error('Failed to update balance');
                Store.addNotification({
                    title: "OH NO!",
                    message: "Failed to update balance",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__bounceIn"],
                    animationOut: ["animate__animated animate__slideOutRight"],
                    dismiss: {
                        duration: 2000,
                    }
                });
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
                Store.addNotification({
                    title: "DELETED!",
                    message: "Card deleted successfully!",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__bounceIn"],
                    animationOut: ["animate__animated animate__slideOutRight"],
                    dismiss: {
                        duration: 2000,
                    }
                });
            } else {
                console.error('Failed to delete card');
                Store.addNotification({
                    title: "OH NO!",
                    message: "Failed to delete card.",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__bounceIn"],
                    animationOut: ["animate__animated animate__slideOutRight"],
                    dismiss: {
                        duration: 2000,
                    }
                });
            }
        } catch (error) {
            console.error('Error deleting card', error);
        }
    };

    //AUTO GENERATE CARD VALUES
    const generateRandomDigits = () => {
        const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
        return randomNumber.toString();
    };

    const autoGenerateUid = () => {
        const generatedUid = `${generateRandomDigits()}`;
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
            <div className="app-container">
                <ReactNotifications />
            </div>
            <div className='modal-container'>
                {addUser && (
                    <div className='add-user'>
                        <div className='overlay'>
                            <div className='modal-content'>
                                <div className='title'>Create new card</div>
                                <div className="detail-container">
                                    <label className="label">UID:</label>
                                    <input className='input-container'
                                        type="number"
                                        value={uid}
                                        onChange={(e) => { setUid(e.target.value) }}
                                        placeholder='UID'
                                    ></input>
                                </div>
                                <div className="detail-container">
                                    <label className="label">BAL:</label>
                                    <input className='input-container'
                                        type="number"
                                        value={bal}
                                        onChange={(e) => { setBal(e.target.value) }}
                                        placeholder='Balance'
                                    ></input>
                                </div>
                                <div className="card-btns">
                                    <button className='btn-cancel'
                                        onClick={toggleAddUser}>
                                        Close
                                        <BsXSquareFill size={18} /></button>
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
                <div className="view-mode">
                    <div className="list-view">List View</div>
                    <div className="card-view">Card View</div>
                </div>
                <div className="tab-logo">
                    <div className='count'>{cards.length}</div>
                    <BsCardHeading size={30} />
                </div>
            </div>

            <div className="list">
                {filteredCards.map((card, index) => (
                    <div className="mrt-card"
                        key={index}
                        onClick={() => handleSelect(card)}>
                        <div className="card-details">
                            <div className="uid-card">{card.uid}</div>
                            <div className="bal-card">PHP {card.bal}</div>
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
                                        <BsXSquareFill size={18} /></button>
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
                                        <BsXSquareFill size={18} /></button>
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