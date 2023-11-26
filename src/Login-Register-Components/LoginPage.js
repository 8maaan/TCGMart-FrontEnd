import { TextField, Button, Snackbar, Alert } from '@mui/material';
import './RegisterLogin.css';
import { useState } from 'react';
import { checkLoginCredentials } from '../services/apiServices';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const [open, setOpen] = useState(false);
  const handleCloseBlankFields = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const[snackbarInvalid, setSnackbarInvalid] = useState(false);
  const handleCloseInvalid = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarInvalid(false);
  };

  const [snackbarSucess, setSnackbarSuccess] = useState(false)
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarSuccess(false);
  };

  const handleSubmit = async () => {
    if (password.trim() === '' || password.trim() === '') {
      setOpen(true);
      return;
    }

    try{
      const result = await checkLoginCredentials(username, password);
      console.log(result);
      if (result !== -1) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("uid", result);
        setSnackbarSuccess(true);
      } else {
        setSnackbarInvalid(true);
      }
    }catch(error){
      alert('Check Eclipse.');
    }
    
  };

  return (
    <div className="container">
      <div className="fields-container">
        {/* For side background */}
        <div className="side-bg"></div>

        {/* For TextFields */}
        <div className="user-fields">
          <p className="text-signup">Sign In</p>
          <div className="agreement-policy-sentence">
            <p>By continuing, you agree to our User Agreement and Privacy Policy</p>
          </div>
          <TextField
            variant="outlined"
            label="Username"
            name="username"
            size="small"
            value={username}
            onChange={handleUsernameChange}
          />

          <TextField
            type="password"
            variant="outlined"
            label="Password"
            name="password"
            size="small"
            value={password}
            onChange={handlePasswordChange}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Sign In
          </Button>

          <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseBlankFields} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleCloseBlankFields} severity="warning" sx={{ width: '100%' }}>
              Please fill in all fields!
            </Alert>
          </Snackbar>

          <Snackbar open={snackbarInvalid} autoHideDuration={6000} onClose={handleCloseInvalid} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleCloseInvalid} severity="error" sx={{ width: '100%' }}>
              Invalid login credentials, please try again.
            </Alert>
          </Snackbar>

          <Snackbar open={snackbarSucess} autoHideDuration={6000} onClose={handleCloseSuccess} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
              You are successfully logged-in.
            </Alert>
          </Snackbar>

          <p className="text-signin">New to TCGMart? SIGN UP</p>
        </div>
      </div>
    </div>
  );
}

export default App;
