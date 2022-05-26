import { Cards } from '../types'
import { baseURL } from './constants'
import { param } from '../types'

class CardsProvider {
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

    createCard = async (listId: string, card: Cards) => {
        return await fetch(
            `${baseURL}/create-card`,
            this.getOptions({ method: 'POST', body: { listId, card } })
        ).then((res) => res.json())
    }

    changeCardTitle = async (
        cardTitle: string,
        listId: string,
        cardId: string
    ) => {
        return await fetch(
            `${baseURL}/change-card-title`,
            this.getOptions({
                method: 'PUT',
                body: { cardTitle, listId, cardId },
            })
        ).then((res) => res.status === 200)
    }

    changeCardDescription = async (
        cardDescription: string,
        listId: string,
        cardId: string
    ) => {
        return await fetch(
            `${baseURL}/change-card-descr`,
            this.getOptions({
                method: 'PUT',
                body: { cardDescription, listId, cardId },
            })
        ).then((res) => res.status === 200)
    }
}

export default new CardsProvider()
