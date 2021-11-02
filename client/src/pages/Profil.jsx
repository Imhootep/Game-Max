import React, { useContext, useState } from 'react';
// import { UidContext } from '../components/AppContext';
// import Log from '../components/Log';
import Navbar from '../components/Navigation/Navbar';
import UpdateProfil from '../components/profil/UpdateProfil';
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
import logo from "../img/logo2.png";
import { Redirect } from 'react-router';
import { UidContext } from '../components/AppContext';
import loading from '../img/loading.gif';

const Profil = () => {
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    // const uid = useContext(UidContext);
    const [oust,setOust] = useState(false);
    const ticTac = () =>{
        setInterval(() => {
          setOust(true)
        }, 1500)
    }

    const uid = useContext(UidContext)

    return (
        <div className="profil-page">
             <>
            {uid !== null ? 
               <> 
                <Navbar/>
                <br/>
                <br/>
                <br/>
                <UpdateProfil userData={userData} usersData={usersData}/>
               </>
            // :  <Redirect to='/'  /> 
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
        </div>
    );
};

export default Profil;