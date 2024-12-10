export interface ShoppingListItem {
  id: string;
  name: string;
  resolved: boolean;
}

export interface User {
  id: string;
  name: string;
  photo: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  owner: string;
  archived: boolean;
  items: ShoppingListItem[];
  members: User[]; 
}
