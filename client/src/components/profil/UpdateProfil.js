import React, {
  useState
} from "react";
import {
  useSelector,
  useDispatch
} from "react-redux";
import {
  updateBio
} from "../../actions/user.actions";
import LeftNav from "../LeftNav";
import {
  dateParser
} from "../Utils";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
    const [bio, setBio] = useState("");
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);

    const handleUpdate = () => {
      dispatch(updateBio(userData._id, bio))
      setUpdateForm(false)
    }

    return ( <
        div className = "profil-container" >
        <
        LeftNav / >
        <
        h1 > Profil de {
          userData.pseudo
        } < /h1> <
        div className = "update-container" >
        <
        div className = "left-part" >
        <
        h3 > Photo de profil < /h3> <
        img src = {
          userData.picture
        }
        alt = "profil Pic" / >
        <
        UploadImg / >
        <
        /div> <
        div className = "right-part" >
        <
        div className = "bio-update" >
        <
        h3 > Profil < /h3> {
          updateForm === false && ( <
            >
            <
            p > Pseudo: {
              userData.pseudo
            } < /p> <
            p > Email: {
              userData.email
            } < /p> <
            p onClick = {
              () => setUpdateForm(!updateForm)
            } > Adresse: {
              userData.bio
            } < /p> <
            div >

            <
            /div> <
            button onClick = {
              () => setUpdateForm(!updateForm)
            } >
            Modifier profil <
            /button> <
            />
          )
        }

        {
          updateForm && ( <
            >
            <
            textarea type = "text"
            defaultValue = {
              userData.bio
            }
            onChange = {
              (e) => setBio(e.target.value)
            } >
            < /textarea> <
            button onClick = {
              handleUpdate
            } >
            Valider modification <
            /button> <
            />
          )
        } <
        /div> <
        h4 > Membre depuis le: {
          dateParser(userData.createdAt)
        } < /h4> <
        h5 onClick = {
          () => setFollowingPopup(true)
        } > Abonnements: {
          userData.following ? userData.following.length : ""
        } < /h5> <
        h5 onClick = {
          () => setFollowersPopup(true)
        } > Abonnés: {
          userData.followers ? userData.followers.length : ""
        } < /h5> <
        /div> <
        /div> {
          followingPopup && ( <
              div className = "popup-profil-container" >
              <
              div className = "modal" >
              <
              h3 > Abonnements < /h3> <
              span className = "cross"
              onClick = {
                () => setFollowingPopup(false)
              } > & #10005;</span>

        </div>

      </div>

      )}

    </div>

  );

};



export default UpdateProfil;