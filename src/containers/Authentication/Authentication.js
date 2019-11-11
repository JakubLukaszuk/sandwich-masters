import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Authentication.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {checkValidity, checkStringEquality} from '../../shared/validation';

class Authentication extends Component {
  state = {
    constols: {
      emial: {
        elementType: 'input',
        elemetConfig: {
          type: 'emial',
          placeholder: 'Email Adress'
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
          minLength: 8
        },
        valid: false,
        toutched: false
      }
    },
    passwordCheck: {
      elementType: 'input',
      elemetConfig: {
        type: 'password',
        placeholder: 'confirm password'
      },
      value: '',
      valid: false,
      toutched: false
    },
    isSingIn: true,
    message: null
  }

  componentDidMount() {
    if (!this.props.buildingSandwitch && this.props.authRedirectPath !== '/') {
      this
        .props
        .onSetAuthRedirectPath();
    }
  }

  inputChangedhandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.constols,
      [controlName]: {
        ...this.state.constols[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.constols[controlName].validation),
        toutched: true
      }
    }
    this.setState({constols: updatedControls});
  }

  passwordCheckHandler =(event) => {
    const updatedControl = {
      ...this.state.passwordCheck,
      value: event.target.value,
      valid: checkStringEquality(event.target.value, this.state.constols.password.value),
      toutched: true
    }
    this.setState({passwordCheck: updatedControl});
  }

  submitHandler = (event) => {
    event.preventDefault();
    if(this.isFormValid()){
      this.setState({message: null})
      this
        .props
        .onAuth(this.state.constols.emial.value, this.state.constols.password.value, this.state.isSingIn);
    }
    else{
      this.setState({message: 'Fill fields correctly'})
    }

  }

  switchAuthModeHandler = () => {
    this.props.onErroCleanese();
    this.setState(pervState => {
      return {
        isSingIn: !pervState.isSingIn,
        message: null
      };
    })
  }

  isFormValid =()=>{
    if(!this.state.isSingIn)
      if(!this.state.passwordCheck.valid)
        return false;
      for (let key in this.state.constols) {
       if(!this.state.constols[key].valid)
        return false;
    }
    this.setState({message: ''});
    return true;
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.constols) {
      formElementsArray.push({id: key, config: this.state.constols[key]})
    }


    let form = formElementsArray.map(formElement => (<Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elemetConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      toutched={formElement.config.toutched}
      changed={(event) => this.inputChangedhandler(event, formElement.id)}/>))

    let checkPasswordInput = <Input
      key={this.state.passwordCheck}
      elementType={this.state.passwordCheck.elementType}
      elementConfig={this.state.passwordCheck.elemetConfig}
      value={this.state.passwordCheck.value}
      invalid={!this.state.passwordCheck.valid}
      toutched={this.state.passwordCheck.toutched}
      changed={(event) => this.passwordCheckHandler(event, this.state.passwordCheck)}/>

    if (!this.state.isSingIn) {
      form.push(checkPasswordInput);
    }

    if (this.props.loading) {
      form = <Spinner/>
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p className = {classes.Error}>{this.props.error.message}</p>
      );
    }
    let redirect = null;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <div className={classes.Auth}>
        {redirect}
        {this.state.isSingIn
          ? <h3>SIGN UP</h3>
          : <h3>SIGN IN</h3>}
          {errorMessage}
          {this.state.message ? <p>{this.state.message}</p> : null}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          GO TO {this.state.isSingIn
            ? 'SIGN UP'
            : 'SIGN IN'}</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {loading: state.authenticationReducer.loading, error: state.authenticationReducer.error, isAuthenticated: state.authenticationReducer.idToken, buildingSandwitch: state.sandwitchBuilderReducer.buildingSandwitch, authRedirectPath: state.authenticationReducer.authRedirectPath}
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignIn) => dispatch(actions.auth(email, password, isSignIn)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    onErroCleanese: () => dispatch(actions.authErrorCleanese())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);