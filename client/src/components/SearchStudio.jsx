import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
// import Logout from './Log/Logout';



const SearchStudio = () => {

    const uid = useContext(UidContext)
    const userData = useSelector((state)=> state.userReducer)
    

    return (
            <div className="firstBlock">
                <div className="bigBlock">
                    <div className="sectionProfil">
                    <div>
                            <b>{userData.pseudo}</b>
                        </div>
                        <div>
                            {/* <img src={user2} alt="utilisateur" className="profilIcon"/> */}
                            créé le createdAt
                            {console.log("userdata")}

                            {console.log(userData)}
                        </div>
                        <div>
                            {/* <img src={mail} alt="mail" className="profilIcon"/> */}
                            {userData.email}
                        </div>
                        <div>
                            {/* <img src={phone} alt="téléphone" className="profilIcon"/> */}
                            phone
                        </div>
                        <div>
                            {/* <img src={home2} alt="home2" className="profilIcon"/> */}
                            adresse
                            
                        </div>
                        <div>
                            {/* <img src={description} alt="description" className="profilIcon"/> */}
                            comment
                        </div>
                    </div>
                    <div className="sectionProfil">
                        <b>Membres</b>
                        <div>member</div>
                    </div>
                    <div className="sectionProfil">
                        <b>Jeux</b>
                        <div>games</div>
                    </div>
                    <div className="sectionProfil">
                        <b>Réseaux</b>
                        <div>website</div>
                        <div>social</div>
                    </div>
                    {/* <div className="modifyProfil">
                        Modifier
                    </div> */}
                </div>
            </div>
    );
};

export default SearchStudio;













