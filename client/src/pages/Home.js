import React from 'react';
import Navbar from '../components/Navbar';
import LeftNav from '../components/LeftNav';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <div className="home">
            <LeftNav/>
            
        </div>
        </div>
    );
};

export default Home;