import React, { useEffect, useState } from 'react';
import Routes from "./components/Routes";
import {UidContext} from './components/AppContext'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie'
import { getUser } from './actions/user.actions';
import { createPortal } from 'react-dom';

const App = () => {

  const [uid, setUid] = useState(null);
  const dispatch = useDispatch ();
  
  useEffect(() =>{
      const fetchUser = async () =>{
        await axios ({
          method:"get",
          withCredentials:true,
          headers : { Authorization : "Bearer "+Cookies.get('jwt') },
          url:`${process.env.REACT_APP_API_URL}api/user/all`
        })
          .then((res) => {
            setUid(res.data.user)
          })
          .catch((err) => console.log("No token..."))
      }
      fetchUser();
      //get data and show 
      if(uid) dispatch(getUser(uid)) 

   }, [uid]);

  return (
    <UidContext.Provider value={uid}>
     <Routes/>
    </UidContext.Provider>
  );
};

export default App;