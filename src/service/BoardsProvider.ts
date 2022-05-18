import { BoardList } from '../types'
import axios from 'axios'
import { baseURL } from './constants'

class BoardsProvider {
    getBoardList = async () => {
        try {
            return await axios.get(`${baseURL}/get-board-list`)
        } catch (error) {
            console.log(error)
        }
    }

    createBoard = async (board: BoardList) => {
        try {
            return await axios.post(`${baseURL}/create-board`, { board })
        } catch (error) {
            console.log(error)
        }
    }

    deleteBoard = async (boardId: string) => {
        try {
            return await axios.delete(`${baseURL}/delete-board`, {
                data: {
                    boardId,
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    changeBoardTitle = async (boardTitle: string, boardId: string) => {
        try {
            return await axios.put(`${baseURL}/change-board-title`, {
                params: {
                    boardTitle,
                    boardId,
                },
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default new BoardsProvider()
