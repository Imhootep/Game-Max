import React from "react";
import {CSVLink} from 'react-csv'
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/users.actions";

const Csv = () =>{

    const dispatch = useDispatch();
    const users = useSelector((state) => state.userReducer)
    dispatch (getUsers())

    const csvData =[
        ['firstname', 'lastname', 'email'] ,
        ['Jane', 'Doe' , 'jane.doe@xyz.com']
      ];

return (
    <div>
        <h4>Liste des adresses mail</h4>
            {users.map((val)=>{
                return(
                <>
                    
            <ul>
                <li> <span> pseudo : {val.pseudo} </span> 
                <br />
                <span> email : {val.email} </span></li>
                <br />
            </ul>
            </>
                )
            })}
        <CSVLink data={csvData} >Download me</CSVLink>
    </div>
);


};

export default Csv;
