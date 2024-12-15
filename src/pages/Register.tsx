import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "user", // Default role
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful! Redirecting to login...");
      window.location.href = "/login";
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
      buttonText={loading ? "Registering..." : "Register"}
    />
  );
};

export default Register;
