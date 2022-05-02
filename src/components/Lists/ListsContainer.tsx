import Lists from './Lists'
import styled from 'styled-components'
import AddNewList from './AddNewList'
import { BoardListState, BoardIdState, userDevice } from '../../store/atoms'
import { useEffect, memo, useCallback, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import produce from 'immer'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { DragState } from '../../types'
import ModalCard from '../Modal/ModalCard'

const StyledListContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100vh;
    padding: 10px 10px;
    overflow: auto;
`

const ListContainer = memo(() => {
    const [showModal, setShowModal] = useState(false)
    const [state, setState] = useRecoilState(BoardListState)
    const boardId = useRecoilValue(BoardIdState)
    const setUserDevice = useSetRecoilState(userDevice)

    const onOpenModal = () => {
        setShowModal(true)
    }
    const onCloseModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            setUserDevice('Mobile')
        }

        if (localStorage.length === 0) return
        try {
            setState(
                produce(state, (draftState) => {
                    draftState = JSON.parse(
                        `${localStorage.getItem('boardsList')}`
                    )
                    return draftState
                })
            )
        } catch (error) {
            return
        }
    }, [])

    const dragInApp = useCallback(
        (dragState: DragState) => {
            const indexSourceBoard: number = state.findIndex(
                (b) => b.boardId === boardId
            )
            const indexSourceList: number = state[
                indexSourceBoard
            ].lists.findIndex((list) => list.listId === dragState.sourceCardId)
            if (indexSourceBoard === -1 || indexSourceList === -1) return

            const sourceList: any =
                state[indexSourceBoard].lists[indexSourceList]

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

            const dragAndDropState: any = {
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
                console.log(dragAndDropState)
                dragOverBoard(dragAndDropState)
            }
        },
        [dragInApp, dragInnBoard, dragOverBoard]
    )

    useEffect(() => {
        localStorage.setItem('boardsList', JSON.stringify(state))
    }, [state])

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="app" type="list" direction="horizontal">
                {(provided) => (
                    <StyledListContainer
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <Lists onOpenModal={onOpenModal} />
                        <AddNewList />
                        {provided.placeholder}
                    </StyledListContainer>
                )}
            </Droppable>
            {showModal && <ModalCard onCloseModal={onCloseModal} />}
        </DragDropContext>
    )
})

export default memo(ListContainer)
