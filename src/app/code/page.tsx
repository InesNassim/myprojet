
"use client"
import React from 'react';

interface SignupFormProps {
  email: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ email }) =>{
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return ( 
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontWeight: 'bold' }}>Quill</h1>
      <p>To finish signing up, enter the code we just sent to <strong>{email}</strong>.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" id="code" name="code" placeholder="Enter code" style={{ margin: 'auto', display: 'block' }} />
        <button type="submit"style={{ backgroundColor: 'blue', color: 'white', margin: 'auto', display: 'block' }}>Continue</button>
      </form>
    </div>
  )
};
