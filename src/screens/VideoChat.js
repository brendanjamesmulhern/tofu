import React, { useEffect, useState } from 'react';
import * as OT from '@opentok/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RealmApp from '../config/RealmApp';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const secret = "fb557b9b880c278439a508c66dbb85be03552739";
const apiKey = "47306554";

const VideoChat = () => {
	let { sessionID, token } = useParams;
	useEffect(() => {
		initTok();
	}, []);
	const initTok = () => {
		var session = OT.initSession(apiKey, sessionID);
		var publisher = OT.initPublisher('publisher', {
			insertMode: 'append',
			width: '100%',
			height: '100%',
		});
		session.connect(token, (error) => {
			session.publish(publisher);
		});
		session.on('streamCreated', function(event) {
			session.subscribe(event.stream, 'subscriber', {
				insertMode: 'append',
				width: '100%',
				height: '100%'
			});
		})
	};
	return (
		<div id="video" className="h-full w-full flex flex-col">
			<div className="h-96 w-screen" id='publisher'></div>
			<div className="h-96 w-screen" id='subscriber'></div>
		</div>
	);
};

export default VideoChat;