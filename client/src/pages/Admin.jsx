import React, { useContext  } from 'react';
import { UidContext } from '../components/AppContext';
import Navbar from '../components/Navigation/Navbar';
import LeftNav from '../components/Navigation/LeftNav';
import Administration from '../components/Admin/Administration';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';

const Admin = () => {
    const uid = useContext(UidContext)

    return (
        <>
        {uid !== null ? 
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