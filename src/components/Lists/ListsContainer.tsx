import Lists from './Lists'
import ModalCard from '../Modal/ModalCard'
import styled from 'styled-components/macro'
import AddNewList from './AddNewList'
import {
    ListsState,
    isOpenModalState,
    CardActionsState,
} from '../../store/atoms'
import { memo, useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import produce from 'immer'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { DragState } from '../../types'
import ListsProvider from '../../service/ListsProvider'

const StyledListContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px 10px;
`

const ListContainer = () => {
    const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalState)
    const [state, setState] = useRecoilState(ListsState)
    const setActionListState = useSetRecoilState(CardActionsState)
    const [toggleDragAction, setToggleDragAction] = useState(false)

    const onCloseModal = () => {
        setIsOpenModal(false)
        setActionListState([])
    }

    const dragInApp = (dragState: DragState) => {
        const indexSourceList: number = state.findIndex(
            (list) => list.listId === dragState.sourceCardId
        )
        if (indexSourceList === -1) return

        const sourceList = state[indexSourceList]

        setState(
            produce(state, (draftState) => {
                draftState.splice(dragState.sourceCardIndex, 1)
                draftState.splice(dragState.destinationCardIndex, 0, sourceList)
            })
        )
        setToggleDragAction(!toggleDragAction)
    }

    const dragOverBoard = (dragState: DragState) => {
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
    }

    const dragInnBoard = (dragState: DragState) => {
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
    }

    const onDragEnd = (result: DropResult) => {
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
    }

    useEffect(() => {
        if (!state.length) return
        ListsProvider.updateLists(state).then((res: any) => {
            if (res.status === 200) {
                console.log(res.status)
            }
        })
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
