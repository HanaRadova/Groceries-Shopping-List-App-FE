import { ShoppingList } from "../types/types";

export const shoppingLists: ShoppingList[] = [
  {
    _ID: "1",
    name: "Groceries",
    owner: "John Doe",
    archived: false,
    items: [
      { _ID: "item1", name: "Milk", resolved: false },
      { _ID: "item2", name: "Eggs", resolved: true },
    ],
    members: [{ id: "user1", name: "John Doe" }],
  },
  {
    _ID: "2",
    name: "Hardware Supplies",
    owner: "Jane Smith",
    archived: true,
    items: [{ _ID: "item3", name: "Hammer", resolved: false }],
    members: [{ id: "user2", name: "Jane Smith" }],
  },
];
