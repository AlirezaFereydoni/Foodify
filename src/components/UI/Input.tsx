import React from "react";

import classes from "./Input.module.css";

interface iInput {
  input: { [key: string]: string };
  label: string;
}
type Ref = HTMLInputElement;

const Input = React.forwardRef<Ref, iInput>((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
