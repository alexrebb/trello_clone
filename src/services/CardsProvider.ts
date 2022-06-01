import { Cards } from '../types'
import { baseURL } from './constants'
import { param } from '../types'

class CardsProvider {
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

    static createCard = async (listId: string, card: Cards) => {
        return await fetch(
            `${baseURL}/create-card`,
            this.getOptions({ method: 'POST', body: { listId, card } })
        ).then((res) => {
            if (res.status === 400) console.log('Error fetching create card ')
        })
    }

    static changeCardTitle = async (
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
        ).then((res) => {
            if (res.status === 400)
                console.log('Error fetching change card title ')
        })
    }

    static changeCardDescription = async (
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
        ).then((res) => {
            if (res.status === 400)
                console.log('Error fetching change card description ')
        })
    }
}

export default CardsProvider
