import BoardList from '../Boards/BoardList'
import { HiOutlinePlus } from 'react-icons/hi'
import styled from 'styled-components'
import { memo, useState, useCallback } from 'react'
import { GrClose } from 'react-icons/gr'
import { useRecoilState, useRecoilValue } from 'recoil'
import { BoardListState, BoardIdState } from '../../store/atoms'
import produce from 'immer'

const StyledMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(241, 239, 239, 0.91);
    width: 9%;
    align-items: start;
    z-index: 1;
    padding: 10px;
`
const StyledNewBoard = styled.div`
    width: 90%;
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
const Menu: React.FC<props> = memo(({ onOpenSettingsMenu }) => {
    const [openNewBoardInputForm, setOpenNewBoardInputForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [currentBoardState, setCurrentBoardState] =
        useRecoilState(BoardListState)

    const openNewBoardInputFormHandler = () => {
        setOpenNewBoardInputForm(true)
    }
    const closeNewBoardInputFormHandler = () => {
        setOpenNewBoardInputForm(false)
    }
    const onCloseOnBlur = (e: any): void => {
        if (e.relatedTarget !== null) return
        setOpenNewBoardInputForm(false)
    }

    const onSubmitHandler = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (!inputValue.length) return

            const addBoard = {
                boardId: Math.floor(Math.random() * 10000).toString(),
                boardTitle: inputValue,
                boardListId: Math.floor(Math.random() * 10000).toString(),
                lists: [],
            }

            if (currentBoardState.length >= 10) return

            setCurrentBoardState(
                produce(currentBoardState, (draftState) => {
                    draftState.push(addBoard)
                })
            )

            setOpenNewBoardInputForm(false)
            setInputValue('')
        },
        [currentBoardState, inputValue, setCurrentBoardState]
    )

    return (
        <StyledMenuContainer>
            <h4>Current boards</h4>
            <BoardList onOpenSettingsMenu={onOpenSettingsMenu} />
            {!openNewBoardInputForm && (
                <StyledNewBoard onClick={openNewBoardInputFormHandler}>
                    <HiOutlinePlus />
                    <span>New board</span>
                </StyledNewBoard>
            )}
            {openNewBoardInputForm && (
                <StyledForm onSubmit={onSubmitHandler}>
                    <StyledInput
                        placeholder="Enter a board title..."
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={onCloseOnBlur}
                        maxLength={25}
                    />
                    <ButtonsWrapper>
                        <SubmitButton>Add list</SubmitButton>
                        <CloseInputIcon onClick={closeNewBoardInputFormHandler}>
                            <GrClose />
                        </CloseInputIcon>
                    </ButtonsWrapper>
                </StyledForm>
            )}
        </StyledMenuContainer>
    )
})

export default memo(Menu)
