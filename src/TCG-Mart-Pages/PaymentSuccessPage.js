import { useParams } from "react-router-dom"
import SecondNavi from "../Navigations/secondNavi"
import '../TCG-Mart-CSS-Pages/PaymentSuccessPage.css'
import { getSellerDetails } from "../services/apiServices";
import { useState, useEffect } from "react";

export default function PaymentSuccessPage(){
    const { sellerId } = useParams();
    const [seller, setSeller] = useState([]);
    useEffect(() => {
        const getCards = async () => {
            const result = await getSellerDetails(sellerId);
            setSeller(result)
        };
        getCards();
    }, [sellerId]);
    // console.log(seller)
    return(
        <div className="bg">    
            <SecondNavi/>
            <div className="success-container">
                <div className="success-content-container">
                    <div className="congratulations-message-container">
                        <p>Congratulations on your purchase! 🎉</p><br></br>
                    </div>
                    <br></br>
                    <div className="reminder-container">
                        <p>Be sure to contact {seller.username} right away</p>
                        <p>{seller.mssngr_link}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}