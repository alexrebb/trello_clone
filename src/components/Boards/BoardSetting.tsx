import { GrClose } from 'react-icons/gr'
import styled from 'styled-components'
import { memo, useState, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { BoardTitleState, BoardListState } from '../../store/atoms'
import { MdMoreHoriz } from 'react-icons/md'
import produce from 'immer'
import { BoardState } from '../../types/interfaces'

// А почему в процентах?  Тебе здесь наверное нужна конкрентая ширина в пикселях.
// Кто-нибудь откроет на ультрашироком мониторе и получит неадекватно широкое меню
const StyledSettingsMenu = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgb(241, 239, 239);
    width: 17%;
    border-radius: 5px;
    margin-top: 10px;
    margin-left: 10px;
    height: 400px;
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
const StyledCloseIcon = styled.span`
    font-size: 15px;
    cursor: pointer;
`
const StyledTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    margin-top: 5px;
`
const StyledRemoveList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: none;
    font-size: 15px;
    animation: list 800ms cubic-bezier(0.25, 0.1, 0.25, 1);
    @keyframes list {
        from {
            opacity: 0;
            transform: translateY(-1rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`
const StyledListTitle = styled.div`
    font-weight: bold;
    cursor: pointer;
`
const StyledIcon = styled.div`
    font-size: 20px;
    cursor: pointer;
    margin-right: 20px;
`
const StyledSpan = styled.span`
    text-transform: uppercase;
`
const StyledInput = styled.input`
    width: 100%;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    border: none;
    &:focus {
        outline: none;
    }
    font-size: 15px;
`
const StyledIconsWrapper = styled.div`
    display: flex;
`
const StyledBtn = styled.button`
    padding: 2px;
    margin-right: 7px;
    text-transform: uppercase;
    border-radius: 3px;
    border: none;
    cursor: pointer;
`

interface props {
    onCloseSettingsMenu: Function
}

const SettingsMenu: React.FC<props> = memo(({ onCloseSettingsMenu }) => {
    const [openInputTitle, setOpenInputTitle] = useState(false)
    const [openRemoveList, setOpenRemoveList] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [boardTitleState, setBoardTitleState]: any =
        useRecoilState(BoardTitleState)
    const [state, setState] = useRecoilState(BoardListState)

    const onOpenInputTitleHandler = () => {
        setOpenInputTitle(true)
    }
    const onCloseSettingsMenuHandler = () => {
        onCloseSettingsMenu()
    }
    const onCloseRemoveBoardHandler = () => {
        setOpenRemoveList(false)
    }
    const onOpenRemoveListHandler = () => {
        setOpenRemoveList(!openRemoveList)
    }

    const onChangeTitleHandler = useCallback(() => {
        setOpenInputTitle(false)
        if (!inputValue) return

        const currentBoardIndex = state.findIndex(
            (board) => board.boardId === boardTitleState.boardId
        )

        setState(
            produce(state, (draftState) => {
                draftState[currentBoardIndex].boardTitle = inputValue
            })
        )
        const updateBoardState: BoardState = {
            boardTitle: inputValue,
            boardId: boardTitleState.boardId,
        }
        setBoardTitleState(updateBoardState)
    }, [
        setState,
        state,
        inputValue,
        boardTitleState.boardId,
        setBoardTitleState,
    ])

    const onRemoveBoardHandler = useCallback(() => {
        if (state.length === 1) return
        setState(
            produce(state, (draftState) => {
                return (draftState = draftState.filter(
                    (board) => board.boardId !== boardTitleState.boardId
                ))
            })
        )
        onCloseSettingsMenu()
    }, [boardTitleState.boardId, onCloseSettingsMenu, setState, state])

    return (
        <StyledSettingsMenu>
            <StyledTitleWrapper>
                {!openInputTitle && (
                    <StyledListTitle onClick={onOpenInputTitleHandler}>
                        {boardTitleState.boardTitle}
                    </StyledListTitle>
                )}
                {openInputTitle && (
                    <StyledInput
                        type="text"
                        onBlur={onChangeTitleHandler}
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                )}
                <StyledIconsWrapper>
                    <StyledIcon onClick={onOpenRemoveListHandler}>
                        <MdMoreHoriz />
                    </StyledIcon>
                    <StyledCloseIcon onClick={onCloseSettingsMenuHandler}>
                        <GrClose />
                    </StyledCloseIcon>
                </StyledIconsWrapper>
            </StyledTitleWrapper>
            {openRemoveList && (
                <StyledRemoveList>
                    <StyledSpan>Remove Board?</StyledSpan>
                    <div>
                        <StyledBtn onClick={onRemoveBoardHandler}>
                            Yes
                        </StyledBtn>
                        <StyledBtn onClick={onCloseRemoveBoardHandler}>
                            No
                        </StyledBtn>
                    </div>
                </StyledRemoveList>
            )}

            <div>Статистика</div>
            <div>Выбрать фон</div>
        </StyledSettingsMenu>
    )
})

export default memo(SettingsMenu)
