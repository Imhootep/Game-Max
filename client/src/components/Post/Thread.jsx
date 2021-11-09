import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.actions";
import Card from "./Card";
import { getUsers } from "../../actions/users.actions";
// import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';


const Thread = ({ posts, userData, data }) => {

  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(10);
  const dispatch = useDispatch();
  //si on le fait passer en props et qu'on recupere ici ça ne marche pas sans le getusers du useeffects en dessous...wtf?
  const usersData = useSelector((state) => state.usersReducer); 
  const [filteredData, setFilteredData] = useState ([]);
  // const [refreshData,setRefreshData] = useState(0);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 10);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

  const handleFilter = (e) =>{
     const searchWord = e.target.value
     const newFilter = data.filter((value)=>{
        return value.title.includes(searchWord) 
     })
     setFilteredData(newFilter);
  } 


  return (
    <div className="thread-container">

        {/*-------------- Barre de recherche dans le back ----------------------- */}
      <div className="homeSearch2">
        <input
          type="text"
          className="prompt"
          placeholder="Recherche de posts ..."
          onChange={handleFilter}
        />

        <div className="searchIcon">
            <SearchIcon />
        </div>
        {filteredData.length !== 0 && (
        <div className="dataResult">
            {filteredData.map((value, key)=>{
                return <div>
                    <p>{value.title}</p>
                    </div>
            })}
        </div>
        )}
      </div>
        
      <ul>

          {/*-------------- Fil d'actualité -------------------------------------- */}
        {posts.map((post) => {
          return (
            <Card
              post={post}
              key={post._id}
              usersData={usersData}
              userData={userData}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Thread;
