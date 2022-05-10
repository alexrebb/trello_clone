import { BoardList } from '../types'
import axios from 'axios'
export const baseURL = 'http://localhost:8000/api'

export const updateBoardList = async (state: BoardList[]) => {
    if (!state.length) return
    try {
        await axios.put(`${baseURL}/update-board-list`, {
            state,
        })
    } catch (error) {
        console.log(error)
    }
}
