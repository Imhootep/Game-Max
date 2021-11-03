import React, { useEffect, useState, useContext  } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { UidContext } from '../components/AppContext';
import Navbar from '../components/Navigation/Navbar';
import LeftNav from '../components/Navigation/LeftNav';
import Administration from '../components/Admin/Administration';
import { getUser} from "../actions/user.actions";
import logo from "../img/logo2.png";
import loading from '../img/loading.gif';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';


const Admin = () => {

    const uid = useContext(UidContext)
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch ();
    useEffect(()=>{
            dispatch(getUser())
            console.log("user sur admin :")
            console.log(user)    
            console.log("uid : ",uid) 
        }, [])
    const [oust,setOust] = useState(false);

    const ticTac = () =>{
    setInterval(() => {
      setOust(true)
    }, 3000)
}

    return (
        <>
        {uid !== null && user.isAdmin ?
        <div>
            <Navbar/>
            <div className="admin-container">
                <LeftNav/>
                <Administration/>
            </div>
        </div>
        :
        <div>
            <img src={logo} className="loading" alt="logo"  onLoad={() => ticTac()}/>
            <div class='pac-man'/>
            <h2>Redirection...</h2>
            <div>
                {oust === true ? <Redirect to='/home'  /> : '' }
            </div>
        </div>
        }  
        </>
    );
};

export default Admin;