// import React, { useEffect, useState } from 'react';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
// import { getUser} from "../actions/user.actions";
// import  { Redirect } from 'react-router-dom'
import Navbar from "../components/Navigation/Navbar";
import LeftNav from "../components/Navigation/LeftNav";
import Thread from "../components/Post/Thread";
import Trends from "../components/Post/Trends";
import NewPostForm from "../components/Post/NewPostForm";
import Log from '../components/Log';
import  { Redirect } from 'react-router-dom';
import { UidContext } from '../components/AppContext';
// import { isEmpty } from '../components/Utils';
import loading from '../img/loading.gif';

const Home = () => {

  const dispatch = useDispatch();
  const posts = useSelector((state)=>state.postReducer)
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);


  const uid = useContext(UidContext)
  // const dispatch = useDispatch ();
  // const user = useSelector((state) => state.userReducer);
  // useEffect(()=>{
  //       dispatch(getUser())
  //       console.log("user sur home:")
  //       console.log(user)
  //       return <Redirect to='/studio'  />
  //       if(user === undefined || user === isEmpty){
  //           return <Redirect to='/'  />
  //       }
  //   }, [])


  useEffect(() => {
  }, [uid]);

  return (
   <>
      {uid ? 
        <div>
      <Navbar />
      <div className="home">
        <LeftNav />
        <div className="main">
          <div className="home-header">
              <NewPostForm/>
          </div>
          <Thread posts={posts} userData={userData} usersData={usersData} />
        </div>
        <div className="right-side">
          <div className="right-side-container">
            <div className="wrapper">
              <Trends posts={posts} userData={userData} usersData={usersData} />
            </div>
          </div>
        </div>
      </div>
      
      </div>
      : 
      <img src={loading} alt="loading" title="veuillez patienter" className="loading" />
      // <div className="profil-page">
      // <Log signin={true} signup={false} />
      // </div>
      // 'LOADING'
      }
    
      
       {/* <Redirect to='/'  /> */}
      

      </>
      

  )


};

export default Home;
