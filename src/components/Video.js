import React from 'react';

const Video = ({ url }) => {
	return (
		<video controls className="w-full h-full bg-black">
			<source src={url} type="video/mp4" />
		</video>
	);
};

export default Video;