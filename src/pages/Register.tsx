import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name is required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Simulate saving registered user
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Redirecting to login...");

    // Redirect to login after registration
    window.location.href = "/login";
  };

  return (
    <AuthForm
      title="Register"
      fields={[
        { label: "Name", type: "text", value: name, onChange: (e) => setName(e.target.value) },
        { label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value) },
        { label: "Password", type: "password", value: password, onChange: (e) => setPassword(e.target.value) },
        {
          label: "Confirm Password",
          type: "password",
          value: confirmPassword,
          onChange: (e) => setConfirmPassword(e.target.value),
        },
      ]}
      onSubmit={handleSubmit}
      footerText="Already have an account?"
      footerAction={() => (window.location.href = "/login")}
      footerLinkText="Login here"
    />
  );
};

export default Register;
