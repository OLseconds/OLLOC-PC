import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Login extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);
        this.state ={
            userName: '',
            passWord: '',
            animation: this.props.direction,
            redirect: false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    loginSubmit = (e) => {
        // submit버튼을 누른 경우 리로딩 방지
        e.preventDefault();
        if(!this.state.userName){alert("사용자 명을 입력해주세요!"); return;}
        else if(!this.state.passWord) {alert("비밀번호를 입력해주세요!"); return;}
        // 상태값을 전송 함수에 전달
        this.sendLoginData(this.state);
        //값 초기
        this.setState({
            userName: '',
            passWord: '',
        });
    }

    sendLoginData = (data) => {
        const checkLogin = (token) => {
            this.props.login(token);
        }

        const { cookies } = this.props;
        const login = require('axios');
        login.post('http://olloc.kr3.kr:8000/auth/', {
            "username": data.userName,
            "password": data.passWord,
        }).then(function (response){
            console.log(response.data.token);
            cookies.set('olloc', response.data.token);
            checkLogin(response.data.token);
        }).catch(error => {
            if(!error.response) alert("로그인 서버에 장애가 발생했습니다.");
            else alert("입력한 정보가 존재하지 않거나 패스워드가 일치하지 않습니다.");
            console.log(error.response);
        })
    }

    changeView = () => {
        this.setState({
            userName: '',
            passWord: '',
            animation: 'animated bounceOutRight'
        });

        this.props.animation('animated bounceInLeft');

        setTimeout(()=>{
            this.setState({
                redirect: true
            })
        }, 300);
    }

    render(){
        if(this.state.redirect){
            return <Redirect push to ='/main' />;
        }
        return(
            <div id ="login">
                <form className={this.state.animation} id="loginForm" onSubmit={this.loginSubmit}>
                    <span id="prevBtn" onClick={this.changeView}><i className="fas fa-arrow-left"></i></span>
                    <h1 id="mainTitle">OLLoc</h1>
                    <span className="loginText">친구들의 지도에 그려진 사진과 글을 보려면 가입하세요</span>
                    <div id="line">또는</div>
                    <input
                        className="textInput"
                        placeholder="회원 아이디"
                        name="userName"
                        value={this.state.userName}
                        onChange={this.handleChange}
                    />
                    <input
                        className="textInput"
                        type="password"
                        placeholder="비밀번호"
                        name="passWord"
                        value={this.state.passWord}
                        onChange={this.handleChange}
                    />
                    {/*<Link to ="/" className="noUnderLine" ><button className="mainBtn" >로그인</button></Link>*/}
                    <button className="mainBtn" >로그인</button>
                    <span className="loginText">가입하면 OLLoc의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.</span>
                </form>
            </div>
        );
    }
}

export default withCookies(Login);