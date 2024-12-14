import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import SettingsWindow from "./SettingsWindow";
import { useShoppingList } from "../hooks/useShoppingList";
import ListHeader from "../components/ListHeader";
import ShoppingList from "../components/ShoppingList";
import Footer from "../components/Footer";
import "../styles.css";
import { ShoppingList as ShoppingListType, ShoppingListItem } from "../types/types";

const ShoppingListDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [shoppingList, setShoppingList] = useState<ShoppingListType>();
  const [newItemName, setNewItemName] = useState("");
  const [filterResolved, setFilterResolved] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const { getShoppingList } = useShoppingList();
  const navigate = useNavigate();

  useEffect(() => {
    const result = getShoppingList(id || "");
    result && setShoppingList(result);
  }, []);

  if (!shoppingList) return <div>Loading ...</div>;

  const toggleItemResolved = (itemId: string) => {
    setShoppingList({
      ...shoppingList,
      items: shoppingList.items.map((item) =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      ),
    });
  };

  const addItem = (name: string) => {
    if (name.trim() === "") return;
    setShoppingList({
      ...shoppingList,
      items: [
        ...shoppingList.items,
        { id: String(shoppingList.items.length + 1), name, resolved: false } as ShoppingListItem,
      ],
    });
    setNewItemName("");
  };

  const removeItem = (itemId: string) => {
    setShoppingList({
      ...shoppingList,
      items: shoppingList.items.filter((item) => item.id !== itemId),
    });
  };

  const editListName = (newName: string) => {
    setShoppingList({
      ...shoppingList,
      name: newName,
    });
  };

  const toggleArchiveStatus = () => {
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
        items={filterResolved ? shoppingList.items : shoppingList.items.filter((item) => !item.resolved)}
        onToggleResolved={toggleItemResolved}
        onRemoveItem={removeItem}
        onAddItem={addItem}
        newItemName={newItemName}
        setNewItemName={setNewItemName}
      />
      <Footer
        owner="Hana Radová"
        isArchived={isArchived}
        onToggleArchiveStatus={toggleArchiveStatus}
      />
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <SettingsWindow
          members={shoppingList.members}
          onDeleteMember={() => {}}
          hideArchived={filterResolved}
          setHideArchived={setFilterResolved}
          onClose={() => setIsSettingsOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ShoppingListDetail;
