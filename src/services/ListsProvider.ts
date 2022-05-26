import { Lists } from '../types'
import { baseURL } from './constants'
import { param } from '../types'

class ListsProvider {
    static getOptions = ({ method, body, params }: param) => {
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

    static getCurrentLists = async (boardId: string) => {
        return await fetch(
            `${baseURL}/get-lists=${boardId}`,
            this.getOptions({ method: 'GET' })
        ).then((res) => {
            if (res.status === 400) console.log('Error fetching get lists ')
            if (res.status === 200) {
                return res.json()
            }
        })
    }

    static changeListTitle = async (listTitle: string, listId: string) => {
        return await fetch(
            `${baseURL}/change-list-title`,
            this.getOptions({ method: 'PUT', body: { listId, listTitle } })
        ).then((res) => {
            if (res.status === 400)
                console.log('Error fetching change list title ')
        })
    }

    static createList = async (list: Lists) => {
        return await fetch(
            `${baseURL}/create-list`,
            this.getOptions({ method: 'POST', body: list })
        ).then((res) => {
            if (res.status === 400) console.log('Error fetching create list ')
        })
    }

    static deleteList = async (listId: string) => {
        return await fetch(
            `${baseURL}/delete-list`,
            this.getOptions({ method: 'DELETE', body: { listId } })
        ).then((res) => {
            if (res.status === 400) console.log('Error fetching delete list ')
        })
    }

    static updateLists = async (listsState: Lists[]) => {
        return await fetch(
            `${baseURL}/update-lists`,
            this.getOptions({ method: 'PUT', body: { listsState } })
        ).then((res) => {
            if (res.status === 400) console.log('Error fetching update list ')
        })
    }
}

export default ListsProvider
