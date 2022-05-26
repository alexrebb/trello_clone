export interface CardAction {
    listId: string
    cardId: string
    actionId: string
    action: string
    date: string
}

export interface Cards {
    cardDescription: string
    cardId: string
    cardTitle: string
}

export interface Lists {
    boardId: string
    listId: string
    listTitle: string
    cards: Cards[]
}

export interface BoardList {
    boardId: string
    boardTitle: string
}

export interface DragState {
    sourceCardId: string
    sourceCardIndex: number
    destinationCardIndex: number
    sourceListId: string
    destinationListId: string
}

export interface BoardState {
    boardTitle: string
    boardId: string
}
export interface param {
    method: string
    body?: any
    params?: any
}
