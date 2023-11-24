import axios from "axios";

// apiServices.js

export const checkUsernameValidity = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8080/tcg/users/checkUserValidity?username=${username}`);
      return { success: response.data }; // Assuming the server returns true or false
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

export const insertUser = async (user) => {
    try {
      await axios.post("http://localhost:8080/tcg/users/insertUser", user);
      return { success: true, message: "Registration Successful." };
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: "Error. Please check console." };
    }
};

