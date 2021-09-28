import axios from "axios";

export const GET_USERS = "GET_USERS";

//-------------------------RECUP DE TOUS LES USERS
export const getUsers =()=>{
    
    return (dispatch) =>{
        //on fait le dispatch du GET via Axios pour récup tous les users
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/user`)
        .then((res)=>{
            //dispatch dans le store
            dispatch({type:GET_USERS, payload:res.data})
        })
        .catch((err)=>console.log(err))
    }
}