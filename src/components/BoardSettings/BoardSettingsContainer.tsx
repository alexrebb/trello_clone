import BoardSettingsTitle from './BoardSettingsTitle'
import BoardSettingsRemoveBoard from './BoardSettingsRemoveBoard'
import styled from 'styled-components/macro'
import { memo, useState, useCallback } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { BoardTitleState, BoardListState, ListsState } from '../../store/atoms'
import produce from 'immer'
import { BoardState } from '../../types'
import BoardsProvider from '../../services/BoardsProvider'
import loggerErrors from '../../utils/logger'

const StyledSettingsMenu = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgb(241, 239, 239);
    width: 240px;
    border-radius: 5px;
    margin-top: 10px;
    margin-left: 10px;
    height: 200px;
    padding: 10px;
    animation: slide 700ms cubic-bezier(0.25, 0.1, 0.25, 1);
    @keyframes slide {
        from {
            opacity: 0;
            transform: translateX(-4rem);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`
interface props {
    handleCloseSettingMenu: Function
}

const BoardSettingsContainer: React.FC<props> = ({
    handleCloseSettingMenu,
}) => {
    const [isOpenInputTitle, setIsOpenInputTitle] = useState(false)
    const [isOpenRemoveBoard, setIsOpenRemoveBoard] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [boardTitleState, setBoardTitleState] =
        useRecoilState(BoardTitleState)
    const [state, setState] = useRecoilState(BoardListState)
    const setListsState = useSetRecoilState(ListsState)
    const boardId = boardTitleState.boardId
    const boardTitle = boardTitleState.boardTitle

    const handleCloseRemoveBoard = useCallback(() => {
        setIsOpenRemoveBoard(false)
    }, [])

    const handleOpenRemoveBoard = useCallback(() => {
        setIsOpenRemoveBoard(true)
    }, [])

    const handleOpenInputTitle = useCallback(() => {
        setIsOpenInputTitle(true)
    }, [])

    const onChangeTitleHandler = useCallback(() => {
        setIsOpenInputTitle(false)
        if (!inputValue) return

        const currentBoardIndex = state.findIndex(
            (board) => board.boardId === boardId
        )
        BoardsProvider.changeBoardTitle(inputValue, boardId).catch((err) =>
            loggerErrors(err)
        )

        setState(
            produce(state, (draftState) => {
                draftState[currentBoardIndex].boardTitle = inputValue
            })
        )
        const updateBoardState: BoardState = {
            boardTitle: inputValue,
            boardId: boardId,
        }
        setBoardTitleState(updateBoardState)
    }, [setState, state, inputValue, boardId, setBoardTitleState])

    const onRemoveBoardHandler = useCallback(() => {
        if (state.length === 1) return

        BoardsProvider.deleteBoard(boardId).catch((err) => loggerErrors(err))

        setState(
            produce(state, (draftState) => {
                return (draftState = draftState.filter(
                    (board) => board.boardId !== boardId
                ))
            })
        )
        setListsState([])
        handleCloseSettingMenu()
    }, [boardId, setState, state, setListsState, handleCloseSettingMenu])

    return (
        <StyledSettingsMenu>
            <BoardSettingsTitle
                onChangeTitleHandler={onChangeTitleHandler}
                inputValue={inputValue}
                isOpenInputTitle={isOpenInputTitle}
                handleOpenRemoveBoard={handleOpenRemoveBoard}
                handleCloseSettingMenu={handleCloseSettingMenu}
                boardTitle={boardTitle}
                handleOpenInputTitle={handleOpenInputTitle}
                setInputValue={setInputValue}
            />
            {isOpenRemoveBoard && (
                <BoardSettingsRemoveBoard
                    onRemoveBoardHandler={onRemoveBoardHandler}
                    handleCloseRemoveBoard={handleCloseRemoveBoard}
                />
            )}
        </StyledSettingsMenu>
    )
}

export default memo(BoardSettingsContainer)
