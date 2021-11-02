import React, { useEffect, useState, useContext  } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { UidContext } from '../components/AppContext';
import Navbar from '../components/Navigation/Navbar';
import LeftNav from '../components/Navigation/LeftNav';
import Administration from '../components/Admin/Administration';
import { getUser} from "../actions/user.actions";

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
        <img src={loading} alt="loading" title="Loading" className="loading" />
        }  
        </>
    );
};

export default Admin;