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
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch()

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
        p > pseudo: {
          userData.pseudo
        } < /p> <
        p > email: {
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
        modifier profil <
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
      userData.createdAt
    } < /h4> <
    /div> <
    /div> <
    /div>
  );
};

export default UpdateProfil;