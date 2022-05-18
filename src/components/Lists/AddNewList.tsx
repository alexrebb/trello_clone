import styled from 'styled-components/macro'
import { HiOutlinePlus } from 'react-icons/hi'
import { GrClose } from 'react-icons/gr'
import { useState, memo, useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ListsState, BoardIdState } from '../../store/atoms'
import produce from 'immer'
import { v4 as uuid } from 'uuid'
import ListsProvider from '../../service/ListsProvider'

const StyledAddListContainer = styled.div`
    position: fixed;
    left: calc(100% - 210px);
    width: 170px;
    background-color: rgba(255, 248, 248, 0.849);
    border-radius: 3px;
    padding: 10px;
    display: flex;
    align-items: center;
    &:hover {
        background-color: rgba(255, 248, 248, 0.5);
    }
`
const StyledAddList = styled.div`
    cursor: pointer;
`
const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`
const StyledInput = styled.input`
    border-radius: 3px;
    border: none;
    font-size: 15px;
    word-break: break-all;
`
const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 0;
    margin-top: 5px;
`
const SubmitButton = styled.button`
    border: none;
    padding: 10px;
    border-radius: 7px;
    background-color: rgba(26, 151, 223, 0.8);
    color: white;
    margin-right: 10px;
    cursor: pointer;
    &:hover {
        background-color: rgb(26, 151, 223);
    }
`
const CloseInputIcon = styled.div`
    font-size: 15px;
    cursor: pointer;
`
const AddNewList = () => {
    const [isOpenNewListInputForm, setIsOpenNewListInputForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [currentBoardState, setCurrentBoardState] = useRecoilState(ListsState)
    const currentBoardId = useRecoilValue(BoardIdState)

    const openNewListInputFormHandler = () => {
        setIsOpenNewListInputForm(true)
    }
    const closeNewListInputFormHandler = () => {
        setIsOpenNewListInputForm(false)
    }
    const onCloseOnBlur = (e: any): void => {
        if (e.relatedTarget !== null) return
        setIsOpenNewListInputForm(false)
    }

    const onAddListList = useCallback(
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
                currentBoardState?.length >= 5 ||
                currentBoardState?.length === undefined
            )
                return

            ListsProvider.createList(addList).then((res: any) => {
                if (res.status === 200) {
                    console.log('Success')
                }
            })

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
            {!isOpenNewListInputForm && (
                <StyledAddList>
                    <HiOutlinePlus />
                    <span onClick={openNewListInputFormHandler}>
                        Add another list
                    </span>
                </StyledAddList>
            )}

            {isOpenNewListInputForm && (
                <StyledForm onSubmit={onAddListList}>
                    <StyledInput
                        placeholder="Enter a list title..."
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={onCloseOnBlur}
                    />
                    <ButtonsWrapper>
                        <SubmitButton>Add list</SubmitButton>
                        <CloseInputIcon onClick={closeNewListInputFormHandler}>
                            <GrClose />
                        </CloseInputIcon>
                    </ButtonsWrapper>
                </StyledForm>
            )}
        </StyledAddListContainer>
    )
}

export default memo(AddNewList)
