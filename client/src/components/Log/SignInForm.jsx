import React, { useState } from 'react';
import Cookies from 'js-cookie'
import axios from 'axios';
import Modal from "../Modals";
import ForgotPassword from "../Password/ForgotPassword";


const SignInForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [uid, setUid] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const showModal = () => {
        setOpenModal(true);
        
      }
    
      const hideModal = () => {
        setOpenModal(false);
      }

    const handleLogin =(e)=>{
        e.preventDefault();

        const logError = document.querySelector('.log.error')
        // const validationError = document.querySelector('.validation.error')
        // const passwordError = document.querySelector('.password.error')
        axios({
            method:"post",
            url:`${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials:true,
            data:{
                email,
                password,
            },
        })
        .then((res) =>{
            console.log(res);
            if(res.data.errors){
                // emailError.innerHTML = res.data.errors.email;
                // validationError.innerHTML = res.data.errors.validation;
                logError.innerHTML = res.data.errors.message;
            } else {
                var one_day = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                Cookies.set("jwt", res.data.jwt, { expires: one_day })
                window.location ='/home';
            }
        })
        .catch((err) =>{
            console.log(err);
        })
    };


    return (
            <>
                <form className="login" onSubmit={handleLogin} id="sign-up-form">
                        <h2 className="loginTitle">  GameMax Média, </h2>
                        <h2 className="loginTitle2">le réseau social des créateurs de jeux vidéos belges!</h2>
                        <h2 className="signinTitle"> Sign In</h2>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="email">E-mail</label>          
                            <input 
                                className="inputLogin" 
                                autoFocus placeholder="Entrez votre email..." 
                                type="email" 
                                id="email"  
                                onChange={(e)=>setEmail(e.target.value)}
                                value={email}
                            />
                            <div className="log error"></div>
                        </div> 
                        <div className="form-group">
                            <label className="formLabel" htmlFor="password">Mot de passe</label>  
                            <input 
                                className="inputLogin" 
                                placeholder="Entrez votre mot de passe..." 
                                type="Password" 
                                id="password"  
                                onChange={(e)=>setPassword(e.target.value)}
                                value={password}
                            />
                        </div> 
                        <button id="test" className="loginBut" type="submit"  ><span>Se connecter</span></button>
                    {/* <h4>{errorMessage}</h4> */}
                    <br/>
                    <span className="forgotPassLink" onClick={()=>showModal()}>Mot de passe oublié ? </span>
                </form>

                <Modal showModal={openModal} hideModal={hideModal}>
                    <div className="forgotPassword"> 
                    <div className="forgotPass">
            <ForgotPassword/>
       </div>
                    </div>
                </Modal>
                </>
    );
};

export default SignInForm;