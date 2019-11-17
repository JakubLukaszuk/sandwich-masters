import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Authentication.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {checkValidity, checkStringEquality} from '../../shared/validation';

const Authentication = props =>  {
  const [authForm, setAuthForm] = useState({
    emial: {
      elementType: 'input',
      elemetConfig: {
        type: 'emial',
        placeholder: 'Email Adress'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
        maxLength: 24
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
        minLength: 8,
        maxLength: 16
      },
      valid: false,
      toutched: false
    }
  })
  const [passwordCheck, setPasswordCheck] = useState({
      elementType: 'input',
      elemetConfig: {
        type: 'password',
        placeholder: 'confirm password'
      },
      value: '',
      valid: false,
      toutched: false
  })
  const [isSignIn, setIsSignIn] = useState(true)
  const [message, setMessage] = useState(null)

  const {buildingSandwitch, authRedirectPath, onSetAuthRedirectPath} = props;

  useEffect(() => {
    if (buildingSandwitch && authRedirectPath !== '/') {
        onSetAuthRedirectPath();
    }
  }, [buildingSandwitch, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedhandler = (event, controlName) => {
    const updatedControls = {
      ...authForm,
      [controlName]: {
        ...authForm[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, authForm[controlName].validation),
        toutched: true
      }
    }
    setAuthForm(updatedControls)
  }

  const passwordCheckHandler =(event) => {
    const updatedControl = {
      ...passwordCheck,
      value: event.target.value,
      valid: checkStringEquality(event.target.value, authForm.password.value),
      toutched: true
    }
    setPasswordCheck(updatedControl)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if(isFormValid()){
      setMessage(null)
        props
        .onAuth(authForm.emial.value, authForm.password.value, isSignIn);
    }
    else{
      setMessage('Fill fields correctly')
    }

  }

  const switchAuthModeHandler = () => {
    props.onErroCleanese();
    setIsSignIn(!isSignIn)
    setMessage(null)
  }

  const isFormValid =()=>{
    if(!isSignIn)
      if(!passwordCheck.valid)
        return false;
      for (let key in authForm) {
       if(!authForm[key].valid)
        return false;
    }
    setMessage(null)
    return true;
  }

    const formElementsArray = [];
    for (let key in authForm) {
      formElementsArray.push({id: key, config: authForm[key]})
    }


    let form = formElementsArray.map(formElement => (<Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elemetConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      toutched={formElement.config.toutched}
      changed={(event) => inputChangedhandler(event, formElement.id)}/>))

    let checkPasswordInput = <Input
      key={passwordCheck}
      elementType={passwordCheck.elementType}
      elementConfig={passwordCheck.elemetConfig}
      value={passwordCheck.value}
      invalid={!passwordCheck.valid}
      toutched={passwordCheck.toutched}
      changed={(event) => passwordCheckHandler(event, passwordCheck)}/>

    if (!isSignIn) {
      form.push(checkPasswordInput);
    }

    if (props.loading) {
      form = <Spinner/>
    }

    let errorMessage = null;
    if (props.error) {
      errorMessage = (
        <p className = {classes.Error}>{props.error.message}</p>
      );
    }
    let redirect = null;
    if (props.isAuthenticated) {
      redirect = <Redirect to={props.authRedirectPath}/>
    }

    return (
      <div className={classes.Auth}>
        {redirect}
        {isSignIn
          ? <h3 className = {classes.AuthHead}>SIGN UP</h3>
          : <h3 className = {classes.AuthHead}>SIGN IN</h3>}
          {errorMessage}
          {message ? <p>{message}</p> : null}
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={switchAuthModeHandler} btnType="Danger">
          GO TO {isSignIn
            ? 'SIGN UP'
            : 'SIGN IN'}</Button>
      </div>
    )
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