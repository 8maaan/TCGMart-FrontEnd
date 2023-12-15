import { useEffect, useState } from "react";
import { getTransactionByBuyerUid } from "../services/apiServices";
import '../TCG-Mart-CSS-Pages/TransactionPage.css';
import SecondNavi from "../Navigations/secondNavi";

export default function TransactionPage(){
    const [transactions, setTransactions] = useState([]);

    // loads all the recent transactions when visiting this page
    useEffect(() => {
        // Function to fetch transactions -GPT
        const getTransactions = async () => {
            const result = await getTransactionByBuyerUid(localStorage.getItem("uid"));
            if (result.success) {
                setTransactions(result.transaction.reverse());
                console.log(result.transaction);
            }else{
                console.log(result.message);
            }
        };

        // Call the getTransactions function when the component mounts (empty dependency array []) -GPT
        getTransactions();
    }, []);

    return (
        <div className="transactions-main">

            <SecondNavi />

                <div className="transaction-card-area">

                    <h3 className="lol">Transactions</h3>

                    {transactions.map((transactions, id)=>{

                        return(
                            <div  className="transactions-card" key={id}>

                                <div className="transactions-card-image-area">
                                    <img src={transactions.card.cardImg} alt="cardimage" className="card-image"/>
                                </div>

                                <div className="transactions-card-image-area-2">
                                    <h2>{transactions.card.cardTitle}</h2>
                                    <p>{transactions.timeStamp}</p>
                                </div>

                                <div className="transactions-card-image-area-3">
                                    <p>₱{transactions.transactionAmount}</p>
                                </div>
                            </div>
                    )})}

                </div>

        </div>
    );
}