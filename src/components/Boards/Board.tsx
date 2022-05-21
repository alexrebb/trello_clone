import styled from 'styled-components/macro'
import { VscSettingsGear } from 'react-icons/vsc'

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
    onClickHandleBoard: Function
    onOpenSettingsMenu: Function
    boardTitle: string
}

const Board: React.FC<props> = ({
    onClickHandleBoard,
    onOpenSettingsMenu,
    boardTitle,
}) => {
    return (
        <StyledBoardContainer>
            <StyledBoard onClick={() => onClickHandleBoard()}>
                {boardTitle}
            </StyledBoard>
            <StyledIcon onClick={() => onOpenSettingsMenu(boardTitle)}>
                <VscSettingsGear />
            </StyledIcon>
        </StyledBoardContainer>
    )
}

export default Board
