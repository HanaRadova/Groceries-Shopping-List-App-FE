import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userImage from "../assets/images/user.png";
import { useShoppingListContext } from "../context/ShoppingListContext";
import "../styles.css";

const ShoppingListDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { shoppingLists, updateShoppingList } = useShoppingListContext();

  const [newItemName, setNewItemName] = useState("");
  const [filterResolved, setFilterResolved] = useState(false);

  const shoppingList = shoppingLists.find((list) => list.id === id);

  if (!shoppingList) {
    console.error(`Shopping list not found for id: ${id}`);
    return <div>Error: Shopping list not found.</div>;
  }

  console.log("Shopping List:", shoppingList); // Debugging

  const addItem = () => {
    if (newItemName.trim() === "") return;

    const updatedItems = [
      ...shoppingList.items,
      { id: String(shoppingList.items.length + 1), name: newItemName, resolved: false },
    ];
    updateShoppingList(shoppingList.id, { items: updatedItems });
    setNewItemName("");
  };

  const removeItem = (itemId: string) => {
    const updatedItems = shoppingList.items.filter((item) => item.id !== itemId);
    updateShoppingList(shoppingList.id, { items: updatedItems });
  };

  const toggleResolved = (itemId: string) => {
    const updatedItems = shoppingList.items.map((item) =>
      item.id === itemId ? { ...item, resolved: !item.resolved } : item
    );
    updateShoppingList(shoppingList.id, { items: updatedItems });
  };

  const removeMember = (memberId: string) => {
    const updatedMembers = shoppingList.members.filter(
      (member) => member.id !== memberId
    );
    updateShoppingList(shoppingList.id, { members: updatedMembers });
  };

  const toggleArchived = () => {
    updateShoppingList(shoppingList.id, { archived: !shoppingList.archived });
  };

  return (
    <div className="container">
      <header className="header">
        <img src={userImage} alt="User" />
        <h1>{shoppingList.name}</h1>
        <button onClick={() => navigate("/")}>Back</button>
      </header>
      <ul>
        {shoppingList.items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.resolved}
              onChange={() => toggleResolved(item.id)}
            />
            {item.name}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={addItem}>Add Item</button>
      <footer>
        <p>Owner: {shoppingList.owner}</p>
        <button onClick={toggleArchived}>
          {shoppingList.archived ? "Unarchive" : "Archive"}
        </button>
      </footer>
    </div>
  );
};

export default ShoppingListDetail;
