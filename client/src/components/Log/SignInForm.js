import React, { useState } from 'react';

import axios from 'axios';

const SignInForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin =(e)=>{
        e.preventDefault();

        const emailError = document.querySelector('.email.error')
        const passwordError = document.querySelector('.password.error')

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
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
            } else {
                window.location ='/home';
            }
        })
        .catch((err) =>{
            console.log(err);
        })
    };


    return (
        
                <form className="login" onSubmit={handleLogin} id="sign-up-form">
                        <h2 className="loginTitle">  GameMax Média, </h2>
                        <h2 className="loginTitle2">le réseau social des créateurs de jeux vidéos belges!</h2>
                        <h2 className="signinTitle"> Sign In</h2>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="email">E-mail</label>          
                            <input 
                                className="inputLogin" 
                                autoFocus placeholder="Entrez votre nom email..." 
                                type="email" 
                                id="email"  
                                onChange={(e)=>setEmail(e.target.value)}
                                value={email}
                            />
                            <div className="email error"></div>
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
                            <div className="password error"></div>
                        </div> 
                        <button className="loginBut" type="submit"  ><span>Sign In</span></button>
                    {/* <h4>{errorMessage}</h4> */}
                </form>
    );
};

export default SignInForm;