import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginDemo from './pages/LoginDemo';
import ShoppingListDetail from './pages/ShoppingListDetail';
import AccessDeclined from './pages/AccessDeclined';
import './styles.css'; 
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<MainPage />} /> 
        <Route path="/login" element={<LoginDemo />} />
        <Route path="/shopping-list-detail/:id" element={<ShoppingListDetail />} />
        <Route path="/access-declined" element={<AccessDeclined />} />
      </Routes>
    </Router>
  );
};

export default App;