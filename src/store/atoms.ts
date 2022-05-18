import { atom } from 'recoil'
import { BoardList, Lists, CardAction } from '../types'

const BOARDLIST: BoardList[] = []
const LISTS: Lists[] = []
const ACTION: CardAction[] = []

export const BoardListState = atom({
    key: 'BoardListState',
    default: BOARDLIST,
})

export const ListsState = atom({
    key: 'ListsState',
    default: LISTS,
})

export const CardActionsState = atom({
    key: 'CardActionsState',
    default: ACTION,
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

export const CardActionsAmountState = atom({
    key: 'CardActionsAmountState',
    default: ACTION,
})

export const isOpenModalState = atom({
    key: 'isOpenModal',
    default: false,
})

export const ActionAmount = atom({
    key: 'actionAmount',
    default: 0,
})
