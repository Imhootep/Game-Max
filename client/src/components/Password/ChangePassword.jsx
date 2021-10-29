import React, { useContext, useState } from 'react';
import { UidContext } from '../AppContext';
import Cookies from 'js-cookie';
import axios from 'axios';


const ChangePassword = () => {
    const uid = useContext(UidContext)
    const [ancienPass,setAncienPass] = useState('');
    const [newPass,setNewPass] = useState('');
    const [confirmNewPass,setConfirmNewPass] = useState('');

    const handleAncienPass = (data) => {
        setAncienPass(data);
    }

    const handleNewPass = (data) => {
        setNewPass(data);
    }

    const handleConfirmNewPass = (data) => {
        setConfirmNewPass(data);
    }

    const updatePassword = () => {
        return axios({
            method:"patch",
            headers : { Authorization : "Bearer "+Cookies.get('jwt') },
            url: `${process.env.REACT_APP_API_URL}api/user/update/password/`+uid,
            data: {ancienPass:ancienPass, newPass: newPass, confirmNewPass: confirmNewPass}
          })
    }

    return (
        <div className="changePass-container">
             <form action="">
           <h3>Modification du mot de passe</h3>
                <br/>
               <input type="password" name="ancienPass" placeholder="Mot de passe actuel" onChange={(e) => handleAncienPass(e.target.value)}/>
                <br/><br/>
               <input type="password" name="newPass" placeholder="Nouveau mot de passe" onChange={(e) => handleNewPass(e.target.value)}/>
               <br/><br/>
               <input type="password" name="confirmNewPass" placeholder="Confirmer nouveau mot de passe" onChange={(e) => handleConfirmNewPass(e.target.value)}/>
               <br/><br/>
               <button type="Submit" onClick={() => updatePassword()}>Modifier</button>
               <br/><br/>
               <div className="log error"></div>
           </form>
        </div>
    );
};

export default ChangePassword;