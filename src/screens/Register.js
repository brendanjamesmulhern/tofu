import RealmApp from '../config/RealmApp';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = ({ setUser }) => {
	let history = useHistory();
	let [name, setName] = useState();
	let [email, setEmail] = useState();
	let [password, setPassword] = useState();
	let [passwordConfirm, setPasswordConfirm] = useState();
	let [rate, setRate] = useState('price_1JOX9MGBUpznK6SDHO2CvKSI');
	const handleClick = async () => {
		localStorage.setItem('personName', name);
		localStorage.setItem('hourlyRate', rate);
		if (name && email && password === passwordConfirm) {
			const app = await RealmApp();
			const result = await app.emailPasswordAuth.registerUser(email, password);
			if (result === undefined) {
				history.push('/login');
			} else {
				alert("You are already registered. Please log in.")
			}
		} else {
			alert("Something is wrong with your registration. Please try again.")
		}
	};
	const handleName = (e) => {
		setName(e.target.value);
	};
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};
	const handlePasswordConfirm = (e) => {
		setPasswordConfirm(e.target.value);
	};
	const handleRate = (e) => {
		setRate(e.target.value);
	};
	return (
		<div className="bg-white w-screen h-screen flex flex-col justify-between">
			<Navbar />
			<div className="bg-white">
				<div className="text-center flex flex-col items-center">
					<div className="flex flex-col bg-gray-200 px-10 py-5">
						<div className="text-center text-bold text-4xl pb-5">Register</div>
						<div className="flex flex-col">
							<div className="mt-2 text-semibold text-lg mx-5">Hello and welcome to tofu! A space for forming meaningful connections.</div>
							<div className="mt-2 text-semibold text-md mx-5">If you wish to join and create your own team please fill out the form below.</div>
						</div>
						<input onChange={handleName} type="text" placeholder="Name" className="text-center text-semibold text-lg border border-gray-400 mt-5" />
						<input onChange={handleEmail} type="email" placeholder="Email" className="text-center text-semibold text-lg border border-gray-400 mt-5" />
						<input onChange={handlePassword} type="password" placeholder="Password" className="text-center text-semibold text-lg border border-gray-400 mt-5" />
						<input onChange={handlePasswordConfirm} type="password" placeholder="Password Confirmation" className="text-center text-semibold text-lg border border-gray-400 mt-5" />
						<input onChange={handleRate} type="number" placeholder="Hourly Rate" className="text-center text-semibold text-lg border border-gray-400 mt-5" />
						<a className="mt-5 text-blue-700" href={`/login`}>Already have an account? Login.</a>
						<button onClick={handleClick} className="mt-10 btn border border-black">Register for tofu!</button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Register;