import { BsCardChecklist } from 'react-icons/bs'
import styled from 'styled-components/macro'
import { useRecoilValue, useRecoilState } from 'recoil'
import { filteredCardState } from '../../store/selectors'
import { BoardIdState, BoardListState, CardIdState } from '../../store/atoms'
import { useState } from 'react'
import { GrClose } from 'react-icons/gr'
import produce from 'immer'

const StyledTitle = styled.h3`
    margin-left: 10px;
    cursor: pointer;
`
const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
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

const CardTitleDescription = () => {
    const [openInputForm, setOpenInputForm] = useState(false)
    const currentCard = useRecoilValue(filteredCardState)
    const [inputValue, setInputValue] = useState('')
    const [state, setState] = useRecoilState(BoardListState)
    const boardId = useRecoilValue(BoardIdState)
    const cardState = useRecoilValue(CardIdState)

    const openInputFormHandler = () => {
        setOpenInputForm(true)
    }
    const closeInputFormHandler = () => {
        setOpenInputForm(false)
    }
    const onChangeCardTitle = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue) return
        setOpenInputForm(false)
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
                ].cardTitle = inputValue
            })
        )
        setInputValue('')
    }

    return (
        <>
            {!openInputForm && (
                <StyledWrapper onClick={openInputFormHandler}>
                    <BsCardChecklist />
                    <StyledTitle>{currentCard.cardTitle}</StyledTitle>
                </StyledWrapper>
            )}
            {openInputForm && (
                <StyledInputForm onSubmit={onChangeCardTitle}>
                    <StyledTextArea
                        placeholder="Change a title..."
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        maxLength={54}
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

export default CardTitleDescription
