import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCardByCardID, getSellerDetails } from '../services/apiServices';
import '../TCG-Mart-CSS-Pages/CardPage.css';
import SecondNavi from '../Navigations/secondNavi';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

  const muicolor = createTheme({
    palette: {
      lightbluebutton: {
        main: '#3196F3',
        contrastText: '#FFFFFF',
      },
      palebluebutton: {
        main: '#D4EDFF',
        contrastText: '#3196F3',
      },
    },
  })

  return (
    <div>
      <SecondNavi />
      <ThemeProvider theme={muicolor}>
      <div className='card-page-main'>
      <div className='card-page-body'>
        <div className='card-details-upper'>
          <div className='card-picture' style={{backgroundImage: `url(${card.cardImg})`}}></div>
          <div className='card-details'>
            <h2 style={{marginLeft:'8%'}}>{card.cardTitle}</h2>
            <div className='card-attributes'>
              <div className='card-attributes-left'>
                <p>Card Condition:</p>
                <p>Card Number/Rarity:</p>
                <p>Card Type/HP/Stage:</p>
              </div>
              <div className='card-attributes-right'>
                <p>{card.cardCondition}</p>
                <p>{card.cardNumRarity}</p>
                <p>{card.cardTypeHPStage}</p>
              </div>
            </div>
            <div className='card-transaction'>
              <div className='cardpage-price'>
                <p>Price: </p>
                <p className='card-value'>&#8369; {card.cardPrice}</p>
              </div>
              <div className='buttons-area'>
                <Button variant="contained" 
                color="lightbluebutton"
                style={{boxSizing: 'border-box',
                  padding: '10px 0px 10px 0px',
                  width: '160px',
                  height: '50px'}}
                sx={{borderRadius: '15px'}}>Buy Now</Button>
                <Button variant="contained" 
                color="palebluebutton"
                style={{boxSizing: 'border-box',
                  padding: '10px 0px 10px 0px',
                  width: '160px',
                  height: '50px'}}
                sx={{borderRadius: '15px'}}>Contact Seller</Button>
              </div>
            </div>
          </div>
          <div className='seller-info'>
            <h3>Seller Information</h3>
            <div className='seller-username'>
              <AccountCircleIcon sx={{ fontSize: '35px' }}/>
              <h3 className='seller-username-h3'>{seller.username}</h3>
            </div>
          </div>
        </div>
        <div className='card-details-lower'>
          <div className='description-box'>
            <p className='description-title'>Description</p>
            <br/>
            <p>{card.cardDescription}</p>
          </div>
        </div>
        {/* <h1>Card Details</h1>
        <p>Card ID: {cardId}</p>
        <p>{card.uid}</p>
        <br></br>

        <h1>User Info</h1>
        <p>{seller.username}</p>
        <p>{seller.mssngr_link}</p> */}
      </div>
      </div>
      </ThemeProvider>
    </div>
  );
};

export default CardPage;
