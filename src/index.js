import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './screens/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VideoChat from './screens/VideoChat';
import { FirebaseAppProvider } from 'reactfire';
import VideoIntros from './screens/VideoIntros';
import VideoIntroUpload from './screens/VideoIntroUpload';
import Register from './screens/Register';
import Profile from './screens/Profile';
import SearchVideoIntros from './screens/SearchVideoIntros';
import MyMeetingsAttended from './screens/MyMeetingsAttended';
import MyMeetingsHosted from './screens/MyMeetingsHosted';
import MyStats from './screens/MyStats';
import MyVideos from './screens/MyVideos';
// import PayGuard from './screens/PayGuard';

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
          <Route exact path="/" component={VideoIntros} />
          <Route path="/search" component={SearchVideoIntros} />
          <Route path="/upload" component={VideoIntroUpload} />
          <Route path="/profile/:userId" component={Profile} />
          <Route path="/meeting/:sessionId/:token" component={VideoChat} />
          <Route path="/myMeetingsAttended" component={MyMeetingsAttended} />
          <Route path="/myMeetingsHosted" component={MyMeetingsHosted} />
          <Route path="/myVideos" component={MyVideos} />
          <Route path="/myStats" component={MyStats} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          {/* <Route path="/join" component={PayGuard} /> */}
        </Router>
      </FirebaseAppProvider>,
  document.getElementById('root')
);