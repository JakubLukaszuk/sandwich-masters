import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Authentication.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';


class Authentication extends Component{
    state ={
        constols:{
                emial:{
                  elementType: 'input',
                  elemetConfig:{
                    type: 'emial',
                    placeholder: 'Email Adress'
                  },
                  value:'',
                  validation:{
                    required: true,
                    isEmail: true
                  },
                  valid: false,
                  toutched: false
                },
              password:{
                elementType: 'input',
                elemetConfig:{
                  type: 'emial',
                  placeholder: 'password'
                },
                value:'',
                validation:{
                  required: true,
                  minLength: 8
                },
                valid: false,
                toutched: false
              },
            },
            isFormValid: false,
            isSingIn: true
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

      inputChangedhandler = (event, controlName)=>{
        const updatedControls = {
            ...this.state.constols,
            [controlName]: {
                ...this.state.constols[controlName],
                value: event.target.value,
                valid: this.isValid(event.target.value, this.state.constols[controlName].validation),
                toutched: true
            }
          }
          this.setState({constols: updatedControls});
      }

      submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.constols.emial.value, this.state.constols.password.value, this.state.isSingIn);
      }

      switchAuthModeHandler = () =>{
        this.setState(pervState =>{
          return{isSingIn: !pervState.isSingIn};
        })
      }

    render(){
        const formElementsArray = [];
        for(let key in this.state.constols){
          formElementsArray.push({
            id: key,
            config: this.state.constols[key]
          })
        }

        let form = formElementsArray.map(formElement =>(
            <Input
                key={formElement.id}
                elementType = {formElement.config.elementType}
                elementConfig = {formElement.config.elemetConfig}
                value = {formElement.config.value}
                invalid = {!formElement.config.valid}
                toutched = {formElement.config.toutched}
                changed = {(event) => this.inputChangedhandler(event, formElement.id)}
                />
        ))

        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null;
        if(this.props.error){
          //.message is firebase property
          errorMessage=(
            <p>{this.props.error.message}</p>
          );
        }

        return(
            <div className = {classes.Auth}>
              {errorMessage}
                <form onSubmit = {this.submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                clicked = {this.switchAuthModeHandler}
                btnType="Danger">
                GO TO {this.state.isSingIn ? 'SIGN UP' : 'SIGN IN'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state =>{
  return{
    loading: state.authenticationReducer.loading,
    error: state.authenticationReducer.error
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onAuth: (email, password, isSignIn) => dispatch(actions.auth(email, password, isSignIn))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);