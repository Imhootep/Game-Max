import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { updateBio } from "../../actions/user.actions";
import LeftNav from "../Navigation/LeftNav";
import { dateParser } from "../Utils";
import FollowHandler from "./FollowHandler";
import UpdateBio from "./UpdateBio";
import UploadImg from "./UploadImg";

const UpdateProfil = ({userData,usersData}) => {

  //pour recup des données user et users
  // const userData = useSelector((state) => state.userReducer);
  // const usersData = useSelector((state) => state.usersReducer);
  const error = useSelector((state) => state.errorReducer.userError);
  let imagePath = process.env.REACT_APP_API_URL+userData.picture;

  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  return (
    <>
    <LeftNav />
    <div className="profil-container">
      
      <h1> Profil de {userData.pseudo} </h1>
      <div className="update-container">
        <div className="left-part">
          <div>
          <h3> Photo de profil </h3>
          <img src={imagePath} alt="profil Pic" />
          
          <UploadImg />
          </div>
          <p>{error.maxSize}</p>
          <p>{error.format}</p>
          
          <div>
          <br />
          <h4> Membre depuis le: {dateParser(userData.createdAt)} </h4>
          {/* <h5 onClick={() => setFollowingPopup(true)}>
            Abonnements: {userData.following ? userData.following.length : ""}
          </h5>
          <h5 onClick={() => setFollowersPopup(true)}>
            Abonnés: {userData.followers ? userData.followers.length : ""}
          </h5> */}
          <NavLink to="/trending">
            <button className="passwordModify">
              Modifier le mot de passe
            </button>
          </NavLink>
          </div>
        </div>
        <div className="right-part">
          <UpdateBio userData={userData}/>
         
        </div>
      </div>
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                //on va chercher dans les profils
                for (let i = 0; i < userData.following.length; i++) {
                  // on récupère ceux qui correspondent
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler idToFollow={user._id} type={'suggestion'} />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <ul>{console.log("userdata qui marche")}
            {console.log(usersData)}
              {usersData.map((user) => {
                //on va chercher dans les profils
                for (let i = 0; i < userData.followers.length; i++) {
                  // on récupère ceux qui correspondent
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler idToFollow={user._id} type={'suggestion'} />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default UpdateProfil;
