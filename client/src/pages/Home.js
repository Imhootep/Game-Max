import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { getUser} from "../actions/user.actions";
import  { Redirect } from 'react-router-dom'
import Navbar from "../components/Navbar";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";
import Trends from "../components/Trends";
import NewPostForm from "../components/Post/NewPostForm";
import { isEmpty } from '../components/Utils';

const Home = () => {

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

  return (
    <div>
      <Navbar />
      <div className="home">
        <LeftNav />
        <div className="main">
          <div className="home-header">
              <NewPostForm/>
          </div>
          <Thread />
        </div>
        <div className="right-side">
          <div className="right-side-container">
            <div className="wrapper">
              <Trends />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
