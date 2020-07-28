import React from 'react';
import ReactDOM from 'react-dom';

import { StyledModal } from './StyledModal';

const Modal = ({ title, closeModal, children }) => {
  const hideModal = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <StyledModal onClick={hideModal}>
      <div className="content">
        <p className="heading">{title}</p>
        <span className="close-icon" onClick={closeModal} title="close">
          &times;
        </span>
        <div>{children}</div>
      </div>
    </StyledModal>,
    document.querySelector('#modal-root'),
  );
};

export default Modal;
