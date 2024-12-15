import React from "react";
import "../styles.css";
import { useShoppingListContext } from "../context/ShoppingListContext";
import UserPng from "../assets/images/user.png";
import { isOwner, canLeaveList } from "../utils/permissions";

interface SettingsWindowProps {
  hideArchived: boolean;
  setHideArchived: (value: boolean) => void;
  onClose: () => void;
  signedUserId: string;
}

const SettingsWindow: React.FC<SettingsWindowProps> = ({
  hideArchived,
  setHideArchived,
  onClose,
  signedUserId,
}) => {
  const { shoppingLists, updateShoppingList } = useShoppingListContext();

  const currentShoppingList = shoppingLists.find(
    (list) => list._ID === window.location.pathname.split("/").pop()
  );

  if (!currentShoppingList) {
    return (
      <div className="settingsContainer">
        <p>Shopping list not found!</p>
        <button type="button" className="closeButton" onClick={onClose}>
          x
        </button>
      </div>
    );
  }

  const onDeleteMember = (id: string) => {
    const updatedMembers = currentShoppingList.members.filter(
      (member) => member.id !== id
    );
    updateShoppingList(currentShoppingList._ID, { members: updatedMembers });
  };

  const leaveList = () => {
    const updatedMembers = currentShoppingList.members.filter(
      (member) => member.id !== signedUserId
    );
    updateShoppingList(currentShoppingList._ID, { members: updatedMembers });
    onClose();
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

              {isOwner(currentShoppingList.owner, signedUserId) ? (
                // If the user is the owner, show "Remove" button for other members
                member.id !== signedUserId && (
                  <button
                    onClick={() => onDeleteMember(member.id)}
                    className="deleteButton"
                    type="button"
                  >
                    Remove
                  </button>
                )
              ) : canLeaveList(currentShoppingList.owner, currentShoppingList.members, signedUserId) ? (
                // If the user is a member (but not owner), show "Leave" button
                <button
                  onClick={leaveList}
                  className="deleteButton"
                  type="button"
                >
                  Leave
                </button>
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
