import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import firebase from 'firebase/app';
import Video from '../components/Video';
import axios from 'axios';

const VideoIntros = () => {
	let [videos, setVideos] = useState();	 
	useEffect(() => {
			axios.get('https://api-tofu.herokuapp.com/getAllVideoIntros').then(res => {
				let usersFromDB = res['data'];
				let videos = [];
				usersFromDB.map(user => {
					user.videos.map(video => {
						videos.push(video);
					})
				})
				setVideos(videos);
			})
	}, [])
	return (
		<div className="flex flex-col justify-between h-screen">
			<Navbar />
			<div className="flex flex-col overflow-auto">
				{ videos ? videos.sort((firstItem, secondItem) => secondItem.date - firstItem.date).map(video => (
					<div key={video._id} className="-mt-16">
						<Video url={video.url} />
					</div>
				)) : <></> }
			</div>
			<Footer className="bottom-0 relative" />
		</div>
	);
};

export default VideoIntros;