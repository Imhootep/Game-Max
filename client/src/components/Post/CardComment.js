import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const CardComment = (post) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = () => {};

  return (
    <div className="comment-container">
      {post.comment.map((comment) => {
        return (
         <div className={comment.commentId === userData._id ? "comment-container-client" : "comment-container"} key={comment._id}>
             <div className="left-part">
                <img src={ 
                usersData
                .map((user) => {
                  if (user._id === post.posterId) return user.picture;
                  else return null;
                })
                .join("")}
              alt="poster-pic"/>
             </div>
        </div>
      )
      })}
    </div>
  );
};

export default CardComment;
