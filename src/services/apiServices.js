import axios from "axios";

// For checking if username exists or not
export const checkUsernameValidity = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8080/tcg/users/checkUserValidity?username=${username}`);
      return { success: response.data }; 
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

// For creating/registering new user
export const insertUser = async (user) => {
    try {
      await axios.post("http://localhost:8080/tcg/users/insertUser", user);
      return { success: true, message: "Registration Successful." };
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: "Error. Please check console." };
    }
};

// For checking if inputted username and password matches
export const checkLoginCredentials = async(username, password) => {
  try {
    const response = await axios.get(`http://localhost:8080/tcg/users/checkLoginCredentials?username=${username}&password=${password}`);
    return response.data;
  }catch (error) {
    throw new Error('Error checking login credentials.');
  }
}

// Get card details using card id
export const getCardByCardID = async(cardid) => {
  try{
    const response = await axios.get(`http://localhost:8080/tcg/card/getCardByCardId?cardid=${cardid}`);
    return response.data; 
  }catch (error) {
    throw new Error('Error, could not find  card.', error);
  }
}

// Get seller details using uid
export const getSellerDetails = async(uid) => {
  try{
    const response = await axios.get(`http://localhost:8080/tcg/users/getUserById?uid=${uid}`);
    return response.data; 
  }catch (error) {
    throw new Error('Error, could not find  card.', error);
  }
}