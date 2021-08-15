import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RealmApp from '../config/RealmApp';
import BSON from 'bson';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MentorProfile = (props) => {
	let [user, setUser] = useState();
	let [date, setDate] = useState();
	let [time, setTime] = useState();
	useEffect(() => {
		getUser();
	}, []);
	const getUser = async () => {
		let userId = props.match.params.userId
		console.log(userId);
		var app = await RealmApp();
		const mongodb = app.currentUser.mongoClient('mongodb-atlas');
		const users = mongodb.db('tofu').collection('users');
		const res =	await users.findOne({ "_id": BSON.ObjectId(userId) });
		console.log(res);
		setUser(res);
	};
	const handleDate = (e) => {
		setDate(e.target.value);
	};
	const handleTime = (e) => {
		setTime(e.target.value);
	}
	const handleClick = () => {
		let out = {
			mentorId: props.match.params.userId,
			date: date,
			time: time,
			payeeEmail: localStorage.getItem('email')
		};
		axios.post('https://api-tofu.herokuapp.com/', out).then(res => {
			console.log(res['data']);
		})
	};
	return (
		<div className="flex flex-col h-screen justify-between">
			<Navbar />
			<div>
				{ user ? <div className="flex flex-col text-center justify-center">
					<div>{user.email}</div>
					<div>{user.username}</div>	
					<div className="flex flex-col items-center">
						<div>Book A Meeting</div>
						<div className="flex">
							<input onChange={handleDate} type="date" />
							<input onChange={handleTime} type='time' />
						</div>
						<button onClick={handleClick}>Pay With Stripe</button>
					</div>
				</div> : <></> }
			</div>
			<Footer />
		</div>
	);
};

export default MentorProfile;
