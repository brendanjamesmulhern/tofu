import React from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
	let history = useHistory();
	const handleClick = () => {
		history.push('/');
	};
	return (
		<nav className="border border-gray-400 bg-white shadow h-28 flex justify-center items-center">
			<button onClick={handleClick}>
				<div className="text-center text-6xl">tofu</div>
			</button>
		</nav>
	);
};

export default Navbar;