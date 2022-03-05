import React from 'react';
import { FaInstagram, FaYoutube, FaFacebookSquare, FaTiktok } from 'react-icons/fa';

function Footer() {
    // Dynamic year for our copyright
    const year = new Date().getFullYear();

    return (
        <footer className="page-footer text-center">
            {/* Social Icons */}
            <div className="py-4 mx-auto">
                <a href="https://www.instagram.com/isauwhuskies/?hl=en" className="social-footer" target="_blank"> <FaInstagram className="navIcon-footer" /> </a>
                <a href="https://www.youtube.com/user/isauwHuskies" className="social-footer" target="_blank"> <FaYoutube className="navIcon-footer" /> </a>
                <a href="https://www.facebook.com/isauw.huskies/" className="social-footer" target="_blank"> <FaFacebookSquare className="navIcon-footer" /> </a>
                <a href="https://www.tiktok.com/@isauwhuskies" className="social-footer" target="_blank"> <FaTiktok className="navIcon-footer" /> </a>
            </div>

            {/* Copyright and Conditions */}
            <div className="footer-copyright" style={{ padding: `calc(1.2vw + 20px) 0` }}>
                {/* Required if website is hosted using UW shared hosting */}
                <div id="conditions">
                    <a style={{ marginRight: "12px" }} href="https://www.washington.edu/online/privacy" className="text-decoration-none">Privacy</a>
                    <a style={{ marginLeft: "12px" }} href="https://www.washington.edu/online/terms" className="text-decoration-none">Terms</a>
                </div>
                <div>
                    <p className="copyright">© {year} Indonesian Student Association at University of Washington | Seattle, WA</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;