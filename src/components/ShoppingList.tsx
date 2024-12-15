import React from "react";
import { ShoppingListItem } from "../types/types";

interface ShoppingListProps {
  items: ShoppingListItem[];
  onToggleResolved: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
  onAddItem: (name: string) => void;
  newItemName: string;
  setNewItemName: (name: string) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  onToggleResolved,
  onRemoveItem,
  onAddItem,
  newItemName,
  setNewItemName,
}) => (
  <ul className="list">
    {items.map((item) => (
      <li key={item._ID} className="listItem">
        <input
          type="checkbox"
          checked={item.resolved}
          onChange={() => onToggleResolved(item._ID)}
        />
        <span className={`itemName ${item.resolved ? "resolved" : ""}`}>
          {item.name}
        </span>
        <button onClick={() => onRemoveItem(item._ID)} className="deleteButton">
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
            onAddItem(newItemName);
          }
        }}
      />
    </li>
  </ul>
);

export default ShoppingList;
