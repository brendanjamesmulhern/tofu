import React from 'react';

const Footer = () => {
	if (!localStorage.getItem('email')) {
		return (
			<footer className="bg-blue-200 shadow h-16 border border-gray-400 text-center flex">
				<button className="text-black bg-blue-400 h-full w-full border border-black justify-center"><a href={`/`}><span className="text-4xl">P</span><span className="text-sm">opular</span></a></button>
				<button className="text-black bg-blue-400 h-full w-full border border-black justify-center"><a href={`/search`}><span className="text-4xl">S</span><span className="text-sm">earch</span></a></button>
				<button className="text-black bg-blue-400 h-full w-full border border-black justify-center"><a href={`/login`}><span className="text-4xl">S</span><span className="text-sm">ign In</span></a></button>
			</footer>
		);
	} else {
		return (
			<footer className="bg-blue-200 shadow h-16 border border-gray-400 text-center flex">
				<button className="text-black bg-blue-400 h-full w-full border border-black justify-center"><a href={`/`}><span className="text-4xl">P</span><span className="text-sm">opular</span></a></button>
				<button className="text-black bg-blue-400 h-full w-full border border-black justify-center"><a href={`/search`}><span className="text-4xl">S</span><span className="text-sm">earch</span></a></button>
				<button className="text-black bg-blue-400 h-full w-full border border-black justify-center"><a href={'/account'}><span className="text-4xl">A</span><span className="text-sm">ccount</span></a></button>
			</footer>
		);
	};
}

export default Footer;