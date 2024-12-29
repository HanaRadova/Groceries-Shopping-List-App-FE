import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShoppingListDetail from "./pages/ShoppingListDetail";
import AccessDeclined from "./pages/AccessDeclined";
import MainPage from "./pages/MainPage";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles.css";
import "./i18n/i18n";

const App: React.FC = () => {
  return (
    <UserProvider>
      <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/main-page"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
            />
          <Route path="/profile" element={<Profile />} />
          
          <Route
            path="/shopping-list-detail/:id"
            element={
              <ProtectedRoute>
                <ShoppingListDetail />
              </ProtectedRoute>
            }
          />
          <Route path="/access-declined" element={<AccessDeclined />} />
        </Routes>
      </Router>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
