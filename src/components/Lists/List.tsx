import CardList from '../Cards/CardList'
import ListTitleContainer from './ListTitleContainer'
import AddCardContainer from '../Cards/AddCardContainer'
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
            <ListTitleContainer listTitle={listTitle} listId={listId} />
            <CardList cards={cards} listId={listId} />
            <AddCardContainer listId={listId} />
        </div>
    )
}

export default memo(List)
