import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const MyMeetingsHosted = () => {
    let [meetings, setMeetings] = useState();
    useEffect(() => {
        let out = {
            email: localStorage.getItem('email')
        };
        axios.post('https://api-tofu.herokuapp.com/getMeetingsHosted', out).then(res => {
            console.log(res['data'])
            setMeetings(res['data']);
        });
    }, [])
    return (
        <div className="h-screen justify-between flex flex-col bg-gray-200">
            <Navbar />
            <div>
                <div>{console.log(meetings)}</div>
            </div>
            <Footer />
        </div>
    );
};

export default MyMeetingsHosted;