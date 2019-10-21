import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Authentication.css';
import * as actions from '../../store/actions/index';

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
        this.props.onAuth(this.state.constols.emial.value, this.state.constols.password.value);
      }

    render(){
        const formElementsArray = [];
        for(let key in this.state.constols){
          formElementsArray.push({
            id: key,
            config: this.state.constols[key]
          })
        }

        const form = formElementsArray.map(formElement =>(
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

        return(
            <div className = {classes.Auth}>
                <form onSubmit = {this.submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
  return{
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
}
export default connect(null, mapDispatchToProps)(Authentication);