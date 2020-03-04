import React from 'react';
import logoUrl from '../img/logo192.png';
import '../style/Header.scss';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header id="main_header">
            <div className="container">
                <div id="main_logo"><h1><img src={logoUrl} />OLLOC</h1></div>
                <div id="search">
                    <input type="text" placeholder="검색" />
                </div>
                <div id="menu">
                    <ul>
                        <li><Link to="/"><i className="fas fa-home"></i></Link></li>
                        <li><Link to="/main"><i className="fas fa-user-circle"></i></Link></li>
                        <li><Link to="/"><i className="fab fa-safari"></i></Link></li>
                        <li><Link to="/"><i className="fas fa-heart"></i></Link></li>
                    </ul>

                </div>
            </div>

        </header>
    )
}

export default Header;