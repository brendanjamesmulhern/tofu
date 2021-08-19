import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RealmApp from '../config/RealmApp';
import BSON from 'bson';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useHistory } from 'react-router-dom';

const stripe_pub_test="pk_test_51JOX0yGBUpznK6SDeng5bRzhbSBTemXnyAFu1AMETLXkGVHgvSVVa5Nu53xHKe1oC1csy7EXJ0XdRPIYwnY8IEge00ue7Fvlib";
const stripe_pub_live="pk_live_51JOX0yGBUpznK6SDsUcITRKiQoDuGPSyVuWAjddo4DB8n4aRoDYn2rY8Ke26ZRJShBAVjINzXYsUeqcClzgrhxQN00BzHAMpg0";

const App = ({ props }) => {
	let history = useHistory();
	let stripe = useStripe();
	let elements = useElements();
	let [user, setUser] = useState();
	let [users, setUsers] = useState();
	let [date, setDate] = useState();
	let [time, setTime] = useState();
	let [zone, setZone] = useState();
	let [accountId, setAccountId] = useState();
	useEffect(() => {
		getUser();
	}, []);
	const getUser = async () => {
		let userId = props.match.params.userId;
		var app = await RealmApp();
		const mongodb = app.currentUser.mongoClient('mongodb-atlas');
		const users = mongodb.db('tofu').collection('users');
		const res =	await users.findOne({ "_id": BSON.ObjectId(userId) });
		setUser(res);
		setUsers(users);
	};
	const handleDate = (e) => {
		setDate(e.target.value);
	};
	const handleTime = (e) => {
		setTime(e.target.value);
	}
	const handleClick = (e) => {
		if (date && time && localStorage.getItem('email') && localStorage.getItem('onboarded')) {
			GenerateLink().then(url => {
				let out = {
					mentorId: props.match.params.userId,
					date: date,
					time: time,
					zone: zone,
					payeeEmail: localStorage.getItem('email'),
					url: url
				};
				getStripeAccountId(users);
				axios.post('https://api-tofu.herokuapp.com/book-meeting', out).then(res => {
					// console.log(res['data']);
				});
			});
			} else {
				alert('Please enter date and time!');
			}
	};
	const GenerateLink = () => {
		return axios.get('https://api-tofu.herokuapp.com/getSessionAndToken').then(res => {
			return `/meeting/${res['data']['sessionId']}/${res['data']['token']}`;
		})
	};
	const getStripeAccountId = async (users) => {
		const user = await users.findOne({ "email": localStorage.getItem('email') });
		const accountId = user['stripeId'];
		initStripe(accountId);
	};
	const initStripe = async (accountId) => {
		let price = user.hourlyRate / 2;
		let out = {
			stripeId: accountId,
			price: price
		};
		axios.post('https://api-tofu.herokuapp.com/createPaymentIntent', out).then(res => {
			doStripeStuff(res, accountId);
		})
	}
	const doStripeStuff = async (res, accountId) => {
		const clientSecret = res['data']['client_secret'];
		stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement)
			}
		}).then(result => {
			if (result.error) {
				alert(result.error.message);
			} else {
				if (result.paymentIntent.status === 'succeeded') {
					// console.log("Success!");
					history.push('/attended');
				}
			}
		})
	}
	const handleZone = (e) => {
		setZone(e.target.value);
	};	
	return (
		<div className="flex flex-col h-screen justify-between bg-gray-200">
			<Navbar />
			<div className="flex flex-col justify-start">
			<div className="text-center text-2xl text-bold">Book A Meeting</div>
				{ user ? 
				<div className="text-center mt-2">
					<div className="text-md text-semibold mt-5">with</div>
					<div className="text-md text-semibold mt-5">{user.username}</div>	
					<div className="flex flex-col items-center">
						<div className="flex flex-col mt-10">
							<div className="flex mx-10">
								<div className="text-md text-center mx-10">Click to set time and date of metorship meeting</div>
							</div>
							<div className="flex flex-col mt-5 items-center">
								<div className="flex">
									<h2 className="mr-2">Date</h2>
									<input className="mt-2 ml-2" onChange={handleDate} type="date" />
								</div>
								<div className="flex">
									<h2 className="mr-2">Time</h2>
									<input className="mt-2 ml-2" onChange={handleTime} type='time' />
								</div>
								<div className="flex">
									<h2 className="mr-2">Time zone</h2>
									<input className="mt-2 ml-2" onChange={handleZone} type="text" />
								</div>
							</div>
						</div>
						<form className="w-full">
							<div className="text-lg mt-10 text-semibold">Pay for 30 Minute mentorship meeting here</div>
							<CardElement className="bg-white mx-10 text-4xl" />
							<button className="btn text-center text-lg text-semibold" onClick={handleClick}><img height={150} width={150} src={'/payWithStripe.png'} /></button>
						</form>
					</div>
				</div> 
				: <></> }
			</div>
			<Footer />
		</div>
	);
};

let accountId = localStorage.getItem('accountId') || "";

const stripePromise = loadStripe(stripe_pub_test, {
	stripeAccount: accountId
})

const MentorProfile = (props) => {
	return (
		<Elements stripe={stripePromise}>
			<App props={props} />
		</Elements>
	);
}

export default MentorProfile;
