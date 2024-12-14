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
        {children}
      </div>
    </div>
  );
};

export default Modal;