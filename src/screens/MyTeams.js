import React, { useEffect, useState } from 'react';
import RealmApp from '../config/RealmApp';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BSON from 'bson';

const MyTeams = () => {
	let [teams, setTeams] = useState();
	useEffect(() => {
		getMyUser();
	}, []);
	const getMyUser = async () => {
		const app = await RealmApp();
		const mongodb = app.currentUser.mongoClient('mongodb-atlas');
		const users = mongodb.db('tofu').collection('users');		
		let email = localStorage.getItem('email');
		users.findOne({ "email": email }).then(res => {
			setTeams(res['teams']);
		}).catch(console.error);
	};
	return (
		<div className="flex flex-col h-screen w-screen justify-between">
			<Navbar />
			<div className="container bg-gray-400 h-full w-screen">
				{ teams ? teams.map(team => (
					<div key={team._id} className="bg-white h-20 w-screen my-2 flex flex-col shadow">
						<div className="text-center text-bold text-2xl my-1"><a href={`/chat/${team._id}`}>{team.name}</a></div>
						<div className="text-center text-semibold text-xl"><span className="text-xl">{team.messages[team.messages.length-1].owner}</span> : <span className="text-lg text-semibold">{team.messages[team.messages.length-1].text}</span></div>
					</div>
				)) : <></> }
			</div>
			<Footer />
		</div>
	);
};

export default MyTeams;