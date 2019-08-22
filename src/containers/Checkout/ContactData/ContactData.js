import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axiosOrders from '../../../axios-orders';


class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = (event) =>{
    event.preventDefault();
        this.setState({loading: true});

    const order = {
      ingredients: this.props.ingredients,
      bread: this.props.bread,
      price: this.props.price,
      //price should be calcualted on server
      customer: {
        name: 'Bartek Lub',
        addres: {
          street: 'TestStreet 1',
          city: 'Warsaw',
          postCode: '12-123'
        },
        email: 'test@wp.pl',
        phoneNumber: 123123123
      }
      //alert('continue');
    }
    axiosOrders
      .post('/orders.json', order)
      .then(response => {
        this.setState({loading: false,});
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error)
        this.setState({loading: false,})
      });
  }

  render() {
    let form = (      <form>
      <input type='text' name='name1' placeholder='your name'></input>
      <input type='email' name='email' placeholder='your email'></input>
      <input type='text' name='street' placeholder='postal code'></input>
      <Button btnType='Success' clicked = {this.orderHandler}>ORDER</Button>
    </form>);
    if(this.state.loading) {
       form = <Spinner/>;
    }
    return (
      <div className = {classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;