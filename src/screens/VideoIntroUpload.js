import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import "firebase/storage";
import "firebase/firestore";
import RealmApp from '../config/RealmApp';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VideoIntroUpload =() => {
	let [file, setFile] = useState();
	const storage = firebase.storage();
	const getVideoIntros = async () => {
		var app = await RealmApp();
		var storageRef = storage.ref();
		var fileName = file.name.split(" ").join("");
		var videoIntroRef = storageRef.child('videoIntros/' + fileName);
		if (localStorage.getItem('email')) {
			videoIntroRef.put(file).then((snapshot) => {
				var mongodb = app.currentUser.mongoClient('mongodb-atlas');
				var users = mongodb.db('tofu').collection('users');
				if (snapshot['_delegate']['state'] === 'success') {
						doMongoDBStuff(snapshot, videoIntroRef);
					} else {
						alert("please login to upload")
					}
				});
		}
	};
	const doMongoDBStuff =  async (snapshot, videoIntroRef) => {
		videoIntroRef.getDownloadURL().then(url => {
			let newVideo = { "url": url, date: new Date().toISOString() };
			let email = localStorage.getItem('email');
			let out = {
				newVideo: newVideo,
				email: email
			};
			axios.post('https://api-tofu.herokuapp.com/updateVideoUrls', out).then(res => {
				console.log(res);
			});
		});
	}	
	const handleUpload = (e) => {
		setFile(e.target.files[0]);
	}
	return (
		<div className="flex flex-col h-screen justify-between">
			<Navbar />
			<div className="flex flex-col items-center">
				<input className="-mt-5" type="file" onChange={handleUpload} />
				<button className="mt-5" onClick={getVideoIntros}>Upload</button>
			</div>
			<Footer />
		</div>
	);
};

export default VideoIntroUpload;