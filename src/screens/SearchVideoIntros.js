import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const SearchVideoIntros = () => {
    let [term, setTerm] = useState();
    const handleSearch =  (e) => {
        setTerm(e.target.value);
    };
    const handleClick =  async () => {
        let out = {
            term: term
        };
        axios.post('https://api-tofu.herokuapp.com/videoSearch', out).then(result => {
            console.log(result['data']);
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
            </div>
            <Footer />
        </div>

    );
};

export default SearchVideoIntros;