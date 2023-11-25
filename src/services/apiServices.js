import axios from "axios";

// For checking if username exists or not
export const checkUsernameValidity = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8080/tcg/users/checkUserValidity?username=${username}`);
      return { success: response.data }; // Assuming the server returns true or false
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

export const checkLoginCredentials = async(username, password) => {
  try {
    const response = await axios.get(`http://localhost:8080/tcg/users/checkLoginCredentials?username=${username}&password=${password}`);
    return { success: response.data }
  }catch (error) {
    console.log(error);
  }
}
