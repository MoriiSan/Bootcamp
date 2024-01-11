import './uid.css'
import { BsCardHeading, BsSearch } from "react-icons/bs";
import { card } from '../db/cards';

const count = 121;

const UID = () => {
    return (
        <div>
            <div className="main-row">              
                <div className="add-user">
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
                    {/* <div className="row-headers">row headers
                        <div>item 1</div>
                        <div>item 2</div>
                        <div>item 3</div>
                    </div> */}
                    List of UIDs
                    {/* <ul className='card-list'>
                        <li>
                            <div>UID</div>
                            <div>Bal</div>
                        </li>
                        {card.map((card) => (
                            <li key={card.uid}>
                                <div>{card.uid}</div>
                                <div>{card.bal}</div>
                            </li>
                        ))}
                    </ul> */}
                </div>
            </div>
        </div>
    )
}

export default UID;