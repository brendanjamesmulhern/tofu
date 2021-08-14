import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './screens/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MyTeams from './screens/MyTeams';
import TeamChat from './screens/TeamChat';
import VideoChat from './screens/VideoChat';
import GenerateLink from './screens/GenerateLink';

ReactDOM.render(
  <Router>
    <Route path="/path" component={App} />
    <Route path="/login" component={Login} />
    <Route path="/MyTeams" component={MyTeams} />
    <Route path="/chat/:id" component={TeamChat} />
    <Route path="/:sessionId/:token" component={VideoChat} />
    <Route exact path="/" component={GenerateLink} />
  </Router>,
  document.getElementById('root')
);
