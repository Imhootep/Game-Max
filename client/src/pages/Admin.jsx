import React, { useContext  } from 'react';
import { UidContext } from '../components/AppContext';
import Navbar from '../components/Navigation/Navbar';
import LeftNav from '../components/Navigation/LeftNav';
import Administration from '../components/Admin/Administration';
import loading from '../img/loading.gif';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';

const Admin = () => {
    const uid = useContext(UidContext)
    const urole = useContext(UidContext)

    return (
        <>
        {uid !== null && urole ? 
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