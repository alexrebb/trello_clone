import styled from 'styled-components/macro'
import { CardAction } from '../../types'
import { BsJournalPlus } from 'react-icons/bs'
import { MdOutlineDescription } from 'react-icons/md'
import { useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CardActionsState, CardIdState } from '../../store/atoms'
import produce from 'immer'
import moment from 'moment'
import ActionsProvider from '../../service/ActionsProvider'
import { v4 as uuid } from 'uuid'

const StyledIconPlus = styled.span`
    padding: 4px 4px 0 4px;
    border-radius: 7px;
    cursor: pointer;
    &:hover {
        background-color: rgba(128, 128, 128, 0.8);
    }
    &:active {
        background-color: rgba(128, 128, 128, 0.45);
    }
`
const StyleDescr = styled.h4`
    margin-left: 10px;
    margin-right: 15px;
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

const CardAddAction = () => {
    const [isOpenInputForm, setIsOpenInputForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [actionsState, setActionsState] = useRecoilState(CardActionsState)
    const cardState = useRecoilValue(CardIdState)

    const closeInputFormHandler = () => {
        setIsOpenInputForm(false)
    }
    const onOpenInputFormHandler = () => {
        setIsOpenInputForm(true)
    }

    const displayDateWithTime = moment().format('LLLL')

    const onAddCardAction = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue) return
        setIsOpenInputForm(false)
        const newAction: CardAction = {
            listId: cardState.listId,
            cardId: cardState.cardId,
            actionId: uuid(),
            action: inputValue,
            date: displayDateWithTime,
        }
        ActionsProvider.createAction(newAction).then((res: any) => {
            if (res.status === 200) {
                console.log('Success')
            }
        })
        setActionsState(
            produce(actionsState, (draftState) => {
                draftState.push(newAction)
            })
        )
        setInputValue('')
    }

    return (
        <>
            <StyledWrapper>
                <MdOutlineDescription />
                <StyleDescr>Actions</StyleDescr>
                <StyledIconPlus onClick={onOpenInputFormHandler}>
                    <BsJournalPlus />
                </StyledIconPlus>
            </StyledWrapper>
            {isOpenInputForm && (
                <StyledInputForm onSubmit={onAddCardAction}>
                    <StyledTextArea
                        placeholder="Write a comment..."
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
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

export default CardAddAction
