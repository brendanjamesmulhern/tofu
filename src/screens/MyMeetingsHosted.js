import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const MyMeetingsHosted = () => {
    let history = useHistory();
    let [meetings, setMeetings] = useState();
    useEffect(() => {
        let out = {
            email: localStorage.getItem('email')
        };
        axios.post('https://api-tofu.herokuapp.com/getMeetingsHosted', out).then(res => {
            setMeetings(res['data']);
        });
    }, []);
    const handleUrl = (url) => {
        history.push(url, "_blank");
    };
    return (
        <div className="flex flex-col h-screen justify-between bg-gray-200">
            <Navbar />
            <div className="text-center -mt-52">My Hosted Meetings</div>
            <ul>
                { meetings ? meetings.sort((a, b) => b.date - a.date ).map(meeting => (
                    <li key={meeting._id} className="flex flex-col bg-white">
                        <div className="flex justify-between mx-20">
                            <div className="mr-2">
                                <div className="text-center">{meeting.date.split("T").splice(0, 1)}</div>
                            </div>
                            <div className="ml-2">
                                <div className="text-center">{meeting.time}</div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="mx-10">
                                <div className="text-center">{meeting.members[0].username}</div>
                            </div>
                            <div className="mx-10">
                                <div className="text-center">{meeting.members[1].username}</div>
                            </div>
                            <div className="mx-10">
                                <button className="text-center text-blue-700" onClick={handleUrl.bind(this, meeting.url)}>Link</button>
                            </div>
                        </div>
                    </li>
                )) : <div className="text-center text-xl mt-10">No Meetings</div>}
            </ul>
            <Footer />
        </div>
    );
};

export default MyMeetingsHosted;