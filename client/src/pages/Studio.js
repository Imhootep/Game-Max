import React from 'react';
import Navbar from '../components/Navigation/Navbar';
import LeftNav from '../components/Navigation/LeftNav';
import SearchStudio from '../components/Search/SearchStudio';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';

const Studio = () => {
    return (
        <>
        {Cookies.get("jwt") ? 
        <div>
            <Navbar/>
            <div className="studio-container">
                <LeftNav/>
                <SearchStudio/>
            </div>
        </div>
        :
         <Redirect to='/'  />
        }
        </>
    );
};

export default Studio;