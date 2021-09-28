import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.actions";
import { isEmpty } from "../Utils";

const FollowHandler = (idToFollow) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch(); // avant de pouvoir utiliser redux

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow))
    //si on suit la personne le setIsFollowed doit être sur true
    //avec ça le bouton va changer aussi
    setIsFollowed(true)
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow))
    //si on ne suit pas/plus la personne le setIsFollowed doit être sur false
    //avec ça le bouton va changer aussi et on ne le suit plus
    setIsFollowed(false)
  };

  useEffect(() => {
    //on doit attendre que userData arrive pour lancer useEffect
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
    // quand on a le userData qui évolue, on relance le useEffect
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        //si click on ne suit plus
        <span onClick={handleUnfollow}>
          <button className="unfollow-btn">Abonné</button>
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        //si click on suit
        <span onClick={handleFollow}>
          <button className="follow-btn">Suivre</button>
        </span>
      )}
    </>
  );
};

export default FollowHandler;
