import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCardByCardID, getSellerDetails } from '../services/apiServices';
import '../TCG-Mart-CSS-Pages/CardPage.css';
import SecondNavi from '../Navigations/secondNavi';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CardPage = () => {
  const { cardId } = useParams();
  const [card, setCard] = useState({});
  const [seller, setSeller] = useState({});
  const [messenger, setMessenger] = useState(false);
  const loggedInUser = localStorage.getItem("uid");

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
      redbutton: {
        main:'#F66767',
        contrastText: '#FFFFFF',
      },
    },
  });

  function MsngrWindow(){
    if (messenger === false){
      setMessenger(true);
    }else {
      setMessenger(false);
    }
  };

  function copyText() {
    const textarea = document.createElement('textarea');
    
    textarea.value = seller.mssngr_link;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand('copy');

    document.body.removeChild(textarea);
  
    var alert = document.getElementById('copyAlert');
    alert.style.display = 'block';
    alert.style.opacity = 1;
  
    setTimeout(function() {
      alert.style.opacity = 0;
      setTimeout(function() {
        alert.style.display = 'none';
      }, 500);
    }, 2000);
  }; 

  return (
    <div>
      <SecondNavi />
      <ThemeProvider theme={muicolor}>
        <div className='card-page-main'>
          <div className='card-page-body'>
            <div className='card-details-upper'>
              <div className='card-picture' style={{backgroundImage: `url(${card.cardImg})`}}></div>
              <div className='card-details'>
                <h2>{card.cardTitle}</h2>
                <div className='card-attributes'>
                  <div className='card-attributes-left'>
                    <p>Condition:</p>
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
                  {card.uid != loggedInUser ? (
                    <>
                      <div className='buttons-area'>
                        {/* Link to payment */}
                        <Link to={`/cards/${card.cardid}/payment`}>
                          <Button 
                            variant="contained" 
                            color="lightbluebutton"
                            style={{boxSizing: 'border-box',
                              padding: '10px 0px 10px 0px',
                              width: '160px',
                              height: '50px'}}
                            sx={{borderRadius: '15px'}}>
                            Buy Now
                          </Button>
                        </Link>
                        <Button variant="contained" 
                        color="palebluebutton"
                        style={{boxSizing: 'border-box',
                          padding: '10px 0px 10px 0px',
                          width: '160px',
                          height: '50px'}}
                        sx={{borderRadius: '15px'}}
                        onClick={MsngrWindow}>Contact Seller</Button>
                      </div>
                      {messenger ? (
                        <>
                          <div className='msngr-copy-area'>
                            <div className='msngr-link'>
                              <div className='msngr-logo-area'>
                                <img src='https://static.vecteezy.com/system/resources/previews/016/716/477/non_2x/messenger-icon-free-png.png' alt='msngr logo' className='msngr-logo'/>
                              </div>
                              <p>{seller.mssngr_link}</p>
                            </div>
                            <div className='copy-icon' onClick={copyText}>
                              <ContentCopyIcon sx={{ fontSize: '25px' }}/>
                            </div>
                            <div id='copyAlert' className='copy-alert'>Copied</div>
                          </div>
                        </>
                      ) : (
                        <>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                    </>
                  )}
                </div>
              </div>
              <div className='seller-info-area'>
                <div className='seller-info'>
                  <h3>Seller Information</h3>
                  <div className='seller-username'>
                    <AccountCircleIcon sx={{ fontSize: '35px' }}/>
                    <h3 className='seller-username-h3'>{seller.username}</h3>
                  </div>
                </div>
                {card.uid != loggedInUser ? (
                  <>
                  </>
                ) : (
                  <>
                    <Button 
                    variant="contained" 
                    color="lightbluebutton"
                    style={{boxSizing: 'border-box',
                      padding: '10px 0px 10px 0px',
                      width: '160px',
                      height: '50px'}}
                    sx={{borderRadius: '15px'}}>Edit Listing</Button>
                    <Button 
                    variant="contained" 
                    color="redbutton"
                    style={{boxSizing: 'border-box',
                      padding: '10px 0px 10px 0px',
                      width: '160px',
                      height: '50px'}}
                    sx={{borderRadius: '15px'}}>Cancel Listing</Button>
                  </>
                )}
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
            <p>seller ID:{card.uid}</p>
            <p>Logged in ID:{loggedInUser}</p>
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
