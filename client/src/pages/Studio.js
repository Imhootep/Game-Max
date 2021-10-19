import React from 'react';
import Navbar from '../components/Navigation/Navbar';
import LeftNav from '../components/Navigation/LeftNav';
import SearchStudio from '../components/Search/SearchStudio';

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