import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Submitting form with:', { email, password }); // Log pentru verificare
    try {
      const response = await loginUser({ email, password });
      console.log('Response:', response); // Log pentru verificare
      setError(null);
      navigate('/contacts');
    } catch (error) {
      console.error('Login error:', error); // Log pentru eroare
      setError('A apărut o eroare la autentificare');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit} className="loginForm">
        {error && <Alert severity="error">{error}</Alert>}
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
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
