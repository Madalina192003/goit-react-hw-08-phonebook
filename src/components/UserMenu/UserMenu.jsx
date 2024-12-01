import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/api';
import { Button, Typography } from '@mui/material';
import './UserMenu.module.css';

const UserMenu = ({ email }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="userMenu">
      <Typography>{email}</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
