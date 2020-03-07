import React, {Component} from "react";
import "../../Animation.css"
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Join extends Component{

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    joinSubmit = (e) => {
        // submit버튼을 누른 경우 리로딩 방지
        e.preventDefault();
        // 상태값을 전송 함수에 전달
        this.sendJoinData(this.state, this);
        //값 초기
        this.setState({
            userName: '',
            passWord: '',
            name: '',
            mail: '',
        });
    }

    sendJoinData = (data, t) => {
        axios.post('http://olloc.kr3.kr:8000/user/', {
            "username": data.userName,
            "password": data.passWord,
            "name": data.name,
            "mail": data.mail,
        }).then(function (response){
            console.log(response);
            t.changeView();
            alert("성공적으로 가입되었습니다.");
        }).catch(function (error){
            console.log(error);
            if(error.response.data.error_code == 2){
                alert("중복되는 아이디가 존재합니다.");
                error = true;
            }
        });
    }

    changeView = () => {
        this.setState({
            userName: '',
            passWord: '',
            name: '',
            mail: '',
            animation: 'animated bounceOutLeft'
        });
        this.props.animation('animated bounceInRight');
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
            return <Redirect push to ='main/?detail=login' />;
        }
        return(
            <div id ="join">
                <form id="loginForm" className={this.state.animation} onSubmit={this.joinSubmit}>
                    <h1>OLLoc</h1>
                    <span className="loginText">친구들의 지도에 그려진 사진과 글을 보려면 가입하세요</span>
                    <button className="mainBtn">facebook으로 로그인</button>
                    <div id="line">또는</div>
                    <input
                        className="textInput"
                        placeholder="이메일 주소"
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
                        placeholder="회원 아이디"
                        name="userName"
                        value={this.state.userName}
                        onChange={this.handleChange}
                    />
                    <input
                        className="textInput"
                        placeholder="비밀번호"
                        type="password"
                        name="passWord"
                        value={this.state.passWord}
                        onChange={this.handleChange}
                    />
                    <button className="mainBtn">가입</button>
                    <span className="loginText">가입하면 OLLoc의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.</span>
                </form>
                <div id="checkMem" className={this.state.animation}>
                    계정이 있으신가요? <span id = "loginBtn" onClick={this.changeView} >로그인</span>
                </div>
            </div>
        );
    }
}

export default Join;