import { CardAction } from '../types'
import { baseURL } from './constants'
import getOptions from '../utils/fetchOptions'
import checkErrorStatus from '../utils/errorStatus'

class ActionsProvider {
    static createAction = async (action: CardAction) => {
        const res = await fetch(
            `${baseURL}/create-action`,
            getOptions({ method: 'POST', body: action })
        )
        checkErrorStatus(res)
    }

    static getCurrentActionList = async (cardId: string) => {
        const res = await fetch(
            `${baseURL}/get-action-list=${cardId}`,
            getOptions({ method: 'GET' })
        )
        checkErrorStatus(res)
        const data = await res.json()
        return data
    }
}

export default ActionsProvider
