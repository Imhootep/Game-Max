import React, { useState,useEffect } from "react"; //useEffect pour test refresh
import { useDispatch } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import FollowHandler from "../profil/FollowHandler";
import { isEmpty, timestampParser } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";
// import ReactDOM from "react-dom"; //test refresh
// import { Provider } from "react-redux"; // test refresh
// import Card from "./Card"; //test refresh

const CardComments = ({ post,userData,usersData }) => {
  const [text, setText] = useState("");
  // const usersData = useSelector((state) => state.usersReducer);
  // const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if(text){
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
      .then(()=> dispatch(getPosts()))
      .then(()=>setText(''))
    }
  };

  //---- refresh

  // const [currentPage, setCurrentPage] = useState('');
  // const updatePage = (title) => {
     
  //   //  dispatch(getPosts())
  //   //  setCurrentPage(title)
  //   //  window.location.reload()
  //   // ReactDOM.render( <Provider>< CardComments /> </Provider>, document.getElementById("refreshCommentContainer"));
  //   //  console.log("on passe pas ici?")
  // }


  // useEffect(() => {
  //   console.log("USEEFFECT !")
  // }, [post]);
  

  //---- refresh
  

  return (
    <div className="comments-container" id="refreshCommentContainer">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      let postImagePath = process.env.REACT_APP_API_URL+user.picture;
                      if (user._id === comment.commenterId) return postImagePath;
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.commenterPseudo}</h3>
                  {comment.commenterId !== userData._id && (
                    <FollowHandler
                      idToFollow={comment.commenterId}
                      type={"card"}
                    />
                  )}
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} postId={post._id} /> 
              {/* updatePage={updatePage} */}
            </div>
          </div>
        );
      })}
      {userData._id && (
        <form action=""  className="comment-form">
          <input type="text" name="text" onChange={(e)=>setText(e.target.value)} value={text} placeholder="Laisser un Commentaire" />
          <br/>
          <input type="submit" value="Envoyer" onClick={handleComment}/>
        </form>
      )}
    </div>
  );
};

export default CardComments;
