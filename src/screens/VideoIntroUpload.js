import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import "firebase/storage";
import "firebase/firestore";
import RealmApp from '../config/RealmApp';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VideoIntroUpload =() => {
	useEffect(() => {
		let preview = document.getElementById('preview');
		let recording = document.getElementById('recording');
		let startButton = document.getElementById('startButton');
		let stopButton = document.getElementById('stopButton');
		let downloadButton = document.getElementById('downloadButton');
		let logElement = document.getElementById('log');
		let recordingTimeMS = 5000;
		const log = (msg) => {
			logElement.innerHTML += msg + "\n";
		};
		const wait = (delayInMS) => {
			return new Promise(resolve => setTimeout(resolve, delayInMS));
		}
		const startRecording = (stream, lengthInMS) => {
			let recorder = new MediaRecorder(stream);
			let data = [];
			recorder.ondataavailable = event => data.push(event.data);
			recorder.start();
			log(recorder.state + " for " + (lengthInMS/1000) + "seconds...");
			let stopped = new Promise((resolve, reject) => {
				recorder.onstop = resolve;
				recorder.onerror = event => reject(event.name);
			});
			let recorded = wait(lengthInMS).then(
				() => recorded.state === "recording" && recorder.stop()
			);
			return Promise.all([
				stopped,
				recorded
			]).then(() => data);
		};
		const stop = (stream) => {
			stream.getTracks().forEach(track => track.stop());
		};
		startButton.addEventListener("click", () => {
			navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true
			}).then(stream => {
				preview.srcObject = stream;
				downloadButton.href = stream;
				preview.captureStream = preview.captureStream || preview.mozCaptureStream;
				return new Promise(resolve => preview.onplaying = resolve);
			}).then(() => startRecording(preview.captureStream(), recordingTimeMS)).then(recordedChunks => {
				let recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
				recording.src = URL.createObjectURL(recordedBlob);
				downloadButton.href = recording.src;
				downloadButton.download = "RecordedVideo.webm";
				log("Successfully recorded " + recordedBlob.size + " bytes of " + recordedBlob.type + " media.");
			}).catch(log);
		}, false);
		stopButton.addEventListener("click", () => {
			stop(preview.srcObject);
		}, false);
	}, [])
	let [file, setFile] = useState();
	let [chunks, setChunks] = useState();
	let [name, setName] = useState();
	let [mediaRecorder, setMediaRecorder] = useState();
	const storage = firebase.storage();
	const getVideoIntros = async () => {
		var app = await RealmApp();
		var storageRef = storage.ref();
		var videoIntroRef = storageRef.child('videoIntros/' + name.split(" ").join("") + '.mp4');
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
	};
	const handleChange = (e) => {
		setName(e.target.value);
	};
	return (
		<div className="flex flex-col h-screen justify-between">
			<Navbar />
			<div className=" h-screen w-screen flex flex-col items-center z-10">
				<div id="log"></div>
				<div className="left">
					<div id="startButton" className="button">Start</div>
					<h2>Preview</h2>
					<video id="preview" width="160" height="120" autoPlay muted></video>		
				</div>	
				<div className="right">
					<div id="stopButton" className="button">Stop</div>
					<h2>Recording</h2>
					<video id="recording" width="160" height="120" controls></video>
					<a id="downloadButton" className="button">Download</a>
				</div>
				<input type="text" placeholder="Video name" onChange={handleChange} />
				<button className="mt-20 z-0" onClick={getVideoIntros}>Upload</button>
			</div>
			<Footer />
		</div>
	);
};

export default VideoIntroUpload;