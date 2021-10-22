import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dateParser2, isEmpty } from "../Utils";
import FollowHandler from "../profil/FollowHandler";
import FavoriteButton from "./FavoriteButton";
import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";
// import { getUsers } from "../../actions/users.actions";
// import Parser from 'html-react-parser';
// import { deletePostAdmin } from "../../actions/post.actions";

const Card = ({ post, postId,usersData, userData }) => {
  //on appelle post en props
  // console.log(post);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  
  // const handleDelete = () => dispatch(deletePostAdmin(postId));

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={usersData
                .map((user) => {
                  let userImagePath = process.env.REACT_APP_API_URL+user.picture;
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
                  {" "}
                  {usersData.map((user) => {
                    if (user._id === post.posterId) return user.pseudo;
                    else return null;
                  })}
                </h3>
                {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              <span>{dateParser2(post.createdAt)}</span>
            </div>
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
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
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit-btn" />
                </div>
                <DeleteCard id={post._id} />
              </div>
            ) : "" }

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

              <div>
                {/* Quand on veut supprimer un post et qu'on est Admin  */}
                {/* {userData._id !== post.posterId && userData.isAdmin === true ?  (
                  <div className="btn">
                    <span
                      onClick={() => {
                        if (
                          window.confirm(
                            "Voulez-vous supprimer ce commentaire?"
                          )
                        ) {
                          handleDelete();
                        }
                      }}
                    >
                      <img src="./img/icons/trash.svg" alt="delete" />
                    </span>
                  </div>
                ) : (
                  ""
                )} */}
              </div>

              <img src="./img/icons/share.svg" alt="share" />
            </div>
            {showComments && <CardComments post={post} userData={userData} usersData={usersData} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
