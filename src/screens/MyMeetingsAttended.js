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
                { meetings ? meetings.sort((a, b) => b.date - a.date ).map(meeting => (
                    <div>
                        
                    </div>
                )) : <div className="text-center text-xl mt-10">No Meetings</div>}
            </div>
            <Footer />
        </div>
    );
};

export default MyMeetingsAttended;