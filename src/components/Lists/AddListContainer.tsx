import AddListBtn from './AddListBtn'
import AddListInputForm from './AddListInputForm'
import styled from 'styled-components/macro'

import { useState, memo, useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ListsState, BoardIdState } from '../../store/atoms'
import produce from 'immer'
import { v4 as uuid } from 'uuid'
import ListsProvider from '../../services/ListsProvider'

const StyledAddListContainer = styled.div`
    position: fixed;
    left: calc(100% - 180px);
    width: 150px;
    background-color: rgba(255, 248, 248, 0.849);
    border-radius: 3px;
    padding: 10px;
    display: flex;
    align-items: center;
    &:hover {
        background-color: rgba(255, 248, 248, 0.5);
    }
`

const AddListContainer = () => {
    const [isOpenNewListInputForm, setIsOpenNewListInputForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [currentBoardState, setCurrentBoardState] = useRecoilState(ListsState)
    const currentBoardId = useRecoilValue(BoardIdState)
    const maxListsAmount = 5

    const onCloseOnBlur = (e: any): void => {
        if (e.relatedTarget !== null) return
        setIsOpenNewListInputForm(false)
    }

    const onAddList = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (!inputValue.length) return

            const addList = {
                boardId: currentBoardId,
                listId: uuid(),
                listTitle: inputValue,
                cards: [],
            }

            if (
                !currentBoardState ||
                currentBoardState?.length >= maxListsAmount ||
                currentBoardState?.length === undefined
            )
                return

            ListsProvider.createList(addList)

            setCurrentBoardState(
                produce(currentBoardState, (draftState) => {
                    draftState.push(addList)
                })
            )

            setIsOpenNewListInputForm(false)
            setInputValue('')
        },
        [inputValue, currentBoardId, currentBoardState, setCurrentBoardState]
    )

    return (
        <StyledAddListContainer>
            {!isOpenNewListInputForm ? (
                <AddListBtn
                    setIsOpenNewListInputForm={setIsOpenNewListInputForm}
                />
            ) : (
                <AddListInputForm
                    setIsOpenNewListInputForm={setIsOpenNewListInputForm}
                    onCloseOnBlur={onCloseOnBlur}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                    onAddList={onAddList}
                />
            )}
        </StyledAddListContainer>
    )
}

export default memo(AddListContainer)
