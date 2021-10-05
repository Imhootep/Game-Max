import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Administration = () => {

    const users = useSelector((state) => state.usersReducer);

    return (
        <div className="administrationContainer">
            {users.map((val)=>{
            return(
                <div className="adminBlock">
                    {val.pseudo}: {val.role}
                </div>
                )          
        })}
        </div>
    );
};

export default Administration;