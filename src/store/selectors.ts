import { selector } from 'recoil'
import { BoardIdState, ListsState, CardIdState, BoardListState } from './atoms'

export const currentBoardTitle = selector({
    key: 'filteredBoardsState',
    get: ({ get }) => {
        const boardId = get(BoardIdState)
        const state = get(BoardListState)
        if (boardId === '') return

        return state.find((item) => item.boardId === boardId)?.boardTitle
    },
})

export const filteredCardState = selector({
    key: 'filteredCardState',
    get: ({ get }) => {
        const state = get(ListsState)
        const cardState = get(CardIdState)

        const currentListIndex = state.findIndex(
            (l) => l.listId === cardState.listId
        )
        const currentCardIndex = state[currentListIndex].cards.findIndex(
            (c) => c.cardId === cardState.cardId
        )

        return state[currentListIndex].cards[currentCardIndex]
    },
})
