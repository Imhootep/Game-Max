import axios from "axios";
import Cookies from 'js-cookie'
import { getUser } from './user.actions';

export const GET_USERS = "GET_USERS";
export const GET_ROLED_USERS = "GET_ROLED_USERS";

//-------------------------RECUP DE TOUS LES USERS
export const getUsers =()=>{
    
    return (dispatch) =>{
        //on fait le dispatch du GET via Axios pour récup tous les users
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/user/all`, { headers : { Authorization : "Bearer "+Cookies.get('jwt') } } )
        .then((res)=>{
            //dispatch dans le store
            const uid = res.data.user;
            // console.log("uid : ",uid)  
            dispatch({type:GET_USERS, payload:res.data.users})
            dispatch(getUser(uid))
        })
        .catch((err)=>console.log(err))
    }
}
export const getRoledUsers =()=>{
    
    return (dispatch) =>{
        //on fait le dispatch du GET via Axios pour récup tous les users
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/user/roled`, { headers : { Authorization : "Bearer "+Cookies.get('jwt') } } )
        .then((res)=>{
            //dispatch dans le store
            dispatch({type:GET_ROLED_USERS, payload:res.data})
        })
        .catch((err)=>console.log(err))
    }
}