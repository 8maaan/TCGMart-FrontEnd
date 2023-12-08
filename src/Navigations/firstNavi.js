import './firstNavi.css';
import { Link } from 'react-router-dom';

export default function FirstNavi() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = localStorage.getItem("username");

    return (
        <>
            <div className="first-navi-main">
                <div className='navi-left'>
                    <Link to='/'><h1>TCGMart</h1></Link>
                    <Link to='/'><h3>Home</h3></Link>
                    <Link to='/market'><h3>Market</h3></Link>
                    <h3>Guide</h3>
                </div>
                <div className='navi-right'>
                    {isLoggedIn === 'true' ? (
                        <>
                            <Link to='/listings'><h3>Listings</h3></Link>
                            <Link to='/sellcard'><h3>Sell Card</h3></Link>
                            <Link to='/profile' className='navi-username-area'>
                                <div className='navi-profile-picture'>
                                    <img src='https://i.imgur.com/BFPW8Kw.png' alt="user img" className='user-profile-picture' />
                                </div>
                                <h3>{username}</h3>
                            </Link>
                        </>
                    ) : (
                            <Link to='/login'><h3>Login/Register</h3></Link>
                        )}
                </div>
            </div>
        </>
    );
}
