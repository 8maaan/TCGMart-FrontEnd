import { Link, Route, Routes } from 'react-router-dom';
import LoginPage from '../Login-Register-Components/LoginPage';
import FirstNavi from './firstNavi';
import HomePage from '../HomePageComponents/HomePage';
import RegisterPage from '../Login-Register-Components/RegisterPage';
import MarketPage from '../MarketComponents/MarketPage';

export default function MainRoute(){
    return (
        <>
        <div>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='login' element={<LoginPage/>}/>
            <Route path='register' element={<RegisterPage/>}/>
            <Route path='marketpage' element={<MarketPage/>}/>
            <Route path='homepage' element={<HomePage/>}/>
        </Routes>
        </div>
        </>
    );
}