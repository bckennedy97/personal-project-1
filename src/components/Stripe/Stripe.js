import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import "./stripe.css"

export default class Stripe extends React.Component {

 onToken = (token) => {
   console.log('onToken', token);
   axios.post('/api/stripe', {
     method: "POST",
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: token.id
   }).then(json => {
        alert(json.data.message)
       console.log('json', json)
     }).catch(err=>console.log(err.detail))
 }

 render() {
   return (
      // ...
     <StripeCheckout
      className="stripe-container"
       token={this.onToken}
       amount={1000}
       currency="USD"
       // PUBLISHABLE KEY
       stripeKey="pk_test_ZUNyFX9ETenT1Gc8PYbwkLQL"
     />
   )
 }
}