import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../components/input/Input";

function LoginPage(props) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  const emailIsValid = enteredEmail.includes('@');
  const emailInputIsInValid = !emailIsValid && enteredEmailTouched;

  const passwordIsValid = enteredPassword.trim().length > 6;
  const passwordInputIsInValid = !passwordIsValid && enteredPasswordTouched;

  let formIsValid = emailIsValid && passwordIsValid ? true : false;

  const history = useHistory();

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  }

  const passwordChangeHanlder = (event) => {
    setEnteredPassword(event.target.value);
  }

  const validateEmailHandler = () => {
    setEnteredEmailTouched(true);
  }

  const validatePasswordHandler = () => {
    setEnteredPasswordTouched(true);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);

    if (!formIsValid) {
      return;
    }

    props.onLogin();
    history.push('/home');

    setEnteredEmail('');
    setEnteredPassword('');

    setEnteredEmailTouched(false);
    setEnteredPasswordTouched(false);
  }

  return (
    <div>
      <div className="form-control">
        <h2 style={{ "textAlign": "center" }}> Login Here </h2>
        <form onSubmit={submitHandler} noValidate>
          <Input
            inputLabel="Email"
            type="email"
            id="email"
            name="email"
            enteredInput={enteredEmail}
            inputChangeHandler={emailChangeHandler}
            validateInputHandler={validateEmailHandler}
            inputIsInValid={emailInputIsInValid}
          />

          <Input
            inputLabel="Password"
            type="password"
            id="password"
            name="password"
            enteredInput={enteredPassword}
            inputChangeHandler={passwordChangeHanlder}
            validateInputHandler={validatePasswordHandler}
            inputIsInValid={passwordInputIsInValid}
          />

          <button className="login-button" disabled={!formIsValid}> Login </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;