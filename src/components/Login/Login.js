import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) =>{

  if(action.type === "USER_INPUT"){
    return {val: action.val, isValid: action.val.includes('@')}
  }
  if(action.type === "INPUT_BLUR"){
    return {val: state.val, isValid: state.val.includes('@')}
  }

  return {val: '', isValid: false};
}

const passwordReducer = (state, action) =>{

  if(action.type === "USER_PASS"){
    return {val: action.val, isValid: action.val.length > 6}
  }
  if(action.type === "INPUT_BLUR"){
    return {val: state.val, isValid: state.val.length > 6}
  }

  return {val: '', isValid: false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

const [emailState, dispatchEmail] = useReducer(emailReducer,{
  val: '',
  isValid: null
});
const [passwordState, dispatchPassword] = useReducer(passwordReducer,{
  val: '',
  isValid: null
});

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);


  //as even if the passowrd or email is validated if we add another char, useEffect will still again run to check validity which we would want to avoid ie the validity should beb checked and once it is shouldnt ere run, that is why we use pull out isValid property from emailSTate and passwordState and made useEffect depend on them instead.
  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;
  
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        // emailState.val.includes('@') && passwordState.val.trim().length > 6
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  },[emailIsValid, passwordIsValid]);
  // }, [ emailState.val, passwordState.val]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    //using useEffect for form valididty
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'USER_PASS', val: event.target.value})

    //using useEffect for form valididty
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
    // setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(passwordState.isValid);
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.val, passwordState.val);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.val}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.val}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
