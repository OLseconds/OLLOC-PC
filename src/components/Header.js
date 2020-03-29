import React, {Component} from 'react';
import logoUrl from '../img/logo192.png';
import '../style/Header.scss';
import {Link} from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";

class Header extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    checker = () => {
        const { cookies } = this.props;

        const axios = require('axios');
        axios.get('http://olloc.kr3.kr:8000/auth/', {
            headers: {Authorization: cookies.get('olloc') || 'Ben'}
        }).then((response) =>{
            window.location.href = 'http://react.kr3.kr/mypost?id='+response.data.id;
        }).catch(() => {
            window.location.href = 'http://react.kr3.kr/main';
        });
    }


    render() {
        return (
            <header id="main_header">
                <div className="container">
                    <div id="main_logo"><h1><Link to="/"><img src={logoUrl} alt=""/>OLLOC</Link></h1></div>
                    <div id="search">
                        <input type="text" placeholder="검색"/>
                    </div>
                    <div id="menu">
                        <ul>
                            <li><Link to="/"><i className="fas fa-home"></i></Link></li>

                            <li onClick={this.checker}><i className="fas fa-user-circle"></i></li>
                            <li><Link to="/"><i className="fab fa-safari"></i></Link></li>
                            <li><Link to="/"><i className="fas fa-heart"></i></Link></li>
                        </ul>

                    </div>
                </div>
            </header>
        )
    }
}

export default withCookies(Header);