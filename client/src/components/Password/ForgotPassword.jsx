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

            <form action="">
                <h3>Entrez votre mot de passe</h3>
                <input className="inputNewPass" type="text" placeholder="Nouveau mot de passe" />
                <input className="inputNewPass" type="text" placeholder="Confirmer nouveau mot de passe" />
                <button onClick="Submit">Envoyer la demande</button>
            </form>
        </div>
    );
};

export default ForgotPassword;