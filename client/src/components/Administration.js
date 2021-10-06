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

const Administration = () => {

    const dispatch = useDispatch ();

    const user = useSelector((state) => state.userReducer);
    const users = useSelector((state) => state.usersReducer);
    dispatch(getUsers())

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

    

    const showHTD = () => {
        if(document.getElementById("howToDoContent").style.display === "none"){
            document.getElementById("howToDoContent").style.display = "block";
        }else{
            document.getElementById("howToDoContent").style.display = "none";
        }
    };


    return (
        <div className="administrationContainer">
            <div className="adminBigBlock">
                <div id="howToDoContent">
                    Ceci est le block d'aide pour l'admin
                </div>
                <div className="adminSubTitle">
                    <b>Utilisateurs en attente</b>
                    <div  className="howToDo"  onClick={() => showHTD()}>
                        <b>Comment faire ?</b>
                    </div>
                </div>
                {users.map((val)=>{
                return(
                    <>
                    {val.role === '' ?
                    <div className="adminBlock">
                        <div className="adminSection">{val.pseudo}</div>
                        <div className="adminSection">
                            <select className="adminRoleSelect">
                                <option value="studio" selected>Studio</option>
                                <option value="expert">Expert</option>
                                <option value="sponsor">Sponsor</option>
                                <option value="partenaire">Partenaire</option>
                            </select>
                        </div>
                        <div className="adminSection">
                            <img className="adminIconEvent" src={check} alt="add" title="valider"/>
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
                    <b>Utilisateurs Désactivés</b>
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