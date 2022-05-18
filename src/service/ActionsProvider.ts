import { CardAction } from '../types'
import axios from 'axios'
import { baseURL } from './constants'

class ActionsProvider {
    createAction = async (action: CardAction) => {
        try {
            return await axios.post(`${baseURL}/create-action`, { action })
        } catch (error) {
            console.log(error)
        }
    }

    getCurrentActionList = async (listId: string, cardId: string) => {
        try {
            return await axios.get(`${baseURL}/get-action-list`, {
                params: { listId: listId, cardId: cardId },
            })
        } catch (error) {
            console.log(error)
        }
    }

    getActionsAmount = async () => {
        try {
            return await axios.get(`${baseURL}/get-actions-amount`)
        } catch (error) {
            console.log(error)
        }
    }
}

export default new ActionsProvider()
