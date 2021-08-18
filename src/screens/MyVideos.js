import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const MyVideos = () => {
    let [videos, setVideos] = useState();
    useEffect(() => {
        getVideos();
    }, [])
    const getVideos = () => {
        let out = {
            email: email
        };
        axios.post('https://api-tofu.herokuapp.com/myVideos', out).then(res => {
            setVideos(res['data']);
        });
    };
    const handleDelete = (videoId) => {
        axios.delete(`https://api-tofu.herokuapp.com/deleteVideo/${videoId}/${localStorage.getItem('email')}`).then(res => {
            alert(res['data']);
            window.location.reload();
        });
    };
    return (
        <div className="flex flex-col justify-between h-screen bg-gray-200">
            <Navbar />
            <ul className="flex flex-col">
                { videos ? videos.sort((a, b) => b.date - a.date).map(video => (
                    <li classNmae="grid grid-cols-4 h-20 bg-white">
                        <div>{video.date.split("T").splice(0, 1).join("")}</div>
                        <div>{video.name}</div>
                        <div>{video.description}</div>
                        <button onClick={handleDelete.bind(this, video_id)}>Delete</button>
                    </li>
                )) : <></> }
            </ul>
            <Footer />
        </div>
    );
};

export default MyVideos;