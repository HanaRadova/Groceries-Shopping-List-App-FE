import { emptyShoppingList } from '../mocks/empty-shopping-list'
import { initialShoppingLists } from '../mocks/shopping-list-array'

export const useShoppingList = () => {

    const getShoppingList = (id: number|string) => {
        const foundShoppingList = initialShoppingLists.find(shpList => shpList.id == id)
        if (foundShoppingList) return foundShoppingList

        return emptyShoppingList(initialShoppingLists, "New shopping list")
    }

    return {
        getShoppingList
    }
}