import React from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
	let history = useHistory();
	const handleClick = () => {
		history.push('/');
	};
	return (
		<nav className="border border-gray-400 bg-white shadow h-28 flex justify-center items-center flex-col">
			<button onClick={handleClick}>
				<div className="text-center text-6xl mt-4">tofu</div>
			</button>
			<a className="text-md my-6" href="tel:+16038285729">Contact tofu</a>
		</nav>
	);
};

export default Navbar;