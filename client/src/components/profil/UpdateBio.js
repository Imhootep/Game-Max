import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.actions";

const UpdateBio = () => {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [updateForm, setUpdateForm] = useState(false);

  //fonction pour mise à jour de la bio
  const handleUpdate = () => {
    dispatch(
      updateBio(userData._id, {
        bio: userData.bio,
        adresse: userData.adresse,
        membres: userData.membres,
        jeux: userData.jeux,
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
                  <p> {userData.pseudo} </p>
                </div>
                <div>
                  <h3>Email</h3>
                  <p> {userData.email} </p>
                </div>
              </div>

              <div className="profil-update-box1">
                <div>
                  <h3>Bio</h3>
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {userData.bio}
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

              <button onClick={() => setUpdateForm(!updateForm)}>
                Modifier profil
              </button>
            </div>
          </>
        )}
        {updateForm && (
          <>
            <h3>Pseudo</h3>
            <p> {userData.pseudo} </p>
            <h3>Email</h3>
            <p> {userData.email} </p>
            <div>
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

            <button onClick={handleUpdate}>Valider modification </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateBio;
