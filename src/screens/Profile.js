import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RealmApp from '../config/RealmApp';
import BSON from 'bson';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripe_pub_test="pk_test_51JOX0yGBUpznK6SDeng5bRzhbSBTemXnyAFu1AMETLXkGVHgvSVVa5Nu53xHKe1oC1csy7EXJ0XdRPIYwnY8IEge00ue7Fvlib";
const stripe_pub_live="pk_live_51JOX0yGBUpznK6SDsUcITRKiQoDuGPSyVuWAjddo4DB8n4aRoDYn2rY8Ke26ZRJShBAVjINzXYsUeqcClzgrhxQN00BzHAMpg0";

const LoadStripe = async () => {
	const stripe = await loadStripe(stripe_pub_test, {
		stripeAccount: localStorage.getItem('user')['stripeId']
	});
	return stripe;
};

const MentorProfile = (props) => {
	let elements = useElements();
	let [user, setUser] = useState();
	let [users, setUsers] = useState();
	let [date, setDate] = useState();
	let [time, setTime] = useState();
	let [url, setUrl] = useState();
	let [accountId, setAccountId] = useState();
	let [stripe, setStripe] = useState();
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
		e.preventDefault();
		if (date && time) {
			GenerateLink();
			let out = {
				mentorId: props.match.params.userId,
				date: date,
				time: time,
				payeeEmail: localStorage.getItem('email'),
				url: url
			};
			getStripeAccountId(users);
			initStripe();
			axios.post('https://api-tofu.herokuapp.com/book-meeting', out).then(res => {
				console.log(res['data']);
			})
		} else {
			alert('Please enter date and time!');
		}
	};
	const GenerateLink = async () => {
		axios.get('https://api-tofu.herokuapp.com/getSessionAndToken').then(res => {
			setUrl(`https://tofu-pied.vercel.app/${res['data']['sessionId']}/${res['data']['token']}`)
		})
	};
	const getStripeAccountId = async (users) => {
		const user = await users.findOne({ "email": localStorage.getItem('email') });
		const accountId = user['stripeId'];
		setAccountId(accountId);
	};
	const initStripe = async () => {
		let out = {
			stripeId: accountId,
			price: 9
		};
		axios.post('https://api-tofu.herokuapp.com/createPaymentIntent', out).then(res => {
			doStripeStuff(res);
		})
	}
	const doStripeStuff = async (res) => {
		const stripe = await LoadStripe();
		setStripe(stripe);
		const { error, paymentIntent } = await stripe.confirmCardPayment(res['data']['clientSecret'], {
				type: 'card',
				card: elements.getElement(CardElement),
			});
			if (error) {
				alert(error);
			} else {
				console.log(paymentIntent);
			}
	}
	return (
		<div className="flex flex-col h-screen justify-between">
			<Navbar />
			<div>
				{ user ? <div className="flex flex-col text-center justify-center">
					<div>{user.email}</div>
					<div>{user.username}</div>	
					<div className="flex flex-col items-center">
						<div>Book A Meeting</div>
						<div className="flex">
							<input onChange={handleDate} type="date" />
							<input onChange={handleTime} type='time' />
						</div>
						<form className="w-full" onSubmit={handleClick}>
							<CardElement className="ml-40 mr-40" />
							<button type="submit" disabled={!stripe}>Pay</button>
						</form>
					</div>
				</div> : <></> }
			</div>
			<Footer />
		</div>
	);
};

export default MentorProfile;
