import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './Navigation.module.css';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Contact Book
        </Typography>
        <Button color="inherit" component={NavLink} to="/register">
          Register
        </Button>
        <Button color="inherit" component={NavLink} to="/login">
          Login
        </Button>
        <Button color="inherit" component={NavLink} to="/contacts">
          Contacts
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
