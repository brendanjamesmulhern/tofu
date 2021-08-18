import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const MyVideos = () => {
    let [videos, setVideos] = useState();
    const getVideos = () => {

    };
    return (
        <div className="flex flex-col justify-between h-screen bg-gray-200">
            <Navbar />
            <ul className="flex flex-col">
        
            </ul>
            <Footer />
        </div>
    );
};

export default MyVideos;