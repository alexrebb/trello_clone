import { atom } from 'recoil'
// import { BOARDLIST } from './data'
import { BoardList } from '../types'

const BOARDLIST: BoardList[] = []

export const BoardListState = atom({
    key: 'BoardListState',
    default: BOARDLIST,
})

export const BoardIdState = atom({
    key: 'BoardIdState',
    default: '',
})

export const BoardTitleState = atom({
    key: 'BoardTitleState',
    default: {
        boardId: '',
        boardTitle: '',
    },
})

export const userDevice = atom({
    key: 'userDevice',
    default: '',
})

export const CardIdState = atom({
    key: 'CardIdState',
    default: {
        cardId: '',
        listId: '',
    },
})

export const isOpenModalState = atom({
    key: 'isOpenModal',
    default: false,
})
