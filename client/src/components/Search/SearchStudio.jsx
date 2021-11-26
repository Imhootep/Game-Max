import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRoledUsers } from "../../actions/users.actions";

import arrowup from '../../img/arrowup.png';
import home2 from '../../img/home2.svg';
import mail from '../../img/mail.svg';
import phone from '../../img/phone.svg';
import user2 from '../../img/user2.svg';
import description from '../../img/description.svg';
import newStudio from '../../img/new.svg';
import discord from '../../img/discord2.svg';
import instagram from '../../img/instagram1.svg';
// import { isEmpty } from './Utils';
import { dateParser } from "../Utils";



const SearchStudio = () => {

    const dispatch = useDispatch ();

    const user = useSelector((state)=> state.userReducer)
    const users = useSelector((state) => state.usersReducer);
    useEffect(()=>{
        dispatch(getRoledUsers())
    }, [])
    // const usersSorted = users.sort((a, b) => a.timeM > b.timeM ? 1:-1)

    // const myData = [].concat(users)
    // .sort((a, b) => a.itemM > b.itemM ? 1 : -1)
    // .map((val, i) => 
    //     <div key={i}> {item.matchID} {item.timeM}{item.description}</div>
    // );
    

    const [profilActif, setProfilActif] = useState(); // pour afficher la page du profil actuel
    const [search, setSearch] = useState();
    const [specificSearch, setSpecificSearch] = useState();
   

    const newProfilActif =(data) => {
        setProfilActif(data)
    }

    const clearSearch = () => {
        setSearch("")
        document.getElementById('searchField').placeholder = 'Rechercher...';
        setSpecificSearch()
    }

    const searchSpecific = (data) => {
        if(data === specificSearch){
            setSpecificSearch()
        }else{
            setSpecificSearch(data)
        }
    }

    const compareDate = (date) => {
        const date1 = date;
        const date2 = Date();

        const diffTime = Math.abs(Date.parse(date2) - Date.parse(date1))
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        return diffDays
    }

   

    return (
        <div className="profilsContainer">
            <div className="searchBar">
                <div className="sortingZone">
                    <button onClick={(e)=>searchSpecific("partenaire")} className={specificSearch === "partenaire" ? 'active'+specificSearch : ''}><span>Partenaire</span></button>
                    <button onClick={(e)=>searchSpecific("expert")} className={specificSearch === "expert" ? 'active'+specificSearch : ''}><span>Expert</span></button>
                    <button onClick={(e)=>searchSpecific("sponsor")} className={specificSearch === "sponsor" ? 'active'+specificSearch : ''}><span>Sponsor</span></button>
                    <button onClick={(e)=>searchSpecific("studio")} className={specificSearch === "studio" ? 'active'+specificSearch : ''}><span>Studio</span></button>
                </div>
                <div className="searchZone">
                    <input id="searchField" type="text" placeholder='Rechercher...' onChange={(e)=>setSearch(e.target.value)} value={search} onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Rechercher...'}></input>
                    <button onClick={(e)=>clearSearch()}><span>Vider</span></button>
                </div>
            </div>

           

            {/* {usersSorted.map((val)=>{ */}
            {[].concat(users).sort((a, b) => a.itemM > b.itemM ? 1 : -1).map((val,i)=>{
            let imagePath = process.env.REACT_APP_API_URL+val.picture;
            return(
                    <>
                        {(profilActif !== undefined && val._id === profilActif) ? 
                        //premier resultat
                        <div className={((val._id === user._id && profilActif === undefined) || val._id === profilActif) ? "firstBlock" : "profilsBlock" }>
                        <div className={"bigBlock border"+val.role.toLowerCase()}>
                            <div className="sectionProfil">
                                <div className="bigBlockRole">
                                    <div>
                                        <img src={imagePath} alt={val.pseudo} title={val.pseudo} className="avatarIcon"/>
                                        <b>{val.pseudo}</b>
                                    </div>
                                    <div className={"Role "+val.role.toLowerCase()}>
                                        {val.role}{val.expert_role ? '/'+val.expert_role : ''}
                                    </div>
                                </div>
                                <div>
                                    <img src={user2} alt="utilisateur" className="profilIcon"  title="User"/>
                                    créé le {dateParser(val.createdAt)}
                                </div>
                                <div>
                                    <img src={mail} alt="mail" className="profilIcon" title="Mail"/>
                                    {val.email }
                                </div>
                                {/* <div>
                                    <img src={phone} alt="téléphone" className="profilIcon"/>
                                    {val.phone }
                                </div> */}
                                <div>
                                    <img src={home2} alt="home2" className="profilIcon" title="Adresse"/>
                                    {val.adresse}
                                </div>
                                <div>
                                    <img src={description} alt="description" className="profilIcon" title="Biographie et texte supplémentaire"/>
                                    {val.bio}
                                </div>
                            </div>
                            <div className="sectionProfil">
                                <b>Membres</b>
                                <div>{val.membres}</div>
                                
                            </div>
                            <div className="sectionProfil">
                                <b>Jeux</b>
                                <div>{val.jeux}</div>
                            </div>
                            <div className="sectionProfil ">
                                <b>Réseaux</b>
                                {/* <div>{val.website}</div> */}
                                <div className="sectionProfilReseaux">
                                    
                                    <div className="fillColor">
                                        <a target="_blank" rel="noreferrer"  href={val.social.twitter} className={val.social.twitter === '' ? "disabledLink" : ""}>
                                            <svg><path d="M28.688 9.5q.063.25.063.813 0 3.313-1.25 6.594t-3.531 6-5.906 4.406-8 1.688q-5.5 0-10.063-2.938.688.063 1.563.063 4.563 0 8.188-2.813-2.188 0-3.844-1.281t-2.281-3.219q.625.063 1.188.063.875 0 1.75-.188-1.5-.313-2.688-1.25t-1.875-2.281-.688-2.906v-.125q1.375.813 2.938.875-2.938-2-2.938-5.5 0-1.75.938-3.313Q4.69 7.251 8.221 9.063t7.531 2q-.125-.75-.125-1.5 0-2.688 1.906-4.625T22.127 3q2.875 0 4.813 2.063 2.25-.438 4.188-1.563-.75 2.313-2.875 3.625 1.875-.25 3.75-1.063-1.375 2-3.313 3.438z"></path></svg>
                                        </a>
                                    </div>
                                    <div className="fillColor">
                                        <a target="_blank" rel="noreferrer" href={val.social.youtube} className={val.social.youtube === '' ? "disabledLink" : ""}>
                                            <svg><path d="M34.375 7.75q.188.75.344 1.875t.219 2.219.094 2.031.031 1.563v.563q0 5.625-.688 8.313-.313 1.063-1.125 1.875t-1.938 1.125q-1.188.313-4.5.469t-6.063.219h-2.75q-10.688 0-13.313-.688-2.438-.688-3.063-3-.313-1.188-.469-3.281t-.219-3.531v-1.5q0-5.563.688-8.25.313-1.125 1.125-1.938t1.938-1.125q1.188-.313 4.5-.469t6.063-.219h2.75q10.688 0 13.313.688 1.125.313 1.938 1.125t1.125 1.938zM14.5 21.125L23.438 16 14.5 10.937v10.188z"></path></svg>
                                        </a>
                                    </div>
                                    
                                    <div>
                                        <a target="_blank" rel="noreferrer" href={val.social.discord} className={val.social.discord === '' ? "disabledLink" : ""}>
                                            <img src={discord} />
                                        </a> 
                                    </div>
                                    <div>
                                        <a target="_blank" rel="noreferrer" href={val.social.instagram} className={val.social.instagram === '' ? "disabledLink" : ""}>
                                            <img src={instagram} />
                                        </a> 
                                    </div>
                                    <div className="fillColor">
                                        <a target="_blank" rel="noreferrer" href={val.social.twitch} className={val.social.twitch === '' ? "disabledLink" : ""}>
                                            <svg><path d="M2.5 2h24.875v17.125l-7.313 7.313h-5.438l-3.563 3.563h-3.75v-3.563H.623V6.813zm22.375 15.875V4.5H4.812v17.563h5.625v3.563L14 22.063h6.688zm-4.187-8.562v7.313h-2.5V9.313h2.5zm-6.688 0v7.313h-2.5V9.313H14z"></path></svg>
                                        </a> 
                                    </div>
                                    <div className="fillColor">
                                        <a target="_blank" rel="noreferrer" href={val.social.facebook} className={val.social.facebook === '' ? "disabledLink" : ""}>
                                            <svg><path d="M13.5 5.313q-1.125 0-1.781.375t-.844.938-.188 1.438v3.938H16l-.75 5.688h-4.563v14.313H4.812V17.69H-.001v-5.688h4.813v-4.5q0-3.563 2-5.531T12.125.002q2.688 0 4.375.25v5.063h-3z"></path></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        </div>
                        :
                        //deuxieme resultat 
                        (val._id === user._id && profilActif === undefined) ?
                        <div className={((val._id === user._id && profilActif === undefined) || val._id === profilActif) ? "firstBlock" : "profilsBlock" }>
                        <div className={"bigBlock border"+val.role.toLowerCase()}>
                            <div className="sectionProfil">
                                <div className="bigBlockRole">
                                    <div>
                                        <img src={imagePath} alt={val.pseudo} title={val.pseudo} className="avatarIcon"/>
                                        <b>{val.pseudo}</b>
                                    </div>
                                    <div className={"Role "+val.role.toLowerCase()}>
                                        {val.role}{val.expert_role ? '/'+val.expert_role : ''}
                                    </div>
                                </div>
                                <div>
                                    <img src={user2} alt="utilisateur" className="profilIcon"  title="User"/>
                                    créé le {dateParser(val.createdAt)}
                                </div>
                                <div>
                                    <img src={mail} alt="mail" className="profilIcon" title="Mail"/>
                                    {val.email }
                                </div>
                                {/* <div>
                                    <img src={phone} alt="téléphone" className="profilIcon"/>
                                    {val.phone }
                                </div> */}
                                <div>
                                    <img src={home2} alt="home2" className="profilIcon" title="Adresse"/>
                                    {val.adresse}
                                </div>
                                <div>
                                    <img src={description} alt="description" className="profilIcon" title="Biographie et texte supplémentaire"/>
                                    {val.bio}
                                </div>
                            </div>
                            <div className="sectionProfil">
                                <b>Membres</b>
                                <div>{val.membres}</div>
                            </div>
                            <div className="sectionProfil">
                                <b>Jeux</b>
                                <div>{val.jeux}</div>
                            </div>
                            <div className="sectionProfil">
                                <b>Réseaux</b>
                                {/* <div>{val.website}</div> */}
                                <div className="sectionProfilReseaux">
                                    
                                    <div className="fillColor">
                                        <a target="_blank" rel="noreferrer" href={val.social.twitter} className={val.social.twitter === '' ? "disabledLink" : ""}>
                                            <svg><path d="M28.688 9.5q.063.25.063.813 0 3.313-1.25 6.594t-3.531 6-5.906 4.406-8 1.688q-5.5 0-10.063-2.938.688.063 1.563.063 4.563 0 8.188-2.813-2.188 0-3.844-1.281t-2.281-3.219q.625.063 1.188.063.875 0 1.75-.188-1.5-.313-2.688-1.25t-1.875-2.281-.688-2.906v-.125q1.375.813 2.938.875-2.938-2-2.938-5.5 0-1.75.938-3.313Q4.69 7.251 8.221 9.063t7.531 2q-.125-.75-.125-1.5 0-2.688 1.906-4.625T22.127 3q2.875 0 4.813 2.063 2.25-.438 4.188-1.563-.75 2.313-2.875 3.625 1.875-.25 3.75-1.063-1.375 2-3.313 3.438z"></path></svg>
                                        </a>   
                                    </div>
                                    <div className="fillColor">
                                        <a target="_blank" rel="noreferrer" href={val.social.youtube} className={val.social.youtube === '' ? "disabledLink" : ""}>
                                            <svg><path d="M34.375 7.75q.188.75.344 1.875t.219 2.219.094 2.031.031 1.563v.563q0 5.625-.688 8.313-.313 1.063-1.125 1.875t-1.938 1.125q-1.188.313-4.5.469t-6.063.219h-2.75q-10.688 0-13.313-.688-2.438-.688-3.063-3-.313-1.188-.469-3.281t-.219-3.531v-1.5q0-5.563.688-8.25.313-1.125 1.125-1.938t1.938-1.125q1.188-.313 4.5-.469t6.063-.219h2.75q10.688 0 13.313.688 1.125.313 1.938 1.125t1.125 1.938zM14.5 21.125L23.438 16 14.5 10.937v10.188z"></path></svg>
                                        </a>
                                    </div>
                                    
                                    <div>
                                        <a target="_blank" rel="noreferrer" href={val.social.discord} className={val.social.discord === '' ? "disabledLink" : ""}>
                                            <img src={discord} />
                                        </a> 
                                    </div>
                                    <div>
                                        <a target="_blank" rel="noreferrer" href={val.social.instagram} className={val.social.instagram === '' ? "disabledLink" : ""}>
                                            <img src={instagram} />
                                        </a> 
                                    </div>
                                    <div className="fillColor">
                                        <a target="_blank" rel="noreferrer" href={val.social.twitch} className={val.social.twitch === '' ? "disabledLink" : ""}>
                                            <svg><path d="M2.5 2h24.875v17.125l-7.313 7.313h-5.438l-3.563 3.563h-3.75v-3.563H.623V6.813zm22.375 15.875V4.5H4.812v17.563h5.625v3.563L14 22.063h6.688zm-4.187-8.562v7.313h-2.5V9.313h2.5zm-6.688 0v7.313h-2.5V9.313H14z"></path></svg>
                                        </a> 
                                    </div>
                                    <div className="fillColor">
                                        <a target="_blank" rel="noreferrer" href={val.social.facebook} className={val.social.facebook === '' ? "disabledLink" : ""}>
                                            <svg><path d="M13.5 5.313q-1.125 0-1.781.375t-.844.938-.188 1.438v3.938H16l-.75 5.688h-4.563v14.313H4.812V17.69H-.001v-5.688h4.813v-4.5q0-3.563 2-5.531T12.125.002q2.688 0 4.375.25v5.063h-3z"></path></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        
                        : 

                        (    (search === undefined && (specificSearch === undefined || specificSearch  === val.role.toLowerCase()))
                        ||   (search === '' && (specificSearch === undefined || specificSearch === val.role.toLowerCase()))
                        ||  (search !== undefined && val.pseudo.toLowerCase().indexOf(search) !== -1 && (specificSearch === undefined || specificSearch === val.role.toLowerCase()))
                        ||  (search !== undefined && val.email.toLowerCase().indexOf(search) !== -1 && (specificSearch === undefined || specificSearch === val.role.toLowerCase()))
                        ||  (search !== undefined && val.expert_role.toLowerCase().indexOf(search) !== -1 && (specificSearch === undefined || specificSearch === val.role.toLowerCase())))
                        ?
                        
                        <div key={i} className={val.role !== undefined ? "littleBlock border"+val.role.toLowerCase() : ''}>
                            <div className="infosProfil">
                            <div className={val.role !== undefined ? "roleTitle "+val.role.toLowerCase() : ''}>{val.role !== undefined ? val.role : 'Compte INVALIDE'}</div>
                                {/* <div onClick={setProfilActif(val.id)}>ALLER</div> */}
                                <div className="goProfil"  title={"afficher "+val.pseudo+" en grand"}  onClick={() => newProfilActif(val._id)}>
                                    {/* {console.log(compareDate(val.createdAt)) } */}
                                    {compareDate(val.createdAt) <= 7 ? <img src={newStudio} alt="nouveau studio" className="newStudio"/> : ''}
                                    
                                    <div>
                                        <img src={imagePath} alt={val.pseudo} title={val.pseudo} className="avatarIcon"/>
                                        <b className="littlePseudo"> {val.pseudo}</b>
                                    </div>
                                    <div>VOIR<img className="arrowup" src={arrowup} alt="arrow up"/></div>
                                </div>
                                <div className="goProfilEmail">{val.email }</div>
                                {/* <div className="goProfilPhone">{val.phone }</div> */}
                                <div className="goProfilAdress">{val.adresse }</div>
                                {/* <div><a href={"https://"+val.website}>{val.website}</a></div> */}
                            </div>
                            <div className="linksProfil">
                                
                                <div className="socialProfil">
                                    <a href={val.social.twitter} className={val.social.twitter === '' ? "disabledLink" : ""}>
                                        <svg><path d="M28.688 9.5q.063.25.063.813 0 3.313-1.25 6.594t-3.531 6-5.906 4.406-8 1.688q-5.5 0-10.063-2.938.688.063 1.563.063 4.563 0 8.188-2.813-2.188 0-3.844-1.281t-2.281-3.219q.625.063 1.188.063.875 0 1.75-.188-1.5-.313-2.688-1.25t-1.875-2.281-.688-2.906v-.125q1.375.813 2.938.875-2.938-2-2.938-5.5 0-1.75.938-3.313Q4.69 7.251 8.221 9.063t7.531 2q-.125-.75-.125-1.5 0-2.688 1.906-4.625T22.127 3q2.875 0 4.813 2.063 2.25-.438 4.188-1.563-.75 2.313-2.875 3.625 1.875-.25 3.75-1.063-1.375 2-3.313 3.438z"></path></svg>
                                    </a>
                                </div>
                                <div className="socialProfil">
                                    <a href={val.social.youtube} className={val.social.youtube === '' ? "disabledLink" : ""}>
                                        <svg><path d="M34.375 7.75q.188.75.344 1.875t.219 2.219.094 2.031.031 1.563v.563q0 5.625-.688 8.313-.313 1.063-1.125 1.875t-1.938 1.125q-1.188.313-4.5.469t-6.063.219h-2.75q-10.688 0-13.313-.688-2.438-.688-3.063-3-.313-1.188-.469-3.281t-.219-3.531v-1.5q0-5.563.688-8.25.313-1.125 1.125-1.938t1.938-1.125q1.188-.313 4.5-.469t6.063-.219h2.75q10.688 0 13.313.688 1.125.313 1.938 1.125t1.125 1.938zM14.5 21.125L23.438 16 14.5 10.937v10.188z"></path></svg>
                                    </a>
                                </div>
                                <div className="socialProfil">
                                    <a href={val.social.twitch} className={val.social.twitch === '' ? "disabledLink" : ""}>
                                        <svg><path d="M2.5 2h24.875v17.125l-7.313 7.313h-5.438l-3.563 3.563h-3.75v-3.563H.623V6.813zm22.375 15.875V4.5H4.812v17.563h5.625v3.563L14 22.063h6.688zm-4.187-8.562v7.313h-2.5V9.313h2.5zm-6.688 0v7.313h-2.5V9.313H14z"></path></svg>
                                    </a>
                                </div>
                                <div className="socialProfil">
                                    <a href={val.social.facebook} className={val.social.facebook === '' ? "disabledLink" : ""}>
                                        <svg><path d="M13.5 5.313q-1.125 0-1.781.375t-.844.938-.188 1.438v3.938H16l-.75 5.688h-4.563v14.313H4.812V17.69H-.001v-5.688h4.813v-4.5q0-3.563 2-5.531T12.125.002q2.688 0 4.375.25v5.063h-3z"></path></svg>
                                    </a>
                                </div>
                            </div>
                            
                        </div>
                        :

                        ''
                        // <div>
                        // {console.log('debuggage')}
                        // {console.log('pseudo')}
                        // {console.log(val.pseudo)}
                        // {console.log('search')}
                        // {console.log(search)}
                        // </div>

                        }
                    </>
                )          
        })} 
    </div>
    );
};

export default SearchStudio;













