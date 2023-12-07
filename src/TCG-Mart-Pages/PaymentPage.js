import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Stripe/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import "../TCG-Mart-CSS-Pages/Stripe.css"
import "../TCG-Mart-CSS-Pages/PaymentPage.css"
import { CatchingPokemonTwoTone } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { getCardByCardID, getSellerDetails } from '../services/apiServices';

function PaymentPage() {
  const { cardId } = useParams();
  const [card, setCard] = useState({});
  const [seller, setSeller] = useState({});

  // Stripe
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getCardInfo = async () => {
      try {
        const result = await getCardByCardID(cardId);
        // console.log(result);
        setCard(result);
      } catch (error) {
        console.log(error);
      }
    };
    getCardInfo();
  }, [cardId]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const result = await getSellerDetails(card.uid);
        setSeller(result);
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    // Check if card.uid is present
    if (card.uid) {
      getUserInfo();
    }
  }, [card.uid]);

  useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div className="container">
      <div className="content-container">
        <div className="preview">
          <div className="preview-texts">
            <p style={{fontSize:'20px', fontWeight: 500}}><CatchingPokemonTwoTone style={{color:'blue', fontSize:'16px'}}/> TCGMart, LLC</p>
            <br></br>
            <p style={{fontSize:'16px', color: 'gray'}}>Pay {seller.username}</p>
            <p style={{fontSize:'24px', fontWeight: 600, color:'#636363'}}>₱ {card.cardPrice}.00</p>
            <br></br>
            <p style={{fontSize:'16px', fontWeight: 600, color:'#636363'}}>Order Details:</p>
            <p style={{fontSize:'12px', color: 'gray'}}>
              "{card.cardTitle}" (&nbsp;
              {card.cardCondition} - &nbsp;
              {card.cardNumRarity} - &nbsp;
              {card.cardTypeHPStage} )
            </p>
            <img 
              src={card.cardImg} 
              alt="card-pic" 
              width="130" 
              height="180"
              style={{marginTop:'5%'}}/>   
              <br></br>         
              <br></br>
              <p style={{ fontSize: '10px', color: 'gray' }}>
                Powered by <span style={{ fontWeight: '700', color:'purple' }}>Stripe</span> &nbsp; | &nbsp;&nbsp; 
                <span style={{ fontWeight: 'normal' }}>Terms</span> &nbsp; 
                <span style={{ fontWeight: 'normal' }}>Policy</span>
              </p>
              
          </div>
        </div>
        <div className="checkout">
          {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm cardSeller={seller.uid} cardBuyer={localStorage.getItem("uid")} card={card}/>
            </Elements>
          )}
        </div>
      </div>
    </div>   
  );
}

export default PaymentPage;
