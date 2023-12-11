import { useState } from 'react';
import './secondNavi.css';
import { Link, useNavigate } from 'react-router-dom';
import {  Divider, Menu, MenuItem, } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaidIcon from '@mui/icons-material/Paid';
import LogoutIcon from '@mui/icons-material/Logout';
import {ConfirmationDialog} from '../Dialogues/Dialogues';
import LoadingComponent from '../Loading/loadingComponent';

const SecondNavi = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = localStorage.getItem("username");

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [isLoading, setIsLoading] = useState(false);
    const stopLoading = () => {
        setIsLoading(false);
    };
    const navigateTo = useNavigate();
    const [openDialogue, setOpenDialogue] = useState(false);
    const [confirmationStatus, setConfirmationStatus] = useState(false);
    const handleOpenDialog = () => {
        setOpenDialogue(true);
    };
    const handleConfirmationDialogClose = (confirmed) => {
        setOpenDialogue(false);
        setConfirmationStatus(confirmed);
        console.log(confirmationStatus);

        if (confirmed) {
            setIsLoading(true);
            setTimeout(() => {
                localStorage.setItem("isLoggedIn", false);
                localStorage.removeItem("uid");
                localStorage.removeItem("username");
                window.history.replaceState(null, null, '/');
                navigateTo("/");
                navigateTo(0);
            }, 2000);    
        }
    };

    return(
        <div className="banner-container">
            <div className="first-navi-main">
                <div className='navi-left'>
                    <Link to='/home'><h1>TCGMart</h1></Link>
                    <Link to='/home'><h3>Home</h3></Link>
                    <Link to='/market'><h3>Market</h3></Link>
                    <a 
                        href='https://docs.google.com/document/d/1P5gO8Srsja9ICc3ctdL7REHqzHX0NU7v_OyJf09HzoQ/edit?usp=sharing'
                        target="_blank" 
                        rel="noopener noreferrer">
                        <h3>Guide</h3>
                    </a>
                </div>
                <div className='navi-right'>
                    {isLoggedIn === 'true' ? (
                        <>
                            <Link to='/listings'><h3>Listings</h3></Link>
                            <Link to='/sellcard'><h3>Sell Card</h3></Link>
                            <div className='navi-username-area'>
                                <h3
                                    onClick={handleClick}
                                >
                                    {/* <Avatar sx={{ width: 32, height: 32 }}>{username[0]}</Avatar> */}
                                    {username}
                                </h3>
                                
                            </div>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                    },
                                    '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                    },
                                },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <Link to ='/profile'>
                                    <MenuItem onClick={handleClose}>
                                        <AccountCircleIcon style={{fill: "#0075BE"}}/>  &nbsp; Profile
                                    </MenuItem>

                                </Link>
                                <MenuItem onClick={handleClose}>
                                    <PaidIcon style={{fill: "#0075BE"}}/>  &nbsp; Transactions
                                </MenuItem>
                                <Divider/>
                                <MenuItem onClick={()=>{handleClose(); handleOpenDialog();}}>
                                    <LogoutIcon style={{fill: "#0075BE"}}/>  &nbsp; Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                            <Link to='/login'><h3>Login/Register</h3></Link>
                        )}
                </div>
                {openDialogue && <ConfirmationDialog status={true} onClose={handleConfirmationDialogClose} title={"Are you sure you want to logout?"} />}
                {isLoading && <LoadingComponent onClose={stopLoading}/>}
            </div>
        </div>
    );
}

export default SecondNavi;
