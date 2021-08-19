import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/solid';
import { XIcon } from '@heroicons/react/solid';


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
        window.open(url, "_blank");
    };
    const approveMeeting = (meetingId) => {
        let out = {
            meetingId: meetingId,
            email: localStorage.getItem('email') 
        };
        axios.post('https://api-tofu.herokuapp.com/approveMeeting', out).then(res => {
            console.log(res['data']);
        });
        window.location.reload();
    };
    const disproveMeeting = (meetingId) => {
        let out = {
            meetingId: meetingId,
            email: localStorage.getItem('email')
        };
        axios.post('https://api-tofu.herokuapp.com/disproveMeeting', out).then(res => {
            console.log(res['data']);
            refund(out);
        });
        window.location.reload();
    };
    const refund = (out) => {
        axios.post('https://api-tofu.herokuapp.com/refundMeeting', out).then(res => {
            console.log(res['data']);
        });
    };
    return (
        <div className="flex flex-col h-screen justify-between bg-gray-200">
            <Navbar />
            <div className="text-center -mt-28">My Hosted Meetings</div>
            <ul>
                { meetings ? meetings.sort((a, b) => b.date - a.date ).map(meeting => (
                    <li key={meeting._id} className="flex flex-col bg-white">
                        <div className="flex justify-center">
                            <h1 className="mr-2">Approved:</h1>
                            <h2 className="text-md ml-2">{meeting.approved.toString()}</h2>
                        </div>
                        <div className="flex justify-between mx-20">
                            <div className="mr-2">
                                <div className="text-center">{meeting.date.split("T").splice(0, 1)}</div>
                            </div>
                            <div className="ml-2">
                                <div className="text-center">{meeting.time}</div>
                            </div>
                            <div className="ml-2">
                                <div className="text-center">{meeting.zone}</div>
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
                        <div className="grid grid-cols-3 justify-between">
                                <button onClick={approveMeeting.bind(this, meeting._id)}><CheckIcon className="text-green-700" height={50} width={50} /></button>
                                <button className="mx-52" onClick={disproveMeeting.bind(this, meeting._id)}><XIcon className="text-red-700" height={50} width={50} /></button>
                            </div>
                    </li>
                )) : <div className="text-center text-xl mt-10">No Meetings</div>}
            </ul>
            <Footer />
        </div>
    );
};

export default MyMeetingsHosted;