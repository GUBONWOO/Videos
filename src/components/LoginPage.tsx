'use client';
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebaseConfig';
import {
  Container,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import GoogleIcon from '@mui/icons-material/Google'; // Google Icon import

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color
    },
    secondary: {
      main: '#ffffff', // Secondary color
    },
    background: {
      default: '#f5f5f5', // Background color
    },
    text: {
      primary: '#000000', // Primary text color set to black
    },
  },
  shape: {
    borderRadius: 8, // Global border radius
  },
});

const Root = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  backgroundImage: 'url(https://source.unsplash.com/random/1920x1080)', // Replace with the URL of your desired background image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const Paper = styled(Container)(({ theme }) => ({
  maxWidth: 300, // Reduce maxWidth for a smaller box size
  padding: theme.spacing(4),
  backgroundColor: theme.palette.secondary.main,
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  color: theme.palette.text.primary, // Set text color to black
}));

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(3),
});

const LoginButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const handleLoginClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      onLogin();
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Paper>
          <Typography variant='h4' component='h1' gutterBottom>
            Login Page
          </Typography>
          <Typography variant='body1' component='p' gutterBottom>
            Please login using your Google account.
          </Typography>
          <ButtonContainer>
            <LoginButton
              variant='contained'
              onClick={handleLoginClick}
              startIcon={<GoogleIcon />}
            >
              Login with Google
            </LoginButton>
          </ButtonContainer>
        </Paper>
      </Root>
    </ThemeProvider>
  );
};

export default LoginPage;
