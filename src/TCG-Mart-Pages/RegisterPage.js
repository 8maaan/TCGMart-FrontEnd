
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import '../TCG-Mart-CSS-Pages/RegisterLogin.css'
import { useEffect, useState } from 'react';
import { insertUser, checkUsernameValidity } from '../services/apiServices';
import { Link, useNavigate } from 'react-router-dom';


export default function RegisterPage() {

    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
        navigate('/');
        }
    }, [navigate]);

    const [user, setUser] = useState({
        username: "",
        password: "",
        phone_num: "",
        email_address: "",
        mssngr_link: ""
    });

    const [retypePassword, setRetypePassword] = useState('');
    
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [retypePasswordError, setRetypePasswordError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [mssngrLinkError, setMssngrLinkError] = useState(false);

    const usernameExists = async () => {
        const result = await checkUsernameValidity(user.username);
        console.log(result.success);
        return result.success;
    };
    
    const validateUsername = (input) => {
        return input.length >= 5;   
    }

    const validatePassword = (input) => {
        // Check if the password meets the criteria (min 8 characters, combination of uppercase and lowercase, with special character)
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        return passwordRegex.test(input);
    };

    const validatePhoneNumber = (input) => {
        // Check if it's a number and has exactly 11 digits
        return /^\d{11}$/.test(input);
    };
    
    const validateEmail = (input) => {
        // Regular expression for a simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input);
    };

    const validateMssngrLink = (input) => {
        // Check if it's a Messenger link with more than 4 characters after "http://m.me/"
        return /^http:\/\/m\.me\/.{5,}$/.test(input);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
            setUser((prevUser) => ({
                ...prevUser,
                [name]: value
        }));

        // Validation based on the field name
        switch (name) {
            case "username":
              setUsernameError(!validateUsername(value));
              break;
            case "phone_num":
              setPhoneError(!validatePhoneNumber(value));
              break;
            case "email_address":
              setEmailError(!validateEmail(value));
              break;
            case "password":
              setPasswordError(!validatePassword(value));
              break;
            case "mssngr_link":
              setMssngrLinkError(!validateMssngrLink(value));
              break;
            default:
              break;
        }
    };

    const handleRetypePasswordChange = (event) => {
        const value = event.target.value;
        setRetypePassword(value);
        setRetypePasswordError(value !== user.password);
    };

    const clearUserValues = () => {
        setUser({
            username: '',
            password: '',
            phone_num: '',
            email_address: '',
            mssngr_link: ''
        });
    };

    const isEmpty = (value) => value.trim() === '';
    const hasError = (value, error) => isEmpty(value) || error;

    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const handleSubmit = async () => {
        if (
            hasError(user.username, usernameError) ||
            hasError(user.password, passwordError) ||
            hasError(user.phone_num, phoneError) ||
            hasError(user.email_address, emailError) ||
            hasError(user.mssngr_link, mssngrLinkError) ||
            hasError(retypePassword, retypePasswordError)
        ) {
            // alert('Please fill in all required fields and fix errors.');
            setOpen(true);
            return;
        }

        const checkUser =  await usernameExists();
        if(checkUser === false){
            const result = await insertUser(user);
            if(result.success){
                alert(result.message);
            }else{
                alert(result.message);
            }
            clearUserValues();
            setRetypePassword('');
        }else{
            alert(`Username ${user.username} already exists`)
        }    
    };

    return (
        <div className="container">
            <div className="fields-container">
            {/* For side background */}
            <div className="side-bg">
            </div>
            {/* For TextFields */}
            <div className="user-fields">
                <p className="text-signup">Sign Up</p>
                <div className="agreement-policy-sentence">
                    <p>By continuing, you are setting up a TCGMart account and agree to our User Agreement and Privacy Policy.</p>
                </div>
                <TextField
                    variant="outlined"
                    label="Username"
                    name="username"
                    size="small"
                    value={user.username}
                    onChange={handleChange}
                    error={usernameError}
                    helperText={usernameError ? 'Username must be at least 5 characters long' : ''}
                />

                <TextField
                    type="password"
                    variant="outlined"
                    label="Password"
                    name="password"
                    size="small"
                    value={user.password}
                    onChange={handleChange}
                    error={passwordError}
                    helperText={passwordError ? 
                        'min of 8 characters, combination of uppercase and lowercase, with special character/s' : ''}
                />
                <TextField
                    type="password"
                    variant="outlined"
                    label="Retype Password"
                    name="retypePassword"
                    size="small"
                    value={retypePassword}
                    onChange={handleRetypePasswordChange}
                    error={retypePasswordError}
                    helperText={retypePasswordError ? 'Passwords do not match' : ''}
                />

                {/* Phone Number */}
                <TextField
                    type="tel" variant="outlined"
                    label="Phone Number"
                    name="phone_num"
                    size="small"
                    value={user.phone_num}
                    onChange={handleChange}
                    error={phoneError}
                    helperText={phoneError ? 'Invalid phone number format' : ''}
                />
                {/* Email */}
                <TextField
                    type="email"
                    variant="outlined"
                    label="Email Address"
                    name="email_address"
                    size="small"
                    value={user.email_address}
                    onChange={handleChange}
                    error={emailError}
                    helperText={emailError ? 'Invalid email format' : ''}
                />

                <TextField
                    type="text"
                    variant="outlined"
                    label="Messenger Link"
                    name="mssngr_link"
                    size="small"
                    value={user.mssngr_link}
                    onChange={handleChange}
                    error={mssngrLinkError}
                    helperText={mssngrLinkError ? 'Invalid Messenger link format' : ''}
                />

                <Button variant="contained" onClick={() => { handleSubmit();}}>Sign Up</Button>

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                        Please fill in all fields and input valid formats.
                    </Alert>
                </Snackbar>

                <p className="text-signin">Already have an account? <Link to="/login">SIGN IN</Link></p>
            </div>
            </div>
        </div>
    );
}

