import List from './List'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components/macro'
import { memo } from 'react'
import { filteredBoardsState } from '../../store/selectors'
import { useRecoilValue } from 'recoil'

const StyledList = styled.div`
    width: 240px;
    background-color: rgb(235, 236, 240);
    border-radius: 3px;
    padding: 10px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    height: max-content;
    align-items: stretch;
`

interface props {
    onOpenModal: Function
}

const Lists: React.FC<props> = ({ onOpenModal }) => {
    const currentBoard = useRecoilValue(filteredBoardsState)

    return (
        <>
            {currentBoard?.lists.map((list, index) => (
                <Draggable
                    draggableId={list.listId}
                    index={index}
                    key={list.listId}
                >
                    {(provided) => (
                        <StyledList
                            key={list.listId}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <List
                                listId={list.listId}
                                listTitle={list.listTitle}
                                cards={list.cards}
                                onOpenModal={onOpenModal}
                            />
                        </StyledList>
                    )}
                </Draggable>
            ))}
        </>
    )
}

export default memo(Lists)
