import React, { useState, useEffect, useReducer, useContext } from "react";
import AuthContext from '../../store/auth-context';
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

//reducer function outside of component function because it doesn't require
//any data inside component
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }

  if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};


const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }

  if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6};
  }
  return { value: "", isValid: false };
};


//START OF COMPONENT
const Login = (props) => {
const context = useContext(AuthContext)

  const [formIsValid, setFormIsValid] = useState(false);

  //const [state, dispatchFunction] = 
  //useReducer(reducerFunction, initialState, functionToSetInitialState)
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false
  })


  //object destructuring. Extract the isvalid property from emailState or passwordState, and rename
  //it to another alias name
// const { PropertyYouWantToExtract: newVariableName} = stateYouAreExtractingFrom
const { isValid: emailIsValid} = emailState;
const { isValid: passwordIsValid} = passwordState;

  useEffect(() => {
   
    //check form validity only if user stopped typing for 0.5 second
    const timeout = setTimeout(() => {
      console.log("FORM VALIDITY CHECK")
      if (emailIsValid && passwordIsValid) {
        setFormIsValid(true)
      }
    }, 1000)

    return () => {
      console.log("CLEANUP")
      clearTimeout(timeout)
    }

  }, [emailIsValid, passwordIsValid])




  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: "USER_BLUR",
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ 
      type: "USER_BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    context.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
