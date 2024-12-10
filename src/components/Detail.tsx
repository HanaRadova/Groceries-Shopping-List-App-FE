import React from "react";
import { useParams } from "react-router-dom";
import { useShoppingListContext } from "../context/ShoppingListContext";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const { shoppingLists, updateShoppingList } = useShoppingListContext();
  const shoppingList = shoppingLists.find((list) => list.id === id);

  if (!shoppingList) {
    return <div>Shopping list not found.</div>;
  }

  const toggleArchived = () => {
    updateShoppingList(id, { archived: !shoppingList.archived });
  };

  return (
    <div>
      <h1>{shoppingList.name}</h1>
      <button onClick={toggleArchived}>
        {shoppingList.archived ? "Unarchive" : "Archive"}
      </button>
      <ul>
        {shoppingList.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.resolved ? "Resolved" : "Unresolved"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Detail;
