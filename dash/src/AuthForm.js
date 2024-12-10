import React, { useState } from 'react';
import Login from './Login';
import Signup from './SignUp';
import './AuthForm.css';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const [formType, setFormType] = useState("login");
    const navigate = useNavigate();

    const toggleFormType = () => {
        setFormType(formType === "login" ? "signup" : "login");
    };

    const handleSignupClick = () => {
        navigate("/signin"); 
    };

    return (
        <div className="auth-form">
            {formType === "login" ? (
                <Login onSwitchToSignup={toggleFormType} />
            ) : (
                <Signup onSwitchToLogin={toggleFormType} />
            )}
            <p>
                {formType === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                <button onClick={handleSignupClick} className="toggle-button">
                    {formType === "login" ? "Sign Up" : "Login"}
                </button>
            </p>
        </div>
    );
};

export default AuthForm;
