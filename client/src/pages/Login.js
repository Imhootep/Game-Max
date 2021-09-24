import React from 'react';

import Log from '../components/Log'


const Login = () => {
    return (
        <div className="profil-page">
            <div className="log-container">
            
                <Log signin={true} signup={false} />
            </div>
        </div>
    );
};

export default Login;