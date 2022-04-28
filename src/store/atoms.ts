import { atom } from 'recoil'
import { BOARDLIST } from './data'

export const BoardListState = atom({
    key: 'BoardListState',
    default: BOARDLIST,
})

export const BoardIdState = atom({
    key: 'BoardIdState',
    default: BOARDLIST[0].boardId,
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
