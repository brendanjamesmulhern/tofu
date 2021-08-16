import React, { useRef } from 'react';

const Video = ({ url }) => {
	const videoReference = useRef(null);
	const play = () => {
		if (videoReference.current.paused || videoReference.current.ended) {
			videoReference.current.play();
		} else {
			videoReference.current.pause();
		}
	};
	const mute = () => {
		videoReference.current.mute();
	};
	return (
		<video ref={videoReference} className="h-screen w-screen bg-gray-300" onClick={play}>
			<source src={url} type="video/mp4" />
		</video>
	);
};

export default Video;