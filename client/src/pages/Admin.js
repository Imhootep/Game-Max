import React from 'react';
import Navbar from '../components/Navbar';
import LeftNav from '../components/LeftNav';
import Administration from '../components/Administration';

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