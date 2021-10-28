// import React, { useContext } from "react";
import React from "react";
import ForgotPassword from "../components/Password/ForgotPassword";
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