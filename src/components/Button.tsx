import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button", disabled }) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
