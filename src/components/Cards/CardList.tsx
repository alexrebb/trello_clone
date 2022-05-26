import styled from 'styled-components/macro'
import CardContainer from './CardContainer'
import { memo } from 'react'
import { Cards } from '../../types'
import { Droppable } from 'react-beautiful-dnd'

const StyledCardList = styled.div`
    display: flex;
    flex-direction: column;
    height: max-content;
    padding: 10px 0;
    overflow-y: auto;
`
interface props {
    cards: Array<Cards>
    listId: string
}

const CardList: React.FC<props> = ({ cards, listId }) => {
    return (
        <Droppable droppableId={listId}>
            {(provided) => (
                <StyledCardList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {cards.map((card, index) => {
                        return (
                            <CardContainer
                                key={card.cardId}
                                cardId={card.cardId}
                                listId={listId}
                                index={index}
                                cardTitle={card.cardTitle}
                            />
                        )
                    })}
                    {provided.placeholder}
                </StyledCardList>
            )}
        </Droppable>
    )
}

export default memo(CardList)
