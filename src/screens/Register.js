import RealmApp from '../config/RealmApp';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register = ({ setUser }) => {
	let history = useHistory();
	let [username, setUsername] = useState();
	let [email, setEmail] = useState();
	let [password, setPassword] = useState();
	let [passwordConfirm, setPasswordConfirm] = useState();
	const handleClick = async () => {
		if (username && email && password === passwordConfirm) {
			const app = await RealmApp();
			const result = await app.emailPasswordAuth.registerUser(email, password);
			if (result === 'undefined') {
				history.push('/login');
			};
		};
	};
	const handleUsername = (e) => {
		setUsername(e.target.value);
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
	return (
		<div className="bg-white w-screen h-screen">
			<div className="bg-white mt-5">
				<div className="text-center flex flex-col items-center">
					<div className="flex">
						<div className="text-bold text-center text-6xl">tofu</div>
					</div>
					<div className="flex flex-col mt-5">
						<div className="mt-2 text-semibold text-lg mx-5">Hello and welcone to tofu! A chat app for teams.</div>
						<div className="mt-2 text-semibold text-lg mx-5">If you wish to join and create your own team please fill out the form below.</div>
					</div>
					<div className="flex flex-col bg-gray-200 px-10 py-10">
						<div className="text-center text-bold text-4xl pb-5">Register</div>
						<input onChange={handleUsername} type="text" placeholder="Username" className="text-center text-semibold text-lg border border-gray-400 mt-5" />
						<input onChange={handleEmail} type="email" placeholder="Email" className="text-center text-semibold text-lg border border-gray-400 mt-5" />
						<input onChange={handlePassword} type="password" placeholder="Password" className="text-center text-semibold text-lg border border-gray-400 mt-5" />
						<input onChange={handlePasswordConfirm} type="password" placeholder="Password Confirmation" className="text-center text-semibold text-lg border border-gray-400 mt-5" />
						<a className="mt-5 text-blue-700" href={`/login`}>Already have an account?</a>
						<button onClick={handleClick} className="mt-10 btn border border-black">Register for tofu!</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;