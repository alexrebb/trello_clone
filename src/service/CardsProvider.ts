import { Cards } from '../types'
import axios from 'axios'
import { baseURL } from './constants'

class CardsProvider {
    createCard = async (listId: string, card: Cards) => {
        try {
            return await axios.post(`${baseURL}/create-card`, { listId, card })
        } catch (error) {
            console.log(error)
        }
    }

    changeCardTitle = async (
        cardTitle: string,
        listId: string,
        cardId: string
    ) => {
        try {
            return await axios.put(`${baseURL}/change-card-title`, {
                params: {
                    cardTitle,
                    listId,
                    cardId,
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    changeCardDescription = async (
        cardDescription: string,
        listId: string,
        cardId: string
    ) => {
        try {
            return await axios.put(`${baseURL}/change-card-descr`, {
                params: {
                    cardDescription,
                    listId,
                    cardId,
                },
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default new CardsProvider()
