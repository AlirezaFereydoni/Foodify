import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

interface iProps {
  onShowCart: () => void;
}

const Header = ({ onShowCart }: iProps) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Foodify</h1>
        <HeaderCartButton onClick={onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
