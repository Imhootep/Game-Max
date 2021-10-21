import React from 'react';
import Navbar from '../components/Navigation/Navbar';
import LeftNav from '../components/Navigation/LeftNav';
import Administration from '../components/Admin/Administration';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';

const Admin = () => {
    return (
        <>
        {Cookies.get("jwt") ? 
        <div>
            <Navbar/>
            <div className="admin-container">
                <LeftNav/>
                <Administration/>
            </div>
        </div>
        :
        <Redirect to='/'  />
        }  
        </>
    );
};

export default Admin;