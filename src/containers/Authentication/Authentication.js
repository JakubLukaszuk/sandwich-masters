import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
class Authentication extends Component {

  state = {
    controls: {
      email: {
        elementType: 'input',
        elemetConfig: {
          type: 'email',
          placeholder: 'email adress'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        toutched: false
      },
      password: {
        elementType: 'input',
        elemetConfig: {
          type: 'password',
          placeholder: 'password'
        },
        value: '',
        validation: {
          required: true,
          minLenght: 8
        },
        valid: false,
        toutched: false
      }
    }
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

  inputChangedhandler = (event,contolName) =>{
    const updatedControls = {
        ...this.state.controls,
        [contolName]:{
            ...this.state.controls[contolName],
            value: event.target.value,
            valid: this.isValid(event.target.value,this.state.controls[contolName].validation),
            toutched: true
        }
    };
    this.setState({controls: updatedControls});
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({id: key, config: this.state.controls[key]})
    }

    const form = formElementsArray.map(formElement =>(
        <Input key= {formElement.id}
        elementType = {formElement.config.elementType}
        elementConfig = {formElement.config.elemetConfig}
        value = {formElement.config.value}
        invalid = {!formElement.config.valid}
        toutched = {formElement.config.toutched}
        changed = {(event) => this.inputChangedhandler(event, formElement.id)}/>
    ))
    return (
      <div className = {classes.Auth}>
        <form>
            {form}
            <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    );
  }
}

export default Authentication;