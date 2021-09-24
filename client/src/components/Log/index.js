import React, {useState} from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import logo from '../../img/logo2.png'
import controller from '../../img/gamepad.png'

const Log = ( props) => {

    const [signUpModal, setSignUpModal] = useState(props.signup)
    const [signInModal, setSignInModal] = useState(props.signin)

    const handleModals =(e) =>{
        if (e.target.id === "login"){
            setSignUpModal(false);
            setSignInModal(true);
        } else if (e.target.id === "register"){
            setSignUpModal(true);
            setSignInModal(false);
        }
    }

    return (
        <div className="connection-form">
        <div className="form-container">
            <ul className="ul-log">
                <li className="il-log"
                onClick={handleModals}
                id="login"
                className={signInModal?"active-btn" : null}
                >
                Se connecter
                </li>
                <li className="il-log" 
                onClick={handleModals} 
                id="register"
                className={signUpModal?"active-btn" : null}
                >
                S'inscrire
                </li>
                
            </ul>
            <div>
            <header className="App-header">
                <div className="div-header">
                        <div className="div-logo">
                        <div className="logoLog">
                            <img src={logo} className="App-logo" alt="logo" />

                            <img src={controller} className="App-controller" alt="controller" />
                            
                        </div>
                        </div>
                        
                        <div className="controller2">
                        <img src={controller} className="App-controller2" alt="controller" />
                        </div>
            {signInModal && <SignInForm/>}
            {signUpModal && <SignUpForm/>}
            </div>
            </header> 
        </div>
        </div>
    </div>
    );
};

export default Log;