"use client"
import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleRegister = () => {
        // Vous pouvez ajouter ici la logique pour enregistrer le nouvel utilisateur
        console.log("Nouvel utilisateur enregistré :", { firstName, lastName, email });
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <h1>Quill</h1>
            <h2>Register</h2>
            <p>Get started today</p>
            <form>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="firstName">First Name:</label>
                    <br />
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        style={{ padding: '10px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="lastName">Last Name:</label>
                    <br />
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={handleLastNameChange}
                        style={{ padding: '10px' }}
                        required
                    />
                </div>
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
                   
                    Register
                    </button>
            </form>
        </div>
    );
};

export default RegisterPage;
