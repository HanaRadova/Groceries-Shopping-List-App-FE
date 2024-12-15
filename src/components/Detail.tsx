import { useParams } from "react-router-dom";
import { useShoppingListContext } from "../context/ShoppingListContext";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const { shoppingLists, updateShoppingList } = useShoppingListContext();

  
  if (!id) {
    return <div>Error: Invalid shopping list ID.</div>;
  }

  const shoppingList = shoppingLists.find((list) => list._ID === id);

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
          <li key={item._ID}>
            {item.name} - {item.resolved ? "Resolved" : "Unresolved"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Detail;
