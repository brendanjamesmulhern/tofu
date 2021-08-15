import React, { useEffect } from 'react';
import axios from 'axios';

const GenerateLink = () => {
	const GenerateLink = async () => {
		axios.get('https://api-tofu.herokuapp.com/getSessionAndToken').then(res => {
			alert(`https://tofu-pied.vercel.app/${res['data']['sessionId']}/${res['data']['token']}`)
		})
	};
	return (
		<div>
			<button onClick={GenerateLink}>Generate Link</button>
		</div>
	);
};

export default GenerateLink;