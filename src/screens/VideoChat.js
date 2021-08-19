import React, { useEffect, useState } from 'react';
import { OTPublisher, createSession, OTSubscriber } from 'opentok-react';
import RealmApp from '../config/RealmApp';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import OT from '@opentok/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const secret = "fb557b9b880c278439a508c66dbb85be03552739";
const apiKey = "47306554";

class VideoChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    	streams: [],
    	sessionId: this.props.match.params.sessionId,
    	token: this.props.match.params.token
    };
  }
  componentWillMount() {
	// console.log(this.props.match.params)
    this.sessionHelper = createSession({
      apiKey: apiKey,
      sessionId: this.state.sessionId,
      token: this.state.token,
      onStreamsUpdated: streams => { this.setState({ streams }); }
    });
  }
 
  componentWillUnmount() {
    this.sessionHelper.disconnect();
  }
 
  render() {
    return (
      <div className="flex flex-col h-screen justify-between bg-gray-200">
        <Navbar />
        <div className="flex flex-col mx-20">
          <OTPublisher className="w-screen h-full" session={this.sessionHelper.session} />
          {this.state.streams.map(stream => {
            return (
              <OTSubscriber className="w-screen h-full"
                key={stream.id}
                session={this.sessionHelper.session}
                stream={stream}
              />
            );
          })}
        </div>
        <Footer />
      </div>
    );
  }
}

export default VideoChat;