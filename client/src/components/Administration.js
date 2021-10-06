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

    const [role,setRole] = useState("Studio");

    const handleRole = (data) =>{
        setRole(data);
    }

    // const deleteQuote = ()=> dispatch(deletePost(props.id))

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

    const validate = (id) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/user/role/` +id,
            data: {role:role}
          })
    }

    

    const showHTD = () => {
        console.log("display style: ")
        console.log(document.getElementById("howToDoContent").style.display)
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
                        <img src={info} alt="info" title="plus d'infos" className="adminIconEvent"/>
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
                            <img className="adminIconEvent" src={check} alt="add" title="valider" onClick={() => validate(val._id)}/>
                            <img className="adminIconEvent" src={cross2} alt="add" title="valider"/>
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
                        <div className="adminSection">{val.role}</div>
                        <div className="adminSection">
                            <img src={bin} alt="poubelle" title="désactiver" className="adminIconEvent" onClick={() => disable(val._id)}/>
                            <img src={pen} alt="crayon" title="modifier" className="adminIconEvent"/>
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
                            <img src={thumb} alt="poubelle" title="ré-activer" className="adminIconEvent"  onClick={() => enable(val._id)}/>
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