import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser2, isEmpty } from "../Utils";

const Card = ({ post }) => {
  //on appelle post en props
  console.log(post)
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
//   const userData = useSelector((state) => state.userReducer);

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
              src={
                usersData
                  .map((user) => {
                      
                    if (user._id === post.posterId) return user.picture;
                    else return null;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                  <h3> {
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId)
                            return user.pseudo
                        else return null;
                      })
                      }
                
                  </h3>
              </div>
                 <span>{dateParser2(post.createdAt)}</span>     
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
