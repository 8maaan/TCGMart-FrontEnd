import './firstNavi.css';
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from '../HomePageComponents/HomePage';
import MarketPage from '../MarketComponents/MarketPage';
import LoginPage from '../Login-Register-Components/LoginPage';

export default function FirstNavi(){
    return (
        <>
        <div className="first-navi-main">
            <div className='navi-left'>
                <Link to='/homepage'><h1>TCGMart</h1></Link>
                <Link to='/homepage'><h2>Home</h2></Link>
                <Link to='/marketpage'><h2>Market</h2></Link>
                <h2>Guide</h2>
            </div>
            <div className='navi-right'>
                <Link to='/register'><h2>Login/Register</h2></Link>
            </div>
        </div>
        {/* <div className='for-routes'>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='homepage' element={<HomePage/>}/>
            <Route path='marketpage' element={<MarketPage/>}/>
        </Routes>
        </div> */}
        </>
    );
}