import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RealmApp from '../config/RealmApp';
import { useParams } from 'react-router-dom';

const TeamChat = () => {
	let [teamName, setTeamName] = useState();
	let [messages, setMessages] = useState();
	let { id } = useParams();
	useEffect(() => {
		getMessages();
	}, []);
	const getMessages = async () => {
		console.log(id);
		const app = await RealmApp();
		const mongodb = app.currentUser.mongoClient('mongodb-atlas');
		const users = mongodb.db('tofu').collection('users');
		const email = localStorage.getItem('email');
		const user = await users.findOne({ "email": email });
		user['teams'].map(teamFromDB => {
			if (teamFromDB['_id'].toString() === id) {
				setTeamName(teamFromDB['name']);
				setMessages(teamFromDB['messages']);
			}
		})
	};
	return (
		<div className="flex flex-col h-screen justify-between">
			<Navbar />
			<div className="h-full w-full bg-gray-200">
				<div className="h-20 bg-white mt-2 shadow">
					<div className="text-center text-4xl text-semibold">{teamName}</div>
				</div>
				<div className="bg-white h-full mt-2 overflow-auto">
					{ messages ? messages.map(message => (
						<div key={message._id}>
							<div className="text-center my-2 mx-10">{message.owner} : {message.text}</div>
						</div>
					 ))
					: <></>}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default TeamChat;