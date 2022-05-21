import { BoardList } from '../types'
import { baseURL } from './constants'
import { param } from '../types'

class BoardsProvider {
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

    getBoardList = async () => {
        return await fetch(
            `${baseURL}/get-board-list`,
            this.getOptions({ method: 'GET' })
        ).then((res) => res.json())
    }

    createBoard = async (board: BoardList) => {
        return await fetch(
            `${baseURL}/create-board`,
            this.getOptions({ method: 'POST', body: board })
        ).then((res) => res.json())
    }

    deleteBoard = async (boardId: string) => {
        return await fetch(
            `${baseURL}/delete-board`,
            this.getOptions({ method: 'DELETE', body: { boardId } })
        ).then((res) => res.status === 200)
    }

    changeBoardTitle = async (boardTitle: string, boardId: string) => {
        return await fetch(
            `${baseURL}/change-board-title`,
            this.getOptions({ method: 'PUT', body: { boardId, boardTitle } })
        ).then((res) => res.status === 200)
    }
}

export default new BoardsProvider()
