import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocial, updateBio } from "../../actions/user.actions";
import fb from './../../img/fb.svg'
import youtube from './../../img/youtube.svg'
import twit from '../../img/twitter.svg'
import discord from '../../img/discord2.svg'
import instagram from '../../img/instagram1.svg'
import twitch from '../../img/twitch.svg'
import { isEmpty } from "../Utils";

const UpdateBio = ({userData}) => {
  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.userReducer);
  const [updateForm, setUpdateForm] = useState(false);

  useEffect(() =>{
    if(userData.social !== undefined){
      if (!isEmpty(userData.social[0])) {
        const socialArr = Object.keys(userData.social).map((i) => userData.social[i])
        // console.log(socialArr)
        dispatch(getSocial(socialArr))
      }
      // console.log(getSocial)
    }
    

  }, [userData.social])

  //fonction pour mise à jour de la bio
  const handleUpdate = () => {

    console.log("serData.social.discord::")
    console.log(userData.social.discord)
    
    if(userData.social.discord.includes("http") === false){userData.social.discord = "https://"+userData.social.discord}
    if(userData.social.twitter.includes("http") === false){userData.social.twitter = "https://"+userData.social.twitter}
    if(userData.social.youtube.includes("http") === false){userData.social.youtube = "https://"+userData.social.youtube}
    if(userData.social.facebook.includes("http") === false){userData.social.facebook = "https://"+userData.social.facebook}
    if(userData.social.instagram.includes("http") === false){userData.social.instagram = "https://"+userData.social.instagram}
    if(userData.social.twitch.includes("http") === false){userData.social.twitch = "https://"+userData.social.twitch}

    dispatch(
      updateBio(userData._id, {
        pseudo: userData.pseudo,
        company: userData.company,
        bio: userData.bio,
        adresse: userData.adresse,
        membres: userData.membres,
        jeux: userData.jeux,
        social: {
            discord:userData.social.discord,
            twitter:userData.social.twitter,
            youtube:userData.social.youtube,
            facebook:userData.social.facebook,
            instagram:userData.social.instagram,
            twitch:userData.social.twitch
          
        } 
      })
    );
    setUpdateForm(false);
    
  };

  return (
    <div>
      <div className="bio-update">
        <h2> Profil </h2>
        {updateForm === false && (
          <>
            <div className="profil-update-box">
              <div className="profil-update-box1">
                <div>
                  <h3>Pseudo</h3>
                  <p onClick={() => setUpdateForm(!updateForm)}> {userData.pseudo} </p>
                  <h3>Email</h3>
                  <p onClick={() => setUpdateForm(!updateForm)}> {userData.email} </p>
                </div>
                <div className="bio-profil">
                  <h3>Bio</h3>
                  <p> {userData.bio} </p>
                </div>
              </div>

              <div className="profil-update-box1">
                <div>
                  <h3>Société</h3>
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {userData.company}
                  </p>
                </div>
                <div>
                  <h3>Adresse</h3>
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {userData.adresse}
                  </p>
                </div>
              </div>

              <div className="profil-update-box1">
                <div>
                  <h3>Membres</h3>
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {userData.membres}
                  </p>
                </div>
                <div>
                  <h3>Jeux</h3>
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {userData.jeux}
                  </p>
                </div>
                </div>
                <div className="profil-update-box2">
                
                <h3>Réseaux Sociaux</h3>
                
                  <div>
                  <p>
                  <img src={fb} alt="" onClick={() => setUpdateForm(!updateForm)} />
                    {userData.social !== undefined ? userData.social.facebook : ''}
                    {/* {userData.social.facebook} */}
                  </p>
                  <p>
                  <img src={discord} alt="" onClick={() => setUpdateForm(!updateForm)} />
                    {userData.social !== undefined ? userData.social.discord : ''}
                    {/* {userData.social.discord} */}
                  </p>
                  <p>
                  <img src={twit} alt="" onClick={() => setUpdateForm(!updateForm)} />
                    {userData.social !== undefined ? userData.social.twitter: ''}
                    {/* {userData.social.twitter} */}
                  </p>
                  </div>
                  <div>
                  <p>
                  <img src={youtube} alt="" onClick={() => setUpdateForm(!updateForm)} />
                  {userData.social !== undefined ? userData.social.youtube: ''}
                  {/* {userData.social.youtube} */}
                  </p>
                  <p>
                  <img src={instagram} alt="" onClick={() => setUpdateForm(!updateForm)} />
                  {userData.social !== undefined ? userData.social.instagram: ''}
                  {/* {userData.social.instagram} */}
                  </p> 
                  <p>
                  <img src={twitch} alt="" onClick={() => setUpdateForm(!updateForm)} />
                  {userData.social !== undefined ? userData.social.twitch: ''}
                  {/* {userData.social.twitch} */}
                  </p>
                  </div>
                
               
              </div>

              <button onClick={() => setUpdateForm(!updateForm)}>
                Modifier profil
              </button>
            </div>
          </>
        )}
        {updateForm && (
          <>
            <div className="web-info">
            <div>
            <h3>Pseudo</h3>
            <textarea
                type="text"
                className="updateForm"
                defaultValue={userData.pseudo}
                placeholder="Pseudo"
                onChange={(e) => (userData.pseudo = e.target.value)}
              ></textarea>
            <h3>Company</h3>
            <textarea
                type="text"
                className="updateForm"
                defaultValue={userData.company}
                placeholder="Company"
                onChange={(e) => (userData.company = e.target.value)}
              ></textarea>
              </div>
              <div>
            <h3>Email</h3>
            <p> {userData.email} </p>
            
              <h3>Bio</h3>
              <textarea
                type="text"
                className="updateForm"
                defaultValue={userData.bio}
                placeholder="Bio"
                onChange={(e) => (userData.bio = e.target.value)}
              ></textarea>
            </div>
            <div>
              <h3>Adresse</h3>
              <textarea
                type="text"
                className="updateForm"
                defaultValue={userData.adresse}
                placeholder="Adresse"
                onChange={(e) => (userData.adresse = e.target.value)}
              ></textarea>
            </div>
            <div>
              <h3>Membres</h3>
              <textarea
                type="text"
                className="updateForm"
                defaultValue={userData.membres}
                placeholder="Membres"
                onChange={(e) => (userData.membres = e.target.value)}
              ></textarea>
            </div>
            <div>
              <h3>Jeux</h3>
              <textarea
                type="text"
                className="updateForm"
                defaultValue={userData.jeux}
                placeholder="Jeux"
                onChange={(e) => (userData.jeux = e.target.value)}
              ></textarea>
            </div>
            </div>
            <div className="web-media">
              <h3>Réseaux Sociaux</h3>
              <div>
              <h5>Facebook</h5>
              <textarea
                type="text"
                className="updateForm"
                defaultValue={userData.social.facebook}
                placeholder="Réseaux Sociaux"
                onChange={(e) => (userData.social.facebook = e.target.value)}
              ></textarea>
              <h5>Discord</h5>
              <textarea
                type="text"
                className="updateForm"
                defaultValue={userData.social.discord}
                placeholder="Réseaux Sociaux"
                onChange={(e) => (userData.social.discord = e.target.value)}
              ></textarea>
              </div>
              <div>
              <h5>Twitter</h5>
              <textarea
                type="text"
                className="updateForm"
                defaultValue={userData.social.twitter}
                placeholder="Réseaux Sociaux"
                onChange={(e) => (userData.social.twitter = e.target.value)}
              ></textarea>
              <h5>Youtube</h5>
              <textarea
                type="text"
                className="updateForm"
                defaultValue={userData.social.youtube}
                placeholder="Réseaux Sociaux"
                onChange={(e) => (userData.social.youtube = e.target.value)}
              ></textarea>
              </div>
              <div>
              <h5>Instagram</h5>
              <textarea
                type="text"
                className="updateForm"
                defaultValue={userData.social.instagram}
                placeholder="Réseaux Sociaux"
                onChange={(e) => (userData.social.instagram = e.target.value)}
              ></textarea>
              <h5>Twitch</h5>
              <textarea
                type="text"
                className="updateForm"
                defaultValue={userData.social.twitch}
                placeholder="Réseaux Sociaux"
                onChange={(e) => (userData.social.twitch = e.target.value)}
              ></textarea>
              </div>
            </div>
            

            <button onClick={handleUpdate}>Valider modification </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateBio;
