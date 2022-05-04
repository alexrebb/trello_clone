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
        boardListId: '1',
        boardId: '',
        boardTitle: '',
        lists: [
            {
                listId: '2',
                listTitle: '',
                cards: [
                    {
                        cardId: '3',
                        cardTitle: '',
                        cardDescription: '',
                        cardData: [
                            {
                                cardDataId: '4',
                                action: '',
                                date: '',
                            },
                        ],
                    },
                ],
            },
        ],
    },
]
