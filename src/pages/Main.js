import React, { Component } from 'react';
import Join from '../components/Main/Join';
import Login from '../components/Main/Login';
import '../Animation.css'
import queryString from "query-string";
import 'style/Main.scss';
import leftImg from '../img/main.png'
import { withCookies, Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import {instanceOf} from "prop-types";

class Main extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.login = this.login.bind(this)
        this.state = {
            direction: 'animated fadeIn',
            token: 'Ben',
        };

        const cookieToken = cookies.get('olloc')||'Ben';

        const checkLogin = require('axios');
        if(cookieToken != "Ben"){
            checkLogin.get('http://olloc.kr3.kr:8000/user/', {
                headers: {Authorization: cookieToken},
            }).then( (response) => {
                this.setToken(cookies.get('olloc'));
                console.log(response);
            }).catch( (error) => {
                console.log(error.response);
                this.benThisUser();
            })
        }

    }
    setToken = (token) => {
        console.log(token);
        this.setState({
            token: token,
        })
    }

    benThisUser = () => {
        this.setState({
            token: 'Ben',
        })
    }

    login(token){
        this.setState({
            token: token,
        })
    }
    loginsplit = (query) => {
        if(query === 'login') return false;
        else return true;
    }

    move = (getDirection) => {
        this.setState({
            direction: getDirection,
        })
    }
    render() {
        console.log(this.state.token)
        const {location} = this.props;
        const query = queryString.parse(location.search);
        const detail = this.loginsplit(query.detail);

        if(this.state.token != 'Ben') return <Redirect push to ='/' />;
        return (
            <div id = "main">
                <img className = "animated fadeIn" src={leftImg} alt="이미지"/>
                {
                    detail
                        ? <Join
                            animation={this.move}
                            direction={this.state.direction}
                        />
                        : <Login
                                login={this.login}
                                animation={this.move}
                                direction={this.state.direction}
                        />
                }
            </div>
        );
    };
}

export default withCookies(Main);