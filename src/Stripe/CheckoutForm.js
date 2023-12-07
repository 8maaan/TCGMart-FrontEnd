import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import "../TCG-Mart-CSS-Pages/Stripe.css"
import { insertTransaction, updateCardStatus } from '../services/apiServices';
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({cardBuyer, cardSeller, card}) {
  const [transaction] = useState({
    cardSeller: cardSeller,
    cardBuyer: cardBuyer,
    card: card,
    transactionAmount: card.cardPrice,
    timeStamp: new Date().toLocaleString()
  });
  const toNavigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/`,
      },
      redirect: 'if_required'
    });

    if(paymentIntent && paymentIntent.status === "succeeded"){
      const insertResult = await insertTransaction(transaction);
      const updateResult = await updateCardStatus(transaction.card.cardid, "Sold");
      if(!insertResult.success){
        console.log(insertResult.message)
      }else if(!updateResult.success){
        console.log(updateResult.message);
      }else{
        toNavigate("/paymentsuccesspage");
      }
    }

    if (error && (error.type === "card_error" || error.type === "validation_error")) {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="stripe-body">
      <div className="stripe-main">
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" />
          <button disabled={isProcessing || !stripe || !elements} id="submit">
            <span id="button-text">
              {isProcessing ? "Processing ... " : "Pay now"}
            </span>
          </button>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </form>
      </div>
    </div>
  );
}
