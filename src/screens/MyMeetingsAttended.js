import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const MyMeetingsAttended = () => {
    let [meetings, setMeetings] = useState();
    useEffect(() => {
        let out = {
            email: localStorage.getItem('email')
        };
        axios.post('https://api-tofu.herokuapp.com/getMeetingsAttended', out).then(res => {
            setMeetings(res['data']);
        })
    }, [])
    return (
        <div className="flex flex-col h-screen justify-between bg-gray-200">
            <Navbar />
            <div>
                <div>{console.log(meetings)}</div>
            </div>
            <Footer />
        </div>
    );
};

export default MyMeetingsAttended;