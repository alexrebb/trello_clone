import styled from 'styled-components/macro'
import { HiOutlinePlus } from 'react-icons/hi'
import { GrClose } from 'react-icons/gr'
import { useState, memo } from 'react'
import produce from 'immer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { BoardListState, BoardIdState } from '../../store/atoms'
import { v4 as uuid } from 'uuid'

const StyledAddCard = styled.div`
    color: gray;
    padding: 5px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 3px;

    &:hover {
        background-color: rgba(128, 128, 128, 0.45);
        color: black;
    }
`
const StyledInputForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`
const StyledTextArea = styled.textarea`
    resize: none;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    border: none;
    &:focus {
        outline: none;
    }
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
const CloseInputIcon = styled.span`
    font-size: 15px;
    cursor: pointer;
    &:hover {
        color: black;
    }
`
interface props {
    listId: string
}

const CardTitle: React.FC<props> = ({ listId }) => {
    const [isOpenInputForm, setIsOpenInputForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [state, setState] = useRecoilState(BoardListState)
    const boardId = useRecoilValue(BoardIdState)

    const openInputFormHandler = () => {
        setIsOpenInputForm(true)
    }
    const closeInputFormHandler = () => {
        setIsOpenInputForm(false)
    }

    const onAddNewCardHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue) return
        const newCard = {
            cardId: uuid(),
            cardTitle: inputValue,
            cardDescription: '',
            cardData: [],
        }
        const currentBoardIndex: number = state.findIndex(
            (board) => board.boardId === boardId
        )
        const currentListIndex: number = state[
            currentBoardIndex
        ].lists.findIndex((list) => list.listId === listId)

        if (currentBoardIndex === -1 || currentListIndex === -1) return
        setState(
            produce(state, (draftState) => {
                draftState[currentBoardIndex].lists[
                    currentListIndex
                ].cards.push(newCard)
            })
        )
        setIsOpenInputForm(false)
        setInputValue('')
    }

    return (
        <>
            {!isOpenInputForm && (
                <StyledAddCard onClick={openInputFormHandler}>
                    <HiOutlinePlus />
                    <span>Add a card</span>
                </StyledAddCard>
            )}
            {isOpenInputForm && (
                <StyledInputForm onSubmit={onAddNewCardHandler}>
                    <StyledTextArea
                        placeholder="Enter a title for this card..."
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <ButtonsWrapper>
                        <SubmitButton>Add card</SubmitButton>
                        <CloseInputIcon onClick={closeInputFormHandler}>
                            <GrClose />
                        </CloseInputIcon>
                    </ButtonsWrapper>
                </StyledInputForm>
            )}
        </>
    )
}

export default memo(CardTitle)
