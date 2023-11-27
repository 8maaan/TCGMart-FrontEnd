import { Link, Route, Routes } from 'react-router-dom';
import LoginPage from '../TCG-Mart-Pages/LoginPage';
import FirstNavi from './firstNavi';
import HomePage from '../TCG-Mart-Pages/HomePage';
import RegisterPage from '../TCG-Mart-Pages/RegisterPage';
import MarketPage from '../TCG-Mart-Pages/MarketPage';

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