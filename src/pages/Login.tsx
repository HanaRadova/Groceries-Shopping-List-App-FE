import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Both fields are required!");
      return;
    }

    // Simulate API call to validate login
    console.log("Login:", { email, password });

    // Simulate saving the user session
    localStorage.setItem("user", JSON.stringify({ email }));

    // Redirect to main page after login
    window.location.href = "/main-page";
  };

  return (
    <AuthForm
      title="Login"
      fields={[
        { label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value) },
        { label: "Password", type: "password", value: password, onChange: (e) => setPassword(e.target.value) },
      ]}
      onSubmit={handleSubmit}
      footerText="Don't have an account?"
      footerAction={() => (window.location.href = "/register")}
      footerLinkText="Register here"
    />
  );
};

export default Login;
