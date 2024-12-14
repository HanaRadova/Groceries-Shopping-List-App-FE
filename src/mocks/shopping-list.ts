import { users } from "./users";

export const shoppingList = {
  name: "My Shopping List",
  items: [
    { id: "1", name: "Milk", resolved: false },
    { id: "2", name: "Bread", resolved: false },
    { id: "3", name: "Eggs", resolved: false },
    { id: "4", name: "Oranges", resolved: false },
  ],
  members: users.filter((user) =>
    ["Bob Brown", "Hana Radová"].includes(user.name)
  ), 
  owner: "Hana Radová",
};
