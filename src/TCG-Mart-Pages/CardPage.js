import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCardByCardID, getSellerDetails } from '../services/apiServices';
import '../TCG-Mart-CSS-Pages/CardPage.css';
import FirstNavi from '../Navigations/firstNavi';

const CardPage = () => {
  const { cardId } = useParams();
  const [card, setCard] = useState({});
  const [seller, setSeller] = useState({});

  useEffect(() => {
    const getCardInfo = async () => {
      try {
        const result = await getCardByCardID(cardId);
        console.log(result);
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
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    // Check if card.uid is present
    if (card.uid) {
      getUserInfo();
    }
  }, [card.uid]);

  return (
    <div>
      <FirstNavi />
      <div className="card-page-navi"></div>
      <h1>Card Details</h1>
      <p>Card ID: {cardId}</p>
      <p>{card.cardTitle}</p>
      <p>{card.cardImg}</p>
      <p>{card.cardCondition}</p>
      <p>{card.cardNumRarity}</p>
      <p>{card.cardTypeHPStage}</p>
      <p>{card.cardPrice}</p>
      <p>{card.cardDescription}</p>
      <p>{card.uid}</p>
      <br></br>

      <h1>User Info</h1>
      <p>{seller.username}</p>
      <p>{seller.mssngr_link}</p>
    </div>
  );
};

export default CardPage;
