import React, { useContext, useState } from 'react';
import { UidContext } from '../AppContext';
import Cookies from 'js-cookie';
import axios from 'axios';


const ForgotPassword = () => {
    const [email,setEmail] = useState('');

    const handleEmail = (data) => {
        setEmail(data);
    }

    const resetPassword = () => {
        return axios({
            method: "post",
            headers: {},
            url: `${process.env.REACT_APP_API_URL}api/user/reset/password`,
            data: {email: email}
        })
    }
    return (
        <div className="forgotPass-container">
             <form action="">
                <h3>Oublié votre mot de passe?</h3>
                <p>Nous vous enverrons un mail avec un lien pour créer un nouveau mot de passe</p>
                <input className="inputForgotPass" type="text" name="email" placeholder="Veuillez entrer votre email" onChange={(e) => handleEmail(e.target.value)}/>
                <button type="Submit" onClick={() => resetPassword()}>Envoyer</button>
            </form>
        </div>
    );
};

export default ForgotPassword;