import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "./Utils";
import star from "../img/star.png";
import exemple from "../img/0125.png";
import { getTrends } from "../actions/post.actions";
import { NavLink } from "react-router-dom";

const Trends = () => {
  const posts = useSelector((state) => state.allPostsReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });

      sortedArray.length = 3;
      console.log(sortedArray);
      dispatch(getTrends(sortedArray));
    }
  }, [posts]);

  return (
    <>
      <div className="trends">
        <div className="eventBlock">
          <b>Prochain évènement</b>
          <div className="eventBlockText">
            <div>Soirée d'information gamemax</div>
            <div>15/10/2021</div>
          </div>
          <img className="favoriteEventBanner" src={exemple} />
        </div>
        <div className="favoriteBlock">
          <b>Favoris</b>
          <div className="trending-container">
        
        
          <ul>
            {trendList.length &&
              trendList.map((post) => {
                return (
                  <li key={post._id}>
                    <div>
                      {post.picture && (
                        <img src={post.picture} alt="post-pic" />
                      )}
                      {post.video && (
                        <iframe
                          src={post.video}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={post._id}
                        ></iframe>
                      )}
                      {isEmpty(post.picture) && isEmpty(post.video) && (
                          <img src={usersData[0] && userData.map((user)=>{
                              if(user._id === post.posterId) {
                                  return user.picture;
                              } else return null;
                          })
                          .join("")
                        } alt="profile-pic" />
                      )}
                    </div>
                    <div className="trend-content">
                        <p>{post.message}</p>
                        <span>lire</span>
                    </div>
                  </li>
                );
              })}
          </ul>
        
      </div>
        </div>
      </div>
      
    </>
  );
};

export default Trends;
