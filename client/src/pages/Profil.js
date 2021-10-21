import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import Log from '../components/Log';
import Navbar from '../components/Navigation/Navbar';
import UpdateProfil from '../components/profil/UpdateProfil';
import { useSelector } from "react-redux";

const Profil = () => {
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const uid = useContext(UidContext)

    return (
        <div className="profil-page">
            {uid ? (
               <> 
                <Navbar/>
                <br/>
                <br/>
                <br/>
                <UpdateProfil userData={userData} usersData={usersData}/>
              </>
            ) : ''

            // (
            //     <Log signin={true} signup={false} /> 
            // )
        }
        </div>
    );
};

export default Profil;