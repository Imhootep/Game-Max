import React, { useContext, useState } from 'react';
import { UidContext } from '../components/AppContext';
import { Redirect } from 'react-router';
import Cookies from 'js-cookie';
import loading from '../img/loading.gif';
import logo from "../img/logo2.png";
import Log from '../components/Log'


const Login = () => {

    
    const [oust,setOust] = useState(false);

    const ticTac = () =>{
        setInterval(() => {
          setOust(true)
        }, 1500)
    }

    const uid = useContext(UidContext)

    return (
        <>
        {uid ? 
        <div>
        <img src={logo} className="loading" alt="logo"  onLoad={() => ticTac()}/>
        <div class='pac-man'/>
        <div>
            {oust === true ? <Redirect to='/home'  /> : '' }
        </div>
    </div>
        :
        <div className="profil-page">
            <div className="log-container">
                <Log signin={true} signup={false} />
            </div>
        </div>
        }
        </>
    );
};

export default Login;