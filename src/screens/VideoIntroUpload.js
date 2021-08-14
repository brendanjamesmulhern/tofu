import React, { useState } from 'react';
import firebase from 'firebase/app';
import "firebase/storage";
import "firebase/firestore";
import RealmApp from '../config/RealmApp';

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
						doMongoDBStuff(snapshot, users);
					} else {
						alert("please login to upload")
					}
				});
		}
	};
	const doMongoDBStuff =  async (snapshot, users) => {
		let url = 'gs://tofu-a6b1f.appspot.com/' + snapshot['ref']['_delegate']['_location']['path'];
		let newVideo = { "url": url, date: new Date().toISOString() };
		let email = localStorage.getItem('email');
		var query = { "email": email };
		var update = { "$addToSet": { videos: newVideo }};
		const result = await users.updateOne(query, update);
		console.log(result);
	}	
	const handleUpload = (e) => {
		setFile(e.target.files[0]);
	}
	return (
		<div>
			<input type="file" onChange={handleUpload} />
			<button onClick={getVideoIntros}>Upload</button>
		</div>
	);
};

export default VideoIntroUpload;