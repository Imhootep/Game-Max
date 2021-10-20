import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const Logout = () => {

    const removeCookie = () => {
        if(window !== "undefined")
        Cookies.remove('jwt', { path: '' })
    }

    const logout = async () =>{
        await axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials:true,
        })
        .then(()=> removeCookie())
        .catch((err)=> console.log(err))

        window.location = "/";
    };

    return (
        <li onClick={logout}>
            <img src="./img/icons/logout.svg" alt="logout"/>

        </li>
    );
};

export default Logout;