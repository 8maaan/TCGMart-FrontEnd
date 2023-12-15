import React, { useState, useEffect } from "react";
import SecondNavi from "../Navigations/secondNavi";
import "../TCG-Mart-CSS-Pages/ListingsPage.css";
import { getCardsBySellerUid } from "../services/apiServices";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';

export default function ListingsPage() {
  const [cards, setCards] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const activeCards = cards.filter((card) => card.cardStatus === "Active");

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

  const CardHistoryInfo = ({ text, applyColorChange }) => {
    const statusColorMap = {
      Active: 'cornflowerblue',
      Cancelled: 'gray',
      Sold: 'green',
    };
    const textColor = applyColorChange ? (statusColorMap[text] || 'black') : 'black';
    return (
      <div>
        <p style={{ marginBottom: '0.5%', color: textColor }}>{text}</p>
      </div>
    );
  }

  const handleShowHistory = () =>{
    if(showHistory === false){
      setShowHistory(true);
    }else{
      setShowHistory(false);
    }
  }
  

  return (
    <div className="listings-page-main">
      <SecondNavi />
      <div className="listing-section">
        <div className="section-active-listings">
          {/* <p>Active Listings</p> */}
        </div>
      </div>

      <div className="listings-container">
        <div className="listings-not-available">
          {activeCards.length === 0 ? "No Active Cards" : null}
        </div>
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
      <div className="history-section">
        <Button 
          endIcon={<HistoryIcon/>} 
          size="small" 
          onClick={()=>{handleShowHistory()}} sx={{width:'12%'}}>{showHistory ? "Hide History" : "Show History" }</Button>
      </div>

      {showHistory && <div className="">
        {cards.map((card, id) => (
          <div key={id} className="listing-history-container">
              <div className="listing-history-content">
                <div className="listing-history-card-upper">   
                  <div className='card-image-size'>
                    <img src={card.cardImg} alt='card pic' className='card-image'/>
                  </div>            
                </div>
                <div className="listing-history-texts">
                  <h4><CardHistoryInfo text={card.cardTitle}/></h4>
                  <CardHistoryInfo text={card.cardStatus} applyColorChange={true}/>
                  <CardHistoryInfo text={card.timestamp}/>
                </div>
                <div className="listing-history-price">
                  <p>₱ {card.cardPrice}</p>
                </div>
              </div>
          </div>
        ))}
      </div>}

    </div>
  );
}
