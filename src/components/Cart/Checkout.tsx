import { FormEvent } from "react";
import useInput from "../../hooks/use-input";

import classes from "./Checkout.module.css";
import { iConfirm } from "../../types/interfaces";

interface iProps {
  onConfirm: (data: iConfirm) => void;
  onCancel: () => void;
}

const isEmpty = (value: string) => value.trim() !== "";
const isFiveChars = (value: string) => value.trim().length === 5;

const Checkout = (props: iProps) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetname,
  } = useInput(isEmpty);

  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
    reset: resetstreet,
  } = useInput(isEmpty);

  const {
    value: postalValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    valueChangeHandler: postalChangeHandler,
    valueBlurHandler: postalBlurHandler,
    reset: resetpostal,
  } = useInput(isFiveChars);

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
    reset: resetcity,
  } = useInput(isEmpty);

  const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;

  const confirmHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: nameValue,
      street: streetValue,
      city: cityValue,
      postalCode: postalValue,
    });

    resetname();
    resetstreet();
    resetpostal();
    resetcity();
  };

  const nameClasses = `${classes.control} ${nameHasError ? classes.invalid : ""}`;
  const streetClasses = `${classes.control} ${streetHasError ? classes.invalid : ""}`;
  const postalClasses = `${classes.control} ${postalHasError ? classes.invalid : ""}`;
  const cityClasses = `${classes.control} ${cityHasError ? classes.invalid : ""}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p className={classes.invalidtext}>Please enter a valid name!</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <p className={classes.invalidtext}>Please enter a valid street!</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalValue}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalHasError && (
          <p className={classes.invalidtext}>
            Please enter a valid postal code (5 characters long)!
          </p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityValue}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && <p className={classes.invalidtext}>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
