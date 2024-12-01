import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import './Register.module.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Submitting form with:', { name, email, password }); // Log pentru verificare
    try {
      const response = await registerUser({ name, email, password });
      console.log('Response:', response); // Log pentru verificare
      setSuccess('Utilizator creat cu succes!');
      setError(null);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error); // Log pentru eroare
      setError('A apărut o eroare la înregistrare');
      setSuccess(null);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit} className="registerForm">
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <TextField
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          margin="normal"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
