import { Link } from "react-router-dom";
import SecondNavi from "../Navigations/secondNavi";
import '../TCG-Mart-CSS-Pages/LandingPage.css'

export default function LandingPage(){

    return (

        <>
        
            {/* navigator */}
            <SecondNavi />

            {/* landing page main */}
            <div className="landing-main">

                {/* the main texts or the main message */}
                <div className="main-text">

                    <h1>Epic Battles Begin Here: Your Ultimate Trading Card Source</h1>

                    <p>Explore a vast collection of rare cards, build powerful decks, and dominate the game like never before. Welcome to the home of trading card enthusiasts.</p>

                    <Link to='/home'><button>Shop Now</button></Link>

                </div>

                {/* big product picture that is shown on the right*/}
                <div className="main-picture">
                    
                    <img src='https://i.imgur.com/L0hQ6YP.png' alt="product img"/>

                </div>

            </div>

            {/* about us */}
            <div className="about-us-main">

                {/* title box/bar */}
                <div className="au-title-bar">

                    <h2>About Us</h2>

                </div>

                {/* profiles */}
                <div className="dev-profile-box">

                    {/* about us profile picture */}
                    <div className="dev-pic">

                        <img src="https://i.imgur.com/9rg6WMh.png" alt="usjr graduation img of john randolf"/>

                    </div>

                    {/* about us name and motto */}
                    <div className="dev-texts">

                        <h3>John Randolf Ribo</h3>

                        <h4>Ex-F.A.N.G Senior Software Engineer</h4>

                        <p>"How to center a div? 😳"</p>

                    </div>

                </div>
                <div className="dev-profile-box">

                    {/* about us profile picture */}
                    <div className="dev-pic">

                        <img src="https://i.imgur.com/nj6IYve.png" alt="outdoor img of john carl"/>

                    </div>

                    {/* about us name and motto */}
                    <div className="dev-texts">

                        <h3>John Carl Sabejon</h3>

                        <h4>Programmer</h4>

                        <p>"Strive for Excellence, Embrace Innovation"</p>

                    </div>

                </div>

            </div>
        
        </>

    );

}