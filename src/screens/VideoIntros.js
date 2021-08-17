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
		<div className="flex flex-col justify-between h-full">
			<Navbar />
			<div className="flex flex-col overflow-auto">
				{ videos ? videos.sort((firstItem, secondItem) => secondItem.date - firstItem.date).map(video => (
					<div key={video.video._id}>
						<div className="flex">
							{console.log(video)}
							<div className="justify-start text-sm">{video.user.username}</div>
							<div className="justify-center text-sm"><a href={`/profile/${video.user._id}`}>Visit Profile</a></div>
							<div className="justify-end text-sm">{video.video.date}</div>
						</div>
						<Video url={video.video.url} />
					</div>
				)) : <></> }
			</div>
			<Footer className="bottom-0 relative" />
		</div>
	);
};

export default VideoIntros;