import moment from 'moment'

const displayDateWithTime = moment().format('LLLL')

export const USER = {
    userName: 'Alex',
    userId: '101',
    email: 'alex@alex.com',
    password: '123456',
    boardListId: '111',
}

export const BOARDLIST = [
    {
        boardListId: '111',
        boardId: '121',
        boardTitle: 'Board',
        lists: [
            {
                listId: '131',
                listTitle: 'List',
                cards: [
                    {
                        cardId: '141',
                        cardTitle: 'Card',
                        cardDescription: '',
                        cardData: [
                            {
                                cardDataId: '151',
                                action: 'First comment',
                                date: displayDateWithTime,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]
