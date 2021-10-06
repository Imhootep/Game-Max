import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty } from "../Utils";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [event, setEvent] = useState(false)
  const [date, setDate] = useState('')
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState('');
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = () => {};

  const handleEvent = () => {
      setEvent(true);
  };

  const handlePost = () => {};

  const cancelPost = () => {
      setMessage('');
      setPostPicture('');
      setVideo('');
      setEvent(false);
      setDate('');
      setFile('');
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <p>
              {" "}
              <span>
                {userData.following ? userData.following.length : 0}{" "}
              </span>{" "}
              Abonnement
              {userData.following && userData.following.length > 1
                ? "s"
                : null}{" "}
            </p>
            <p>
              {" "}
              <span>
                {userData.followers ? userData.followers.length : 0}{" "}
              </span>{" "}
              Abonné
              {userData.followers && userData.followers.length > 1
                ? "s"
                : null}{" "}
            </p>
          </div>
          <NavLink exact to="/profil">
            <div className="user-info">
              <img src={userData.picture} alt="user-pic" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />

            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="pic-img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
              </div>
              <div className="event-form">
              <input type="checkbox" onChange={(e)=> handleEvent(!event)} />
                <p>Event</p>
                <input type="date" onChange={(e)=> setDate(e.target.value)} value={date} />
                <p>date</p>
                {event === true && (
                    <div class="popup">
                        <select className="select-event" name="event-select" id="">
                            <option className="choice" >Choisir un Event</option>
                            <option className="GameCafe">Game Dev Café</option>
                            <option className="formation">Formation</option>
                            <option className="Stream">Stream</option>
                            <option className="GameWeek">Gameweek</option>
                            <option className="Autre">Autre</option>
                        </select>
                    
                  </div>
                )}
              </div>
              {video && (
                <button onClick={() => setVideo("")}>Supprimer la Vidéo</button>
              )}
            </div>
            <div className="btn-send">
                <button className="cancel" onClick={cancelPost}>Annuler le message</button>
                <button className="send" onClick={handlePost}>Envoyer</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
