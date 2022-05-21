import { Lists } from '../types'
import { baseURL } from './constants'
import { param } from '../types'

class ListsProvider {
    getOptions = ({ method, body, params }: param) => {
        const options = {
            method,
            headers: {
                params,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body,
        }

        if (body) {
            options.body = JSON.stringify(body)
        }

        return options
    }

    getCurrentLists = async (boardId: string) => {
        return await fetch(
            `${baseURL}/get-lists=${boardId}`,
            this.getOptions({ method: 'GET' })
        ).then((res) => res.json())
    }

    changeListTitle = async (listTitle: string, listId: string) => {
        return await fetch(
            `${baseURL}/change-list-title`,
            this.getOptions({ method: 'PUT', body: { listId, listTitle } })
        ).then((res) => res.status === 200)
    }

    createList = async (list: Lists) => {
        return await fetch(
            `${baseURL}/create-list`,
            this.getOptions({ method: 'POST', body: list })
        ).then((res) => res.json())
    }

    deleteList = async (listId: string) => {
        return await fetch(
            `${baseURL}/delete-list`,
            this.getOptions({ method: 'DELETE', body: { listId } })
        ).then((res) => res.status === 200)
    }

    updateLists = async (listsState: Lists[]) => {
        return await fetch(
            `${baseURL}/update-lists`,
            this.getOptions({ method: 'PUT', body: { listsState } })
        ).then((res) => res.status === 200)
    }
}

export default new ListsProvider()
