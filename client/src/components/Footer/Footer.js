import React from 'react';
import {Link} from 'react-router-dom';
import {
    FaInstagram,
    FaFacebookSquare,
    FaTwitterSquare,
    FaYoutubeSquare,
    FaTelegramPlane
} from 'react-icons/fa';

import './Footer.css';

const Footer = () => {

    return (
        <div className={'footer'}>
            <div>
                <div className={'footer_info'}>
                    <div className={'info'}>
                        <ul>
                            <h5>INFO</h5>
                            <li><Link to={'/about'}>About Epic Sneakers</Link></li>
                            <li>Order Status</li>
                            <li>Shipping and Delivery</li>
                            <li>Payment Options</li>
                        </ul>
                    </div>
                    <div className={'social_networks'}>
                        <div className={'social'}>
                            <a href={'https://www.instagram.com'} target="_blank"><FaInstagram/></a>
                        </div>
                        <div className={'social'}>
                            <a href={'https://www.facebook.com'} target="_blank"><FaFacebookSquare/></a>
                        </div>
                        <div className={'social'}>
                            <a href={'https://twitter.com'} target="_blank"><FaTwitterSquare/></a>
                        </div>
                        <div className={'social'}>
                            <a href={'https://www.youtube.com'} target="_blank"><FaYoutubeSquare/></a>
                        </div>
                        <div className={'social'}>
                            <a href={'https://t.me/epicsneakersbot'} target="_blank"><FaTelegramPlane/></a>
                        </div>
                    </div>
                    <div className={'contacts'}>
                        <h5>CONTACTS</h5>
                        <span>Unter den Linden 21, 10117 Berlin, Germany</span>
                        <span>0 800 21 69 69</span>
                        <span>+38 044 338 94 69</span>
                        <span>info@epicSneakers.eu</span>
                    </div>
                </div>
                <div className={'footer_rights'}>© 2022 EpicSneakers All Rights Reserved</div>
            </div>
        </div>
    );
};

export default Footer;