import React, { Component } from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axiosOrders from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm:{
      name:{
        elementType: 'input',
        elemetConfig:{
          type: 'text',
          placeholder: 'Your name'
        },
        value:'',
        validation:{
          required: true,
          minLength: 2
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
          required: true
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
          required: true
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
          required: true
        },
        valid: false,
        toutched: false
      },
      email:{
        elementType: 'input',
        elemetConfig:{
          type: 'email',
          placeholder: 'Your e-mail'
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
          required: true
        },
        valid: false,
        toutched: false
      }
    },
    isFormValid: false
  }

  isValid(value, rules){
    let validity = true;

    if(rules.required){
      validity = value.trim() !=='' && validity;
    }

    if(rules.minLength){
      validity = value.length >= rules.minLength;
    }
    return validity;
  }


  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for(let formElementId in this.state.orderForm){
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      bread: this.props.bread,
      price: this.props.totalPrice,
      orderData: formData
      //price should be calcualted on server
      //alert('continue');
    }
    this.props.onOrderSandwitch(order, this.props.token);
  }

  inputChangedhandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.isValid(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.toutched = true;
    updatedOrderForm[inputId] = updatedFormElement;

    let isFormValid= true;
    for(let inputID in updatedOrderForm){
      isFormValid = updatedOrderForm[inputID].valid && isFormValid;
    }
    this.setState({orderForm: updatedOrderForm, isFormValid: isFormValid});
  }

  render() {
    const formElementsArray = [];
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit = {this.orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key = {formElement.id}
          elementType = {formElement.config.elementType}
          elementConfig = {formElement.config.elemetConfig}
          value = {formElement.config.value}
          invalid = {!formElement.config.valid}
          toutched = {formElement.config.toutched}
          changed = {(event) => this.inputChangedhandler(event, formElement.id)} />
      ))}
      <Button btnType='Success' disabled = {!this.state.isFormValid}>ORDER</Button>
    </form>);
    if(this.props.loading) {
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

const mapStateToProps = state => {
  return{
    ingredients: state.sandwitchBuilderReducer.ingredients,
    bread: state.sandwitchBuilderReducer.bread,
    totalPrice: state.sandwitchBuilderReducer.totalPrice,
    loading: state.orderRecuder.loading,
    token: state.authenticationReducer.idToken
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onOrderSandwitch: (order, token) => dispatch(actions.purchaseSandwitch(order, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosOrders));