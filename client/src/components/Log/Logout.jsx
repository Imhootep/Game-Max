import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const Logout = () => {

    const logout = async () =>{
        Cookies.remove('jwt', { path: '' })
        window.location = "/";
    };

    return (
        <li onClick={logout} className="logout">
            <img src="./img/icons/logout.svg" alt="logout"/>

        </li>
    );
};

export default Logout;