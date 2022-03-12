import { Fragment, ReactNode } from "react";
import ReactDom from "react-dom";

import classes from "./Modal.module.css";

interface iBackDrop {
  onClick: () => void;
}

interface iModalOverLay {
  children: ReactNode;
}

interface iModal {
  onCloseCart: () => void;
  children: ReactNode;
}

const Backdrop = (props: iBackDrop) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props: iModalOverLay) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays")!;

const Modal = (props: iModal) => {
  return (
    <Fragment>
      {ReactDom.createPortal(<Backdrop onClick={props.onCloseCart} />, portalElement)}
      {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
