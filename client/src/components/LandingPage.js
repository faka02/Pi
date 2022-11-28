import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div>
            <div>
                <h1 className="title">Welcome</h1>
                <Link to={'/home'}>
                    <button className="btnLP">Begin</button>
                </Link>
            </div>
            <div className="img">
                <img src="https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com//content/d5/97/9018345f4db89711ee7dfac01de6/2021-cen-holiday-turkeysides-landingpagehero-2280x1282.jpg" alt='' width={'1600'} height={'650'}/>
            </div>
        </div>
    )
}

export default LandingPage