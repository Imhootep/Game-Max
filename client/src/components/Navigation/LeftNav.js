import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import discord from "../../img/discord2.svg";
import fb from '../../img/fb.svg';
import twitch from '../../img/twitch.svg';
import twitter from '../../img/twitter.svg';
import site from '../../img/logo2.png'

const LeftNav = () => {
    const user = useSelector((state)=> state.userReducer)

    // console.log('is admin?: ')
    // console.log(user.isAdmin)

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
                    
                    <br />
                    {
                        user.isAdmin === true ? (

                        <NavLink to='/admin' exact activeClassName="active-left-nav" id="adminHoverParent">
                            <div id="adminHover">
                                Admin
                            </div>
                            <img src="./img/icons/admin1.svg" alt="admin" className="NavImg"/>
                        </NavLink>

                        ):(

                        '')

                    }
                    
                </div>
            </div>
            <div className="sm-link">
            <br/>
            <a href="https://gamemax.be/" id="siteHoverParent" target="_blank">
                    <div id="siteHover">
                               
                            </div>
                    <img src={site} alt="site" className="NavImgSite" />
                    </a>
                    <a href="https://discord.gg/wx53YfaR" id="discordHoverParent" target="_blank">
                    <div id="discordHover">
                               
                            </div>
                    <img src={discord} alt="discord" className="NavImg" />
                    </a>
                    <a href="https://www.facebook.com/gamemaxbe" id="fbHoverParent" target="_blank">
                    <div id="fbHover">
                                
                            </div>
                    <img src={fb} alt="facebook" className="NavImg" />
                    </a>
                    <a href="https://www.twitch.tv/gamemax" id="twitchHoverParent" target="_blank">

                    <div id="twitchHover">
                                
                            </div>
                    <img src={twitch} alt="twitch" className="NavImg" />
                    </a>
                    <a href="https://twitter.com/gamemaxbe" id="twitterHoverParent" target="_blank">

                    <div id="twitterHover">
                                
                            </div>
                    <img src={twitter} alt="twitter" className="NavImg" />
                    </a>
            </div>
        </div>
    );
};

export default LeftNav;