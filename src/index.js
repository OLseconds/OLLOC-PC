import React from 'react';
import ReactDOM from 'react-dom';
import Test from "./Test/Test";
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import './Animation.css'
import * as serviceWorker from './serviceWorker';

import App from './App';
import Map from './Map';
import Join from './components/Join';
import Login from "./components/Login";

// 개발단계에서 당장 필요 없어서 주석처리
ReactDOM.render(<Test />, document.getElementById('root'));
// ReactDOM.render(<Map />, document.getElementById('Map'));
// ReactDOM.render(<Join />, document.getElementById('Join'));
// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Login />, document.getElementById('Login'));

// [React.JS] 강좌: React 컴포넌트 구성 & AJAX 비동기 작업 처리하기 & CSS 애니메이션 처리 test



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();