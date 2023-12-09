import { Link } from 'react-router-dom';
import '../TCG-Mart-CSS-Pages/MarketPage.css'
import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import FirstNavi from '../Navigations/firstNavi';
import SearchIcon from '@mui/icons-material/Search';

export default function MarketPage(){
    const [cards,setCards] = useState([{}]);
    const [search, setSearch] = useState('');
    // console.log(search);

    // gets the cards in database
    useEffect(()=>{
        axios.get("http://localhost:8080/tcg/card/getAllActiveCards")
            .then(response => {
                return response.data;
            })
            .then(data => {
                const reversedData = data.reverse(); //sorted by most recent
                setCards(reversedData);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    },[]);

    return (
        <>

        {/* navigation */}
        <FirstNavi />

        <div className='market-page-main'>

            {/* market page's unique navigation banner */}
            <div className="market-page-navi">
            </div>


            <div className='market-page-body'>

                {/* search bar */}
                <div className='search-bar'>

                    <div className='search-box'>

                        <SearchIcon />

                        <h2>Search</h2>

                        <input type='text' onChange={(e) => setSearch(e.target.value)} placeholder='Enter card name here'>
                        </input>

                    </div>

                </div>

                {/* displays the lists of cards */}
                <div className='market-card-lists'>

                    {/* individual cards */}
                    {cards
                        // filter cards with search function
                        .filter((cards) => {
                            return search.toLowerCase() === ''
                                ? cards
                                : cards.cardTitle.toLowerCase().includes(search);
                        })
                        .map((cards, id)=>{
                            const shortenedTitle = cards && cards.cardTitle && cards.cardTitle.length > 20 //checks if card title is longer than 33 characters
                            ? `${cards.cardTitle.substring(0, 20)}...`  // Cut and add triple dots. shortens long titles
                            : (cards && cards.cardTitle) || ''; //checks if card title is empty and does nothing if card title is short

                        return(

                            <Link to={`/cards/${cards.cardid}`} key={cards.id}>

                                <div className='card' key={id}>

                                    {/* image area */}
                                    <div className='card-image-area'>

                                        <div className='card-image-size'>

                                            <img src={cards.cardImg} alt='card pic' className='card-image'/>

                                        </div>

                                    </div>

                                    <p>{shortenedTitle}</p>
                                    
                                    <p className='card-price'>₱{cards.cardPrice}</p>

                                </div>

                            </Link>

                    )})}

                </div>

            </div>

        </div>

        </>
    );
}
