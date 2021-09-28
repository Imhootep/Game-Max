import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);
    console.log(file);

    //envoi de la pic en back
    dispatch(uploadPicture(data, userData._id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file"> Changer de photo de profil </label>{" "}
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />{" "}
      <br />
      <br />
      <button type="submit" value="Envoyer">
        {" "}
        Envoyer{" "}
      </button>
    </form>
  );
};

export default UploadImg;
