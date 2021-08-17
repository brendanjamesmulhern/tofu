import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import Video from '../components/Video';

const SearchVideoIntros = () => {
    let [term, setTerm] = useState();
    let [videos, setVideos] = useState();
    const handleSearch =  (e) => {
        setTerm(e.target.value);
    };
    const handleClick =  async () => {
        let out = {
            term: term
        };
        axios.post('https://api-tofu.herokuapp.com/videoSearch', out).then(result => {
            console.log(result['data']);
            let videos = [];
            result['data'].map(user => {
                user['videos'].map(video => {
                    videos.push({ video: video, user: user });
                });
            });
            setVideos(videos);
            console.log(videos);
        });
    };
    return (
        <div className="flex flex-col h-screen justify-between">
            <Navbar />
            <div className="bg-gray-200 h-full w-full">
                <div className="my-2 flex justify-center border border-gray-200">
                    <input className="text-center mx-2" type="text" placeholder="Enter Search Term" onChange={handleSearch} />
                    <button className="mx-2 btn" onClick={handleClick}>Search</button>
                </div>
                <div>
                    { videos ? videos.sort((a, b) => b.date - a.date).map(video => (
                        <div key={video._id}>
                            <div className="flex flex-col text-center">
                                <div className="mt-5 text-2xl text-bold">{video.video.name}</div>
                                <div className="mt-5 text-lg text-semibold">{video.user.username}</div>
                                <div className="mt-5 text-md">{video.video.date.split("T").splice(0, 1).join("")}</div>
                            </div>
                            <div className="mt-5">
                                <Video url={video.video.url} />
                            </div>
                            <div className="text-center mt-16">{video.video.description}</div>
                        </div>
                    )) : <div className="text-center text-2xl mt-10 text-md">No Results</div> }
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default SearchVideoIntros;