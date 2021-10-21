import React from 'react';
import { Redirect } from 'react-router';
import Cookies from 'js-cookie';

import Log from '../components/Log'


const Login = () => {
    return (
        <>
        {Cookies.get("jwt") ? 
         <Redirect to='/home'  />
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