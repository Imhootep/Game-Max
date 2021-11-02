// import React, { useEffect, useState } from 'react';
import React, { useContext,useState  } from 'react';
import { useSelector } from 'react-redux';
import { UidContext } from '../components/AppContext';
// import { getUser} from "../actions/user.actions";
// import  { Redirect } from 'react-router-dom'
import Navbar from "../components/Navigation/Navbar";
import LeftNav from "../components/Navigation/LeftNav";
import Thread from "../components/Post/Thread";
import Trends from "../components/Post/Trends";
import NewPostForm from "../components/Post/NewPostForm";
// import Log from '../components/Log';
import  { Redirect } from 'react-router-dom';
import loupe from "../img/loupe.svg"
// import { UidContext } from '../components/AppContext';
// import { isEmpty } from '../components/Utils';
import loading from '../img/loading.gif';
import logo from "../img/logo2.png";
import Cookies from 'js-cookie';

const Home = () => {

  // const dispatch = useDispatch();
  const posts = useSelector((state)=>state.postReducer)
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  const uid = useContext(UidContext)

  const [oust,setOust] = useState(false);
  // const uid = useContext(UidContext)
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

  const ticTac = () =>{
    setInterval(() => {
      setOust(true)
    }, 3000)
}
  

  return (
   <>
      {uid !== null ? 
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
              <div className="homeSearch">
                <input type="text" placeholder="recherche" />
                <a href=""> <img src={loupe} alt="" /> </a>
              </div>
              <Trends posts={posts} userData={userData} usersData={usersData} />
            </div>
          </div>
        </div>
      </div>
      
      </div>
      :  
      <div>
        {/* <img src={loading} alt="loading" title="Loading" className="loading" onLoad={() => ticTac()}/> */}
        <img src={logo} className="loading" alt="logo"  onLoad={() => ticTac()}/>
        <div class='pac-man'/>
        <div>
            {oust === true ? <Redirect to='/'  /> : '' }
        </div>
      </div>
      //
      }   
      </>
  )
};

export default Home;
