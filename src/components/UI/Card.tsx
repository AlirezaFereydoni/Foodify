import { ReactNode } from "react";
import Classes from "./Card.module.css";

interface iCard {
  children: ReactNode;
}

const Card = (props: iCard) => {
  return <div className={Classes.card}>{props.children}</div>;
};

export default Card;
