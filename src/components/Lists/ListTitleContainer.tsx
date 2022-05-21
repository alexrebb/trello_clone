import ListTitle from './ListTitle'
import RemoveList from './RemoveList'
import styled from 'styled-components/macro'
import { useState, memo, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { ListsState } from '../../store/atoms'
import produce from 'immer'
import ListsProvider from '../../services/ListsProvider'

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

    const onChangeTitleHandler = useCallback(() => {
        setIsOpenInputTitle(false)
        if (!inputValue) return

        const currentListIndex = state.findIndex(
            (list) => list.listId === listId
        )

        ListsProvider.changeListTitle(inputValue, listId).then((res: any) => {
            if (res.status === 200) {
                console.log('Success')
            }
        })

        setState(
            produce(state, (draftState) => {
                draftState[currentListIndex].listTitle = inputValue
            })
        )
    }, [listId, setState, state, inputValue])

    const onRemoveListHandler = useCallback(() => {
        ListsProvider.deleteList(listId).then((res: any) => {
            if (res.status === 200) {
                console.log('Success')
            }
        })
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
                setIsOpenInputTitle={setIsOpenInputTitle}
                isOpenInputTitle={isOpenInputTitle}
                listTitle={listTitle}
                setInputValue={setInputValue}
                inputValue={inputValue}
                onChangeTitleHandler={onChangeTitleHandler}
                setIsOpenRemoveList={setIsOpenRemoveList}
            />
            {isOpenRemoveList && (
                <RemoveList
                    setIsOpenRemoveList={setIsOpenRemoveList}
                    onRemoveListHandler={onRemoveListHandler}
                />
            )}
        </StyledList>
    )
}

export default memo(ListTitleContainer)
