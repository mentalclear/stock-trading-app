import React from "react";
import { useUserInfo } from '../user';

export const DashboardPage = () => {
    const [userInfo, setUserInfo] = useUserInfo();
    const { cashValue, sharesValue, numberOfSharesOwned } = userInfo || {};

    return (
        <>
            <h1 className="section-heading">Stock Trading App</h1>
            <div className="centered-container">
                <h3>The stock chart will go here...</h3>
                <div className="financial-info-section">
                    <div className="info-item"> Current TSLA Share Price: $400</div>
                    <div className="info-item"> You currently own {numberOfSharesOwned} shares</div>
                    <div className="info-item"> Cash Balance: {cashValue}</div>
                    <div className="info-item"> Portfolio Value: ${sharesValue}</div>
                    <div className="info-item"> Total Value: ${cashValue + sharesValue}</div>
                </div>
            </div>
        </>       
    )
}
