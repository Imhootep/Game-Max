import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost } from "../../actions/post.actions";
import { isEmpty } from "../Utils";
import { timestampParser } from "../Utils";
import { getRoledUsers } from "../../actions/users.actions";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import Parser from 'html-react-parser';

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  // const setQuillMessage = (e) => setMessage(e.target.value)
  const [event, setEvent] = useState(false);
  const [date, setDate] = useState("");
  const [typeEvent, setTypeEvent] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();
  const [postRole, setPostRole] = useState("");
  let imagePath = process.env.REACT_APP_API_URL + userData.picture;

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const handleEvent = () => {
    setEvent(!event);
  };

  const handlePost = async () => {
    if (message || postPicture || video) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      data.append("title", title);
      if (file) data.append("file", file);
      data.append("video", video);
      if (event === true) data.append("eventType", typeEvent);
      if (event === true) data.append("date", date);
      if (event === true) data.append("isEvent", true);

      await dispatch(addPost(data));
      window.location.reload();
      // dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setEvent(false);
    setDate("");
    setFile("");
    setTitle("");
    setDate("");
  };

  const handleVideo = () => {
    let findLink = message.split(" ");
    // console.log(findLink);
    for (let i = 0; i < findLink.length; i++) {
      if (
        findLink[i].includes("https://www.yout") ||
        findLink[i].includes("https://yout")
      ) {
        let embed = findLink[i].replace("watch?v=", "embed/");
        setVideo(embed.split("&")[0]);
        findLink.splice(i, 1);
        setMessage(findLink.join(" "));
        setPostPicture("");
      }
    }
  };

  // const rolePost = (data) => {
  //   setEvent(true);
  //   setDate(true);

  //   if(data === postRole) {
  //     setPostRole()
  //   } else {
  //     setPostRole(data)
  //   }

  // }

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
    handleVideo();
  }, [userData, message, video]);

  return (
    <div
      className={
        typeEvent !== ""
          ? "post-container-" + typeEvent && "post-container"
          : "post-container"
      }
    >
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          {/* <div className="data">
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
          </div> */}

          <div className="post-form">
            <div className="post-form1">
            <NavLink exact to="/profil">
              <div className="user-info">
                <img src={imagePath} alt="user-pic" />
              </div>
            </NavLink>
            {/* <ReactQuill name="message"
              id="message"

              placeholder="Que Dis?"
              onChange={setMessage}
              value={message}/> */}
            <div className="titleAndPost">
              <textarea
                name="title"
                id="title"
                placeholder="Titre"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />

              <textarea
                name="message"
                id="message"
                placeholder="Que Dis?"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
            </div>

            {message || postPicture || video.lentgh > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={imagePath} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.pseudo}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{title}</p>
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
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
                <input type="checkbox" onChange={() => handleEvent(event)} />
                <p>Event</p>
                <input
                  className="date-happening"
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />

                <p>date</p>
                {event === true && (
                  <div className="popup">
                    <select
                      className="select-event"
                      name="event-select"
                      id=""
                      onChange={(e) => setTypeEvent(e.target.value)}
                    >
                      <option className="choice" value="choice">
                        Choisir un Event
                      </option>
                      <option className={"GameCafe" + "blueframe"} value="Game">
                        Game Dev Café
                      </option>
                      <option className="Formation" value="Formation">
                        Formation
                      </option>
                      <option className="Stream" value="Stream">
                        Stream
                      </option>
                      <option className="GameWeek" value="Week">
                        Game Week
                      </option>
                      <option className="Autre" value="Autre">
                        Autre
                      </option>
                    </select>
                  </div>
                )}
              </div>
              {video && (
                <button onClick={() => setVideo("")}>Supprimer la Vidéo</button>
              )}
            </div>

            {!isEmpty(error.format) && <p>{error.format}</p>}
            {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}

            <div className="btn-send">
              {message ||
              title ||
              postPicture ||
              event === true ||
              date ||
              video.length > 20 ? (
                <button className="cancel" onClick={cancelPost}>
                  Annuler le message
                </button>
              ) : null}
              <button className="send" onClick={handlePost}>
                Envoyer
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
