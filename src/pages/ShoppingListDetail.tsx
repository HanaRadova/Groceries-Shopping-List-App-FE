import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import SettingsWindow from "./SettingsWindow";
import ListHeader from "../components/ListHeader";
import ShoppingList from "../components/ShoppingList";
import Footer from "../components/Footer";
import "../styles.css";
import Header from "../components/Header";
import { useShoppingListContext } from "../context/ShoppingListContext";
import { useUserContext } from "../context/UserContext";
import { userIsOwner } from "../utils/permissions";

const ShoppingListDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { shoppingLists, updateShoppingList } = useShoppingListContext();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const shoppingList = shoppingLists.find((list) => list._ID === id);

  if (!shoppingList) {
    return <div>Shopping list not found!</div>;
  }

  const isOwner = user?.id === shoppingList?.owner;

  const [newItemName, setNewItemName] = useState("");
  const [filterResolved, setFilterResolved] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isArchived, setIsArchived] = useState(shoppingList?.archived || false);

  const toggleArchiveStatus = () => {
    if (isOwner) {
      updateShoppingList(shoppingList._ID, { archived: !isArchived });
      setIsArchived(!isArchived);
    }
  };

  const editListName = (newName: string) => {
    if (isOwner) {
      updateShoppingList(shoppingList._ID, { name: newName });
    }
  };

  return (
    <div className="container">
      <Header />
      <ListHeader
        listName={shoppingList.name}
        onEditName={isOwner ? editListName : undefined} // Only owner can edit
        onOpenSettings={() => setIsSettingsOpen(true)}
        onGenerateShareLink={() => {
          const shareLink = `https://example.com/share/${shoppingList._ID}`;
          alert(`Share link generated: ${shareLink}`);
        }}
      />
      <ShoppingList
        items={
          filterResolved
            ? shoppingList.items.filter((item) => !item.resolved)
            : shoppingList.items
        }
        onToggleResolved={(itemId) => {
          const updatedItems = shoppingList.items.map((item) =>
            item._ID === itemId ? { ...item, resolved: !item.resolved } : item
          );
          updateShoppingList(shoppingList._ID, { items: updatedItems });
        }}
        onRemoveItem={(itemId) => {
          const updatedItems = shoppingList.items.filter(
            (item) => item._ID !== itemId
          );
          updateShoppingList(shoppingList._ID, { items: updatedItems });
        }}
        onAddItem={() => {
          if (newItemName.trim() === "") return;
          const newItem = {
            _ID: String(Date.now()),
            name: newItemName,
            resolved: false,
          };
          updateShoppingList(shoppingList._ID, {
            items: [...shoppingList.items, newItem],
          });
          setNewItemName("");
        }}
        newItemName={newItemName}
        setNewItemName={setNewItemName}
      />
      <Footer
  owner={shoppingList.owner}
  isArchived={isArchived}
  onToggleArchiveStatus={isOwner ? toggleArchiveStatus : undefined}
/>

      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <SettingsWindow
          hideArchived={filterResolved}
          setHideArchived={setFilterResolved}
          onClose={() => setIsSettingsOpen(false)}
          signedUserId={user?.id || ""}
        />
      </Modal>
    </div>
  );
};

export default ShoppingListDetail;
