import React, { useContext  } from 'react';
import { UidContext } from '../components/AppContext';
import { Redirect } from 'react-router';
import Cookies from 'js-cookie';

import Log from '../components/Log'


const Login = () => {
    const uid = useContext(UidContext)
    return (
        <>
        {uid ? 
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