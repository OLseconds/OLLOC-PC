import React, {Component} from "react";
import "../style/Join.scss";
import apiGetter from 'axios';

class Join extends Component{
    state = {
        userName: '',
        passWord: '',
        name: '',
        mail: '',
    }

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
        //const sender = require('axios');
        console.log(data);
        apiGetter.post('http://azure.kr3.kr:5000/v0.0/user/join', {
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

    render(){
        return(
            <fragment>
                <form id="loginForm" onSubmit={this.joinSubmit}>
                    <h1>OLLoc</h1>
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
                        placeholder="성명"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <input
                        className="textInput"
                        placeholder="사용자 이름"
                        name="userName"
                        value={this.state.userName}
                        onChange={this.handleChange}
                    />
                    <input
                        className="textInput"
                        placeholder="비밀번호"
                        name="passWord"
                        value={this.state.passWord}
                        onChange={this.handleChange}
                    />
                    <button className="mainBtn">가입</button>
                    <span className="loginText">가입하면 OLLoc의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.</span>
                </form>
                <div id="checkMem">
                    계정이 있으신가요? <a href="./login">로그인</a>
                </div>
            </fragment>
        );
    }
}

export default Join;