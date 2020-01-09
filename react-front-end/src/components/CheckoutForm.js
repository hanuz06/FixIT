import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from "axios"

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

   submit = async (ev) => {
     console.log(ev)
    let {token} = await this.props.stripe.createToken({name: "Name"});

    if (token) {

      await axios.post('api/charge', {
            headers: {"Content-Type": "text/plain"},
            token: token.id,
            amount: "2000", 
      }
    ).then(res => {
      if(res.status === 200) {
        console.log(res)
        this.setState({complete: true})
  
        }
      if (res.status === 402) {
        console.log("Something went wrong!")
      }
      })
      .catch(err => console.log(err))
    }
  }

  render() {

    if (this.state.complete) return <h1>Success your payment of ${this.props.mechanic.hourly_rate} to {this.props.mechanic.first_name} succeeded. </h1>;

    return (
      <div className="checkout">
        
        <p> Pay your inspection fee with with Stripe and we'll let you and your mechanic figure out the rest! 4000001240000000</p>
        <CardElement  />
        <button onClick={this.submit}>Purchase</button>
        
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);