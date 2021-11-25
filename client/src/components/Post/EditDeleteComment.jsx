import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.actions";
import { UidContext } from "../AppContext";

const EditDeleteComment = ({ comment, postId }) => { //updatePage
  const [isAuthor, setIsAuthor] = useState(false);
  // const [isAdmin, setIsAdmin]= useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  // const [newComment, setComment] = useState(comment);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const userData = useSelector((state)=>state.userReducer)
  // const [refreshData,setRefreshData] = useState(0);
  
  // const title = 'Current Article Title';
  const handleEdit = (e) => {
    e.preventDefault();
    if (text) {
      // console.log("postId")
      // console.log(postId)

      // console.log("comment._id")
      // console.log(comment._id)

      // console.log("text")
      // console.log(text)

      // console.log("comment.commenterId")
      // console.log(comment.commenterId)

      // console.log("comment.commenterPseudo")
      // console.log(comment.commenterPseudo)
      dispatch(editComment(postId, comment._id, text, comment.commenterId, comment.commenterPseudo));
      setText("");
      setEdit(false);
      
      
      // updatePage(title);
      // setComment(text);
      // comment(text);
      // dispatch(getPosts());
       window.location.reload();
    }
  }

  // const handleEdit = () => dispatch(editComment(postId, comment._id, text));
  const handleDelete = () => dispatch(deleteComment(postId, comment._id));

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);


  return (
    <div className="edit-comment">
      {/* {console.log("t es admin?")}
      {console.log(userData.isAdmin)} */}
      {userData.isAdmin === true ?
          <div className="btn">
          <span
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer ce commentaire?")) {
                handleDelete();
              }
            }}
          >
            <img src="./img/icons/trash.svg" alt="delete" />
          </span>
        </div>
      : ''} 
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="edit" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text} />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire?")) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete" />
            </span>

            <input type="submit" value="Valider modification"/>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
