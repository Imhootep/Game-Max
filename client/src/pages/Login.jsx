import React, { useContext  } from 'react';
import { UidContext } from '../components/AppContext';
import { Redirect } from 'react-router';
import Cookies from 'js-cookie';
import loading from '../img/loading.gif';
import Log from '../components/Log'


const Login = () => {
    const uid = useContext(UidContext)
    return (
        <>
        {uid ? 
        <img src={loading} alt="loading" title="Loading" className="loading" />
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