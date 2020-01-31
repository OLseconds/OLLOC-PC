import React, {Component} from "react";
import styles from "../style/Login.scss";

class Login extends Component{
    render(){
        return(
            <fragment>
                <div id="loginForm">
                    <h1>OLLoc</h1>
                    <span className="loginText">친구들의 지도에 그려진 사진과 글을 보려면 가입하세요</span>
                    <button className="mainBtn">facebook으로 로그인</button>
                    <div id="line">또는</div>
                    <input className="textInput" placeholder="휴대폰 번호 또는 이메일 주소" type="text"/>
                    <input className="textInput" placeholder="성명" type="text"/>
                    <input className="textInput" placeholder="사용자 이름" type="text"/>
                    <input className="textInput" placeholder="비밀번호" type="text"/>
                    <button className="mainBtn">가입</button>
                    <span className="loginText">가입하면 OLLoc의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.</span>
                </div>
                <div id="checkMem">
                    계정이 있으신가요? <a href="">로그인</a>
                </div>
            </fragment>
        );
    }
}

export default Login;