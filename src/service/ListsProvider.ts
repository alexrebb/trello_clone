import { Lists } from '../types'
import axios from 'axios'
import { baseURL } from './constants'

class ListsProvider {
    getCurrentLists = async (boardId: string) => {
        try {
            return await axios.get(`${baseURL}/get-lists`, {
                params: { boardId },
            })
        } catch (error) {
            console.log(error)
        }
    }

    changeListTitle = async (listTitle: string, listId: string) => {
        try {
            return await axios.put(`${baseURL}/change-list-title`, {
                params: {
                    listTitle,
                    listId,
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    createList = async (list: Lists) => {
        try {
            return await axios.post(`${baseURL}/create-list`, { list })
        } catch (error) {
            console.log(error)
        }
    }

    deleteList = async (listId: string) => {
        try {
            return await axios.delete(`${baseURL}/delete-list`, {
                data: {
                    listId,
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    updateLists = async (listsState: Lists[]) => {
        try {
            return await axios.put(`${baseURL}/update-lists`, { listsState })
        } catch (error) {
            console.log(error)
        }
    }
}

export default new ListsProvider()
