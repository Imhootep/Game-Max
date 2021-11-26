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
    
    //sécurisation des liens avant envoi by Guillaume Entreprise V2
    //discord
    if(userData.social.discord.toLowerCase().includes("discord.com") === true){
      if(userData.social.discord.toLowerCase().includes("http") === false){userData.social.discord = "https://"+userData.social.discord}
      // if(userData.social.discord.includes(".com") === false){userData.social.discord = userData.social.discord+".com"} //le .com n'est pas a la fin d'un lien...
    }else{if(userData.social.discord !== ''){alert('Un lien vers un discord doit contenir "discord.com"');userData.social.discord = ''}}
    //twitter
    if(userData.social.twitter.toLowerCase().includes("twitter.com") === true){
      if(userData.social.twitter.toLowerCase().includes("http") === false){userData.social.twitter = "https://"+userData.social.twitter}
    }else{ if(userData.social.twitter !== ''){alert('Un lien vers un twitter doit contenir "twitter.com"'); userData.social.twitter = '';}}
    //youtube
    if(userData.social.youtube.toLowerCase().includes("youtube.com") === true){
      if(userData.social.youtube.toLowerCase().includes("http") === false){userData.social.youtube = "https://"+userData.social.youtube}
    }else{ if(userData.social.youtube !== ''){alert('Un lien vers un youtube doit contenir "youtube.com"'); userData.social.youtube = '';}}
    //facebook
    if(userData.social.facebook.toLowerCase().includes("facebook.com") === true){
      if(userData.social.facebook.toLowerCase().includes("http") === false){userData.social.facebook = "https://"+userData.social.facebook}
    }else{ if(userData.social.facebook !== ''){alert('Un lien vers un facebook doit contenir "facebook.com"'); userData.social.facebook = '';}}
    //instagram
    if(userData.social.instagram.toLowerCase().includes("instagram.com") === true){
      if(userData.social.instagram.toLowerCase().includes("http") === false){userData.social.instagram = "https://"+userData.social.instagram}
    }else{ if(userData.social.instagram !== ''){alert('Un lien vers un instagram doit contenir "instagram.com"'); userData.social.instagram = '';}}
    //twitch
    if(userData.social.twitch.toLowerCase().includes("twitch.tv") === true){
      if(userData.social.twitch.toLowerCase().includes("http") === false){userData.social.twitch = "https://"+userData.social.twitch}
    }else{ if(userData.social.twitch !== ''){alert('Un lien vers un twitch doit contenir "twitch.tv"'); userData.social.twitch = '';}}

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
        {/* <h2> Profil </h2> */}
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
                  <p className="smallInput"> {userData.bio} </p>
                </div>
              </div>

              <div className="profil-update-box1">
                <div>
                  <h3>Société</h3>
                  <p className="smallInput" onClick={() => setUpdateForm(!updateForm)}>
                    {userData.company}
                  </p>
                </div>
                <div>
                  <h3>Adresse</h3>
                  <p className="smallInput" onClick={() => setUpdateForm(!updateForm)}>
                    {userData.adresse}
                  </p>
                </div>
              </div>

              <div className="profil-update-box1">
                <div>
                  <h3>Membres</h3>
                  <p className="smallInput" onClick={() => setUpdateForm(!updateForm)}>
                    {userData.membres}
                  </p>
                </div>
                <div>
                  <h3>Jeux</h3>
                  <p className="smallInput" onClick={() => setUpdateForm(!updateForm)}>
                    {userData.jeux}
                  </p>
                </div>
                </div>
                <h3>Réseaux Sociaux</h3>
                <div className="profil-update-box2">
                  <div>
                    <div>
                      <img src={fb} alt="" onClick={() => setUpdateForm(!updateForm)} />
                      <p>{userData.social !== undefined ? userData.social.facebook : ''}</p>
                    </div>
                    <div>
                      <img src={discord} alt="" onClick={() => setUpdateForm(!updateForm)} />
                      <p>{userData.social !== undefined ? userData.social.discord : ''}</p>
                    </div>
                    <div>
                      <img className="img40" src={twit} alt="" onClick={() => setUpdateForm(!updateForm)} />
                      <p>{userData.social !== undefined ? userData.social.twitter: ''}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <img src={youtube} alt="" onClick={() => setUpdateForm(!updateForm)} />
                      <p>{userData.social !== undefined ? userData.social.youtube: ''}</p>
                    </div>
                    <div>
                      <img src={instagram} alt="" onClick={() => setUpdateForm(!updateForm)} />
                      <p>{userData.social !== undefined ? userData.social.instagram: ''}</p>
                    </div>
                    <div>
                      <img src={twitch} alt="" onClick={() => setUpdateForm(!updateForm)} />
                      <p>{userData.social !== undefined ? userData.social.twitch: ''}</p>
                    </div>
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
                  className="updateForm smallInput"
                  defaultValue={userData.pseudo}
                  placeholder="Pseudo"
                  onChange={(e) => (userData.pseudo = e.target.value)}
                ></textarea>
              <h3>Entreprise</h3>
              <textarea
                  type="text"
                  className="updateForm smallInput"
                  defaultValue={userData.company}
                  placeholder="Entreprise"
                  onChange={(e) => (userData.company = e.target.value)}
                ></textarea>
              </div>
              <div>
            <h3>Email (non modifiable)</h3>
            <p> {userData.email} </p>
            
              <h3>Bio</h3>
              <textarea
                type="text"
                className="updateForm bigInput"
                defaultValue={userData.bio}
                placeholder="Bio"
                onChange={(e) => (userData.bio = e.target.value)}
              ></textarea>
            </div>
            <div>
              <h3>Adresse</h3>
              <textarea
                type="text"
                className="updateForm smallInput"
                defaultValue={userData.adresse}
                placeholder="Adresse"
                onChange={(e) => (userData.adresse = e.target.value)}
              ></textarea>
            </div>
            <div>
              <h3>Membres</h3>
              <textarea
                type="text"
                className="updateForm smallInput"
                defaultValue={userData.membres}
                placeholder="Membres"
                onChange={(e) => (userData.membres = e.target.value)}
              ></textarea>
            </div>
            <div>
              <h3>Jeux</h3>
              <textarea
                type="text"
                className="updateForm smallInput"
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
                className="updateForm smallInput"
                defaultValue={userData.social.facebook}
                placeholder="Facebook de l'entreprise"
                onChange={(e) => (userData.social.facebook = e.target.value)}
              ></textarea>
              <h5>Discord</h5>
              <textarea
                type="text"
                className="updateForm smallInput"
                defaultValue={userData.social.discord}
                placeholder="Discord de l'entreprise"
                onChange={(e) => (userData.social.discord = e.target.value)}
              ></textarea>
              </div>
              <div>
              <h5>Twitter</h5>
              <textarea
                type="text"
                className="updateForm smallInput"
                defaultValue={userData.social.twitter}
                placeholder="Twitter de l'entreprise"
                onChange={(e) => (userData.social.twitter = e.target.value)}
              ></textarea>
              <h5>Youtube</h5>
              <textarea
                type="text"
                className="updateForm smallInput"
                defaultValue={userData.social.youtube}
                placeholder="Youtube de l'entreprise"
                onChange={(e) => (userData.social.youtube = e.target.value)}
              ></textarea>
              </div>
              <div>
              <h5>Instagram</h5>
              <textarea
                type="text"
                className="updateForm smallInput"
                defaultValue={userData.social.instagram}
                placeholder="Instagram de l'entreprise"
                onChange={(e) => (userData.social.instagram = e.target.value)}
              ></textarea>
              <h5>Twitch</h5>
              <textarea
                type="text"
                className="updateForm smallInput"
                defaultValue={userData.social.twitch}
                placeholder="Twitch de l'entreprise"
                onChange={(e) => (userData.social.twitch = e.target.value)}
              ></textarea>
              </div>
              <button onClick={handleUpdate}>Valider modification </button>
            </div>
            

            
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateBio;
