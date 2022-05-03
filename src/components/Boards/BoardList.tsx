import Board from './Board'
import styled from 'styled-components/macro'
import { memo } from 'react'
import { BoardListState } from '../../store/atoms'
import { useRecoilValue } from 'recoil'

const StyledBoardList = styled.div`
    display: flex;
    flex-direction: column;
`

interface props {
    onOpenSettingsMenu: Function
}

const BoardList: React.FC<props> = ({ onOpenSettingsMenu }) => {
    const boardList = useRecoilValue(BoardListState)

    return (
        <StyledBoardList>
            {boardList?.map((board) => {
                return (
                    <Board
                        key={board.boardId}
                        boardId={board.boardId}
                        boardTitle={board.boardTitle}
                        onOpenSettingsMenu={onOpenSettingsMenu}
                    />
                )
            })}
        </StyledBoardList>
    )
}

export default memo(BoardList)
