import React from 'react';
import { useParams } from "react-router-dom";
import { useShoppingListContext } from "../context/ShoppingListContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginDemo from './pages/LoginDemo';
import ShoppingListDetail from './pages/ShoppingListDetail';
import AccessDeclined from './pages/AccessDeclined';
import './styles.css'; 
import MainPage from './pages/MainPage';
import Overview from "./components/Overview";
import Detail from "./components/Detail";


const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const { shoppingLists, updateShoppingList } = useShoppingListContext();
  const shoppingList = shoppingLists.find((list) => list.id === id);

  if (!shoppingList) {
    return <div>Shopping list not found.</div>;
  }

  const toggleArchived = () => {
    updateShoppingList(id, { archived: !shoppingList.archived });
  };

  return (
    <div>
      <h1>{shoppingList.name}</h1>
      <button onClick={toggleArchived}>
        {shoppingList.archived ? "Unarchive" : "Archive"}
      </button>
      <ul>
        {shoppingList.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.resolved ? "Resolved" : "Unresolved"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Detail;


const App: React.FC = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/list/:id" element={<Detail />} />
        <Route path="/main-page" element={<MainPage />} /> 
        <Route path="/login" element={<LoginDemo />} />
        <Route path="/shopping-list-detail/:id" element={<ShoppingListDetail />} />
        <Route path="/access-declined" element={<AccessDeclined />} />
      </Routes>
    </Router>
  );
};

export default App;