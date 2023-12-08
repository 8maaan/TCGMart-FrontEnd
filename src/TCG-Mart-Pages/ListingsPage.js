import React, { useState, useEffect } from "react";
import SecondNavi from "../Navigations/secondNavi";
import "../TCG-Mart-CSS-Pages/ListingsPage.css";
import { getCardsBySellerUid } from "../services/apiServices";
import { Link } from "react-router-dom";

export default function ListingsPage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      const result = await getCardsBySellerUid(localStorage.getItem("uid"));
      if (result.success) {
        setCards(result.card.reverse());
      }else{
        console.log(result.message);
      }
    };
    getCards();
  }, []);

  return (
    <div className="listings-page-main">
      <SecondNavi />
      <div className="listing-section">
        <div className="section-active-listings">
          <p>Active Listings</p>
        </div>
      </div>

      <div className="listings-container">
        {cards.map((card, id) => ( card.cardStatus ==="Active" &&
            <div key={id} className="listings-card-container">
              <Link to={`/cards/${card.cardid}`} key={card.cardid}>
                <div className="card-upper">   
                    <div className='card-image-size'>
                      <img src={card.cardImg} alt='card pic' className='card-image'/>
                    </div>            
                </div>
                <div className="card-lower">
                  <div className="card-lower-title">
                    <p>{card.cardTitle}</p>
                  </div> 
                  <div className="card-lower-price">     
                    <p>₱ {card.cardPrice}</p>
                  </div>
                </div>
              </Link>        
            </div>
        ))}
      </div>
    </div>
  );
}
