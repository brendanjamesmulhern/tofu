import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import "firebase/storage";
import "firebase/firestore";
import RealmApp from '../config/RealmApp';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useHistory } from 'react-router-dom';

const VideoIntroUpload =() => {
	let history = useHistory();
	let [file, setFile] = useState();
	let [name, setName] = useState();
	let [description, setDescription] = useState();
	const storage = firebase.storage();
	// useEffect(() => {
	// 	navigator.mediaDevices.enumerateDevices().then(res => {
	// 		console.log(res);
	// 	});
	// 	let preview = document.getElementById('preview');
	// 	let recording = document.getElementById('recording');
	// 	let startButton = document.getElementById('startButton');
	// 	let stopButton = document.getElementById('stopButton');
	// 	let downloadButton = document.getElementById('downloadButton');
	// 	let logElement = document.getElementById('log');
	// 	let recordingTimeMS = 5000;
	// 	const log = (msg) => {
	// 		logElement.innerHTML += msg + "\n";
	// 	};
	// 	const wait = (delayInMS) => {
	// 		return new Promise(resolve => setTimeout(resolve, delayInMS));
	// 	}
	// 	const startRecording = (stream, lengthInMS) => {
	// 		let recorder = new MediaRecorder(stream);
	// 		let data = [];
	// 		recorder.ondataavailable = event => data.push(event.data);
	// 		recorder.start();
	// 		log(recorder.state + " for " + (lengthInMS/1000) + "seconds...");
	// 		let stopped = new Promise((resolve, reject) => {
	// 			recorder.onstop = resolve;
	// 			recorder.onerror = event => reject(event.name);
	// 		});
	// 		let recorded = wait(lengthInMS).then(
	// 			() => recorded.state === "recording" && recorder.stop()
	// 		);
	// 		return Promise.all([
	// 			stopped,
	// 			recorded
	// 		]).then(() => data);
	// 	};
	// 	const stop = (stream) => {
	// 		stream.getTracks().forEach(track => track.stop());
	// 	};
	// 	startButton.addEventListener("click", () => {
	// 		navigator.mediaDevices.getUserMedia({
	// 			audio: true,
	// 			video: true
	// 		}).then(stream => {
	// 			preview.srcObject = stream;
	// 			downloadButton.href = stream;
	// 			preview.captureStream = preview.captureStream || preview.mozCaptureStream;
	// 			return new Promise(resolve => preview.onplaying = resolve);
	// 		}).then(() => startRecording(preview.captureStream(), recordingTimeMS)).then(recordedChunks => {
	// 			let recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
	// 			setFile(recordedBlob);
	// 			recording.src = URL.createObjectURL(recordedBlob);
	// 			downloadButton.href = recording.src;
	// 			downloadButton.download = "RecordedVideo.webm";
	// 			log("Successfully recorded " + recordedBlob.size + " bytes of " + recordedBlob.type + " media.");
	// 		}).catch(log);
	// 	}, false);
	// 	stopButton.addEventListener("click", () => {
	// 		stop(preview.srcObject);
	// 	}, false);
	// }, [])
	const getVideoIntros = async () => {
		// console.log(localStorage.getItem('onboarded'));
		if (localStorage.getItem('onboarded')) {
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
			};
			} else {
				alert("You must first onboard to upload video introductions!");
			}
	};
	const doMongoDBStuff =  async (snapshot, videoIntroRef) => {
		videoIntroRef.getDownloadURL().then(url => {
			if (url && description && name) {
				let newVideo = { 
					"name": name, 
					"url": url, 
					"date": new Date().toISOString(), 
					"description": description 
				};
				let email = localStorage.getItem('email');
				let out = {
					newVideo: newVideo,
					email: email
				};
				axios.post('https://api-tofu.herokuapp.com/updateVideoUrls', out).then(res => {
					history.push('/');
				});
			} else {
				alert("Please upload video or set description")
			}
		});
	};
	const handleChange = (e) => {
		setName(e.target.value);
	};
	const handleFileChange = (e) => {
		setFile(e.target.files[0])
	};
	const onDescriptionChange = (e) => {
		setDescription(e.target.value);
	};
 	return (
		<div className="flex flex-col h-screen justify-between">
			<Navbar />
			<div className=" h-screen w-screen flex flex-col items-center">
				<div className="bg-gray-200 w-screen h-full">
					<div className="text-center mt-5 text-2xl text-semibold">Video Upload</div>
					<div className="flex flex-col mt-5 items-center">
						<div className="mt-2 text-center mr-2">Video Name</div>
						<input type="text" placeholder="Video name" onChange={handleChange} className="text-center ml-2 mt-2 w-80 border border-gray-400" />
					</div>
					<div className="flex flex-col mt-10 place-items">
						<div className="mt-2 text-center mr-2">Description</div>
						<input className="mx-2 h-20 mt-2 text-center border border-gray-400 ml-2" type="text" placeholder="Enter video description here." onChange={onDescriptionChange} />
					</div>
					<div className="mt-10 flex flex-col items-center">
						<div className="mt-2 text-center text-md">File</div>
						<input className="mt-10 text-center flex place-item" type="file" onChange={handleFileChange} />
					</div>
					<div className="mt-10 flex justify-center">
						<button className="mt-5 text-center btn text-xl text-semibold" onClick={getVideoIntros}>Upload</button>
					</div>
				</div>
				{/* <div id="log"></div>
				<div className="left">
					<div id="startButton" className="button">Start</div>
					<h2>Preview</h2>
					<video id="preview" width="80" height="60" autoPlay muted></video>		
				</div>	
				<div className="right">
					<div id="stopButton" className="button">Stop</div>
					<h2>Recording</h2>
					<video id="recording" width="80" height="60" controls></video>
					<a id="downloadButton" className="button">Download</a>
				</div> */}
			</div>
			<Footer />
		</div>
	);
};

export default VideoIntroUpload;