import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';

const Card = ({post}) => {
//on appelle post en props

    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state)=>state.usersReducer)
    const userData = useSelector((state)=>state.userReducer)
    
    useEffect(()=>{
        !isEmpty(usersData[0]) && setIsLoading(false)
    }, [usersData])

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                <div className="card-left">
                    
                </div>
                </>
            )}
        </li>
    );
};

export default Card;