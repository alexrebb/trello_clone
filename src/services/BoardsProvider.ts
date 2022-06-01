import { BoardList } from '../types'
import { baseURL } from './constants'
import getOptions from '../utils/fetchOptions'
import checkErrorStatus from '../utils/errorStatus'

class BoardsProvider {
    static getBoardList = async () => {
        const res = await fetch(
            `${baseURL}/get-board-list`,
            getOptions({ method: 'GET' })
        )
        checkErrorStatus(res)
        const data = await res.json()
        return data
    }

    static createBoard = async (board: BoardList) => {
        const res = await fetch(
            `${baseURL}/create-board`,
            getOptions({ method: 'POST', body: board })
        )
        checkErrorStatus(res)
    }

    static deleteBoard = async (boardId: string) => {
        const res = await fetch(
            `${baseURL}/delete-board`,
            getOptions({ method: 'DELETE', body: { boardId } })
        )
        checkErrorStatus(res)
    }

    static changeBoardTitle = async (boardTitle: string, boardId: string) => {
        const res = await fetch(
            `${baseURL}/change-board-title`,
            getOptions({ method: 'PUT', body: { boardId, boardTitle } })
        )
        checkErrorStatus(res)
    }
}

export default BoardsProvider
