import BoardContainer from './BoardContainer'
import styled from 'styled-components/macro'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'
import { BoardListState } from '../../store/atoms'

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
                    <BoardContainer
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
