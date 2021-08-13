import React from 'react';

const Footer = () => {
	return (
		<footer className="bg-blue-200 shadow h-20 border border-gray-400 text-center flex sticky">
			<button className="text-black bg-blue-400 h-full w-full border border-black justify-center"><span className="text-4xl">M</span><span className="text-sm">y Teams</span></button>
			<button className="text-black bg-blue-400 h-full w-full border border-black justify-center"><span className="text-4xl">C</span><span className="text-sm">reate A Team</span></button>
		</footer>
	);
}

export default Footer;