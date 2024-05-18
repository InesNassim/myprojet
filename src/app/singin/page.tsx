"use client"

import { Link } from 'lucide-react';
import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
    
    const [email, setEmail] = useState<string>('');
    const[password,setPassword] =useState<string>('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleRegister = () => {
        // Vous pouvez ajouter ici la logique pour enregistrer le nouvel utilisateur
        console.log("Nouvel utilisateur enregistré :", { email ,password});
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <h1>Quill</h1>
            <h2>welcome back</h2>
            <p>sing in to continue</p>
            <form>
                
                
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="email">Email:</label>
                    <br />
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        style={{ padding: '10px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="password">password:</label>
                    <br />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{ padding: '10px' }}
                        required
                    />
                </div>
                <button
                    type="button"
                    onClick={handleRegister}
                    style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        border: 'none',
                        fontSize: '16px'
                    }}
                >
                    continue
                </button>
            </form>
            <p>I have an acount</p>
            <Link to="/count" >create one</Link>
        </div>
    );
};

export default RegisterPage;


function setPassword(value: string) {
    throw new Error('Function not implemented.');
}
      