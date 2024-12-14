export const emptyShoppingList = (initialShoppingLists: Array<any>, newListName: string) => 
    ({
    id: String(initialShoppingLists.length + 1),
    name: newListName,
    owner: 'Hana Radová', 
    archived: false,
    items:[],
    members:[]
  })