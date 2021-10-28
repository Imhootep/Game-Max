// import React, { useContext } from "react";
import React from "react";
import NewPasswordForgotten from "../components/Password/NewPasswordForgotten";
import ChangePassword from "../components/Password/ChangePassword";


const Trending = () => {

   
    
    return (
        <>
        
       <div className="forgotPass">
            <NewPasswordForgotten/>
       </div>
       <div className="changePass">
            <ChangePassword/>

       </div>
        
        </>
    );
};
export default Trending