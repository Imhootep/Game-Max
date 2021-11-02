import React, { useContext  } from 'react';
import Navbar from '../components/Navigation/Navbar';
import LeftNav from '../components/Navigation/LeftNav';
import SearchStudio from '../components/Search/SearchStudio';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';
import { UidContext } from '../components/AppContext';
import loading from '../img/loading.gif';

const Studio = () => {
    const uid = useContext(UidContext)

    return (
        <>
        {uid !== null ? 
        <div>
            <Navbar/>
            <div className="studio-container">
                <LeftNav/>
                <SearchStudio/>
            </div>
        </div>
        :
        <img src={loading} alt="loading" title="Loading" className="loading" />
        //  <Redirect to='/'  />
        }
        </>
    );
};

export default Studio;