// src/main.tsx or src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { ShoppingListProvider } from "./context/ShoppingListContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <ShoppingListProvider>
        <App />
      </ShoppingListProvider>
    </UserProvider>
  </React.StrictMode>
);
