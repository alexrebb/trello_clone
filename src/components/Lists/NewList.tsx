import styled from 'styled-components'
import { HiOutlinePlus } from 'react-icons/hi'
import { GrClose } from 'react-icons/gr'
import { useState, memo, useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { BoardListState, BoardIdState } from '../../store/atoms'
import produce from 'immer'

const StyledAddListContainer = styled.div`
    position: fixed;
    left: 87.5%;
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
const NewList = memo(() => {
    const [openNewListInputForm, setOpenNewListInputForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [currentBoardState, setCurrentBoardState] =
        useRecoilState(BoardListState)
    const currentBoardId = useRecoilValue(BoardIdState)

    const openNewListInputFormHandler = () => {
        setOpenNewListInputForm(true)
    }
    const closeNewListInputFormHandler = () => {
        setOpenNewListInputForm(false)
    }
    const onCloseOnBlur = (e: any): void => {
        if (e.relatedTarget !== null) return
        setOpenNewListInputForm(false)
    }

    const onSubmitHandler = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (!inputValue.length) return

            const addList = {
                listId: Math.floor(Math.random() * 10000).toString(),
                listTitle: inputValue,
                cards: [],
            }
            const currentIndex: number = currentBoardState.findIndex(
                (board) => board.boardId === currentBoardId
            )

            if (
                !currentBoardState[currentIndex] ||
                currentBoardState[currentIndex]?.lists.length >= 5 ||
                currentBoardState[currentIndex]?.lists.length === undefined
            )
                return

            setCurrentBoardState(
                produce(currentBoardState, (draftState) => {
                    draftState[currentIndex].lists.push(addList)
                })
            )

            setOpenNewListInputForm(false)
            setInputValue('')
        },
        [inputValue, currentBoardId, currentBoardState, setCurrentBoardState]
    )

    return (
        <StyledAddListContainer>
            {!openNewListInputForm && (
                <StyledAddList onClick={openNewListInputFormHandler}>
                    <HiOutlinePlus />
                    <span> Add another list</span>
                </StyledAddList>
            )}

            {openNewListInputForm && (
                <StyledForm onSubmit={onSubmitHandler}>
                    <StyledInput
                        placeholder="Enter a list title..."
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={onCloseOnBlur}
                        maxLength={25}
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
})

export default memo(NewList)
