import React from "react";
import { useShoppingListContext } from "../context/ShoppingListContext";
import { Link } from "react-router-dom";

const Overview = () => {
  const { shoppingLists, deleteShoppingList } = useShoppingListContext();

  return (
    <div>
      <h1>Shopping Lists</h1>
      <ul>
        {shoppingLists.map((list) => (
          <li key={list.id}>
            <Link to={`/list/${list.id}`}>{list.name}</Link>
            <button onClick={() => deleteShoppingList(list.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Overview;
