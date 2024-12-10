import React from 'react';
import '../styles.css'; // Import the global stylesheet

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <button className="closeButton" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;