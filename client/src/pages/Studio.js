import React from 'react';
import Navbar from '../components/Navbar';
import LeftNav from '../components/LeftNav';
import SearchStudio from '../components/SearchStudio';

const Studio = () => {
    return (
        <div>
            <Navbar/>
            <div className="studio-container">
                <LeftNav/>
                <SearchStudio/>
            </div>
        </div>
    );
};

export default Studio;