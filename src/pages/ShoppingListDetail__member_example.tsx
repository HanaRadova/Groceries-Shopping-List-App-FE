import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import userImage from '../assets/images/user.png'; 
import enFlag from '../assets/images/EN.png'; 
import deFlag from '../assets/images/DE.png'; 
import logo from '../assets/images/logo.png'; 
import cogwheel from '../assets/images/cogwheel.png'; 
import share from '../assets/images/share.png'; 
import Modal from '../components/Modal';
import SettingsWindow from './SettingsWindowMember';
import '../styles.css'; 

interface Item {
  id: number;
  name: string;
  resolved: boolean;
}

interface ShoppingList {
  name: string;
  items: Item[];
  members: string[];
  owner: string;
}

const ShoppingListDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [shoppingList, setShoppingList] = useState<ShoppingList>({
    name: 'For Monday',
    items: [
      { id: 1, name: 'Orange Juice', resolved: false },
      { id: 2, name: 'Chicken', resolved: false },
      { id: 3, name: 'Mayo', resolved: false },
      { id: 4, name: 'Oil', resolved: true },
    ],
    members: ['Hana Radová (me)'],
    owner: 'Jakub Rada',
  });
  const [newItemName, setNewItemName] = useState('');
  const [filterResolved, setFilterResolved] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isArchived, setIsArchived] = useState(false);

  const toggleItemResolved = (itemId: number) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item) =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      ),
    }));
  };

  const addItem = () => {
    if (newItemName.trim() === '') return;
    setShoppingList((prevList) => ({
      ...prevList,
      items: [
        ...prevList.items,
        { id: prevList.items.length + 1, name: newItemName, resolved: false },
      ],
    }));
    setNewItemName('');
  };

  const removeItem = (itemId: number) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.filter((item) => item.id !== itemId),
    }));
  };

  const removeMember = (memberName: string) => {
    setShoppingList((prevList) => ({
      ...prevList,
      members: prevList.members.filter((member) => member !== memberName),
    }));
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

  const toggleArchiveStatus = () => {
    setIsArchived(!isArchived);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="userInfo">
          <img src={userImage} alt="User" className="userPhoto" />
          <span>Hana Radová</span>
        </div>
        <div className="languageSwitch">
          <img src={enFlag} alt="EN" className="flag" />
          <img src={deFlag} alt="DE" className="flag" />
        </div>
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <div className="listHeader">
      <h2 className="listName">{shoppingList.name}</h2>
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
            <span className={`itemName ${item.resolved ? 'resolved' : ''}`}>
              {item.name}
            </span>
            <button onClick={() => removeItem(item.id)} className="deleteButton">Remove Item</button>
          </li>
        ))}
        <li className="addItem">
          <input
            type="text"
            placeholder="New item"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
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
              <p>List Owner</p>
              <div className="userDetail">
                <img src={userImage} alt="User" className="userPhoto" />
                <span>Jakub Rada</span>
              </div>
            </div>
            <div className="footerColumn">
              <p>Category</p>
              <button className="archiveButton">Active</button>
            </div>
          </div>
        </div>
      </footer>
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <SettingsWindow
                  members={shoppingList.members.map((name, index) => ({
                      photo: userImage,
                      name,
                      id: index.toString(),
                  }))}
                  onLeave={removeMember}
                  hideArchived={filterResolved}
                  setHideArchived={setFilterResolved}
                  onClose={() => setIsSettingsOpen(false)
                  } 
        />
      </Modal>
    </div>
  );
};

export default ShoppingListDetail;