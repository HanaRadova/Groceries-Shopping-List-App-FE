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
    const user = { email, name: "Jo" }; // Replace "Jo" with the actual user name from your backend/registration data
    localStorage.setItem("user", JSON.stringify(user));
  
    // Redirect to main page after login
    alert(`Welcome ${user.name}!`);
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
      footerAction={() => (window.location.href = "/")}
      footerLinkText="Register here"
    />
  );
};

export default Login;
