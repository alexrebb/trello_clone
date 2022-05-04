import BoardList from '../Boards/BoardList'
import { memo, useState, useCallback } from 'react'
import styled from 'styled-components/macro'

import { HiOutlinePlus } from 'react-icons/hi'
import { GrClose } from 'react-icons/gr'

import { useRecoilState } from 'recoil'
import { BoardListState } from '../../store/atoms'

import produce from 'immer'
import { v4 as uuid } from 'uuid'

const StyledNewBoard = styled.div`
    width: 180px;
    font-size: 15px;
    background-color: rgba(255, 248, 248, 0.849);
    border-radius: 3px;
    padding: 10px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: rgba(128, 128, 128, 0.9);
    }
`
const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
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
interface props {
    onOpenSettingsMenu: Function
}

const BoardsContainer: React.FC<props> = ({ onOpenSettingsMenu }) => {
    const [isOpenNewBoardInputForm, setIsOpenNewBoardInputForm] =
        useState(false)
    const [inputValue, setInputValue] = useState('')
    const [currentBoardState, setCurrentBoardState] =
        useRecoilState(BoardListState)

    const openNewBoardInputFormHandler = () => {
        setIsOpenNewBoardInputForm(true)
    }
    const closeNewBoardInputFormHandler = () => {
        setIsOpenNewBoardInputForm(false)
    }
    const onCloseOnBlur = (e: any): void => {
        if (e.relatedTarget !== null) return
        setIsOpenNewBoardInputForm(false)
    }
    const onSubmitHandler = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (!inputValue.length) return

            const addBoard = {
                boardId: uuid(),
                boardTitle: inputValue,
                boardListId: uuid(),
                lists: [
                    {
                        listId: uuid(),
                        listTitle: 'List',
                        cards: [],
                    },
                ],
            }

            if (currentBoardState.length >= 10) return

            setCurrentBoardState(
                produce(currentBoardState, (draftState) => {
                    draftState.push(addBoard)
                })
            )

            setIsOpenNewBoardInputForm(false)
            setInputValue('')
        },
        [currentBoardState, inputValue, setCurrentBoardState]
    )

    return (
        <>
            <h4>Your boards</h4>
            <BoardList onOpenSettingsMenu={onOpenSettingsMenu} />
            {!isOpenNewBoardInputForm && (
                <StyledNewBoard onClick={openNewBoardInputFormHandler}>
                    <HiOutlinePlus />
                    <span>New board</span>
                </StyledNewBoard>
            )}
            {isOpenNewBoardInputForm && (
                <StyledForm onSubmit={onSubmitHandler}>
                    <StyledInput
                        placeholder="Enter a board title..."
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={onCloseOnBlur}
                        maxLength={20}
                    />
                    <ButtonsWrapper>
                        <SubmitButton>Add board</SubmitButton>
                        <CloseInputIcon onClick={closeNewBoardInputFormHandler}>
                            <GrClose />
                        </CloseInputIcon>
                    </ButtonsWrapper>
                </StyledForm>
            )}
        </>
    )
}

export default memo(BoardsContainer)
