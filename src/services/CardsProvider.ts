import { Cards } from '../types'
import { baseURL } from './constants'
import getOptions from '../utils/fetchOptions'
import checkErrorStatus from '../utils/errorStatus'

class CardsProvider {
    static createCard = async (listId: string, card: Cards) => {
        const res = await fetch(
            `${baseURL}/create-card`,
            getOptions({ method: 'POST', body: { listId, card } })
        )
        checkErrorStatus(res)
    }

    static changeCardTitle = async (
        cardTitle: string,
        listId: string,
        cardId: string
    ) => {
        const res = await fetch(
            `${baseURL}/change-card-title`,
            getOptions({
                method: 'PUT',
                body: { cardTitle, listId, cardId },
            })
        )
        checkErrorStatus(res)
    }

    static changeCardDescription = async (
        cardDescription: string,
        listId: string,
        cardId: string
    ) => {
        const res = await fetch(
            `${baseURL}/change-card-descr`,
            getOptions({
                method: 'PUT',
                body: { cardDescription, listId, cardId },
            })
        )
        checkErrorStatus(res)
    }
}

export default CardsProvider
