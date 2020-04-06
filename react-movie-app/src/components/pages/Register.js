import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../context/authContext/AuthContext';
import './pages.css';

const Register = (props) => {
    const { registerUser, userAuth, errors, setError, clearError, userRegistered } = useContext(AuthContext);

    //useEffect code is for : Once loggedin succesfully it will redirect to home page
    useEffect(() => {
        console.log("userRegistered in register = "+userRegistered);
        if(userRegistered){
            props.history.push('/');
        }
    },[userRegistered,props.history])

    const [user, setUser] = useState({ name: '', email: '', password: '', password2: '' });
    const { name, email, password, password2 } = user;

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
        clearError();
    }

    const submit = e => {
        e.preventDefault();
        if (password !== password2) {
            setError({ msg: 'password doesnt match' });
        } else {
            //this will make backend call
            registerUser({ name, email, password });
            console.log("After register and before clear");
            clearError();
        }
    }
    return (
        
            <div className="register">
                <h1>Sign Up</h1>
                <form onSubmit={submit}>
                    <input type="text" name="name" placeholder="name" value={name} onChange={handleChange} />
                    <input type="email" name="email" placeholder="email" value={email} onChange={handleChange} />
                    <input type="password" name="password" placeholder="password" value={password} onChange={handleChange} />
                    <input type="password" name="password2" placeholder="confirm password" value={password2} onChange={handleChange} />
                    <input type="submit" value="Sign Up" className="btn" />
                </form>
                <div className="question">
                    {errors !== null && <button className="danger">
                        {errors.msg ? errors.msg : errors.error[0].msg}
                        <span onClick={() => clearError()}>X</span></button>}
                    <p>Already have an account? {" "} <Link to="/">Login</Link></p>
                </div>
            </div>
       
    )
}



export default Register