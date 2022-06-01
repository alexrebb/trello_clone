import { Lists } from '../types'
import { baseURL } from './constants'
import getOptions from '../utils/fetchOptions'
import checkErrorStatus from '../utils/errorStatus'

class ListsProvider {
    static getCurrentLists = async (boardId: string) => {
        const res = await fetch(
            `${baseURL}/get-lists=${boardId}`,
            getOptions({ method: 'GET' })
        )
        checkErrorStatus(res)
        const data = await res.json()
        return data
    }

    static changeListTitle = async (listTitle: string, listId: string) => {
        const res = await fetch(
            `${baseURL}/change-list-title`,
            getOptions({ method: 'PUT', body: { listId, listTitle } })
        )
        checkErrorStatus(res)
    }

    static createList = async (list: Lists) => {
        const res = await fetch(
            `${baseURL}/create-list`,
            getOptions({ method: 'POST', body: list })
        )
        checkErrorStatus(res)
    }

    static deleteList = async (listId: string) => {
        const res = await fetch(
            `${baseURL}/delete-list`,
            getOptions({ method: 'DELETE', body: { listId } })
        )
        checkErrorStatus(res)
    }

    static updateLists = async (listsState: Lists[]) => {
        const res = await fetch(
            `${baseURL}/update-lists`,
            getOptions({ method: 'PUT', body: { listsState } })
        )
        checkErrorStatus(res)
    }
}

export default ListsProvider
