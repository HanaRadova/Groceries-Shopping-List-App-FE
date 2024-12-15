import React from "react";
import InputField from "./InputField";
import Button from "./Button";

interface AuthFormProps {
  title: string;
  fields: {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
  }[];
  onSubmit: (e: React.FormEvent) => void;
  footerText?: string;
  footerAction?: () => void;
  footerLinkText?: string;
  buttonText?: string; 
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  fields,
  onSubmit,
  footerText,
  footerAction,
  footerLinkText,
  buttonText = "Submit", 
}) => {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2>{title}</h2>
      {fields.map((field, index) => (
        <InputField key={index} {...field} />
      ))}
      <Button text={buttonText} type="submit" /> 
      {footerText && footerAction && (
        <p>
          {footerText}{" "}
          <span onClick={footerAction} style={{ cursor: "pointer", color: "blue" }}>
            {footerLinkText}
          </span>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
