import React, { useState } from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axiosOrders from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {checkValidity} from '../../../shared/validation';

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
      name:{
        elementType: 'input',
        elemetConfig:{
          type: 'text',
          placeholder: 'Your name'
        },
        value:'',
        validation:{
          required: true,
          minLength: 2,
          maxLength: 32
        },
        valid: false,
        toutched: false
      },
      street:{
        elementType: 'input',
        elemetConfig:{
          type: 'text',
          placeholder: 'Street'
        },
        value:'',
        validation:{
          required: true,
          maxLength: 32
        },
        valid: false,
        toutched: false
      },
      city:{
        elementType: 'input',
        elemetConfig:{
          type: 'text',
          placeholder: 'Your city'
        },
        value:'',
        validation:{
          required: true,
          maxLength: 32
        },
        valid: false,
        toutched: false
      },
      postCode:{
        elementType: 'input',
        elemetConfig:{
          type: 'text',
          placeholder: 'Post code'
        },
        value:'',
        validation:{
          required: true,
          maxLength: 9
        },
        valid: false,
        toutched: false
      },
      email:{
        elementType: 'input',
        elemetConfig:{
          type: 'email',
          placeholder: 'Your e-mail',
          maxLength: 24
        },
        value:'',
        validation:{
          required: true
        },
        valid: false,
        toutched: false
      },
      phoneNumber:{
        elementType: 'input',
        elemetConfig:{
          type: 'text',
          placeholder: 'Your phone number'
        },
        value:'',
        validation:{
          required: true,
          maxLength: 12
        },
        valid: false,
        toutched: false
      }
    })
    const [isFormValid, setisFormValid] = useState(false);


  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for(let formElementId in orderForm){
      formData[formElementId] = orderForm[formElementId].value;
    }

    const order = {
      ingredients: props.ingredients,
      bread: props.bread,
      price: props.totalPrice.toFixed(2),
      orderData: formData,
      userId: props.userId,
    }
    props.onOrderSandwitch(order, props.token);
  }

 const inputChangedhandler = (event, inputId) => {
    const updatedOrderForm = {
      ...orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.toutched = true;
    updatedOrderForm[inputId] = updatedFormElement;

    let isFormValid= true;
    for(let inputID in updatedOrderForm){
      isFormValid = updatedOrderForm[inputID].valid && isFormValid;
    }
    setOrderForm(updatedOrderForm)
    setisFormValid(isFormValid)
  }

    const formElementsArray = [];
    for(let key in orderForm){
      formElementsArray.push({
        id: key,
        config: orderForm[key]
      })
    }
    let form = (
      <form onSubmit = {orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key = {formElement.id}
          elementType = {formElement.config.elementType}
          elementConfig = {formElement.config.elemetConfig}
          value = {formElement.config.value}
          invalid = {!formElement.config.valid}
          toutched = {formElement.config.toutched}
          changed = {(event) => inputChangedhandler(event, formElement.id)} />
      ))}
      <Button btnType='Success' disabled = {!isFormValid}>ORDER</Button>
    </form>);
    if(props.loading) {
       form = <Spinner/>;
    }
    return (
      <div className = {classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
        {props.error ? <p>{props.error}</p> : null}
      </div>
    )
  }


const mapStateToProps = state => {
  return{
    ingredients: state.sandwitchBuilderReducer.ingredients,
    bread: state.sandwitchBuilderReducer.bread,
    totalPrice: state.sandwitchBuilderReducer.totalPrice,
    loading: state.orderRecuder.loading,
    token: state.authenticationReducer.idToken,
    userId: state.authenticationReducer.userId,
    error: state.orderRecuder.error
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onOrderSandwitch: (order, token) => dispatch(actions.purchaseSandwitch(order, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosOrders));