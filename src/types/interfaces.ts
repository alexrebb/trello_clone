export interface CardData {
    cardDataId: string
    comment: string
    date: string
}

export interface Cards {
    cardDescription: string
    cardId: string
    cardTitle: string
    cardData: CardData[]
}

export interface List {
    listId: string
    listTitle: string
    cards: Cards[]
}

export interface BoardList {
    boardListId: string
    boardId: string
    boardTitle: string
    lists: List[]
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
