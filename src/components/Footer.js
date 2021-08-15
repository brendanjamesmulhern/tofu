import React from 'react';

const Footer = () => {
	return (
		<footer className="bg-blue-200 shadow h-20 border border-gray-400 text-center flex sticky">
			<button className="text-black bg-blue-400 h-full w-full border border-black justify-center"><a href={`/intros`}><span className="text-4xl">P</span><span className="text-sm">opular</span></a></button>
			<button className="text-black bg-blue-400 h-full w-full border border-black justify-center"><a href={`/search`}><span className="text-4xl">S</span><span className="text-sm">earch</span></a></button>
			<button className="text-black bg-blue-400 h-full w-full border border-black justify-center"><a href={`/browse`}><span className="text-4xl">B</span><span className="text-sm">rowse</span></a></button>
			<button className="text-black bg-blue-400 h-full w-full border border-black justify-center"><a href={'/upload'}><span className="text-4xl">U</span><span className="text-sm">pload</span></a></button>
		</footer>
	);
}

export default Footer;