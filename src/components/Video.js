import React from 'react';

const Video = ({ url }) => {
	return (
		<video className="w-screen h-screen bg-black">
			<source src={url} />
		</video>
	);
};

export default Video;