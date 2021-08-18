import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RealmApp from '../config/RealmApp';
import * as Realm from 'realm-web';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

const Login = () => {
	let history = useHistory();
	let [email, setEmail] = useState();
	let [password, setPassword] = useState();
	let [stripeId, setStripeId] = useState();
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};
	const handleClick = async () => {
		const app = await RealmApp();
		const credentials = Realm.Credentials.emailPassword(email, password);
		const user = await app.logIn(credentials);
		CheckUser(user);
		localStorage.setItem('email', email);
		if (user !== undefined) {
			checkIfOnboarded().then(res => {
				if (res === true) {
					history.push('/');
				} else {
					history.push('/onboarding');
				};
			});
		} else {
			alert("Wrong email or password! Please try again!")
		}
	};
	const CheckUser = async (user) => {
		const mongodb = user.mongoClient('mongodb-atlas');
		const users = mongodb.db('tofu').collection('users');
		const result = await users.findOne({ "email": email });
		if (result === null) {
			addUser();
		};
	};
	const checkIfOnboarded = () => {
		let out = {
			accountId: localStorage.getItem('accountId')
		};
		console.log(out);
		return axios.post('https://api-tofu.herokuapp.com/checkIfOnboarded', out).then(res => {
			localStorage.setItem('onboarded', res['data']);
			console.log(res['data']);
			return res['data']['details_submitted'];
		});
	};	
	const addUser = async () => {
		let stripeId = await createStripeUser();
		setStripeId(stripeId);
		let name = localStorage.getItem('personName');
		let newUser = { 
			"email": email, 
			"teams": [], 
			"isPremium": false,
			"videos": [],
			"meetings": [],
			"stripeId": stripeId,
			"username": email.split("@").splice(0, 1).join(""),
			"name": name
		};
		// console.log(name);
		axios.post('https://api-tofu.herokuapp.com/add-new-user', newUser);
	};
	const createStripeUser = () => {
		let out = {};
		return axios.post('https://api-tofu.herokuapp.com/createStripeAccount', out).then(res => {
			localStorage.setItem('accountId', res['data']['accountId']);
			return res['data']['accountId'];
		}).catch(err => {
			console.error(err);
		});
	};
	return (
		<div className="h-screen flex flex-col justify-between">
			<Navbar />
			<div className="bg-white w-screen h-screen flex flex-col">
				<div className="bg-gray-200 mt-20 mx-10 py-10">
					<div className="text-center text-4xl mt-5">Login</div>
					<div className="flex flex-col justify-center text-center items-center mt-5">
						<input className="text-center border border-gray-400 w-1/2 mt-5" type="email" placeholder="Email" onChange={handleEmail} />
						<input className="text-center border border-gray-400 w-1/2 mt-5" type="password" placeholder="Password" onChange={handlePassword} /> 
						<a className="text-center text-blue-700 mt-10" href={`/register`}>New to tofu? Register.</a>
						<button className="btn border border-black mt-10 p-2" onClick={handleClick}>Login</button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Login;