import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from '../../actions/user.actions';

const UpdateBio = () => {

  const userData = useSelector((state)=>state.userReducer);
  

  const dispatch = useDispatch();
  const [bio, setBio] = useState("");
  const [adresse, setAdresse] = useState("")
  const [membres, setMembres] = useState("")
  const [jeux, setJeux] = useState("")
    //   if(userData.bio) setBio(userData.bio) 
    //   if(userData.adresse) setAdresse(userData.adresse)
    //   if(userData.membres) setMembres(userData.membres)
    //   if(userData.jeux) setJeux(userData.jeux) 
     
    const [updateForm, setUpdateForm] = useState(false)

   

    //fonction pour mise à jour de la bio
  const handleUpdate = () => {
    dispatch(updateBio(userData._id, {bio, adresse, membres, jeux}));
    setUpdateForm(false);
  };

    return (
        <div>
            <div className="bio-update">
            <h3> Profil </h3>
            {updateForm === false && (
              <>
                <p> Pseudo: {userData.pseudo} </p>
                <p> Email: {userData.email} </p>
                <div>
                <p onClick={() => setUpdateForm(!updateForm)}>
                  Bio: {userData.bio}
                </p>
                </div> 
                <div>
                <p onClick={() => setUpdateForm(!updateForm)}>
                  Adresse: {userData.adresse}
                </p>
                </div>
                <div>
                <p onClick={() => setUpdateForm(!updateForm)}>
                  Membres: {userData.membres}
                </p>
                </div>
                <div>
                <p onClick={() => setUpdateForm(!updateForm)}>
                  Jeux: {userData.jeux}
                </p>
                </div>
                <div></div>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier profil
                </button>
              </>
            )}
            {updateForm && (
              <>
              <div>
                <input

                  type="text"
                  className="updateForm"
                  defaultValue={userData.bio}
                  placeholder="Bio"
                  onChange={(e) => setBio(e.target.value)}
                ></input>
                </div>
                <div>
                <input
                  type="text"
                  className="updateForm"
                  defaultValue={userData.adresse}
                  placeholder="Adresse"
                  onChange={(e) => setAdresse(e.target.value)}
                ></input>
                </div>
                <div>
                <input
                  type="text"
                  className="updateForm"
                  defaultValue={userData.membres}
                  placeholder="Membres"
                  onChange={(e) => setMembres(e.target.value)}
                ></input>
                </div>
                <div>
                <input
                  type="text"
                  className="updateForm"
                  defaultValue={userData.jeux}
                  placeholder="Jeux"
                  onChange={(e) => setJeux(e.target.value)}
                ></input>
                </div>
                
                <button onClick={handleUpdate}>Valider modification </button>
              </>
            )}
          </div>
        </div>
    );
};

export default UpdateBio;