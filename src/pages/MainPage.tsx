import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import "../styles.css";
import { useShoppingListContext } from "../context/ShoppingListContext";
import { useUserContext } from "../context/UserContext";
import Header from "../components/Header"; // Import Header component

const MainPage: React.FC = () => {
  const { shoppingLists, addShoppingList, deleteShoppingList } = useShoppingListContext();
  const { user } = useUserContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [showActive, setShowActive] = useState(true);
  const [showArchived, setShowArchived] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState<string | null>(null);

  const handleAddShoppingList = () => {
    if (!user) {
      alert("You must be logged in to create a list.");
      return;
    }

    if (newListName.trim() === "") return;

    const newList = {
      id: String(Date.now()), // Generate a unique ID
      name: newListName,
      owner: user.name || "Guest", // Dynamically set owner based on the signed-in user
      archived: false,
      items: [],
      members: [], // Default to an empty array
    };

    addShoppingList(newList);
    setNewListName("");
    setIsModalOpen(false);
  };

  const onDeleteHandler = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setListToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (listToDelete) {
      deleteShoppingList(listToDelete);
      setListToDelete(null);
      setIsConfirmModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setListToDelete(null);
    setIsConfirmModalOpen(false);
  };

  const filteredLists = shoppingLists.filter((list) => {
    if (showActive && showArchived) return true;
    if (showActive) return !list.archived;
    if (showArchived) return list.archived;
    return false;
  });

  return (
    <div>
      <Header /> {/* Add the Header component */}
      <div className="container">
        <div className="listHeader">
          <h1>Main Page</h1>
        </div>
        <div className="listsSort">
          <button onClick={() => setShowActive(!showActive)}>Active</button>
          <button onClick={() => setShowArchived(!showArchived)}>Archived</button>
          <button onClick={() => setIsModalOpen(true)}>+</button>
        </div>
        <div className="shopping-lists">
          {filteredLists.map((list) => (
            <div key={list.id} className="shopping-list-tile">
              <Link to={`/shopping-list-detail/${list.id}`}>
                <div className="listArea">
                  <p className="listHeader">{list.name}</p>
                  <p className="listHeader">{list.owner}</p>
                  <p className="listHeader">{list.archived ? "Archived" : "Active"}</p>
                  <button onClick={(e) => onDeleteHandler(e, list.id)}>Delete</button>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Add New List</h2>
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="List Name"
          />
          <button onClick={handleAddShoppingList}>Add</button>
        </Modal>
        <Modal isOpen={isConfirmModalOpen} onClose={cancelDelete}>
          <h2>Are you sure you want to delete this list?</h2>
          <button onClick={confirmDelete}>YES</button>
          <button onClick={cancelDelete}>NO</button>
        </Modal>
      </div>
    </div>
  );
};

export default MainPage;
