import React from 'react';



const ChangePassword = () => {
   

    return (
        <div className="changePass-container">
             <form action="">
           <h3>modification du mot de passe</h3>
               <input type="text" placeholder="Mot de passe actuel"/>
               <input type="text" placeholder="Nouveau mot de passe"/>
               <input type="text" placeholder="Confirmer nouveau mot de passe"/>
               <button onClick="Submit">Modifier</button>
           </form>
        </div>
    );
};

export default ChangePassword;