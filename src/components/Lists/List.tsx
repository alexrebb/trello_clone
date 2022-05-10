import CardList from '../Cards/CardList'
import ListTitle from './ListTitle'
import CardTitle from '../Cards/CardTitle'
import { memo } from 'react'
import { Cards } from '../../types'

interface props {
    listTitle: string
    cards: Array<Cards>
    listId: string
}
const List: React.FC<props> = ({ listTitle, cards, listId }) => {
    return (
        <div>
            <ListTitle listTitle={listTitle} listId={listId} />
            <CardList cards={cards} listId={listId} />
            <CardTitle listId={listId} />
        </div>
    )
}

export default memo(List)
