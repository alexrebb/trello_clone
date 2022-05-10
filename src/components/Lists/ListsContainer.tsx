import Lists from './Lists'
import ModalCard from '../Modal/ModalCard'
import styled from 'styled-components/macro'
import AddNewList from './AddNewList'
import {
    BoardListState,
    BoardIdState,
    isOpenModalState,
} from '../../store/atoms'
import { memo, useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import produce from 'immer'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { DragState } from '../../types'

const StyledListContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px 10px;
`

const ListContainer = () => {
    const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalState)
    const [state, setState] = useRecoilState(BoardListState)
    const boardId = useRecoilValue(BoardIdState)

    const onCloseModal = () => {
        setIsOpenModal(false)
    }

    const dragInApp = useCallback(
        (dragState: DragState) => {
            const indexSourceBoard: number = state.findIndex(
                (b) => b.boardId === boardId
            )
            const indexSourceList: number = state[
                indexSourceBoard
            ].lists.findIndex((list) => list.listId === dragState.sourceCardId)
            if (indexSourceBoard === -1 || indexSourceList === -1) return

            const sourceList = state[indexSourceBoard].lists[indexSourceList]

            setState(
                produce(state, (draftState) => {
                    draftState[indexSourceBoard].lists.splice(
                        dragState.sourceCardIndex,
                        1
                    )
                    draftState[indexSourceBoard].lists.splice(
                        dragState.destinationCardIndex,
                        0,
                        sourceList
                    )
                })
            )
        },
        [state, boardId, setState]
    )

    const dragOverBoard = useCallback(
        (dragState: DragState) => {
            const indexSourceBoard: number = state.findIndex(
                (b) => b.boardId === boardId
            )
            const indexSourceList: number = state[
                indexSourceBoard
            ].lists.findIndex((list) => list.listId === dragState.sourceListId)
            const indexDestList: number = state[
                indexSourceBoard
            ].lists.findIndex(
                (list) => list.listId === dragState.destinationListId
            )

            if (
                indexSourceBoard === -1 ||
                indexDestList === -1 ||
                indexSourceList === -1
            )
                return

            const sourceCard =
                state[indexSourceBoard].lists[indexSourceList].cards[
                    dragState.sourceCardIndex
                ]

            setState(
                produce(state, (draftState) => {
                    draftState[indexSourceBoard].lists[
                        indexDestList
                    ].cards.splice(
                        dragState.destinationCardIndex,
                        0,
                        sourceCard
                    )
                    draftState[indexSourceBoard].lists[
                        indexSourceList
                    ].cards.splice(dragState.sourceCardIndex, 1)
                })
            )
        },
        [state, boardId, setState]
    )

    const dragInnBoard = useCallback(
        (dragState: DragState) => {
            const indexSourceBoard: number = state.findIndex(
                (b) => b.boardId === boardId
            )
            const indexSourceList: number = state[
                indexSourceBoard
            ].lists.findIndex((list) => list.listId === dragState.sourceListId)
            if (indexSourceBoard === -1 || indexSourceList === -1) return

            const sourceCard =
                state[indexSourceBoard].lists[indexSourceList].cards[
                    dragState.sourceCardIndex
                ]

            setState(
                produce(state, (draftState) => {
                    draftState[indexSourceBoard].lists[
                        indexSourceList
                    ].cards.splice(dragState.sourceCardIndex, 1)
                    draftState[indexSourceBoard].lists[
                        indexSourceList
                    ].cards.splice(
                        dragState.destinationCardIndex,
                        0,
                        sourceCard
                    )
                })
            )
        },
        [boardId, setState, state]
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
                            <AddNewList />
                            {provided.placeholder}
                        </StyledListContainer>
                    )}
                </Droppable>
            </DragDropContext>
            {isOpenModal && <ModalCard onCloseModal={onCloseModal} />}
        </>
    )
}

export default memo(ListContainer)
