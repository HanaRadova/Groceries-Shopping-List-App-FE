import React from "react";
import { Link } from "react-router-dom";
import { ShoppingList } from "../types/types";

interface ShoppingListTileProps {
  list: ShoppingList;
  onDeleteHandler: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const ShoppingListTile: React.FC<ShoppingListTileProps> = ({ list, onDeleteHandler }) => (
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
);

export default ShoppingListTile;
