import { useEffect, useState } from "react";
import { getTransactionByBuyerUid, getAllTransactions } from "../services/apiServices";
import '../TCG-Mart-CSS-Pages/TransactionPage.css';
import SecondNavi from "../Navigations/secondNavi";

export default function TransactionPage(){
    const [transactions, setTransactions] = useState([]);
    const [uid] = useState(parseInt(localStorage.getItem("uid")))

    // loads all the recent transactions when visiting this page
    useEffect(() => {
        const getTransactions = async () => {
            const result = await getAllTransactions();
            
            if (result.success) {
                const filteredTransactions = result.transaction.filter(transaction => 
                    transaction.cardSeller === uid ||
                    transaction.cardBuyer === uid
                );

                setTransactions(filteredTransactions.reverse());
                // console.log(result.transaction);
            }else{
                console.log(result.message);
            }
        };
        getTransactions();
    }, [uid]);

    const getTransactionLabel = (transaction) => {
        if(transaction.cardBuyer === uid){
            return "Bought"
        }else if(transaction.cardSeller === uid){
            return "Sold"
        }
    }

    console.log(transactions)
    return (
        <div className="transactions-main">

            <SecondNavi />

                <div className="transaction-card-area">

                    <h3 className="lol" style={{color:'#656464'}}>Transactions</h3>

                    {transactions.map((transactions, id)=>{
                        const label = getTransactionLabel(transactions);
                        return(
                            <div  className="transactions-card" key={id}>

                                <div className="transactions-card-image-area">
                                    <img src={transactions.card.cardImg} alt="cardimage" className="card-image"/>
                                </div>

                                <div className="transactions-card-image-area-2">
                                    <h3 style={{color:'#363636'}}>{transactions.card.cardTitle}</h3>
                                    {/* <p>{getTransactionLabel(transactions)}</p> */}
                                    <p style={{color: label === "Bought" ? 'green' : '#4287f5'}}>{label}</p>
                                    {/* <p> {label === "Bought" ? {} : {}}</p> */}
                                    <p>{transactions.timeStamp}</p>
                                </div>

                                <div className="transactions-card-image-area-3">
                                    <p style={{color: label === "Bought" ? 'green' : '#4287f5'}}>₱{transactions.transactionAmount}.00</p>
                                </div>
                            </div>
                    )})}

                </div>

        </div>
    );
}