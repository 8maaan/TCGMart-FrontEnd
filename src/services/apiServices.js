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
    throw new Error('Error, could not find user.', error);
  }
}

// Insert/Create card
export const insertCard = async (card) => {
  try {
    await axios.post("http://localhost:8080/tcg/card/insertCard", card);
    return { success: true, message: "Card Successfuly listed" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: `Error, please check console. ${error}` };
  }
}

// Insert transaction history
export const insertTransaction = async (transaction) => {
  try {
    await axios.post("http://localhost:8080/tcg/transactions/insertTransaction", transaction);
    return { success: true, message: "Transaction successfully recorded." };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: `Error, please check console. ${error}` };
  }
}

export const getTransactionByBuyerUid = async (uid) => {
  try{
    const response = await axios.get(`http://localhost:8080/tcg/transactions/getTransactionByBuyerUid?uid=${uid}`);
    return {transaction: response.data, success: true, message: `successfully fetched transactions based on buyer uid. `}
  }catch (error) {
    return {success: false, message: `${error}`}
  }
}

// Change card status
export const updateCardStatus = async (cardid, reason) =>{
  try{
    await axios.put(`http://localhost:8080/tcg/card/removecard?cardid=${cardid}&reason=${reason}`);
    return { success: true, message: `Card status has successfully been changed to ${reason}`}
  }catch (error) {
    return {sucess: false, message: `${error}`}
  }
}

// Get Cards by status *Active*
export const getAllActiveCards = async () => {
  try{
    const  response = await axios.get(`http://localhost:8080/tcg/card/getAllActiveCards`);
    return {card: response.data, success: true, message: `successfully fetched cards with active status. `}
  }catch (error) {
    return {success: false, message: `${error}`}
  }
}

//Get cards info by seller uid
export const getCardsBySellerUid = async (uid) => {
  try{
    const  response = await axios.get(`http://localhost:8080/tcg/card/getCardBySellerUid?uid=${uid}`);
    return {card: response.data, success: true, message: `successfully fetched cards based on seller uid. `}
  }catch (error) {
    return {success: false, message: `${error}`}
  }
}

//Update card details
export const updateCard = async(cardid, card) => {
  try {
    await axios.put(`http://localhost:8080/tcg/card/updateCard?cardid=${cardid}`, card);
    return { success: true, message: 'Successfully updated Card details.' }
  } catch (error) {
    return { success: false, message: `${error}` }
  }
}

//Get user profile info
export const getUserProfileInfo = async(uid) => {
  try{
    const response = await axios.get(`http://localhost:8080/tcg/users/getUserProfileInfo?uid=${uid}`);
    return {user: response.data, success: true, message: 'Successfully fetched User info.'}
  }catch(error){
    return {success: false, message: `${error}`}
  }
}

//Update user profile info
export const updateUser = async(uid, user) => {
  try {
    await axios.put(`http://localhost:8080/tcg/users/updateUser?uid=${uid}`, user);
    return { success: true, message: 'Successfully updated User info.' }
  } catch (error) {
    return { success: false, message: `${error}` }
  }
}

export const updateUserDashboard = async(uid, type, amount) => {
  try {
    await axios.put(`http://localhost:8080/tcg/users/updateUserDashboard?uid=${uid}&type=${type}&amount=${amount}`);
    return { success: true, message: 'Successfully updated User dashboard info.' }
  } catch (error) {
    return { success: false, message: `${error}` }
  }
}
