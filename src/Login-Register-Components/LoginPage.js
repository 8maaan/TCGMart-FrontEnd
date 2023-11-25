
import { TextField, Button } from '@mui/material';
import './RegisterLogin.css'
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

    const handleSubmit = async () => {
        if(password.trim() === '' || password.trim() === ''){
            alert('Please fill in all fields.');
            return;
        }

        const result = await checkLoginCredentials(username, password);
        alert(result.success ? 'You have successfully logged-in.' : 'Invalid log-in credentials, please try again.');
    };

    return (
        <div className="container">
            <div className="fields-container">

                {/* For side background */}
                <div className="side-bg">
                </div>

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

                    <Button variant="contained" onClick={() => { handleSubmit();}}>Sign In</Button>

                    <p className="text-signin">New to TCGMart? SIGN UP</p>
                </div>
            </div>
        </div>
    );
}

export default App;
