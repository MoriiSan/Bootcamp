import React, {useState} from 'react';
import './index.css';
import Navigation from '../../components/Navigation';
 
const Home = () => {
    // const [name, setName] = useState("John Doe");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [tempFname, setTempFname] = useState("");
    const [tempLname, setTempLname] = useState("");

    const clickEvent = () => {
        console.log("Clicked");
        setTempFname(firstName);
        setTempLname(lastName);
    }

    // const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>)=> {
    //     setFirstName(e.target.value);
    // }

    return (
        <div>
            <Navigation></Navigation>

            <h1> WELCOME, {tempFname} {tempLname}!</h1>

            <input onChange={(e)=> setFirstName(e.target.value)}
            placeholder='First Name'/>

            <input onChange={(e)=> setLastName(e.target.value)}
            placeholder='Last Name' />

            <button onClick={clickEvent}>
                Submit
            </button>

            {/* <div>Footer</div> */}
        </div>
    )
}
 
export default Home;