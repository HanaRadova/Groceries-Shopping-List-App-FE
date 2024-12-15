import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { v4 as uuidv4 } from "uuid";
import "../styles.css";
import { useShoppingListContext } from "../context/ShoppingListContext";
import { useUserContext } from "../context/UserContext";
import Header from "../components/Header"; 

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
      _ID: String(Date.now()), 
      name: newListName,
      owner: user.name, // Owner is the current signed-in user
      archived: false,
      items: [],
      members: [
        {
          id: user.id, // Add the signed-in user to members
          name: user.name,
          photo: user.photo || "", 
        },
      ],
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
      <Header /> 
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
            <div key={list._ID} className="shopping-list-tile">
              <Link to={`/shopping-list-detail/${list._ID}`}>
                <div className="listArea">
                  <p className="listHeader">{list.name}</p>
                  <p className="listHeader">{list.owner}</p>
                  <p className="listHeader">{list.archived ? "Archived" : "Active"}</p>
                  <button onClick={(e) => onDeleteHandler(e, list._ID)}>Delete</button>
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
