import React from 'react';
import ReactDOM from 'react-dom';
import Header from './component/Header';
import Contact from './component/Contact';
import Menssag from './component/Messag';
import Footer from './component/Footer';

import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers/reducer';
import {addSocket} from './actions/action'
import './css/index.css';

import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");
const store = createStore(reducer, applyMiddleware(thunk));

store.dispatch(addSocket(socket))
  
ReactDOM.render(
        <Provider store={store}>
            <Header/>
        </Provider>, document.getElementById('header'));    
ReactDOM.render(
    <Provider store={store}>
        <Contact/>
    </Provider>, document.getElementById('contact'));
ReactDOM.render(
    <Provider store={store}>
        <Menssag/>
    </Provider>, document.getElementById('menssag'));
    ReactDOM.render(
        <Provider store={store}>
            <Footer/>
        </Provider>, document.getElementById('footer'));