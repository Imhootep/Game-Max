import React from 'react';
import Navbar from '../components/Navbar';
import LeftNav from '../components/LeftNav';

const Trending = () => {
    return (
        <div>
        <Navbar/>
        <div className="trending-container">
            <LeftNav/>
            
        </div>
    </div>
    );
};

export default Trending;