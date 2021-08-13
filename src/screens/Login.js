import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import RealmApp from '../config/RealmApp';
import * as Realm from 'realm-web';
import { useHistory } from 'react-router-dom';

const Login = () => {
	let history = useHistory();
	let [email, setEmail] = useState();
	let [password, setPassword] = useState();
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
			localStorage.setItem('user', user);
			history.push('/MyTeams');
		};
	};
	const CheckUser = async (user) => {
		const mongodb = user.mongoClient('mongodb-atlas');
		const users = mongodb.db('tofu').collection('users');
		const result = await users.findOne({ "email": email });
		if (result === null) {
			const insert = await users.insertOne({ "email": email, username: null, "teams": [] })
		}
	};
	return (
		<div>
			<Navbar />
			<div className="bg-white w-screen h-screen flex flex-col">
				<div className="bg-gray-200 mt-20 mx-10 py-10">
					<div className="text-center text-4xl mt-5">Login</div>
					<div className="flex flex-col justify-center text-center items-center mt-5">
						<input className="text-center border border-gray-400 w-1/2 mt-5" type="email" placeholder="Email" onChange={handleEmail} />
						<input className="text-center border border-gray-400 w-1/2 mt-5" type="password" placeholder="Password" onChange={handlePassword} /> 
						<button className="btn border border-black mt-10 p-2" onClick={handleClick}>Login</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;