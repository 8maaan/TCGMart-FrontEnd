import { Link } from 'react-router-dom';
import '../TCG-Mart-CSS-Pages/HomePage.css'
import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import FirstNavi from '../Navigations/firstNavi';

export default function HomePage(){
    const [cards,setCards] = useState([{}]);

    useEffect(()=>{
        axios.get("http://localhost:8080/tcg/card/getAllActiveCards")
            .then(response => {
                return response.data;
            })
            .then(data => {
                const reversedData = data.reverse();
                const first8Cards = reversedData.slice(0, 8);
                setCards(first8Cards);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    },[]);

    // function Buttontest(){
    //     console.log(cards);
    // };

    return (
        <>
        <FirstNavi />
        <div className='home-page-main'>
            <div className="home-page-navi"></div>
            <div className='home-page-body'>
                <div className='newly-listed-bar'>
                    <div className='newly-listed-box'>
                        <h3>Newly Listed</h3>
                    </div>
                    <p>Pokemon</p>
                    <p className='newly-listed-bar-right'>
                        <Link to="/market">View More &#62;</Link>
                    </p>
                </div>
                <div className='card-lists'>
                    {cards.map((cards, id)=>{
                        const shortenedTitle = cards && cards.cardTitle && cards.cardTitle.length > 20
                        ? `${cards.cardTitle.substring(0, 20)}...`  // Cut and add triple dots
                        : (cards && cards.cardTitle) || '';

                        return(
                            <Link to={`/cards/${cards.cardid}`} key={id}>
                                <div className='card' key={id}>
                                    <div className='card-image-area'>
                                        <div className='card-image-size'>
                                            <img src={cards.cardImg} alt='card pic' className='card-image'/>
                                        </div>
                                    </div>
                                    <p>{shortenedTitle}</p>
                                    <p className='card-price'>₱{cards.cardPrice}.00</p>
                                </div>
                            </Link>
                    )})}
                </div>
            </div>
        </div>
        </>
    );
}
