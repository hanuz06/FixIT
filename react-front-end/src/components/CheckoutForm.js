import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from "axios";
import Button from '@material-ui/core/Button';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
    
  }
  componentDidMount(){
    const customerPaid = sessionStorage.getItem('StripePayment')
    if(customerPaid) {
      this.setState({complete: true})
    }
  }

  mechanicObj = this.props.mechanic

   submit = async (ev) => {
     console.log(ev)
    let {token} = await this.props.stripe.createToken({name: "Name"});
    const charge = (this.mechanicObj.hourly_rate * 100)
    const generatedToken = token.id
    const data = JSON.stringify({charge, generatedToken})
    if (token) {
    let response = await fetch("/api/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: data
    });
  
    if (response.ok) {
      this.setState({complete:true})
      sessionStorage.setItem('StripePayment', true)
      console.log("Purchase Complete!")
    }
    }
  }


  render() {

    if (this.state.complete) return <h6>Success your payment of ${this.mechanicObj.hourly_rate} to {this.mechanicObj.first_name} succeeded. </h6>;

    return (
      <div className="checkout">
        
        <p> Pay your inspection fee with with Stripe and we'll let you and your mechanic figure out the rest! 4000001240000000</p>
        <CardElement  />
        {/* <button onClick={this.submit}>Purchase</button> */}
        <Button size="small" variant="contained" color="primary" onClick={this.submit} style={{marginTop:'3px'}}>
        Purchase
        </Button>
        
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);