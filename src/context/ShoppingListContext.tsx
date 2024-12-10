import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context state
interface ShoppingListContextType {
  shoppingLists: ShoppingList[];
  setShoppingLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>;
}

interface ShoppingList {
  id: string;
  name: string;
  owner: string;
  archived: boolean;
  items: ShoppingListItem[];
}

interface ShoppingListItem {
  id: string;
  name: string;
  resolved: boolean;
}

// Create the context
const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined
);

// Provider component
export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([
    {
      id: "1",
      name: "Groceries",
      owner: "Alice",
      archived: false,
      items: [
        { id: "1", name: "Apples", resolved: false },
        { id: "2", name: "Milk", resolved: true },
      ],
    },
    {
      id: "2",
      name: "Office Supplies",
      owner: "Bob",
      archived: true,
      items: [
        { id: "1", name: "Paper", resolved: false },
        { id: "2", name: "Pens", resolved: false },
      ],
    },
  ]);

  return (
    <ShoppingListContext.Provider value={{ shoppingLists, setShoppingLists }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

// Custom hook to use the context
export const useShoppingListContext = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error(
      "useShoppingListContext must be used within a ShoppingListProvider"
    );
  }
  return context;
};
