import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';


const Navbar = () => {

    const uid = useContext(UidContext)
    const userData = useSelector((state)=> state.userReducer)
    

    return (
        <nav>
            <div className="nav-container">
                <div className="nav-logo">
                <NavLink exact to ="/home">
                    <div className="nav-logo">
                        <img className="icon-navBar" src="../img/logo-blanc.png" alt="logo" />
                        <h3>GameMax App</h3>
                        

                    </div>

                </NavLink>

            </div>
            <div className="welcomeNav">
                {uid?(
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact to="/profil">
                                <img src={userData.picture} alt="profil Pic"/>
                                <h5>Bienvenue {userData.pseudo} </h5>
                            </NavLink>
                        </li>
                        <Logout/>
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink exact to="/profil">
                                <img src="./img/icons/login.svg" alt="login-img"/>
                            </NavLink>
                        </li>
                    </ul>
                )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;