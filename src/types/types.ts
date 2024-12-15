export interface ShoppingListItem {
  _ID: string; // Use _ID to match the backend
  name: string;
  resolved: boolean;
}

export interface User {
  id: string;
  name: string;
  photo?: string;
}

export interface ShoppingList {
  _ID: string; 
  name: string;
  owner: string;
  archived: boolean;
  items: ShoppingListItem[];
  members: {
    id: string;
    name: string;
    photo?: string; 
  }[];
}
