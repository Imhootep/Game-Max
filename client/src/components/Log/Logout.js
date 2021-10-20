import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const Logout = () => {

    const logout = async () =>{
        // await axios({
        //     method:"get",
        //     headers : { Authorization : "Bearer "+Cookies.get('jwt') } ,
        //     url:`${process.env.REACT_APP_API_URL}api/user/logout`,
        //     withCredentials:true,
        // })
        // .then(()=> Cookies.set("jiwiti", "salut", { expires: 1 }))
        // .catch((err)=> console.log(err))

        // window.location = "/";
        Cookies.remove('jwt', { path: '' })
        window.location = "/";
    };

    return (
        <li onClick={logout}>
            <img src="./img/icons/logout.svg" alt="logout"/>

        </li>
    );
};

export default Logout;