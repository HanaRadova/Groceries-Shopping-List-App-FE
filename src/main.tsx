import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './styles.css'; 
import { ShoppingListProvider } from "./context/ShoppingListContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ShoppingListProvider>
      <App />
    </ShoppingListProvider>
  </React.StrictMode>
);