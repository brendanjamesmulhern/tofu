import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

let stripe_pub_test = "pk_test_51JOX0yGBUpznK6SDeng5bRzhbSBTemXnyAFu1AMETLXkGVHgvSVVa5Nu53xHKe1oC1csy7EXJ0XdRPIYwnY8IEge00ue7Fvlib";
let stripe_pub_live = "pk_live_51JOX0yGBUpznK6SDsUcITRKiQoDuGPSyVuWAjddo4DB8n4aRoDYn2rY8Ke26ZRJShBAVjINzXYsUeqcClzgrhxQN00BzHAMpg0";

const App = () => {
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
        // console.log(error);
    } else {
        history.push('/intros');
    }
 };
 return (
 		<div className="flex flex-col h-screen">
 			<Navbar />
 				<div className="flex flex-col mt-40">
                    <div>
                        <div className="text-center">Sign Up For Free Trial</div>
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
                            <div className="text-center">
                                <button className="mx-2" type="submit" disabled={!stripe}>Start Free Trial</button>
                            </div>
                    </form>
 				</div>
 		</div>
 	);
};

const stripePromise = loadStripe(stripe_pub_test);

const PayGuard = () => {
	return (
		<Elements stripe={stripePromise}>
			<App />
		</Elements>
	);
}
export default PayGuard;
