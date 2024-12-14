import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ShoppingListDetail from './pages/ShoppingListDetail';
import AccessDeclined from './pages/AccessDeclined';
import './styles.css'; 
import MainPage from './pages/MainPage';
import Header from "./components/Header";
import { UserProvider } from "./context/UserContext";


const App: React.FC = () => {
  return (
    <UserProvider>
        <Router>
        <Header />
      <Routes>
        <Route path="/" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/shopping-list-detail/:id" element={<ShoppingListDetail />} />
        <Route path="/access-declined" element={<AccessDeclined />} />
      </Routes>
    </Router>
    </UserProvider>
  );
};

export default App;