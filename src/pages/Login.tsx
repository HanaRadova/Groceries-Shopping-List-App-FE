import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useUserContext } from "../context/UserContext";

const Login: React.FC = () => {
  const { setUser } = useUserContext(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Both fields are required!");
      return;
    }

    try {
      
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      
      const user = { id: data.id, name: data.name, photo: "", token: data.token };
      setUser(user); 
      localStorage.setItem("user", JSON.stringify(user)); 

      alert(`Welcome ${user.name}!`);
      window.location.href = "/main-page";
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    }
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
