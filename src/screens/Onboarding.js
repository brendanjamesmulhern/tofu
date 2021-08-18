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
			setUrl(res['data']['url']);
		});
	};
	const handleOnboarding = () => {
		window.open(url, "_blank");
	};
	return (
		<div className="flex flex-col h-screen justify-between bg-gray-200">
			<Navbar />
			<div>
				<div className="bg-white h-20 -mt-40">
					<div className="text-center text-bold text-2xl">Onboarding</div>
				</div>
				<div className="bg-white -mt-10">
					<div className="text-center">Please complete onboarding in order to start earning from tofu!</div>
				</div>
				<div className="bg-white mt-20">
					<div className="text-center">Here is the link! <button className="text-blue-700" onClick={handleOnboarding.bind(this, url)}>Stripe Onboarding</button></div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Onboarding;