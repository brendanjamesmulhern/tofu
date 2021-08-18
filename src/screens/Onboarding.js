import React, { useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Onboarding = () => {
	let [url, setUrl] = useState();
	useEffect(() => {
		getUrl();
	}, [])
	const getUrl = () => {
		let accountId = localStorage.getItem('accountId');
		let out = { 
			accountId: accountId
		};
		axios.post('https://api-tofu.herokuapp.com/createStripeUrl', out).then(res => {
			console.log(res['data']);
		});
	};
	return (
		<div className="flex flex-col h-screen justify-between bg-gray-200">
			<Navbar />
			<div>
				<div></div>
			</div>
			<Footer />
		</div>
	);
};

export default Onboarding;