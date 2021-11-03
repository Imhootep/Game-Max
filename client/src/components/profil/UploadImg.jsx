import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  // const [userPicture, setUserPicture] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  let imagePath = process.env.REACT_APP_API_URL+userData.picture;

  const handlePictureModif = (e) => {
    // setUserPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    
  };

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
    <div>


      {/* <div className="previsPic"> */}
      
      <label For="file"><img src={file? URL.createObjectURL(file) : imagePath} alt={file? file.name : null}/></label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={handlePictureModif}
        
      />
      {/* </div> */}
    

    <form action="" onSubmit={handlePicture} className="upload-pic">
      <button htmlFor="file">Valider modif </button>{" "}
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={handlePictureModif}
      />
      
      {/* <button type="submit" value="Envoyer">
        Envoyer
      </button> */}
    </form>
  
    
    </div>
  );
};

export default UploadImg;
