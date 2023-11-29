import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function PageNotFound(){
    const navigateTo = useNavigate();
    const logout = () =>{
        localStorage.setItem("isLoggedIn", false);
        localStorage.removeItem("uid");
        localStorage.removeItem("username");
        window.history.replaceState(null, null, '/');
        navigateTo("/");
    }

    return (
        <Button variant="contained" onClick={() => {logout()}}>Logout</Button>
    );
}