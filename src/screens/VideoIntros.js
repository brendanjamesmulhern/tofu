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
						videos.push({ video: video, user: user });
					})
				})
				setVideos(videos);
			})
	}, [])
	return (
		<div className="flex flex-col justify-between h-screen">
			<Navbar />
			<div className="flex flex-col overflow-auto -mt-20">
				{ videos ? videos.sort((firstItem, secondItem) => secondItem.date - firstItem.date).map(video => (
					<div key={video.video._id} className="flex flex-col -mt-8">
						<div className="flex flex-col justify-between mb-40">
						<div className="text-center text-lg text-bold mt-8">{video.video.name}</div>
							<div className="text-center text-md text-semibold mt-8"><a href={`/profile/${video.user._id}`}>{video.user.username}</a></div>
							<div className="text-center text-sm mt-8">{video.video.date.split("T").splice(0, 1).join("")} {video.video.date.split("T").splice(1, 2).splice(0, 7).join("")}</div>
						</div>
						<div className="flex place-items -mt-40">
							<Video url={video.video.url} />
						</div>
						<div className="text-center">
							<div className="text-md mt-10">{video.video.description}</div>
						</div>
					</div>
				)) : <></> }
			</div>
			<Footer />
		</div>
	);
};

export default VideoIntros;