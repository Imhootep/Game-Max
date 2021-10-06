import React, { useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { getUsers} from "../actions/users.actions";
import axios from 'axios';
// import { setDisableUserFalse, setDisableUserTrue } from '../../../controllers/user.controller';

import check from '../img/check.svg';
import bin from '../img/bin.svg';
import pen from '../img/pen.svg';
import cross from '../img/cross.svg';
import cross2 from '../img/cross2.svg'; //choisir
import thumb from '../img/thumb.svg';
import info from '../img/info.svg';

const Administration = () => {

    const dispatch = useDispatch ();

    const user = useSelector((state) => state.userReducer);
    const users = useSelector((state) => state.usersReducer);
    dispatch(getUsers())

    const [role,setRole] = useState("Studio"); //add user
    const [roleUser,setRoleUser] = useState("Studio"); //modify user
    const [modifying,setModifying] = useState('');

    // role d'un non validé
    const handleRole = (data) =>{
        setRole(data);
    }

    //disable et enable un user
    const disable = (id) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/user/disabled/` + id,
          })
    }

    const enable = (id) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/user/enabled/` + id,
          })
    }

    // modifier le role d'un user
    const modify = (id,role) => {
       if(modifying === ''){
        setModifying(id)
       }else{
        setModifying('')
       }

       handleRoleUser(role)
    }

    const setModify = (id) => {
        setModifying('')
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/user/role/` + id,
            data: {role:roleUser}
          })
    }

    const handleRoleUser = (data) =>{
        setRoleUser(data);
    }
    

    //valider le role d'un nouveau user
    const validate = (id) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/user/role/` +id,
            data: {role:role}
          })
    }

    const deleteUser = (id) => {
        return axios({
            method:"delete",
            url: `${process.env.REACT_APP_API_URL}api/user/` + id
          })
    }

    
    // bloc info admin
    const showHTD = () => { //a mettre en react 
        if(document.getElementById("howToDoContent").style.display === "none" || document.getElementById("howToDoContent").style.display === '' || document.getElementById("howToDoContent").style.display === null){
            document.getElementById("howToDoContent").style.display = "block";
        }else{
            document.getElementById("howToDoContent").style.display = "none";
        }
    };


    return (
        <div className="administrationContainer">
            <div className="adminBigBlock">
                <div id="howToDoContent">
                    <p><b>Aide pour admin</b></p>
                    <p>Cette section est divisée en trois parties:</p>
                    <ol className="ordonnedList">
                        <li>Utilisateurs en attentes</li>
                        <li>Utilisateurs validés</li>
                        <li>Utilisateurs désactivés</li>
                    </ol>
                    <p>
                        1. Ici sont répertoriés les utilisateurs qui ont créé un compte mais n'ont pas encore accès au site. Pour leur donner accès il vous suffit de cliquer sur l'icone "V". Pour refuser la demande et donc supprimer leur compte cliquer sur "X"
                    </p>
                    <p>
                        2. Ici sont répertoriés les utilisateurs qui ont créé un compte et ont été validé par un admin. Ils ont libre accès au site. Pour désactiver un compte cliquez sur le poubelle. Pour modifier le rôle d'un compte cliquez sur le crayon puis sur le "V".
                    </p>
                    <p>
                        3. Ici sont répertoriés les utilisateurs qui ont été désactivés. Ils n'ont plus accès au site. Pour les réactiver, appuyez sur le pouce en l'air.
                    </p>
                </div>
                <div className="adminSubTitle">
                    <b>Utilisateurs en attente</b>
                    <div  className="howToDo"  onClick={() => showHTD()}>
                        <b>Comment faire ?</b>
                        <img src={info} alt="info" title="Plus d'infos" className="adminIconEvent"/>
                    </div>
                </div>
                {users.map((val)=>{
                return(
                    <>
                    {val.role === '' ?
                    <div className="adminBlock">
                        <div className="adminSection">{val.pseudo}</div>
                        <div className="adminSection">
                            <select className="adminRoleSelect" onChange={(e) => handleRole(e.target.value)}>
                                <option value="Studio" selected>Studio</option>
                                <option value="Expert">Expert</option>
                                <option value="Sponsor">Sponsor</option>
                                <option value="Partenaire">Partenaire</option>
                            </select>
                        </div>
                        <div className="adminSection">
                            <img className="adminIconEvent" src={check} alt="add" title="Valider la demande" onClick={() => validate(val._id)}/>
                            <img className="adminIconEvent" src={cross2} alt="delete" title="Supprimer la demande"  onClick={() => deleteUser(val._id)}/>
                        </div>
                    </div>
                     :
                     ''
                     }
                    </>
                    )          
                })}
            </div>
            <div className="adminBigBlock">
                <div className="adminSubTitle">
                    <b>Utilisateurs validés</b>
                </div>
                {users.map((val)=>{
                return(
                    <>
                    {val.role !== '' && val.isDisabled !== true && val._id !== user._id ?
                    <div className="adminBlock">
                        <div className="adminSection">{val.pseudo}</div>
                        <div className="adminSection">
                            <select className="adminRoleSelect" onChange={(e) => handleRoleUser(e.target.value)} disabled={modifying !== '' && modifying === val._id ? '' : 'disabled' }>
                                <option value="Studio" selected={val.role === "Studio" ? "selected" : ""}>Studio</option>
                                <option value="Expert" selected={val.role === "Expert" ? "selected" : ""}>Expert</option>
                                <option value="Sponsor" selected={val.role === "Sponsor" ? "selected" : ""}>Sponsor</option>
                                <option value="Partenaire" selected={val.role === "Partenaire" ? "selected" : ""}>Partenaire</option>
                            </select>    
                        </div>
                        <div className="adminSection">
                            <img src={bin} alt="poubelle" title="Désactiver" className="adminIconEvent" onClick={() => disable(val._id)}/>
                            {modifying === val._id ?
                                <img src={check} alt="valider" title="Valider la modification" className="adminIconEvent" onClick={() => setModify(val._id)}/>
                                :
                                <img src={pen} alt="crayon" title="Modifier" className="adminIconEvent" onClick={() => modify(val._id,val.role)}/>
                            }
                            
                        </div>
                    </div>
                    : ''}
                    </>
                    )          
                })}
            </div>

            <div className="adminBigBlock">
                <div className="adminSubTitle">
                    <b>Utilisateurs désactivés</b>
                </div>
                {users.map((val)=>{
                return(
                    <>
                    {val.isDisabled === true ?
                    <div className="adminBlock disable">
                        <div className="adminSection">{val.pseudo}</div>
                        <div className="adminSection">{val.role}</div>
                        <div className="adminSection">
                            <img src={thumb} alt="poubelle" title="Ré-activer" className="adminIconEvent"  onClick={() => enable(val._id)}/>
                            <img className="adminIconEvent" src={cross2} alt="delete" title="Supprimer la demande"  onClick={() => deleteUser(val._id)}/>
                        </div>
                    </div>

                     : ''
                     }
                    </>
                    )          
                })}
            </div>
        </div>
    );
};

export default Administration;