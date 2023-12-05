import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function PageNotFound(){
    const nav = useNavigate()
    useEffect(()=>{
        setTimeout(()=>{
            // nav("/",{replace:true,state:{message:"This is from Not Found!"}})
            nav('/');
        },500000)
    },[nav])
    return <>
    <h1>Page Not Found! If you can't find it here, you'll never find it elsewhere!</h1>
    <Link to="/"><button>To Main Page</button></Link>
    </>
}