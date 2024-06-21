'use client';
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Main: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div style={{ top: 10, right: 10 }}>
      <Avatar
        src={auth.currentUser?.photoURL || ''}
        alt='User Avatar'
        sx={{ width: 40, height: 40, cursor: 'pointer' }}
        onClick={handleAvatarClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box p={2} display='flex' flexDirection='column' alignItems='center'>
          <Typography variant='body2' color='textPrimary' fontWeight='bold'>
            {auth.currentUser?.displayName || 'User'}
          </Typography>
          <Button
            variant='contained'
            color='error'
            size='small'
            onClick={handleLogout}
            sx={{ mt: 1 }}
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default Main;
