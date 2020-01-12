import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from "axios";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

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
        sessionStorage.setItem('StripePayment', true)
        }
     
      })
      .catch(err => console.log(err))
    }
  }

  mechanicObj = this.props.mechanic

  render() {

    if (this.state.complete) return <h6>Success your payment of ${this.mechanicObj.hourly_rate} to {this.mechanicObj.first_name} succeeded. </h6>;

    return (
      <div className="checkout">
        
        <p> Pay your inspection fee with with Stripe and we'll let you and your mechanic figure out the rest! 4000001240000000</p>
        <CardElement  />
        {/* <button onClick={this.submit}>Purchase<this/button> */}
        <Button size="small" variant="contained" color="primary" onClick={this.submit} style={{marginTop:'3px'}}>
        Purchase
        </Button>
        
      </div>
    );
  }
}

CheckoutForm.propTypes = {
  complete: PropTypes.bool.isRequired,
  mechanic: PropTypes.object.isRequired,
  stripe: PropTypes.func.isRequired,
};

export default injectStripe(CheckoutForm);