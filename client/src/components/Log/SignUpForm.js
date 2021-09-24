import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm'

const SignUpForm = () => {

    const [formSubmit, setFormSubmit] = useState(false)
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [controlPassword, setControlPassword] = useState('')
    
    const handleRegister = async (e) =>{
        e.preventDefault();
        const terms = document.getElementById('terms');
        const pseudoError = document.querySelector('.pseudo.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');
        const termsError = document.querySelector('.terms.error');

        pseudoError.innerHTML=""
        emailError.innerHTML=""
        passwordError.innerHTML=""
        passwordConfirmError.innerHTML="";
        termsError.innerHTML="";


        if(password!== controlPassword || !terms.checked ){
            if(password!==controlPassword)
                passwordConfirmError.innerHTML="les mots de passes ne correspondent pas!";
            if(!terms.checked)
                termsError.innerHTML ="Veuillez valider les conditions générales!";
        } else {
            await axios({
                method:"post",
                url:`${process.env.REACT_APP_API_URL}api/user/register`,
                data:{
                    pseudo,
                    email, 
                    password
                }
            })
            .then((res)=>{
                console.log(res)
                if(res.data.errors) {
                    pseudoError.innerHTML = res.data.errors.pseudo;
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                   setFormSubmit(true)
                }
            })
            .catch((err) => console.log(err));
        }

    }


    return (
        <>
                 <>
                    {formSubmit ? (
                        <>
                        
                        <SignInForm/>
                        <h4 className="succes">Enregistrement réussi </h4>
                        <span></span>
                        
                        </>
                    ) : (
                    <form 
                    action="" 
                    onSubmit={handleRegister} 
                    className="login"  
                    id="sign-up-form">
                        <h2 className="loginTitle">  GameMax Média, </h2>
                        <h2 className="SignUpTitle2">Pas encore inscrit?</h2>
                        
                        <br/>
                        <div className="form-group">
                            <input 
                            type="text" 
                            placeholder="Pseudo"
                            value={pseudo} 
                            onChange={(e)=>{setPseudo(e.target.value)}}/>

                            <div className="pseudo error"></div>
                            <br/>
                            <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e)=>{setEmail(e.target.value)}}/>

                            <div className="email error"></div>
                            <br/>
                            <input 
                            type="password" 
                            placeholder="Mot de passe"
                            value={password}  
                            onChange={(e)=>{setPassword(e.target.value)}}/>

                            <div className="password error"></div>
                            <br/>
                            <input 
                            type="password"
                            className="passwordConfirm"
                            placeholder="Confirmer mot de passe"
                            value={controlPassword}  
                            onChange={(e)=>{setControlPassword(e.target.value)}}/>

                            <div className="password-confirm error"></div>
                            <br/>
                            <br/>
                            <div>
                            <input type="checkbox" id="terms" />
                            <label> J'accepte les <a href="https://gamemax.be/" >conditions générales et d'utilisation</a> </label>
                            <div className="terms error"></div>
                            </div>
                        </div> 
                        <button className="loginBut signUpBut" type="submit"  ><span>Sign Up</span></button>
                   
                    </form>
                    )}
                </> 
        
        </>
    )
}

export default SignUpForm;