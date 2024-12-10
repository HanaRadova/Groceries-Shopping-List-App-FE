export const mockShoppingLists: ShoppingList[] = [
  {
    id: "1",
    name: "Groceries",
    owner: "Hana Radová",
    archived: false,
    items: [
      { id: "1", name: "Milk", resolved: false },
      { id: "2", name: "Eggs", resolved: true },
    ],
    members: [
      { id: "1", name: "Hana Radová", photo: "/path/to/photo1.png" },
      { id: "2", name: "John Doe", photo: "/path/to/photo2.png" },
    ], // Ensure members are defined here
  },
];