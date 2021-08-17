import React, { useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

let arr = [{
	name: 'Upload Video Introduction',
	address: '/upload'
}, {
	name: 'Meetings Hosted',
	address: '/hosted'
}, {
	name: 'Meetings Attended',
	address: '/attended'
}, {
	name: 'Stripe Onboarding',
	address: '/onboarding'
}, {
	name: 'Earning Statistics',
	address: '/stats'
}];

const Account = () => {
	return (
		<div className="h-screen bg-gray-200 justify-between flex flex-col">
			<Navbar />
			<ul className="h-full flex flex-col justify-between my-5">
				<div className="border border-gray-400 h-20 bg-white text-center">
					<div className="my-5">Account Links</div>
				</div>
				{ arr ? arr.map(link => (
					<li className="border border-gray-400 h-20 bg-white items-center justify-between">
						<div>
							<div className="text-center my-5"><a href={`/${link.address}`}>{link.name}</a></div>
						</div>
					</li>
				)) : <div className="text-center my-10 text-xl">No Links</div> }
			</ul>
			<Footer />
		</div>
	);	
};

export default Account;