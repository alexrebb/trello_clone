import { selector } from 'recoil'
import { BoardIdState, BoardListState, CardIdState } from './atoms'

export const filteredBoardsState = selector({
    key: 'filteredBoardsState',
    get: ({ get }) => {
        const boardId = get(BoardIdState)
        const state = get(BoardListState)

        return state.find((item) => item.boardId === boardId)
    },
})

export const filteredCardState = selector({
    key: 'filteredCardState',
    get: ({ get }) => {
        const state = get(BoardListState)
        const boardId = get(BoardIdState)
        const cardState = get(CardIdState)

        const currentBoardIndex = state.findIndex((b) => b.boardId === boardId)
        const currentListIndex = state[currentBoardIndex].lists.findIndex(
            (l) => l.listId === cardState.listId
        )
        const currentCardIndex = state[currentBoardIndex].lists[
            currentListIndex
        ].cards.findIndex((c) => c.cardId === cardState.cardId)

        return state[currentBoardIndex].lists[currentListIndex].cards[
            currentCardIndex
        ]
    },
})
