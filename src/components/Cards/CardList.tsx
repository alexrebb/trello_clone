import styled from 'styled-components'
import Card from './Card'
import { memo } from 'react'
import { Cards } from '../../types/interfaces'
import { Droppable } from 'react-beautiful-dnd'

const StyledCardList = styled.div`
    display: flex;
    flex-direction: column;
    height: max-content;
    padding: 10px 0;
    overflow-y: auto;
`
interface props {
    onOpenModal: Function
    cards: Array<Cards>
    listId: string
}

const CardList: React.FC<props> = memo(({ onOpenModal, cards, listId }) => {
    return (
        <Droppable droppableId={listId}>
            {(provided) => (
                <StyledCardList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {cards.map((card, index) => {
                        return (
                            <Card
                                key={card.cardId}
                                cardId={card.cardId}
                                listId={listId}
                                index={index}
                                cardTitle={card.cardTitle}
                                onOpenModal={onOpenModal}
                            />
                        )
                    })}
                    {provided.placeholder}
                </StyledCardList>
            )}
        </Droppable>
    )
})

export default memo(CardList)
