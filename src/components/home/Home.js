import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="image-container">
                <img src="https://www.bajajfinservmarkets.in/content/dam/bajajfinserv/banner-website/Family.jpg" alt="Happy Family" />
                <div className="image-description">
                    <h2>Life Insurance</h2>
                    <p>Whoever you are, whatever your need,<br/> LIC has a Life Insurance plan for you.</p>
                </div>
                <div className="additional-text">
                    <p>A health insurance policy is a financial safety shield that protects you and your family during medical emergencies. It comes with several benefits such as paying your medical bills including pre and post-hospitalization expenses, protect your savings and get tax benefits. Buy the best mediclaim policy from HDFC ERGO which will help you manage the rising medical costs during emergencies and have below features:</p>
                    <ul className='text-start'>
                        <li>Cashless Networks: 12,000+ across India</li>
                        <li>Tax Savings: Upto ₹ 75000*</li>
                        <li>Renewal Benefit: Free Health Check-up within 60 days of Renewal</li>
                        <li>Claim Settlement Rate: 1 Claim/Minute*</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;
