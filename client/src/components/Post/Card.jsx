import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dateParser, dateParser2, isEmpty } from "../Utils";
import FollowHandler from "../profil/FollowHandler";
import FavoriteButton from "./FavoriteButton";
import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";

const Card = ({ post, postId, usersData, userData }) => {
  //on appelle post en props
  // console.log(post);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  let postImagePath = process.env.REACT_APP_API_URL + post.picture;

  return (
    <li
    className={"card-container card-container" + (post.eventType !== undefined ? post.eventType : "") }
    key={post._id}
    >
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={usersData
                .map((user) => {
                  let userImagePath =
                    process.env.REACT_APP_API_URL + user.picture;
                  if (user._id === post.posterId) return userImagePath;
                  else return null;
                })
                .join("")}
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {usersData.map((user) => {
                    if (user._id === post.posterId)
                      return user.pseudo + " " + "/" + " " + user.company;
                    else return null;
                  })}
                </h3>
                {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              {post.isEvent && (
                <div className={"event-info" + post.eventType}>
                  Event : {post.eventType}
                </div>
              )}
              <span>créé le {dateParser2(post.createdAt)}</span>
            </div>

            {post.picture && (
              <img src={postImagePath} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            <br />
            <div className="postTitleAndPost">
              {post.title && (
                <h2 className={"card-title" + post.eventType}>{post.title} </h2>
              )}
              {post.date && <p> Le {dateParser(post.date)}</p>}
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}

            {/* Quand on veut éditer son propre post id du post = id du user  */}
            {userData._id === post.posterId || userData.isAdmin === true ? (
              <div className="button-container">
                <div
                  className={"modif-button" + post.eventType}
                  onClick={() => setIsUpdated(!isUpdated)}
                >
                  <img src="./img/icons/edit.svg" alt="edit-btn" />
                </div>
                <DeleteCard id={post._id} />
              </div>
            ) : (
              ""
            )}

            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="comment"
                />
                <span>{post.comments.length}</span>
              </div>
              <FavoriteButton post={post} />

              <img src="./img/icons/share.svg" alt="share" />
            </div>
            {showComments && (
              <CardComments
                post={post}
                userData={userData}
                usersData={usersData}
              />
            )}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
