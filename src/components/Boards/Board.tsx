import styled from 'styled-components/macro'
import { VscSettingsGear } from 'react-icons/vsc'
import { memo } from 'react'
import { useSetRecoilState } from 'recoil'
import { BoardIdState, BoardTitleState } from '../../store/atoms'

const StyledBoardContainer = styled.div`
    width: 180px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding: 5px 7px;
    border-radius: 7px;
    color: rgba(31, 27, 27, 0.822);
    &:hover {
        background-color: rgba(128, 128, 128, 0.5);
    }
`
const StyledBoard = styled.div`
    width: 180px;
    border-radius: 7px;
    word-break: break-all;
    cursor: pointer;
    &:hover {
        ${StyledBoardContainer} {
            background-color: rgba(128, 128, 128, 0.5);
        }
    }
    &:active {
        ${StyledBoardContainer} {
            background-color: rgba(128, 128, 128, 0.3);
        }
    }
`
const StyledIcon = styled.span`
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
interface props {
    onOpenSettingsMenu: Function
    boardId: string
    boardTitle: string
}

const Board: React.FC<props> = ({
    onOpenSettingsMenu,
    boardId,
    boardTitle,
}) => {
    const setBoardIdState = useSetRecoilState(BoardIdState)
    const setBoardTitleState = useSetRecoilState(BoardTitleState)

    const onOpenSettingsMenuHandler = () => {
        onOpenSettingsMenu()
        const boardState = {
            boardId: boardId,
            boardTitle: boardTitle,
        }
        setBoardTitleState(boardState)
    }

    const onClickHandleBoard = () => {
        setBoardIdState(boardId)
    }

    return (
        <StyledBoardContainer>
            <StyledBoard onClick={onClickHandleBoard}>{boardTitle}</StyledBoard>
            <StyledIcon onClick={onOpenSettingsMenuHandler}>
                <VscSettingsGear />
            </StyledIcon>
        </StyledBoardContainer>
    )
}

export default memo(Board)
