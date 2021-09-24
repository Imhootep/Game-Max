import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import Log from '../components/Log';
import Navbar from '../components/Navbar';
import UpdateProfil from '../components/profil/UpdateProfil';


const Profil = () => {

    const uid = useContext(UidContext)

    return (
        <div className="profil-page">
            {uid ? (
               <> 
                <Navbar/>
                <br/>
                <br/>
                <br/>
                <UpdateProfil/>
            
              </>
            ) : (
                <Log signin={true} signup={false} /> 
            )}
        </div>
    );
};

export default Profil;