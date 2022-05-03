import CardList from '../Cards/CardList'
import ListTitle from './ListTitle'
import CardTitle from '../Cards/CardTitle'
import { memo } from 'react'
import { Cards } from '../../types'

interface props {
    onOpenModal: Function
    listTitle: string
    cards: Array<Cards>
    listId: string
}
const List: React.FC<props> = ({ onOpenModal, listTitle, cards, listId }) => {
    return (
        <div>
            <ListTitle listTitle={listTitle} listId={listId} />
            <CardList onOpenModal={onOpenModal} cards={cards} listId={listId} />
            <CardTitle listId={listId} />
        </div>
    )
}

export default memo(List)
