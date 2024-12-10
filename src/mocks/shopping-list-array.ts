import { ShoppingList } from '../types/types';
import { members, users } from './users';

export const initialShoppingLists: ShoppingList[] = [
    { id: "1", name: 'For Monday', owner: 'Bob Brown', archived: false,  items: [
      { id: "1", name: 'Milk', resolved: false },
      { id: "2", name: 'Bread', resolved: true },
      { id: "3", name: 'Eggs', resolved: false },
      { id: "4", name: 'Oranges', resolved: false },
    ], members:[...members] },
    { id: "2", name: 'My Shopping List', owner: 'Hana Radová', archived: true, items:[
      { id: "1", name: 'Banana', resolved: false },
      { id: "2", name: 'Orange juice', resolved: false },
      { id: "3", name: 'Backing Powder', resolved: true },
      { id: "4", name: 'Flowers', resolved: true },
    ], members:[...members] },
  ];