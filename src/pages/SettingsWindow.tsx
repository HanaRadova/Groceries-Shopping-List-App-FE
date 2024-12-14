import React from "react";
import "../styles.css";
import { useShoppingListContext } from "../context/ShoppingListContext";
import UserPng from "../assets/images/user.png";

const SettingsWindow: React.FC<{
  hideArchived: boolean;
  setHideArchived: (value: boolean) => void;
  onClose: () => void;
}> = ({ hideArchived, setHideArchived, onClose }) => {
  const { shoppingLists, updateShoppingList } = useShoppingListContext();

  const currentShoppingList = shoppingLists[0]; // Replace with dynamic ID selection as needed

  const onDeleteMember = (id: string) => {
    const updatedMembers = currentShoppingList.members.filter(
      (member) => member.id !== id
    );
    updateShoppingList(currentShoppingList.id, { members: updatedMembers });
  };

  return (
    <div className="settingsContainer">
      <form>
        <h2>ALL MEMBERS</h2>
        <ul className="membersList">
          {currentShoppingList.members.map((member) => (
            <li key={member.id} className="memberRow">
              <img
                src={member.photo || UserPng}
                alt={member.name}
                className="photo"
              />
              <span className="memberName">{member.name}</span>
              <button
                onClick={() => onDeleteMember(member.id)}
                className="deleteButton"
              >
                Remove Member
              </button>
            </li>
          ))}
        </ul>
        <h2>LIST SETTINGS</h2>
        <div className="setting">
          <span>Hide finished tasks</span>
          <button
            type="button"
            onClick={() => setHideArchived(!hideArchived)}
          >
            {hideArchived ? "Unhide" : "Hide"}
          </button>
        </div>
        <button type="button" className="closeButton" onClick={onClose}>
          x
        </button>
      </form>
    </div>
  );
};

export default SettingsWindow;
