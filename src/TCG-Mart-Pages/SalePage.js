import axios from "axios";
import { useEffect, useState } from "react";
import './SalePage.css';

export default function SalePage(){
    const [sales,setSales] = useState([{}]);

    useEffect(()=>{
        axios.get("http://localhost:8080/tcg/sale/getAllSales")
            .then(response => {
                return response.data;
            })
            .then(data => {
                setSales(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    },[]);

    function Buttontest(){
        console.log(sales);
    }

    return (
        <div className="sale-page-main">
            <div className="nav">
                <div className="nav-left">
                    <h1>TCGMart</h1>
                    <h2>Home</h2>
                    <h2>Market</h2>
                    <h2>Guide</h2>
                </div>
                <div className="nav-right">
                    <h2>Dashboard</h2>
                    <h2>Listings</h2>
                    <h2>Sell Card</h2>
                    <h2>Username</h2>
                </div>
            </div>
            <div className="sale-page-body">
                <h2>Purchases</h2>
                <div className="sale-page-lists">
                    {sales.map((sale, id)=>{
                        return  <div className="card" key={id}>
                                    <div className="card-image-area">
                                        <img src={sale.cardimg} alt="cardimage" className="card-image"/>
                                    </div>
                                    <div className="card-image-area-2">
                                        <h2>{sale.cardtitle}</h2>
                                        <p>{sale.sellername}</p>
                                        <p>test date</p>
                                    </div>
                                    <div className="card-image-area-3">
                                        <h1>₱{sale.price}</h1>
                                    </div>
                                </div>
                    })}
                </div>
            </div>
        </div>
    );
}