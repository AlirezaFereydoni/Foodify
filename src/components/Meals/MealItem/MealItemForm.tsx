import { FormEvent, useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

interface iMealItem {
  id: number;
  onAddToCart: (amount: number) => void;
}

const MealItemForm = (props: iMealItem) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current ? amountInputRef.current.value : "0";
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid number (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
