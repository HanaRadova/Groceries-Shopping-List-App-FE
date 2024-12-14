import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import SettingsWindow from "./SettingsWindow";
import ListHeader from "../components/ListHeader";
import ShoppingList from "../components/ShoppingList";
import Footer from "../components/Footer";
import "../styles.css";
import { useShoppingListContext } from "../context/ShoppingListContext";

const ShoppingListDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { shoppingLists, updateShoppingList } = useShoppingListContext();
  const shoppingList = shoppingLists.find((list) => list.id === id);

  const [newItemName, setNewItemName] = useState("");
  const [filterResolved, setFilterResolved] = useState(false); // Default to hide finished tasks
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isArchived, setIsArchived] = useState(shoppingList?.archived || false);
  const navigate = useNavigate();

  if (!shoppingList) {
    return <div>Loading...</div>; // Consider redirecting if list not found
  }

  const toggleItemResolved = (itemId: string) => {
    const updatedItems = shoppingList.items.map((item) =>
      item.id === itemId ? { ...item, resolved: !item.resolved } : item
    );
    updateShoppingList(shoppingList.id, { items: updatedItems });
  };

  const addItem = (name: string) => {
    if (name.trim() === "") return;
    const newItem = {
      id: String(Date.now()),
      name,
      resolved: false,
    };
    updateShoppingList(shoppingList.id, { items: [...shoppingList.items, newItem] });
    setNewItemName("");
  };

  const removeItem = (itemId: string) => {
    const updatedItems = shoppingList.items.filter((item) => item.id !== itemId);
    updateShoppingList(shoppingList.id, { items: updatedItems });
  };

  const editListName = (newName: string) => {
    updateShoppingList(shoppingList.id, { name: newName });
  };

  const toggleArchiveStatus = () => {
    updateShoppingList(shoppingList.id, { archived: !isArchived });
    setIsArchived(!isArchived);
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const generateShareLink = () => {
    const shareLink = `https://example.com/share/${id}`;
    alert(`Share link generated: ${shareLink}`);
  };

  return (
    <div className="container">
      <ListHeader
        listName={shoppingList.name}
        onEditName={editListName}
        onOpenSettings={openSettings}
        onGenerateShareLink={generateShareLink}
      />
      <ShoppingList
        items={filterResolved ? shoppingList.items.filter((item) => !item.resolved) : shoppingList.items}
        onToggleResolved={toggleItemResolved}
        onRemoveItem={removeItem}
        onAddItem={addItem}
        newItemName={newItemName}
        setNewItemName={setNewItemName}
      />
      <Footer
        owner={shoppingList.owner}
        isArchived={isArchived}
        onToggleArchiveStatus={toggleArchiveStatus}
      />
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
  <SettingsWindow
    hideArchived={filterResolved}
    setHideArchived={setFilterResolved}
    onClose={() => setIsSettingsOpen(false)}
    signedUserId="4" // Replace with dynamic signed user ID (e.g., from auth context)
  />
</Modal>


    </div>
  );
};

export default ShoppingListDetail;
