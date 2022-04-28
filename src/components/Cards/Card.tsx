import styled from 'styled-components'
import { HiOutlinePencil } from 'react-icons/hi'
import { memo } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useSetRecoilState } from 'recoil'
import { CardIdState } from '../../store/atoms'

const StyledIcon = styled.span`
    color: rgba(128, 128, 128, 0.9);
    display: none;
`
const StyledCard = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    padding: 10px;
    margin: 5px 0;
    cursor: pointer;
    word-break: break-all;
    &:hover {
        background-color: rgb(235, 236, 240);
        ${StyledIcon} {
            display: flex;
        }
    }
`

interface props {
    onOpenModal: Function
    cardTitle: string
    cardId: string
    listId: string
    index: number
}

const Card: React.FC<props> = memo(
    ({ onOpenModal, cardTitle, cardId, index, listId }) => {
        const setCardId = useSetRecoilState(CardIdState)

        const handleClick = () => {
            onOpenModal()
            setCardId({
                cardId: cardId,
                listId: listId,
            })
        }

        return (
            <Draggable draggableId={cardId} index={index}>
                {(provided) => (
                    <StyledCard
                        onClick={handleClick}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <span>{cardTitle}</span>
                        <StyledIcon>
                            <HiOutlinePencil />
                        </StyledIcon>
                    </StyledCard>
                )}
            </Draggable>
        )
    }
)

export default memo(Card)
