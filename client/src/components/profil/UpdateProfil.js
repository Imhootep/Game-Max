import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBio } from "../../actions/user.actions";
import LeftNav from "../LeftNav";
import { dateParser } from "../Utils";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const dispatch = useDispatch();
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  //pour recup des données user et users
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  //fonction pour mise à jour de la bio
  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <h1> Profil de {userData.pseudo} </h1>
      <div className="update-container">
        <div className="left-part">
          <h3> Photo de profil </h3>
          <img src={userData.picture} alt="profil Pic" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3> Profil </h3>
            {updateForm === false && (
              <>
                <p> Pseudo: {userData.pseudo} </p>
                <p> Email: {userData.email} </p>
                <p onClick={() => setUpdateForm(!updateForm)}>
                  
                  Adresse: {userData.bio}
                </p>
                <div></div>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier profil
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modification </button>
              </>
            )}
          </div>
          <h4> Membre depuis le: {dateParser(userData.createdAt)} </h4>
          <h5 onClick={() => setFollowingPopup(true)}>
            
            Abonnements: {userData.following
              ? userData.following.length
              : ""}
          </h5>
          <h5 onClick={() => setFollowersPopup(true)}>
            
            Abonnés: {userData.followers ? userData.followers.length : ""}
          </h5>
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
                          {/* <FollowHandler idToFollow={user._id} type={'suggestion'} /> */}
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
            <ul>
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
                          {/* <FollowHandler idToFollow={user._id} type={'suggestion'} /> */}
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
  );
};

export default UpdateProfil;
