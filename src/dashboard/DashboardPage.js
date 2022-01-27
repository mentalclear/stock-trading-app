import React, { useState } from "react";
import { useUserInfo } from '../user';
import { useStockHistory } from '../stock-history';
import { StockChart } from "./StockChart";


export const DashboardPage = () => {
    const [userInfo, setUserInfo] = useUserInfo();
    const { cashValue, sharesValue, numberOfSharesOwned } = userInfo || {};
    const stockHistory = useStockHistory();
    const times = Object.keys(stockHistory);
    const prices = Object.values(stockHistory);
    const [numberOfShareValue, setNumberOfSharesValue] = useState(0);

    const buyShares = async () => {
        const response = await fetch('/stocks/buy', {
            method: 'post',
            body: JSON.stringify({numberOfShares: numberOfShareValue}),
            headers: { 'Content-Type': 'application/json' },
        });
        const updatedUserInfo = await response.json();
        setUserInfo(updatedUserInfo);
    }

    const sellShares = async () => {
        const response = await fetch('/stocks/sell', {
            method: 'post',
            body: JSON.stringify({numberOfShares: numberOfShareValue}),
            headers: { 'Content-Type': 'application/json' },
        });
        const updatedUserInfo = await response.json();
        setUserInfo(updatedUserInfo);
    }

    return (
        <>
            <h1 className="section-heading">Stock Trading App</h1>
            <div className="centered-container">
                <StockChart 
                    xValues={times}
                    yValues={prices} 
                />
                <div className="financial-info-section">
                    <div className="info-item"> Current TSLA Share Price: $400</div>
                    <div className="info-item"> You currently own {numberOfSharesOwned} shares</div>
                    <div className="info-item"> Cash Balance: {cashValue}</div>
                    <div className="info-item"> Portfolio Value: ${sharesValue}</div>
                    <div className="info-item"> Total Value: ${cashValue + sharesValue}</div>
                    <div>
                        <input
                            type="number"
                            className="full-width space-after"
                            value={numberOfShareValue}
                            onChange={e=>setNumberOfSharesValue(e.target.value)}
                        />
                        <button 
                            className="buy-button"
                            onClick={buyShares}>Buy</button>
                        <button 
                            className="sell-button"
                            onClick={sellShares}>Sell</button>
                    </div>
                </div>
            </div>
        </>       
    )
}
