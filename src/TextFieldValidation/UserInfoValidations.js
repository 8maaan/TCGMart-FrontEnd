import { checkUsernameValidity } from "../services/apiServices";

export const usernameExists = async (user) => {
    const result = await checkUsernameValidity(user);
    console.log(result.success);
    return result.success;
};

export const validateUsername = (input) => {
    return input.length >= 5;   
}

export const validatePassword = (input) => {
    // Check if the password meets the criteria (min 8 characters, combination of uppercase and lowercase, with special character)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(input);
};

export const validatePhoneNumber = (input) => {
    // Check if it's a number and has exactly 11 digits
    return /^\d{11}$/.test(input);
};

export const validateEmail = (input) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
};

export const validateMssngrLink = (input) => {
    // Check if it's a Messenger link with more than 4 characters after "http://m.me/"
    return /^http:\/\/m\.me\/.{5,}$/.test(input);
};