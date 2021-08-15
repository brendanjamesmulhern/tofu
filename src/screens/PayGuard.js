import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';

let stripe_pub_test = "pk_test_51JOX0yGBUpznK6SDeng5bRzhbSBTemXnyAFu1AMETLXkGVHgvSVVa5Nu53xHKe1oC1csy7EXJ0XdRPIYwnY8IEge00ue7Fvlib";
let stripe_pub_live = "pk_live_51JOX0yGBUpznK6SDsUcITRKiQoDuGPSyVuWAjddo4DB8n4aRoDYn2rY8Ke26ZRJShBAVjINzXYsUeqcClzgrhxQN00BzHAMpg0";

const PayGuard = () => {
 let history = useHistory();
 let stripe = useStripe();
 let elements = useElements();
 let [priceId, setPriceId] = useState('price_1JOX9MGBUpznK6SDHO2CvKSI');
 let [email, setEmail] = useState(localStorage.getItem('email'))
 let [clientSecret, setClientSecret] = useState();
 const createCustomer = async (event) => {
    event.preventDefault();
 	let out = {
 		email: email,
 		priceId: priceId
 	}
 	axios.post('https://api-tofu.herokuapp.com/create-subscription', out).then(res => {
        doStripeStuff(res);
    });
 };
 const doStripeStuff = async (res) => {
     const {error, paymentIntent} = await stripe.confirmCardPayment(res['data']['clientSecret'], {
        payment_method: {
            card: elements.getElement(CardElement)
        }
    });
    if (error) {
        console.log(error);
    } else {
        history.push('/intros');
    }
 }
 const logOut = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('isPremium');
    window.location.reload();
 };
 return (
 		<div>
 			<Navbar />
 				<div className="flex flex-col h-screen justify-between">
                    <div>
                        <div>Sign Up For Free Trial</div>
                         // More information
                    </div>
 					<form onSubmit={createCustomer}>
                        <CardElement
                            options={{
                                style: {
                                    fontSize: "16px",
                                    color: '#424700',
                                    '::placeholder': {
                                        color: '#aab7c4'
                                    },
                                },
                                invalid: {
                                    color: '#9e2146'
                                },
                            }}
                            className="mx-20 my-10" />
                        <button className="justify-center" type="submit" disabled={!stripe}>Pay</button>
                        <button onClick={logOut}>Log Out</button>
                    </form>
 				</div>
 			<Footer className="sticky" />
 		</div>
 	);
};

export default PayGuard;
