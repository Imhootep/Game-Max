import React, { useContext, useState  } from 'react';
import Navbar from '../components/Navigation/Navbar';
import LeftNav from '../components/Navigation/LeftNav';
import SearchStudio from '../components/Search/SearchStudio';
import Cookies from 'js-cookie';
import logo from "../img/logo2.png";
import { Redirect } from 'react-router';
import { UidContext } from '../components/AppContext';
import loading from '../img/loading.gif';


const Studio = () => {
    const uid = useContext(UidContext)
    const ticTac = () =>{
        setInterval(() => {
          setOust(true)
        }, 1500)
    }
    const [oust,setOust] = useState(false);

    return (
        <>
        {uid !== null ? 
        <div>
            <Navbar/>
            <div className="studio-container">
                <LeftNav/>
                <SearchStudio/>
            </div>
        </div>
        :
        <div>
            <img src={logo} className="loading" alt="logo"  onLoad={() => ticTac()}/>
            <div class='pac-man'/>
            <div>
                {oust === true ? <Redirect to='/home'  /> : '' }
            </div>
        </div>
        }
        </>
    );
};

export default Studio;