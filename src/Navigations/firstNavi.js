import './firstNavi.css';
import { Link } from 'react-router-dom';


export default function FirstNavi(){
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = localStorage.getItem("username");
    return (
        <>
        <div className="first-navi-main">
            <div className='navi-left'>
                <Link to='/'><h1>TCGMart</h1></Link>
                <Link to='/'><h2>Home</h2></Link>
                <Link to='/marketpage'><h2>Market</h2></Link>
                <h2>Guide</h2>
            </div>
            <div className='navi-right'>
                {isLoggedIn === 'true' ? (
                    <>
                        <Link to='/profile'><h2>{username}</h2></Link>
                        <Link to='/sellcard'><h2>Sell Card</h2></Link>
                        <Link to='/listings'><h2>Listings</h2></Link>
                    </>
                ) : (
                    <Link to='/login'><h2>Login/Register</h2></Link>
                )}
            </div>
        </div>
        </>
    );
}