import React from 'react';
import Navbar from '../components/Navigation/Navbar';
import LeftNav from '../components/Navigation/LeftNav';
import Administration from '../components/Admin/Administration';

const Admin = () => {
    return (
        <div>
            <Navbar/>
            <div className="admin-container">
                <LeftNav/>
                <Administration/>
            </div>
        </div>
    );
};

export default Admin;