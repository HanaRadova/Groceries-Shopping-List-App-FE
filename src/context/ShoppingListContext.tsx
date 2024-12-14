import React, { createContext, useState, ReactNode } from "react";
import { shoppingList } from "../mocks/shopping-list";

// Define the structure of a shopping list
interface ShoppingListItem {
  id: string;
  name: string;
  resolved: boolean;
}

interface User {
  id: string;
  name: string;
  photo: string;
}

interface ShoppingList {
  id: string;
  name: string;
  owner: string;
  archived: boolean;
  items: ShoppingListItem[];
  members: User[];
}

interface ShoppingListContextType {
  shoppingLists: ShoppingList[];
  setShoppingLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>;
  addShoppingList: (list: ShoppingList) => void;
  updateShoppingList: (id: string, updatedList: Partial<ShoppingList>) => void;
  deleteShoppingList: (id: string) => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined
);

export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([
    {
      id: "1",
      name: shoppingList.name,
      owner: shoppingList.owner,
      archived: false,
      items: shoppingList.items,
      members: shoppingList.members, // Ensure members are included
    },
  ]);

  const addShoppingList = (list: ShoppingList) => {
    setShoppingLists((prev) => [...prev, list]);
  };

  const updateShoppingList = (id: string, updates: Partial<ShoppingList>) => {
    setShoppingLists((prev) =>
      prev.map((list) => (list.id === id ? { ...list, ...updates } : list))
    );
  };

  const deleteShoppingList = (id: string) => {
    setShoppingLists((prev) => prev.filter((list) => list.id !== id));
  };

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingLists,
        setShoppingLists,
        addShoppingList,
        updateShoppingList,
        deleteShoppingList,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingListContext = () => {
  const context = React.useContext(ShoppingListContext);
  if (!context) {
    throw new Error("useShoppingListContext must be used within a ShoppingListProvider");
  }
  return context;
};
