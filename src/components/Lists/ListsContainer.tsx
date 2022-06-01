import Lists from './Lists'
import ModalCard from '../Modal/ModalCard'
import styled from 'styled-components/macro'
import AddListContainer from './AddListContainer'
import {
    ListsState,
    isOpenModalState,
    CardActionsState,
} from '../../store/atoms'
import { memo, useEffect, useState, useCallback } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import produce from 'immer'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { DragState } from '../../types'
import ListsProvider from '../../services/ListsProvider'

const StyledListContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px 10px;
`

const ListsContainer = () => {
    const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalState)
    const [state, setState] = useRecoilState(ListsState)
    const setActionListState = useSetRecoilState(CardActionsState)
    const [toggleDragAction, setToggleDragAction] = useState(false)

    const onCloseModal = () => {
        setIsOpenModal(false)
        setActionListState([])
    }

    const dragInApp = useCallback(
        (dragState: DragState) => {
            const indexSourceList: number = state.findIndex(
                (list) => list.listId === dragState.sourceCardId
            )
            if (indexSourceList === -1) return

            const sourceList = state[indexSourceList]

            setState(
                produce(state, (draftState) => {
                    draftState.splice(dragState.sourceCardIndex, 1)
                    draftState.splice(
                        dragState.destinationCardIndex,
                        0,
                        sourceList
                    )
                })
            )
            setToggleDragAction(!toggleDragAction)
        },
        [setState, state, toggleDragAction]
    )

    const dragOverBoard = useCallback(
        (dragState: DragState) => {
            const indexSourceList: number = state.findIndex(
                (list) => list.listId === dragState.sourceListId
            )
            const indexDestList: number = state.findIndex(
                (list) => list.listId === dragState.destinationListId
            )

            if (indexDestList === -1 || indexSourceList === -1) return

            const sourceCard =
                state[indexSourceList].cards[dragState.sourceCardIndex]

            setState(
                produce(state, (draftState) => {
                    draftState[indexDestList].cards.splice(
                        dragState.destinationCardIndex,
                        0,
                        sourceCard
                    )
                    draftState[indexSourceList].cards.splice(
                        dragState.sourceCardIndex,
                        1
                    )
                })
            )
            setToggleDragAction(!toggleDragAction)
        },
        [setState, state, toggleDragAction]
    )

    const dragInnBoard = useCallback(
        (dragState: DragState) => {
            const indexSourceList: number = state.findIndex(
                (list) => list.listId === dragState.sourceListId
            )
            if (indexSourceList === -1) return

            const sourceCard =
                state[indexSourceList].cards[dragState.sourceCardIndex]

            setState(
                produce(state, (draftState) => {
                    draftState[indexSourceList].cards.splice(
                        dragState.sourceCardIndex,
                        1
                    )
                    draftState[indexSourceList].cards.splice(
                        dragState.destinationCardIndex,
                        0,
                        sourceCard
                    )
                })
            )
            setToggleDragAction(!toggleDragAction)
        },
        [setState, state, toggleDragAction]
    )

    const onDragEnd = useCallback(
        (result: DropResult) => {
            const { destination, source, draggableId } = result

            if (!destination) return

            const dragAndDropState = {
                sourceCardId: draggableId,
                sourceCardIndex: source.index,
                destinationCardIndex: destination.index,
                sourceListId: source.droppableId,
                destinationListId: destination.droppableId,
            }

            if (
                dragAndDropState.sourceListId ===
                    dragAndDropState.destinationListId &&
                dragAndDropState.destinationCardIndex ===
                    dragAndDropState.sourceCardIndex
            ) {
                return
            }
            if (
                dragAndDropState.sourceListId === 'app' &&
                dragAndDropState.destinationListId === 'app'
            ) {
                dragInApp(dragAndDropState)
            }

            if (
                dragAndDropState.sourceListId ===
                    dragAndDropState.destinationListId &&
                dragAndDropState.sourceListId !== 'app'
            ) {
                dragInnBoard(dragAndDropState)
            }
            if (
                dragAndDropState.sourceListId !==
                    dragAndDropState.destinationListId &&
                dragAndDropState.sourceListId !== 'app'
            ) {
                dragOverBoard(dragAndDropState)
            }
        },
        [dragInApp, dragInnBoard, dragOverBoard]
    )

    useEffect(() => {
        if (!state.length) return
        ListsProvider.updateLists(state)
    }, [toggleDragAction])

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="app" type="list" direction="horizontal">
                    {(provided) => (
                        <StyledListContainer
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <Lists />
                            <AddListContainer />
                            {provided.placeholder}
                        </StyledListContainer>
                    )}
                </Droppable>
            </DragDropContext>
            {isOpenModal && <ModalCard onCloseModal={onCloseModal} />}
        </>
    )
}

export default memo(ListsContainer)
