import React from "react";
import "../styles.css";
import { useShoppingListContext } from "../context/ShoppingListContext";
import UserPng from "../assets/images/user.png";

interface SettingsWindowProps {
  hideArchived: boolean;
  setHideArchived: (value: boolean) => void;
  onClose: () => void;
  signedUserId: string; // Pass the signed user ID as a prop
}

const SettingsWindow: React.FC<SettingsWindowProps> = ({
  hideArchived,
  setHideArchived,
  onClose,
  signedUserId,
}) => {
  const { shoppingLists, updateShoppingList } = useShoppingListContext();

  // For simplicity, assuming the first shopping list is the current one
  const currentShoppingList = shoppingLists[0]; // Replace with dynamic ID selection as needed

  // Check if the signed user is the owner
  const isOwner = currentShoppingList.owner === signedUserId;

  const onDeleteMember = (id: string) => {
    const updatedMembers = currentShoppingList.members.filter(
      (member) => member.id !== id
    );
    updateShoppingList(currentShoppingList.id, { members: updatedMembers });
  };

  const leaveList = () => {
    const updatedMembers = currentShoppingList.members.filter(
      (member) => member.id !== signedUserId
    );
    updateShoppingList(currentShoppingList.id, { members: updatedMembers });
    onClose(); // Close the modal after leaving
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
              {isOwner && member.id !== signedUserId ? (
                // Show "Remove Member" button for all other members if the user is the owner
                <button
                  onClick={() => onDeleteMember(member.id)}
                  className="deleteButton"
                  type="button"
                >
                  Remove Member
                </button>
              ) : member.id === signedUserId ? (
                // Show "Leave" button for the signed user if they are not the owner
                !isOwner && (
                  <button
                    onClick={leaveList}
                    className="deleteButton"
                    type="button"
                  >
                    Leave
                  </button>
                )
              ) : null}
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
