import { BoardList } from '../types'
import { baseURL } from './constants'
import { param } from '../types'

class BoardsProvider {
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

    static getBoardList = async () => {
        return await fetch(
            `${baseURL}/get-board-list`,
            this.getOptions({ method: 'GET' })
        ).then((res) => {
            if (res.status === 400)
                console.log('Error fetching get boards list ')
            if (res.status === 200) {
                return res.json()
            }
        })
    }

    static createBoard = async (board: BoardList) => {
        return await fetch(
            `${baseURL}/create-board`,
            this.getOptions({ method: 'POST', body: board })
        ).then((res) => {
            if (res.status === 400) console.log('Error fetching create board ')
        })
    }

    static deleteBoard = async (boardId: string) => {
        return await fetch(
            `${baseURL}/delete-board`,
            this.getOptions({ method: 'DELETE', body: { boardId } })
        ).then((res) => {
            if (res.status === 400) console.log('Error fetching delete board ')
        })
    }

    static changeBoardTitle = async (boardTitle: string, boardId: string) => {
        return await fetch(
            `${baseURL}/change-board-title`,
            this.getOptions({ method: 'PUT', body: { boardId, boardTitle } })
        ).then((res) => {
            if (res.status === 400)
                console.log('Error fetching change board title ')
        })
    }
}

export default BoardsProvider
