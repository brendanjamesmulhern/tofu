import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import firebase from 'firebase/app';
import "firebase/storage";
import "firebase/firestore";
import Video from '../components/Video';

const VideoIntros = () => {
	var storage = firebase.storage();
	var files = firebase.firestore().collection('videoIntros');
	/* 
	useEffect(() => {
		files.get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				let docs = videosIntros;
				docs.push(doc);
				setVideoIntros(doc);
			});
		});
	}, []);
	*/
	return (
		<div className="flex flex-col justify-between h-screen">
			<Navbar />
			<div className="bg-gray-400">
				{/* { videoIntros ? videoIntros.map(intro => (
					{/* <Video url={intro.url} /> }
				)) : <></> } 
				*/}
			</div>
			<Footer />
		</div>
	);
};

export default VideoIntros;