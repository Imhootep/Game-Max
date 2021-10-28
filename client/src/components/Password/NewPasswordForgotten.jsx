import React from 'react';
import { UidContext } from '../AppContext';
import Cookies from 'js-cookie';
import axios from 'axios';


const NewPasswordForgotten = () => {
   

    return (
        <div className="forgotPass-container">
            <form action="">
                <h3>Entrez votre mot de passe</h3>
                <input className="inputNewPass" type="text" placeholder="Nouveau mot de passe" />
                <input className="inputNewPass" type="text" placeholder="Confirmer nouveau mot de passe" />
                <button onClick="Submit">Envoyer la demande</button>
            </form>
        </div>
    );
};

export default NewPasswordForgotten;