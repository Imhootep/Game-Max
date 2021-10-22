import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/post.actions';
import { UidContext } from '../AppContext';

const FavoriteButton = ({post}) => {

    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext)
    const dispatch = useDispatch()

    const like= () => {
        dispatch(likePost(post._id, uid))
        setLiked(true)
    }


    const unlike= () => {
        dispatch(unlikePost(post._id, uid))
        setLiked(false)
    }

    useEffect(()=>{
        // id user est-elle dans le posts?
        if(post.likers.includes(uid)) setLiked(true)
        else setLiked(false)
    }, [uid, post.likers, liked])


    return (
        <div className="like-container">
           {liked === false && (
               <img src="./img/icons/heart.svg" onClick={like} alt="like"/>
           )} 
           {liked && (
               <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike"/>
           )}
           <span>{post.likers.length}</span>
        </div>
    );
};

export default FavoriteButton;