import ListTitle from './ListTitle'
import RemoveList from './RemoveList'
import styled from 'styled-components/macro'
import { useState, memo, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { ListsState } from '../../store/atoms'
import produce from 'immer'
import ListsProvider from '../../services/ListsProvider'
import loggerErrors from '../../utils/logger'

const StyledList = styled.div`
    display: flex;
    flex-direction: column;
`

interface props {
    listTitle: string
    listId: string
}

const ListTitleContainer: React.FC<props> = ({ listTitle, listId }) => {
    const [isOpenInputTitle, setIsOpenInputTitle] = useState(false)
    const [isOpenRemoveList, setIsOpenRemoveList] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [state, setState] = useRecoilState(ListsState)

    const handleCloseRemoveList = useCallback(() => {
        setIsOpenRemoveList(false)
    }, [])

    const handleOpenRemoveList = useCallback(() => {
        setIsOpenRemoveList(false)
    }, [])

    const handleOpenInput = useCallback(() => {
        setIsOpenInputTitle(true)
    }, [])

    const onChangeTitleHandler = useCallback(() => {
        setIsOpenInputTitle(false)
        if (!inputValue) return

        const currentListIndex = state.findIndex(
            (list) => list.listId === listId
        )

        ListsProvider.changeListTitle(inputValue, listId).catch((err) =>
            loggerErrors(err)
        )

        setState(
            produce(state, (draftState) => {
                draftState[currentListIndex].listTitle = inputValue
            })
        )
    }, [listId, setState, state, inputValue])

    const onRemoveListHandler = useCallback(() => {
        ListsProvider.deleteList(listId).catch((err) => loggerErrors(err))

        setState(
            produce(state, (draftState) => {
                return (draftState = draftState.filter(
                    (list) => list.listId !== listId
                ))
            })
        )
    }, [listId, setState, state])

    return (
        <StyledList>
            <ListTitle
                handleOpenInput={handleOpenInput}
                isOpenInputTitle={isOpenInputTitle}
                listTitle={listTitle}
                setInputValue={setInputValue}
                inputValue={inputValue}
                onChangeTitleHandler={onChangeTitleHandler}
                handleOpenRemoveList={handleOpenRemoveList}
            />
            {isOpenRemoveList && (
                <RemoveList
                    handleCloseRemoveList={handleCloseRemoveList}
                    onRemoveListHandler={onRemoveListHandler}
                />
            )}
        </StyledList>
    )
}

export default memo(ListTitleContainer)
