import React from 'react';
import logo from './logo.svg';
import './App.css';
import './css/tailwind.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './component';
import HomePage from './component/HomePage';
import Discover from './component/Discover';
import Messages from './component/Messages';
import Notification from './component/Notification';
import Profile from './component/Profile';

function App() {
    return ( <Router>
        <Route path = "/discover" component={Discover} className = "block leftNavBar link py-2" /> 
        <Route path = "/home" component = { HomePage } className = "block leftNavBar  border-l-4 border-purple-800 bg-purple-200 text-purple-800 py-2" /> 
        <Route path = "/profile" component={Profile} className = "block leftNavBar link py-2" /> 
        <Route path = "/messages" component={Messages} className = "block leftNavBar link py-2" /> 
        <Route path = "/notifications" component={Notification} className = "block leftNavBar link py-2" /> 
        <Route path = "/" exact component = { LoginPage } /> 
        </Router>
    );
}

export default App;