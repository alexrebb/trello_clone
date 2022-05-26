import { CardAction } from '../types'
import { baseURL } from './constants'
import { param } from '../types'

class ActionsProvider {
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
    static createAction = async (action: CardAction) => {
        return await fetch(
            `${baseURL}/create-action`,
            this.getOptions({ method: 'POST', body: action })
        ).then((res) => {
            if (res.status === 400) console.log('Error fetching create action ')
        })
    }

    static getCurrentActionList = async (cardId: string) => {
        return await fetch(
            `${baseURL}/get-action-list=${cardId}`,
            this.getOptions({ method: 'GET' })
        ).then((res) => {
            if (res.status === 400)
                console.log('Error fetching get actions list ')
            if (res.status === 200) {
                return res.json()
            }
        })
    }
}

export default ActionsProvider
