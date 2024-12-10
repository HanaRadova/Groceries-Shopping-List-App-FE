import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userImage from "../assets/images/user.png";
import enFlag from "../assets/images/EN.png";
import deFlag from "../assets/images/DE.png";
import logo from "../assets/images/logo.png";
import cogwheel from "../assets/images/cogwheel.png";
import share from "../assets/images/share.png";
import Modal from "../components/Modal";
import SettingsWindow from "./SettingsWindow";
import { useShoppingListContext } from "../context/ShoppingListContext";
import "../styles.css";

const ShoppingListDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { shoppingLists, updateShoppingList } = useShoppingListContext();

  const [newItemName, setNewItemName] = useState("");
  const [filterResolved, setFilterResolved] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Fetch the shopping list from the context
  const shoppingList = shoppingLists.find((list) => list.id === id);

  if (!shoppingList) {
    return <div>Error: Shopping list not found.</div>;
  }

  const toggleItemResolved = (itemId: string) => {
    const updatedItems = shoppingList.items.map((item) =>
      item.id === itemId ? { ...item, resolved: !item.resolved } : item
    );
    updateShoppingList(shoppingList.id, { items: updatedItems });
  };

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

  const editListName = (newName: string) => {
    updateShoppingList(shoppingList.id, { name: newName });
  };

  const removeMember = (memberId: string) => {
    const updatedMembers = shoppingList.members.filter((member) => member.id !== memberId);
    updateShoppingList(shoppingList.id, { members: updatedMembers });
  };

  const toggleArchiveStatus = () => {
    updateShoppingList(shoppingList.id, { archived: !shoppingList.archived });
  };

  const filteredItems = filterResolved
    ? shoppingList.items
    : shoppingList.items.filter((item) => !item.resolved);

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const generateShareLink = () => {
    const shareLink = `https://example.com/share/${id}`;
    alert(`Share link generated: ${shareLink}`);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="userInfo">
          <img src={userImage} alt="User" className="userPhoto" />
          <span>{shoppingList.owner}</span>
        </div>
        <div className="languageSwitch">
          <img src={enFlag} alt="EN" className="flag" />
          <img src={deFlag} alt="DE" className="flag" />
        </div>
        <img src={logo} alt="Logo" className="logo" onClick={() => navigate("/")} />
      </header>
      <div className="listHeader">
        <input
          type="text"
          value={shoppingList.name}
          onChange={(e) => editListName(e.target.value)}
          className="listName"
        />
        <div className="listActions">
          <img src={cogwheel} alt="Settings" className="icon" onClick={openSettings} />
          <img src={share} alt="Share" className="icon" onClick={generateShareLink} />
        </div>
      </div>
      <ul className="list">
        {filteredItems.map((item) => (
          <li key={item.id} className="listItem">
            <input
              type="checkbox"
              checked={item.resolved}
              onChange={() => toggleItemResolved(item.id)}
            />
            <span className={`itemName ${item.resolved ? "resolved" : ""}`}>
              {item.name}
            </span>
            <button onClick={() => removeItem(item.id)} className="deleteButton">
              Remove Item
            </button>
          </li>
        ))}
        <li className="addItem">
          <input
            type="text"
            placeholder="New item"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addItem();
              }
            }}
          />
        </li>
      </ul>
      <footer className="footer">
        <div className="detailInfo">
          <p>Detailed Information</p>
          <div className="footerRow">
            <div className="footerColumn">
              <p>Owner</p>
              <div className="userDetail">
                <img src={userImage} alt="User" className="userPhoto" />
                <span>{shoppingList.owner}</span>
              </div>
            </div>
            <div className="footerColumn">
              <p>Category</p>
              <button className="archiveButton" onClick={toggleArchiveStatus}>
                {shoppingList.archived ? "Active" : "Archived"}
              </button>
            </div>
          </div>
        </div>
      </footer>
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <SettingsWindow
          members={shoppingList.members}
          onDeleteMember={removeMember}
          hideArchived={filterResolved}
          setHideArchived={setFilterResolved}
          onClose={() => setIsSettingsOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ShoppingListDetail;
