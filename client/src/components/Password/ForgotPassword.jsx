import React from 'react';
import { UidContext } from '../AppContext';
import Cookies from 'js-cookie';
import axios from 'axios';


const ForgotPassword = () => {
   

    return (
        <div className="forgotPass-container">
             <form action="">
                <h3>Oublié votre mot de passe?</h3>
                <p>Nous vous enverrons un mail avec un lien pour créer un nouveau mot de passe</p>
                <input className="inputForgotPass" type="text" placeholder="Veuillez entrer votre email" />
                <button onClick="Submit">Envoyer</button>
            </form>
        </div>
    );
};

export default ForgotPassword;