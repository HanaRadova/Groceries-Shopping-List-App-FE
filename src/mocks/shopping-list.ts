import { v4 as uuidv4 } from "uuid";
import { ShoppingList } from "../types/types";

export const exampleShoppingLists: ShoppingList[] = [
  {
    _ID: uuidv4(), 
    name: "List Example 1",
    owner: "Hana",
    archived: false,
    items: [
      { _ID: uuidv4(), name: "Milk", resolved: false },
      { _ID: uuidv4(), name: "Carrots", resolved: false },
    ],
    members: [
      { id: "user1", name: "Hana", photo: "" },
      { id: "user2", name: "John", photo: "" },
    ],
  },
  {
    _ID: uuidv4(),
    name: "List Example 2",
    owner: "Alex",
    archived: false,
    items: [
      { _ID: uuidv4(), name: "Flowers", resolved: true },
      { _ID: uuidv4(), name: "Bread", resolved: true },
    ],
    members: [{ id: "user1", name: "Alex", photo: "" }],
  },
  {
    _ID: uuidv4(),
    name: "List Example 3",
    owner: "John",
    archived: false,
    items: [
      { _ID: uuidv4(), name: "Oranges", resolved: false },
      { _ID: uuidv4(), name: "Apples", resolved: false },
    ],
    members: [
      { id: "user2", name: "John", photo: "" },
      { id: "user1", name: "Hana", photo: "" }, 
      
    ],
  },
];
