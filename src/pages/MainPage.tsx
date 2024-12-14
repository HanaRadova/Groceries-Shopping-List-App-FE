import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import { ShoppingList } from '../types/types';
import '../styles.css';
import { initialShoppingLists } from '../mocks/shopping-list-array';
import { emptyShoppingList } from '../mocks/empty-shopping-list';

const MainPage: React.FC = () => {
  const [shoppingLists, setShoppingLists] = useState(initialShoppingLists);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [showActive, setShowActive] = useState(true);
  const [showArchived, setShowArchived] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState<string | null>(null);

  const addShoppingList = () => {
    if (newListName.trim() === '') return;
    const newList: ShoppingList = emptyShoppingList(shoppingLists, newListName);
    setShoppingLists([...shoppingLists, newList]);
    setNewListName('');
    setIsModalOpen(false);
  };

  const onDeleteHandler = (e: any, id: string) => {
    e.preventDefault();
    setListToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (listToDelete) {
      setShoppingLists(shoppingLists.filter(list => list.id !== listToDelete));
      setListToDelete(null);
      setIsConfirmModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setListToDelete(null);
    setIsConfirmModalOpen(false);
  };

  const filteredLists = shoppingLists.filter(list => {
    if (showActive && showArchived) return true;
    if (showActive) return !list.archived;
    if (showArchived) return list.archived;
    return false;
  });

  return (
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
        {filteredLists.map(list => (
          <div key={list.id} className="shopping-list-tile">
            <Link to={`/shopping-list-detail/${list.id}`}>
              <div className='listArea'>
                <p className="listHeader">{list.name}</p>
                <p className="listHeader">{list.owner}</p>
                <p className="listHeader">{list.archived ? 'Archived' : 'Active'}</p>
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
        <button onClick={addShoppingList}>Add</button> 
      </Modal>
      <Modal isOpen={isConfirmModalOpen} onClose={cancelDelete}>
        <h2>Are you sure you want to delete this list?</h2>
        <button onClick={confirmDelete}>YES</button>
        <button onClick={cancelDelete}>NO</button>
      </Modal>
    </div>
  );
};

export default MainPage;