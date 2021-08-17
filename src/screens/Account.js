import React, { useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Account = () => {
	return (
		<div className="h-screen bg-gray-200 justify-between flex flex-col">
			<Navbar />
			<div className="text-center">Account Links</div>
			<ul className="h-full flex flex-col justify-between my-20">
				<li>
					<div>
						<div className="text-center"><a href={'/upload'}>Upload Video Introduction</a></div>
					</div>
				</li>
				<li>
					<div className="flex">
						<div className="text-center"><a href={'/hosted'}>Meetings Hosted</a></div>
					</div>
				</li>
				<li>
					<div className="flex">
						<div className="text-center"><a href={'/attended'}>Meetings Attended</a></div>
					</div>
				</li>
				<li>
					<div className="flex">
						<div className="text-center"><a className="text-center" href={'/onboarding'}>Stripe Onboarding</a></div>
					</div>
				</li>
				<li>
					<div className="flex">
						<div className="text-center"><a className="text-center" href={'/stats'}>Earning Statistics</a></div>
					</div>
				</li>
			</ul>
			<Footer />
		</div>
	);	
};

export default Account;