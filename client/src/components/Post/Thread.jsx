import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post.actions';
import Card from './Card';
import { getUsers } from "../../actions/users.actions";
import { getUser } from "../../actions/user.actions";
// import { isEmpty } from './Utils';

const Thread = ({posts,userData}) => {
    const [loadPost, setLoadPost] = useState(true)
    const [count, setCount] = useState(5)
    const dispatch = useDispatch();
    // const posts = useSelector((state)=>state.postReducer)
    const usersData = useSelector((state) => state.usersReducer); //si on le fait passer en props et qu'on recupere ici ça ne marche pas sans le getusers du useeffects en dessous...wtf?
    // const userData = useSelector((state) => state.userReducer);
    

    useEffect(() => {
        dispatch(getUsers())
      }, []);

    const loadMore = () =>{
        if (window.innerHeight + document.documentElement.scrollTop +1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true)
        }
    }

    useEffect(()=>{
        if(loadPost) {
            dispatch(getPosts(count));
            setLoadPost(false)
            setCount(count + 5);
        }

        window.addEventListener('scroll', loadMore);
        return ()=> window.removeEventListener('scroll', loadMore)
    }, [loadPost, dispatch, count])

    return (
        <div className="thread-container">
            <ul>
                {posts.map((post)=>{
                    return <Card post={post} key={post._id} usersData={usersData} userData={userData}/>
                })}
            </ul>
        </div>
    );
};

export default Thread;