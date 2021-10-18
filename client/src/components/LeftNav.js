import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import discord from "../img/discord.svg"

const LeftNav = () => {
    const user = useSelector((state)=> state.userReducer)

    console.log('is admin?: ')
    console.log(user.isAdmin)

    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to='/home' exact activeClassName="active-left-nav" id="homeHoverParent">
                        <div id="homeHover">
                            Home
                        </div>
                        <img src="./img/icons/home.svg" alt="home"/>
                    </NavLink>
                    <br/>
                    <NavLink to='/studio' exact activeClassName="active-left-nav" id="studioHoverParent">
                    <div id="studioHover">
                        Entreprises
                    </div>
                    <img src="./img/icons/rocket.svg" alt="studio"/>
                    </NavLink>
                    
                    <br/>
                    <NavLink to='/profil' exact activeClassName="active-left-nav" id="profilHoverParent">
                        <div id="profilHover">
                            Profil
                        </div>
                        <img src="./img/icons/user.svg" alt="home"/>
                    </NavLink>
                    <br/>
                    <a href="https://discord.gg/wx53YfaR" id="discordHoverParent">
                    <div id="discordHover">
                                Discord
                            </div>
                    <img src={discord} alt="discord" className="NavImg"/>
                    </a>
                    <br />
                    {
                        user.isAdmin === true ?

                        <NavLink to='/admin' exact activeClassName="active-left-nav" id="adminHoverParent">
                            <div id="adminHover">
                                Admin
                            </div>
                            <img src="./img/icons/admin1.svg" alt="admin" className="NavImg"/>
                        </NavLink>



                        :

                        ''

                    }
                    
                </div>
            </div>
        </div>
    );
};

export default LeftNav;