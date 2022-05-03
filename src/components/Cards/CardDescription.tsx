import { useState, memo } from 'react'
import styled from 'styled-components/macro'
import { GrClose } from 'react-icons/gr'
import { useRecoilState, useRecoilValue } from 'recoil'
import { BoardListState, CardIdState, BoardIdState } from '../../store/atoms'
import produce from 'immer'

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
    font-size: 12px;
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
    padding: 7px;
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
const StyledDescription = styled.div`
    background-color: background-color: rgba(218, 220, 224, 0.7);
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    padding: 15px;
    font-size: 14px;
    
    cursor: pointer;
    word-break: break-all;
    &:hover {
        background-color: rgb(235, 236, 240);
    }
`
interface props {
    cardDescription: string
}

const CardDescription: React.FC<props> = ({ cardDescription }) => {
    const [isOpenInputForm, setIsOpenInputForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [state, setState] = useRecoilState(BoardListState)
    const cardState = useRecoilValue(CardIdState)
    const boardId = useRecoilValue(BoardIdState)

    const openInputFormHandler = () => {
        setIsOpenInputForm(true)
    }
    const closeInputFormHandler = () => {
        setIsOpenInputForm(false)
    }
    const onChangeCardDescription = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue) return
        setIsOpenInputForm(false)
        const currentBoardIndex = state.findIndex((b) => b.boardId === boardId)
        const currentListIndex = state[currentBoardIndex].lists.findIndex(
            (l) => l.listId === cardState.listId
        )
        const currentCardIndex = state[currentBoardIndex].lists[
            currentListIndex
        ].cards.findIndex((c) => c.cardId === cardState.cardId)
        setState(
            produce(state, (draftState) => {
                draftState[currentBoardIndex].lists[currentListIndex].cards[
                    currentCardIndex
                ].cardDescription = inputValue
            })
        )
        setInputValue('')
    }

    return (
        <>
            {!isOpenInputForm && (
                <StyledDescription onClick={openInputFormHandler}>
                    {cardDescription
                        ? cardDescription
                        : 'Add a more deteiled description...'}
                </StyledDescription>
            )}
            {isOpenInputForm && (
                <StyledInputForm onSubmit={onChangeCardDescription}>
                    <StyledTextArea
                        placeholder="Add a more deteiled description..."
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        maxLength={160}
                    />
                    <ButtonsWrapper>
                        <SubmitButton>Save</SubmitButton>
                        <CloseInputIcon onClick={closeInputFormHandler}>
                            <GrClose />
                        </CloseInputIcon>
                    </ButtonsWrapper>
                </StyledInputForm>
            )}
        </>
    )
}

export default memo(CardDescription)
