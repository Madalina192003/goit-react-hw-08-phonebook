import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { Container, CircularProgress } from '@mui/material';
import './App.module.css';

const Register = lazy(() => import('../Register/Register'));
const Login = lazy(() => import('../Login/Login'));
const Contacts = lazy(() => import('../Contacts/Contacts'));

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Router>
      <Navigation />
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/contacts"
              element={
                isAuthenticated ? <Contacts /> : <Navigate to="/login" />
              }
            />
            <Route path="*" element={<Navigate to="/register" />} />
          </Routes>
        </Suspense>
      </Container>
    </Router>
  );
};

export default App;
