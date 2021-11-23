import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts,searchPost } from "../../actions/post.actions";
import Card from "./Card";
import { getUsers } from "../../actions/users.actions";
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';


const Thread = ({ posts, userData, data }) => {

  const [loadPost, setLoadPost] = useState(true);
  // const [stopScroll, setStopScroll] = useState(false)
  const [count, setCount] = useState(10);
  const dispatch = useDispatch();
  
  //si on le fait passer en props et qu'on recupere ici ça ne marche pas sans le getusers du useeffects en dessous...wtf?
  const usersData = useSelector((state) => state.usersReducer); 
  const [searchWord, setSearchWord] = useState("");

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
      dispatch(searchPost(searchWord,count));
      setLoadPost(false);
      setCount(count + 10);
    } 

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

//guillaume
  const handleSearch = (searchData) =>{
    setSearchWord(searchData)
  }

  const applySearch = () =>{
    // setSearchWord(searchData)
    dispatch(searchPost(searchWord, count))
    // setStopScroll(true)
  }
  const resetSearch = () =>{
    setSearchWord('');
    window.location.reload();
  }


  return (
    <div className="thread-container">

       {/* Barre de recherche dans le Back */}
       <div className="homeSearch2">
       
        <input type="text" value={searchWord} className="prompt" placeholder="Rechercher un post ..." onChange={(e) => handleSearch(e.target.value)}/>
        {searchWord !== '' ? <button onClick={resetSearch}><CloseIcon/></button> : null}
        <button onClick={applySearch}><SearchIcon/></button>
        

      </div>
      
    
      <ul className="width100">

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
