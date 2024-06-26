import { useEffect } from "react";
import Modal from "react-modal";
import classes from "./modal.module.css";
import { XLg } from "@styled-icons/bootstrap";

Modal.setAppElement("#__next");

const GlobalModal = (props) => {
  useEffect(() => {
    props.isOpen && (document.body.style.overflow = "hidden");
    !props.isOpen && (document.body.style.overflow = "");
  }, [props.isOpen]);

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.handleCloseModal}
      closeTimeoutMS={400}
      className={props.small ? classes.content_small : classes.content}
      overlayClassName={classes.overlay}
    >
      <div className={classes.body}>
        <button
          className={classes.close_button}
          onClick={props.handleCloseModal}
        >
          <XLg width={22} height={22} />
        </button>
        {props.children}
      </div>
    </Modal>
  );
};

export default GlobalModal;
