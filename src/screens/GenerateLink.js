import React from 'react';

const GenerateLink = () => {
	const GenerateLink = async () => {
		axios.get('https://api-tofu.herokuapp.com/getSessionAndToken').then(res => {
			setSessionID(res['data']['sessionId']);
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