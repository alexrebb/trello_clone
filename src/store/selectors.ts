import { selector } from 'recoil'
import { BoardIdState, BoardListState, CardIdState } from './atoms'

export const filteredBoardsState = selector({
    key: 'filteredBoardsState',
    get: ({ get }) => {
        const boardId = get(BoardIdState)
        const state = get(BoardListState)
        if (boardId === '') {
            return
        }

        return state.find((item: any) => item.boardId === boardId)
    },
})

export const filteredCardState = selector({
    key: 'filteredCardState',
    get: ({ get }) => {
        const state = get(BoardListState)
        const boardId = get(BoardIdState)
        const cardState = get(CardIdState)

        const currentBoardIndex = state.findIndex(
            (b: any) => b.boardId === boardId
        )
        const currentListIndex = state[currentBoardIndex].lists.findIndex(
            (l: any) => l.listId === cardState.listId
        )
        const currentCardIndex = state[currentBoardIndex].lists[
            currentListIndex
        ].cards.findIndex((c: any) => c.cardId === cardState.cardId)

        return state[currentBoardIndex].lists[currentListIndex].cards[
            currentCardIndex
        ]
    },
})
