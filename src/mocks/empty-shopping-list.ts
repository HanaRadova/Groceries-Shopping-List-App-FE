export const emptyShoppingList = (initialShoppingLists: Array<any>, newListName: string) => 
    ({
    id: String(initialShoppingLists.length + 1),
    name: newListName,
    owner: 'Current User', 
    archived: false,
    items:[],
    members:[]
  })