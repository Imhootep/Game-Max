import React, { useState } from 'react';
import { useSelector } from 'react-redux';


const Administration = () => {

    const users = useSelector((state) => state.usersReducer);

    return (
        <div className="administrationContainer">
            {users.map((val)=>{
            return(
                <div className="adminBlock">
                    <div className="adminSection">{val.pseudo}</div>
                    <div className="adminSection">{val.role === '' ? 'ACCEPTER' : val.role}</div>
                    <div className="adminSection">
                        <select className="adminRoleSelect">
                            <option value="studio" selected>Studio</option>
                            <option value="expert">Expert</option>
                            <option value="sponsor">Sponsor</option>
                            <option value="partenaire">Partenaire</option>
                        </select>
                    </div>
                    <div className="adminSection">
                        <img src="../img/icons/add.svg" alt="add"/>
                    </div>
                </div>
                )          
        })}
        </div>
    );
};

export default Administration;