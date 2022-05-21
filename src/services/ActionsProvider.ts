import { CardAction } from '../types'
import { baseURL } from './constants'
import { param } from '../types'

class ActionsProvider {
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
    createAction = async (action: CardAction) => {
        return await fetch(
            `${baseURL}/create-action`,
            this.getOptions({ method: 'POST', body: action })
        ).then((res) => res.json())
    }

    getCurrentActionList = async (cardId: string) => {
        return await fetch(
            `${baseURL}/get-action-list=${cardId}`,
            this.getOptions({ method: 'GET' })
        ).then((res) => res.json())
    }
}

export default new ActionsProvider()
