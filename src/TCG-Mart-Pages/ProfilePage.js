import { Alert, Button, Snackbar, TextField } from "@mui/material";
import SecondNavi from "../Navigations/secondNavi";
import "../TCG-Mart-CSS-Pages/ProfilePage.css"
import { useEffect, useState, useRef } from "react";
import { getUserProfileInfo, updateUser } from "../services/apiServices";
import { validateUsername, validateEmail, validatePassword, validateMssngrLink, validatePhoneNumber  } from "../TextFieldValidation/UserInfoValidations"
import LoadingComponent from '../Loading/loadingComponent';
import { useNavigate } from "react-router-dom";

export default function ProfilePage(){
    const [userInfo, setUserInfo] = useState([]);

    // Use refs 
    const usernameRef = useRef(null);
    const newPasswordRef = useRef(null);
    const retypePasswordRef = useRef(null);
    const phoneNumRef = useRef(null);
    const emailAddressRef = useRef(null);
    const messengerLinkRef = useRef(null);

    //For TextField errors
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [retypePasswordError, setRetypePasswordError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [mssngrLinkError, setMssngrLinkError] = useState(false);
    
    const [isEdit, setIsEdit] = useState(false);
    useEffect(() => {
        const getUserInfo = async () => {
          const result = await getUserProfileInfo(localStorage.getItem("uid"));
          if (result.success) {
            setUserInfo(result.user);
          }else{
            console.log(result.message);
          }
        };
        getUserInfo();
    }, []);

    const InfoTextField = ({ infoAttribute, type, defaultValue, inputRef, error}) => {  
        return (
          <div className="profile-info-texts">
            <div className="profile-infoAttribute">
              <p>{infoAttribute}</p>
            </div>
            <div className="profile-info-textFields">
              <TextField
                type={type}
                disabled={!isEdit}
                defaultValue={defaultValue}
                size="small"
                inputRef={inputRef}
                error={isEdit && error}  // Show error only when in edit mode
              />
            </div>
          </div>
        );
    };
    const validateInputs = () => {
        const usernameValid = validateUsername(usernameRef.current.value);
        const newPasswordValid = validatePassword(newPasswordRef.current.value);
        const retypePasswordValid = validatePassword(retypePasswordRef.current.value);
        const phoneNumValid = validatePhoneNumber(phoneNumRef.current.value);
        const emailAddressValid = validateEmail(emailAddressRef.current.value);
        const messengerLinkValid = validateMssngrLink(messengerLinkRef.current.value);
      
        // Set the error states based on the validation results
        setUsernameError(!usernameValid);
        setPasswordError(!newPasswordValid);
        setRetypePasswordError(!retypePasswordValid);
        setPhoneError(!phoneNumValid);
        setEmailError(!emailAddressValid);
        setMssngrLinkError(!messengerLinkValid);
        
        console.log(newPasswordRef.current.value);
        console.log(retypePasswordRef.current.value);
        // Return true if all inputs are valid, otherwise return false
        return usernameValid && newPasswordValid && phoneNumValid && emailAddressValid && messengerLinkValid && retypePasswordValid;
    };
    
    const [isLoading, setIsLoading] = useState(false);
    const stopLoading = () =>{
        setIsLoading(false);
    }
    const navigateTo = useNavigate();
    const handleOnClickEdit = async () =>{
        if(isEdit){
            const inputsAreValid = validateInputs();
            if (!inputsAreValid || newPasswordRef.current.value !== retypePasswordRef.current.value) {
                setOpenErrorSnackbar(true);
                return;
            }
            const newUserInfo = {
                username: usernameRef.current.value,
                password: newPasswordRef.current.value,
                phone_num: phoneNumRef.current.value,
                email_address: emailAddressRef.current.value,
                mssngr_link: messengerLinkRef.current.value,
            };
            const updateUserInfo = await updateUser(localStorage.getItem("uid"), newUserInfo);
            if(updateUserInfo.success){
                localStorage.setItem("username", usernameRef.current.value)
                console.log(updateUserInfo.message);
                setIsLoading(true);
            }
            setIsEdit(false);
            setTimeout(() => {
                navigateTo(0);
            }, 2000);
            
        }else{
            setIsEdit(true);
        }
    }

    const handleOnCancel = () => {
        setIsEdit(false);
    }
    
    // For snackbar
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenErrorSnackbar(false);
    };

    return (
       <div className="profile-page-main">
        <SecondNavi/> 
        <div className="profile-page-container">
            <div className="profile-dashboard-container">
                <div className="profile-dashboard">
                    <div className="profile-dashboard-content">
                        <div className="profile-earnings-num">
                            <p>₱ {userInfo.totalEarnings}.00</p>
                        </div>
                        
                        <div className="profile-earnings-text">
                            <p>Total Earnings</p>
                        </div>
                    </div>            
                </div>
                <div className="profile-dashboard">
                    <div className="profile-dashboard-content">
                        <div className="profile-earnings-num">
                            <p>₱ {userInfo.totalPurchases}.00</p>
                        </div>
                        
                        <div className="profile-earnings-text">
                            <p>Total Amount of Purchases</p>
                        </div>
                    </div> 
                </div>
            </div>

            <div className="profile-info-container">
                <div className="profile-info">
                    <InfoTextField
                        infoAttribute={"Username : "}
                        defaultValue={userInfo.username}
                        inputRef={usernameRef}
                        error={usernameError}
                    />
                    <InfoTextField
                        infoAttribute={isEdit ? "New Password: " : "Password: "}
                        defaultValue={userInfo.password}
                        type={"password"}
                        inputRef={newPasswordRef}
                        error={passwordError}
                    />
                    {isEdit && (
                    <InfoTextField
                        infoAttribute={"Re-type Password: "}
                        defaultValue={userInfo.password}
                        type={"password"}
                        inputRef={retypePasswordRef}
                        error={retypePasswordError}
                    />
                    )}
                    <InfoTextField
                        infoAttribute={"Phone Number : "}
                        defaultValue={userInfo.phone_num}
                        inputRef={phoneNumRef}
                        error={phoneError}
                    />
                    <InfoTextField
                        infoAttribute={"Email Address : "}
                        defaultValue={userInfo.email_address}
                        inputRef={emailAddressRef}
                        error={emailError}
                    />
                    <InfoTextField
                        infoAttribute={"Messenger Link : "}
                        defaultValue={userInfo.mssngr_link}
                        inputRef={messengerLinkRef}
                        error={mssngrLinkError}
                    />
                    
                    <div className="profile-info-buttons">
                        <Button 
                            disabled={!isEdit}
                            style={isEdit ? {backgroundColor:'gray', color:'white'} : null} 
                            variant="contained" 
                            sx={{marginTop: isEdit ? '1%' : '3%', marginRight:'1%'}}
                            onClick={()=>{handleOnCancel()}}>Cancel</Button>
                        <Button 
                            style={{backgroundColor:'#FFDF7F', color:'black'}} 
                            variant="contained" 
                            sx={{marginTop: isEdit ? '1%' : '3%', marginLeft:'1%'}}
                            onClick={()=>{handleOnClickEdit()}}>{isEdit ? "Submit": "Edit"}</Button>
                    </div>
                </div>
                <div className="profile-picture-container">
                    <div className="profile-picture-size">
                        <img src="https://i.imgur.com/VNXn3K9.png" alt='card pic' className='profile-image'/>
                    </div>
                </div>
            </div>
            <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={handleSnackBarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleSnackBarClose} severity="warning" sx={{ width: '100%' }}>
                    Please input textfield/s in valid format.
                </Alert>
            </Snackbar>
            {isLoading && <LoadingComponent onClose={stopLoading}/>}
        </div>    
       </div>
    );
}
