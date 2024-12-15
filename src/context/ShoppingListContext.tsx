import React, { createContext, useState, ReactNode } from "react";
import { ShoppingList } from "../types/types";
import { exampleShoppingLists } from "../mocks/shopping-list"; 

interface ShoppingListContextType {
  shoppingLists: ShoppingList[];
  setShoppingLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>;
  addShoppingList: (list: ShoppingList) => void;
  updateShoppingList: (id: string, updates: Partial<ShoppingList>) => void;
  deleteShoppingList: (id: string) => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined
);

export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
  // Use the mock data as the initial state
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>(
    exampleShoppingLists
  );

  const addShoppingList = (list: ShoppingList) => {
    setShoppingLists((prev) => [...prev, list]);
  };

  const updateShoppingList = (id: string, updates: Partial<ShoppingList>) => {
    setShoppingLists((prev) =>
      prev.map((list) => (list._ID === id ? { ...list, ...updates } : list))
    );
  };

  const deleteShoppingList = (id: string) => {
    setShoppingLists((prev) => prev.filter((list) => list._ID !== id));
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
    throw new Error(
      "useShoppingListContext must be used within a ShoppingListProvider"
    );
  }
  return context;
};
