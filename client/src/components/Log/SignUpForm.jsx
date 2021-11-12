import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm'
// import Modal from '../Modals';
// import texture from '../../img/Game-Max_Texture.jpg'
const SITE_KEY = "6LcVzugcAAAAADjUydojvUBjcZAJlV6unFMF9Pg2";

const SignUpForm = () => {

    const [formSubmit, setFormSubmit] = useState(false)
    const [pseudo, setPseudo] = useState('')
    const [company, setCompany] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [controlPassword, setControlPassword] = useState('')
    
  const [response, setResponse] = useState(null);
  
    
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
                    company,
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
                    window.grecaptcha.ready(() => {
                    window.grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(token => {
                    submitData(token);})
                    })
                   setFormSubmit(true)

                }
            })
            .catch((err) => console.log(err));
        }

    }

    const submitData = token => {
        // call a backend API to verify reCAPTCHA response
        fetch('http://localhost:8000/verify', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "name": pseudo,
            "email": email,
            "g-recaptcha-response": token
          })
        }).then(res => res.json()).then(res => {
          setResponse(res);
          console.log(response)
        });
      }

    useEffect(() => {
        const loadScriptByURL = (id, url, callback) => {
          const isScriptExist = document.getElementById(id);
     
          if (!isScriptExist) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            script.id = id;
            script.onload = function () {
              if (callback) callback();
            };
            document.body.appendChild(script);
          }
     
          if (isScriptExist && callback) callback();
        }
     
        // load the script by passing the URL
        loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`, function () {
          console.log("Script loaded!");
        });
      }, []);


    return (
        <>
                 <>
                    {formSubmit ? (
                        <>
                        
                        <SignInForm/>

                      <div className="modalSucces">
                        <h4 className="succes">Enregistrement réussi </h4>
                        </div>
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
                        <div className="form-group2">
                        <input 
                            type="text" 
                            placeholder="Votre nom"
                            value={pseudo} 
                            onChange={(e)=>{setPseudo(e.target.value)}}/>
                            <div className="pseudo error"></div>
                            <br />
                            <input 
                            type="text" 
                            placeholder="Nom du Studio"
                            value={company} 
                            onChange={(e)=>{setCompany(e.target.value)}}/>
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
                            <div className="termsCond">
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