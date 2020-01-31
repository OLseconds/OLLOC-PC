import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Map from './Map';
import Login from './components/Login';
import * as serviceWorker from './serviceWorker';

// 개발단계에서 당장 필요 없어서 주석처리
// ReactDOM.render(<Map />, document.getElementById('Map'));
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Login />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister(); 