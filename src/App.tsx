import React from 'react';
import { useParams, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useShoppingListContext } from "./context/ShoppingListContext";
import LoginDemo from './pages/LoginDemo';
import ShoppingListDetail from './pages/ShoppingListDetail';
import AccessDeclined from './pages/AccessDeclined';
import './styles.css'; 
import MainPage from './pages/MainPage';
import Overview from "./components/Overview";

const ShoppingListDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { shoppingLists, updateShoppingList } = useShoppingListContext();

  // Validate id before using it
  if (!id) {
    return <div>Error: Invalid shopping list ID.</div>;
  }

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


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/list/:id" element={<ShoppingListDetailPage />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/login" element={<LoginDemo />} />
        <Route path="/shopping-list-detail/:id" element={<ShoppingListDetail />} />
        <Route path="/access-declined" element={<AccessDeclined />} />
      </Routes>
    </Router>
  );
};

export default App;
