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
import { FirebaseAppProvider } from 'reactfire';
import VideoIntros from './screens/VideoIntros';
import VideoIntroUpload from './screens/VideoIntroUpload';
import Register from './screens/Register';
import PayGuard from './screens/PayGuard';
import Profile from './screens/Profile';

const firebaseConfig = {
  apiKey: "AIzaSyCJE2YgNH7RnLxddgi9w9XPj8FBeD12DO4",
  authDomain: "tofu-a6b1f.firebaseapp.com",
  projectId: "tofu-a6b1f",
  storageBucket: "tofu-a6b1f.appspot.com",
  messagingSenderId: "74827497118",
  appId: "1:74827497118:web:4c3ee8420697de564f458f",
  measurementId: "G-1Q2RHZ4WN6"
};

ReactDOM.render(
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Router>
          <Route exact path="/" component={Register} />
          <Route path="/profile/:userId" component={Profile} />
          <Route path="/join" component={PayGuard} />
          <Route path="/upload" component={VideoIntroUpload} />
          <Route path="/generate" component={GenerateLink} />
          <Route path="/intros" component={VideoIntros} />
          <Route path="/path" component={App} />
          <Route path="/login" component={Login} />
          <Route path="/MyTeams" component={MyTeams} />
          <Route path="/chat/:id" component={TeamChat} />
          <Route path="/meeting/:sessionId/:token" component={VideoChat} />
        </Router>
      </FirebaseAppProvider>,
  document.getElementById('root')
);