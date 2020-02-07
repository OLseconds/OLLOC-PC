import React, { Component } from 'react';
import Join from 'components/Join';
import Login from 'components/Login';
import '../Animation.css'
import queryString from "query-string";
import 'style/Main.scss';
import leftImg from '/home/linesys/OLLOC/src/img/main.png'

class Main extends Component {
    state = {
        direction: 'animated fadeIn'
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
        const {location} = this.props;
        const query = queryString.parse(location.search);
        const detail = this.loginsplit(query.detail);

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
                                animation={this.move}
                                direction={this.state.direction}
                        />
                }
            </div>
        );
    };
}

export default Main;