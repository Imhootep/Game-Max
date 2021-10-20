import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post.actions';
import Card from './Card';
import { getUsers } from "../../actions/users.actions";
// import { isEmpty } from './Utils';

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true)
    const [count, setCount] = useState(5)
    const dispatch = useDispatch();
    const posts = useSelector((state)=>state.postReducer)
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    useEffect(() => {
        dispatch(getUsers())
        console.log("plusieurs fois?")
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
                    console.log("post:")
                    console.log(post)
                    return <Card post={post} key={post._id} userData={userData}/>
                })}
            </ul>
        </div>
    );
};

export default Thread;