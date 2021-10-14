import React, { useContext,useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers} from "../actions/users.actions";
import {getUser} from "../actions/user.actions"
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';
// import discord from '../img/DiscordW.svg'
// import instagram from '../img/instagram.svg'
// import utube from '../img/youtube.svg'
import exclamation from '../img/exclamation.svg'



const Navbar = () => {

    const dispatch = useDispatch ();
    const uid = useContext(UidContext)
    const userData = useSelector((state)=> state.userReducer)

    const users = useSelector((state)=> state.usersReducer)
    useEffect(()=>{
        dispatch(getUsers())
        dispatch(getUser())
    }, [])
    
    const [acceptUser,setAcceptUser] = useState(false);

    users.map((val)=>{
        if(acceptUser === false && val.role === ''){
            setAcceptUser(true)
        }
    })
    
    return (
        <nav>
            <div className="nav-container">
                <div className="nav-logo">
                <NavLink exact to ="/home">
                    <div className="nav-logo">
                        <img className="icon-navBar" src="../img/Logo-Blanc.png" alt="logo" />
                        {/* <div className="socialProfil">
                            <a href="https://discord.com/invite/KrbCmAypud"><img src="discord"/></a>
                            <a href="https://www.facebook.com/gamemaxbe/"><svg><path fill="white" d="M13.5 5.313q-1.125 0-1.781.375t-.844.938-.188 1.438v3.938H16l-.75 5.688h-4.563v14.313H4.812V17.69H-.001v-5.688h4.813v-4.5q0-3.563 2-5.531T12.125.002q2.688 0 4.375.25v5.063h-3z"></path></svg></a>
                                </div>
                                <div className="socialProfil">
                                   <a href="https://twitter.com/gamemaxbe"><svg><path fill="white" d="M28.688 9.5q.063.25.063.813 0 3.313-1.25 6.594t-3.531 6-5.906 4.406-8 1.688q-5.5 0-10.063-2.938.688.063 1.563.063 4.563 0 8.188-2.813-2.188 0-3.844-1.281t-2.281-3.219q.625.063 1.188.063.875 0 1.75-.188-1.5-.313-2.688-1.25t-1.875-2.281-.688-2.906v-.125q1.375.813 2.938.875-2.938-2-2.938-5.5 0-1.75.938-3.313Q4.69 7.251 8.221 9.063t7.531 2q-.125-.75-.125-1.5 0-2.688 1.906-4.625T22.127 3q2.875 0 4.813 2.063 2.25-.438 4.188-1.563-.75 2.313-2.875 3.625 1.875-.25 3.75-1.063-1.375 2-3.313 3.438z"></path></svg></a>
                                </div>
                                <div className="socialProfil">
                                   <a href="https://www.youtube.com/channel/UC3OzjAD0CkZ8zp6kXteTIjA"><svg><path fill="white" d="M34.375 7.75q.188.75.344 1.875t.219 2.219.094 2.031.031 1.563v.563q0 5.625-.688 8.313-.313 1.063-1.125 1.875t-1.938 1.125q-1.188.313-4.5.469t-6.063.219h-2.75q-10.688 0-13.313-.688-2.438-.688-3.063-3-.313-1.188-.469-3.281t-.219-3.531v-1.5q0-5.563.688-8.25.313-1.125 1.125-1.938t1.938-1.125q1.188-.313 4.5-.469t6.063-.219h2.75q10.688 0 13.313.688 1.125.313 1.938 1.125t1.125 1.938zM14.5 21.125L23.438 16 14.5 10.937v10.188z"></path></svg></a>
                                </div>
                                <div className="socialProfil">
                                  <a href="https://www.twitch.tv/gamemaxbe/">  <svg><path fill="white" d="M2.5 2h24.875v17.125l-7.313 7.313h-5.438l-3.563 3.563h-3.75v-3.563H.623V6.813zm22.375 15.875V4.5H4.812v17.563h5.625v3.563L14 22.063h6.688zm-4.187-8.562v7.313h-2.5V9.313h2.5zm-6.688 0v7.313h-2.5V9.313H14z"></path></svg></a>
                                </div> */}
                        <h3>GameMax App</h3>
                    </div>

                </NavLink>
                <NavLink exact to="/admin" className="waitingUser">
                    {acceptUser === true && userData.isAdmin === true ? <img src={exclamation} alt="point dexclamation" title="Un nouvel utilisateur est en attente" className="exclamation" /> : ''}
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