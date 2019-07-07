import './App.css'
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import api from './axios/index'
import Page from './Page'
import 'antd/dist/antd.css';
// import {Provider} from 'react-redux'

React.$api = api;
ReactDOM.render(
    <Page/>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();