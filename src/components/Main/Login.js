import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';

class Login extends Component{
    handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
}

    joinSubmit = (e) => {
        // submit버튼을 누른 경우 리로딩 방지
        e.preventDefault();
        // 상태값을 전송 함수에 전달
        this.sendJoinData(this.state);
        //값 초기
        this.setState({
            userName: '',
            passWord: '',
            name: '',
            mail: '',
        });
    }

    sendJoinData = (data) => {
        const join = require('axios');
        console.log(data);
        join.post('http://olloc.kr3.kr:8000/auth', {
            "username": data.userName,
            "password": data.passWord,
            "name": data.name,
            "mail": data.mail,
        }).then(function (response){
            console.log(response);
        }).catch(function (error){
            console.log(error);
        });
    }

    changeView = () => {
        this.setState({
            userName: '',
            passWord: '',
            name: '',
            mail: '',
            animation: 'animated bounceOutRight'
        });

        this.props.animation('animated bounceInLeft');

        setTimeout(()=>{
            this.setState({
                redirect: true
            })
        }, 300);
    }

    constructor(props){
        super(props);
        this.state ={
            userName: '',
            passWord: '',
            name: '',
            mail: '',
            animation: this.props.direction,
            redirect: false,
        }
    }

    render(){
        if(this.state.redirect){
            return <Redirect push to ='/main' />;
        }
        return(
            <div id ="login">
                <form className={this.state.animation} id="loginForm" onSubmit={this.joinSubmit}>
                    <span id="prevBtn" onClick={this.changeView}><i className="fas fa-arrow-left"></i></span>
                    <h1 id="mainTitle">OLLoc</h1>
                    <span className="loginText">친구들의 지도에 그려진 사진과 글을 보려면 가입하세요</span>
                    <button className="mainBtn">facebook으로 로그인</button>
                    <div id="line">또는</div>
                    <input
                        className="textInput"
                        placeholder="휴대폰 번호 또는 이메일 주소"
                        name="mail"
                        value={this.state.mail}
                        onChange={this.handleChange}
                    />
                    <input
                        className="textInput"
                        placeholder="비밀번호"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <Link to ="/" className="noUnderLine" ><button className="mainBtn" >로그인</button></Link>
                    <span className="loginText">가입하면 OLLoc의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.</span>
                </form>
            </div>
        );
    }
}

export default Login;