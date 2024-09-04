import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.access);
            setUser(username);

            if (username === 'bank_staff') {
                navigate(`/bank-personnel`);
            } else if (username === 'customer') {
                navigate(`/loan-customer`);
            } else if (username === 'provider') {
                navigate(`/loan-provider`);
            } else {
                setErrorMessage('User role not recognized.');
            }
        } catch (error) {
            setErrorMessage('Login failed, please check your credentials.');
        }
    };

    return (
        <div>
            <div class= "login-header">
            <h2> Online loaning system </h2>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
